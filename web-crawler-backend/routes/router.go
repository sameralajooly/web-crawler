package routes

import (
	"web-crawler-backend/controllers"
	"web-crawler-backend/ws"

	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()

	api := r.Group("/api")
	api.POST("/crawl", controllers.CrawlURL)
	api.GET("/urls", controllers.GetURLs)
	api.GET("/urls/:id", controllers.GetURLById)
	api.DELETE("/urls", controllers.DeleteURLs)
	api.POST("/urls/reanalyze", controllers.ReanalyzeUrls)

	r.GET("/ws", ws.HandleWebSocket)

	return r
}
