package controllers

import (
	"log"
	"net/http"
	"strconv"
	"web-crawler-backend/models"
	"web-crawler-backend/services"

	"github.com/gin-gonic/gin"
)

type CrawlRequest struct {
	Address string `json:"address" binding:"required,url"`
}

func GetURLs(c *gin.Context) {
	urls, err := models.GetURLs()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "could not fetch URLs"})
		return
	}
	c.JSON(http.StatusOK, urls)
}
func GetURLById(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(400, gin.H{"error": "invalid id"})
		return
	}

	url, err := models.GetURLById(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "not found"})
		return
	}

	c.JSON(http.StatusOK, url)
}

func CrawlURL(c *gin.Context) {
	var req CrawlRequest
	if err := c.ShouldBindJSON(&req); err != nil || req.Address == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid URL"})
		return
	}

	url, err := models.CreateInitURL(req.Address)
	if err != nil {
		log.Printf("Failed to create URL record: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save data"})
		return
	}

	go func(url *models.URL) {
		services.CrawlURL(url)
	}(url)

	c.JSON(http.StatusOK, gin.H{
		"message": "Crawl URL started",
		"data":    url,
	})
}

func DeleteURLs(c *gin.Context) {
	var req struct {
		IDs []uint `json:"ids"`
	}
	if err := c.ShouldBindJSON(&req); err != nil || len(req.IDs) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid IDs"})
		return
	}

	err := models.DeleteURLsById(req.IDs)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Delete failed"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "URLs Deleted"})
}

func ReanalyzeUrls(c *gin.Context) {
}
