package utils

import (
	"log"
	"net/http"
	"net/url"
	"strings"
	"web-crawler-backend/models"

	"github.com/PuerkitoBio/goquery"
)

func AnalyzeURL(address string) models.URL {
	resp, err := http.Get(address)
	if err != nil {
		return models.URL{Status: "error"}
	}
	defer resp.Body.Close()

	doc, _ := goquery.NewDocumentFromReader(resp.Body)

	result := models.URL{
		Title: doc.Find("title").Text(),
	}

	html, _ := doc.Html()
	htmlLower := strings.ToLower(html)

	switch {
	case strings.Contains(htmlLower, "<!doctype html>"):
		result.HTMLVersion = "HTML5"

	case strings.Contains(htmlLower, `<!doctype html public "-//w3c//dtd html 4.01//en"`):
		result.HTMLVersion = "HTML 4.01 Strict"

	case strings.Contains(htmlLower, `<!doctype html public "-//w3c//dtd html 4.01 transitional//en"`):
		result.HTMLVersion = "HTML 4.01 Transitional"

	case strings.Contains(htmlLower, `<!doctype html public "-//w3c//dtd html 4.01 frameset//en"`):
		result.HTMLVersion = "HTML 4.01 Frameset"

	case strings.Contains(htmlLower, `<!doctype html public "-//w3c//dtd xhtml 1.0 strict//en"`):
		result.HTMLVersion = "XHTML 1.0 Strict"

	case strings.Contains(htmlLower, `<!doctype html public "-//w3c//dtd xhtml 1.0 transitional//en"`):
		result.HTMLVersion = "XHTML 1.0 Transitional"

	case strings.Contains(htmlLower, `<!doctype html public "-//w3c//dtd xhtml 1.0 frameset//en"`):
		result.HTMLVersion = "XHTML 1.0 Frameset"

	case strings.Contains(htmlLower, `<!doctype html public "-//w3c//dtd html 3.2 final//en"`):
		result.HTMLVersion = "HTML 3.2"

	case strings.Contains(htmlLower, `<!doctype html public "-//ietf//dtd html 2.0//en"`):
		result.HTMLVersion = "HTML 2.0"

	default:
		result.HTMLVersion = "Unknown"
	}

	result.H1Count = doc.Find("h1").Length()
	result.H2Count = doc.Find("h2").Length()
	result.H3Count = doc.Find("h3").Length()
	result.H4Count = doc.Find("h4").Length()
	result.H5Count = doc.Find("h5").Length()
	result.H6Count = doc.Find("h6").Length()

	baseURL, err := url.Parse(address)
	if err != nil {
		log.Printf("invalid base URL: %v", err)
		return models.URL{Status: "error"}
	}

	result.BrokenLinks = []models.BrokenLink{}

	doc.Find("a").Each(func(i int, s *goquery.Selection) {
		link, _ := s.Attr("href")
		if strings.HasPrefix(link, "http") {

			parsedLink, err := url.Parse(link)
			if err != nil {
				return
			}

			resolvedLink := baseURL.ResolveReference(parsedLink)

			if resolvedLink.Hostname() == baseURL.Hostname() {
				result.InternalLinks++
			} else {
				result.ExternalLinks++
			}

			resp, err := http.Head(link)
			if err != nil || resp.StatusCode >= 400 {

				result.BrokenLinks = append(result.BrokenLinks, models.BrokenLink{
					Link:       link,
					StatusCode: resp.StatusCode,
				})

			}
		}
	})

	result.HasLoginForm = doc.Find("input[type='password']").Length() > 0
	result.Status = "done"

	return result
}
