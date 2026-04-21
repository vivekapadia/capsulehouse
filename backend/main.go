package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"capsulehouse-backend/models"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var db *gorm.DB

func main() {
	// Setup Database Connection
	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=UTC",
		getEnv("DB_HOST", "localhost"),
		getEnv("DB_USER", "myuser"),
		getEnv("DB_PASSWORD", "mypassword"),
		getEnv("DB_NAME", "capsulehouse"),
		getEnv("DB_PORT", "5432"),
	)

	var err error
	db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Println("Failed to connect to database. Starting without DB for now.")
	} else {
		log.Println("Connected to PostgreSQL database!")
		
		// Drop tables to apply the new UUID/Audit schema cleanly
		db.Migrator().DropTable(&models.Product{}, &models.Lead{})
		
		// Auto Migrate the models
		db.AutoMigrate(&models.Product{}, &models.Lead{})
		
		// Seed the database if products are empty
		seedProducts()
	}

	// Initialize Router
	r := gin.Default()

	// Configure CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"}, // Allow all origins for dev
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	// Health check endpoint
	r.GET("/api/health", func(c *gin.Context) {
		status := "ok"
		if db == nil {
			status = "db_disconnected"
		}
		c.JSON(http.StatusOK, gin.H{
			"status": status,
		})
	})

	// Products endpoint
	r.GET("/api/products", func(c *gin.Context) {
		var products []models.Product
		if db != nil {
			db.Find(&products)
		}
		c.JSON(http.StatusOK, products)
	})

	// Leads endpoint
	r.POST("/api/leads", func(c *gin.Context) {
		var lead models.Lead
		if err := c.ShouldBindJSON(&lead); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		if db != nil {
			if err := db.Create(&lead).Error; err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save lead"})
				return
			}
		} else {
			log.Printf("Received lead (DB offline): %+v", lead)
		}

		c.JSON(http.StatusOK, gin.H{"status": "success", "message": "Lead captured successfully!"})
	})

	// Start server
	port := getEnv("PORT", "8080")
	log.Printf("Server running on port %s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatal("Failed to start server: ", err)
	}
}

func seedProducts() {
	var count int64
	db.Model(&models.Product{}).Count(&count)
	if count == 0 {
		products := []models.Product{
			{
				BaseModel:   models.BaseModel{CreatedBy: "System Seeder"},
				Name:        "Apple Cabin Alpha",
				Category:    "basic",
				Description: "A reliable, cost-effective prefabricated home perfect for quick deployment and utility use. Built with Tata Steel.",
				PriceINR:    850000,
				Dimensions:  "200 Sq. Ft.",
				Features:    "Fully Insulated, Basic Wiring, Weather-proof, Tata Steel Frame",
				ImageURL:    "/images/apple-cabin.jpg",
			},
			{
				BaseModel:   models.BaseModel{CreatedBy: "System Seeder"},
				Name:        "Space Capsule Zenith",
				Category:    "luxury",
				Description: "Our flagship futuristic capsule house with 180-degree panoramic views and smart home automation integration.",
				PriceINR:    2400000,
				Dimensions:  "450 Sq. Ft.",
				Features:    "Smart Lighting, Panoramic Glass, Luxury Bathroom, Climate Control, Aluminum Alloy Shell",
				ImageURL:    "/images/space-capsule.jpg",
			},
		}
		for _, p := range products {
			db.Create(&p)
		}
		log.Println("Seeded database with initial products.")
	}
}

// Helper function to read environment variable or fallback to default
func getEnv(key, fallback string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return fallback
}
