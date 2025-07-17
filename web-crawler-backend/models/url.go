package models

import (
	"time"

	"gorm.io/gorm"
)

var DB *gorm.DB

func SetDB(database *gorm.DB) {
	DB = database
}

type URL struct {
	ID            uint           `json:"id" gorm:"primaryKey"`
	CreatedAt     time.Time      `json:"createdAt"`
	UpdatedAt     time.Time      `json:"updatedAt"`
	DeletedAt     gorm.DeletedAt `json:"deletedAt" gorm:"index"`
	URL           string         `json:"url"`
	HTMLVersion   string         `json:"htmlVersion"`
	Title         string         `json:"title"`
	H1Count       int            `json:"h1Count"`
	H2Count       int            `json:"h2Count"`
	H3Count       int            `json:"h3Count"`
	H4Count       int            `json:"h4Count"`
	H5Count       int            `json:"h5Count"`
	H6Count       int            `json:"h6Count"`
	InternalLinks int            `json:"internalLinks"`
	ExternalLinks int            `json:"externalLinks"`
	HasLoginForm  bool           `json:"hasLoginForm"`
	Status        string         `json:"status"` // queued, running, done, error

	BrokenLinks []BrokenLink `gorm:"foreignKey:URLID" json:"brokenLinks"`
}

func CreateInitURL(address string) (*URL, error) {
	url := URL{
		URL:    address,
		Status: "queued",
	}

	err := DB.Create(&url).Error

	return &url, err
}

func GetURLs() ([]URL, error) {
	var urls []URL

	err := DB.Preload("BrokenLinks").Find(&urls).Error

	return urls, err
}

func GetURLById(id uint) (*URL, error) {
	var url URL
	err := DB.Preload("BrokenLinks").First(&url, id).Error
	return &url, err
}

func UpdateURL(url *URL) error {
	err := DB.Omit("UpdatedAt", "CreatedAt", "DeletedAt").Save(&url).Error

	return err
}

func DeleteURLsById(ids []uint) error {
	err := DB.Delete(&URL{}, ids).Error

	return err
}
