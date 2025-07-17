package controllers

import (
	"log"
	"net/http"
	"web-crawler-backend/models"
	"web-crawler-backend/services"

	"github.com/gin-gonic/gin"
)

type CrawlRequest struct {
	Address string `json:"address" binding:"required,url"`
}

func GetURLs(c *gin.Context) {
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

func GetURLById(c *gin.Context) {
}

func DeleteURLs(c *gin.Context) {
}

func ReanalyzeUrls(c *gin.Context) {
}
