package services

import (
	"log"
	"web-crawler-backend/models"
	"web-crawler-backend/utils"
)

func CrawlURL(url *models.URL) {
	url.Status = "running"
	models.UpdateURL(url)
	analyzedUrl := utils.AnalyzeURL(url.URL)
	analyzedUrl.ID = url.ID
	analyzedUrl.URL = url.URL
	err := models.UpdateURL(&analyzedUrl)
	if err != nil {
		log.Printf("Crawl URL Failed:%v\n%v", analyzedUrl, err)
	}
}
