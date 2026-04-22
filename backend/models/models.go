package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// BaseModel provides industry-standard audit fields and a GUID primary key
type BaseModel struct {
	ID               uuid.UUID      `gorm:"type:uuid;primary_key;default:gen_random_uuid()" json:"id"`
	CreatedBy        string         `json:"created_by"`
	CreatedDateTime  time.Time      `gorm:"autoCreateTime" json:"created_datetime"`
	ModifiedBy       string         `json:"modified_by"`
	ModifiedDateTime time.Time      `gorm:"autoUpdateTime" json:"modified_datetime"`
	DeletedAt        gorm.DeletedAt `gorm:"index" json:"-"`
}

// Product represents a capsule house model
type Product struct {
	BaseModel
	Name           string  `json:"name"`
	Category       string  `json:"category"`
	Description    string  `json:"description"`
	PriceINR       float64 `json:"price"`
	Dimensions     string  `json:"dimensions"`
	Features       string  `json:"features"`
	Specifications string  `json:"specifications"`
	ImageURL       string  `json:"image_url"`
}

// Lead represents a potential customer inquiry
type Lead struct {
	BaseModel
	Name              string `json:"name"`
	Phone             string `json:"phone"`
	Location          string `json:"location"`
	InterestedModel   string `json:"interested_model"`
	AdditionalMessage string `json:"additional_message"`
}

// Portfolio represents a completed project showcase
type Portfolio struct {
	BaseModel
	Title       string `json:"title"`
	Location    string `json:"location"`
	Description string `json:"description"`
	ImageURL    string `json:"image_url"`
	Units       int    `json:"units"`
}
