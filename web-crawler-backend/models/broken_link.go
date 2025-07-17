package models

type BrokenLink struct {
	ID         uint   `gorm:"primaryKey" json:"id"`
	URLID      uint   `gorm:"index" json:"urlId"`
	Link       string `gorm:"type:text" json:"link"`
	StatusCode int    `json:"statusCode"`

	URL URL `gorm:"foreignKey:URLID"`
}

func DeleteBrokenLinkByURLId(urlId uint) error {
	err := DB.Where("url_id = ?", urlId).Delete(BrokenLink{}).Error
	return err
}
