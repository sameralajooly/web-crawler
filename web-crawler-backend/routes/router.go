package routes

import (
	"log"
	"os"
	"time"
	"web-crawler-backend/controllers"
	"web-crawler-backend/ws"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func SetupRouter() *gin.Engine {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{os.Getenv("FRONTEND_URL")},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	api := r.Group("/api")
	api.POST("/crawl", controllers.CrawlURL)
	api.GET("/urls", controllers.GetURLs)
	api.GET("/urls/:id", controllers.GetURLById)
	api.DELETE("/urls", controllers.DeleteURLs)
	api.POST("/urls/reanalyze", controllers.ReanalyzeUrls)

	r.GET("/ws", ws.HandleWebSocket)

	return r
}
