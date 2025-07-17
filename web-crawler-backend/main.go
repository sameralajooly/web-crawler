package main

import (
	"web-crawler-backend/config"
	"web-crawler-backend/models"
	"web-crawler-backend/routes"
)

func main() {
	config.InitDB()
	models.SetDB(config.DB)

	r := routes.SetupRouter()
	r.Run(":8080")
}
