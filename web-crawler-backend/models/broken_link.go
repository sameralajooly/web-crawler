package models

type BrokenLink struct {
	ID         uint   `gorm:"primaryKey" json:"id"`
	URLID      uint   `gorm:"index" json:"urlId"`
	Link       string `gorm:"type:text" json:"link"`
	StatusCode int    `json:"statusCode"`

	URL URL `gorm:"foreignKey:URLID"`
}
