package main

import (
	"web-crawler-backend/config"
	"web-crawler-backend/models"
)

func main() {
	config.InitDB()
	models.SetDB(config.DB)

}
