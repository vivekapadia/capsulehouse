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
		
		// Drop tables to apply the new UUID/Audit schema cleanly (Force refresh for unique images)
		db.Migrator().DropTable(&models.Product{}, &models.Lead{}, &models.Portfolio{})
		
		// Auto Migrate the models
		db.AutoMigrate(&models.Product{}, &models.Lead{}, &models.Portfolio{})
		
		// Seed the database
		seedProducts()
		seedPortfolio()
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

	// Portfolio endpoint
	r.GET("/api/portfolio", func(c *gin.Context) {
		var portfolio []models.Portfolio
		if db != nil {
			db.Find(&portfolio)
		}
		c.JSON(http.StatusOK, portfolio)
	})

	// Leads GET endpoint (for Admin Dashboard)
	r.GET("/api/leads", func(c *gin.Context) {
		var leads []models.Lead
		if db != nil {
			db.Order("created_date_time desc").Find(&leads)
		}
		c.JSON(http.StatusOK, leads)
	})

	// Leads POST endpoint with basic validation
	r.POST("/api/leads", func(c *gin.Context) {
		var lead models.Lead
		if err := c.ShouldBindJSON(&lead); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// Basic server-side validation
		if lead.Name == "" || lead.Phone == "" || lead.Location == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Name, Phone, and Location are required fields"})
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
				BaseModel:   models.BaseModel{CreatedBy: "System"},
				Name:        "Zenith X1",
				Category:    "Luxury",
				Description: "Flagship 360-degree panoramic space capsule with AI integration.",
				PriceINR:    2800000,
				Dimensions:  "450 Sq. Ft.",
				Features:    "Smart Glass, Voice Control, Luxury Bath",
				ImageURL:    "/images/p1.png",
			},
			{
				BaseModel:   models.BaseModel{CreatedBy: "System"},
				Name:        "Alpha Cabin",
				Category:    "Utility",
				Description: "Durable Tata Steel built utility cabin for extreme terrains.",
				PriceINR:    850000,
				Dimensions:  "200 Sq. Ft.",
				Features:    "Insulated, Weather-proof, Fire-resistant",
				ImageURL:    "/images/p2.png",
			},
			{
				BaseModel:   models.BaseModel{CreatedBy: "System"},
				Name:        "Eco-Pod S1",
				Category:    "Off-Grid",
				Description: "Solar-ready eco-capsule with rainwater harvesting.",
				PriceINR:    1200000,
				Dimensions:  "250 Sq. Ft.",
				Features:    "Solar Panels, Battery Bank, Bamboo Interior",
				ImageURL:    "/images/p3.png",
			},
			{
				BaseModel:   models.BaseModel{CreatedBy: "System"},
				Name:        "Nomad M2",
				Category:    "Mobile",
				Description: "Trailer-mounted mobile home for the modern wanderer.",
				PriceINR:    1500000,
				Dimensions:  "180 Sq. Ft.",
				Features:    "Chassis Included, Light-weight, Compact Kitchen",
				ImageURL:    "/images/p4.png",
			},
			{
				BaseModel:   models.BaseModel{CreatedBy: "System"},
				Name:        "Horizon V3",
				Category:    "Luxury",
				Description: "Double-story vertical capsule for high-density luxury.",
				PriceINR:    4500000,
				Dimensions:  "600 Sq. Ft.",
				Features:    "Spiral Stairs, Rooftop Deck, Dual AC",
				ImageURL:    "/images/p5.png",
			},
			{
				BaseModel:   models.BaseModel{CreatedBy: "System"},
				Name:        "Glamping G1",
				Category:    "Resort",
				Description: "Designed for premium hospitality and resort experiences.",
				PriceINR:    1800000,
				Dimensions:  "320 Sq. Ft.",
				Features:    "Decking Included, Queen Bed, Mood Lighting",
				ImageURL:    "/images/p6.png",
			},
			{
				BaseModel:   models.BaseModel{CreatedBy: "System"},
				Name:        "Office O2",
				Category:    "Utility",
				Description: "Prefabricated backyard workspace for productivity.",
				PriceINR:    650000,
				Dimensions:  "150 Sq. Ft.",
				Features:    "Acoustic Panels, High-speed LAN, Built-in Desk",
				ImageURL:    "/images/p7.png",
			},
			{
				BaseModel:   models.BaseModel{CreatedBy: "System"},
				Name:        "Vista P4",
				Category:    "Luxury",
				Description: "Pool-side glass-heavy lounge unit with integrated sound.",
				PriceINR:    2100000,
				Dimensions:  "300 Sq. Ft.",
				Features:    "Water-proof flooring, Sonos System, Glass Sliding Doors",
				ImageURL:    "/images/p8.png",
			},
			{
				BaseModel:   models.BaseModel{CreatedBy: "System"},
				Name:        "Stealth Black",
				Category:    "Luxury",
				Description: "Ultra-modern carbon-finish studio with minimalist aesthetics.",
				PriceINR:    3200000,
				Dimensions:  "400 Sq. Ft.",
				Features:    "Carbon Fiber Panel, Hidden Kitchen, Smart Tint",
				ImageURL:    "/images/p9.png",
			},
			{
				BaseModel:   models.BaseModel{CreatedBy: "System"},
				Name:        "Heritage H1",
				Category:    "Resort",
				Description: "Wood-accented modern cabin blending nature with tech.",
				PriceINR:    1950000,
				Dimensions:  "350 Sq. Ft.",
				Features:    "Teak Wood Finish, Modern Insulation, Large Balcony",
				ImageURL:    "/images/p10.png",
			},
		}
		for _, p := range products {
			db.Create(&p)
		}
		log.Println("Seeded database with 10 products.")
	}
}

func seedPortfolio() {
	var count int64
	db.Model(&models.Portfolio{}).Count(&count)
	if count == 0 {
		portfolio := []models.Portfolio{
			{
				BaseModel:   models.BaseModel{CreatedBy: "System"},
				Title:       "Lonavala Eco-Resort",
				Location:    "Lonavala, Maharashtra",
				Description: "Installed 4 Zenith X1 units for a premium eco-tourism project.",
				ImageURL:    "/images/p1.png",
				Units:       4,
			},
			{
				BaseModel:   models.BaseModel{CreatedBy: "System"},
				Title:       "Manali High-Altitude Studio",
				Location:    "Manali, Himachal Pradesh",
				Description: "A custom thermal-insulated Alpha Cabin for a digital nomad workspace.",
				ImageURL:    "/images/p2.png",
				Units:       1,
			},
			{
				BaseModel:   models.BaseModel{CreatedBy: "System"},
				Title:       "Goa Seaside Pods",
				Location:    "Anjuna, Goa",
				Description: "Corrosion-resistant units installed for a luxury beach resort.",
				ImageURL:    "/images/p6.png",
				Units:       2,
			},
			{
				BaseModel:   models.BaseModel{CreatedBy: "System"},
				Title:       "Bangalore Modern Guest House",
				Location:    "Whitefield, Bangalore",
				Description: "A sleek backyard installation serving as a private guest suite.",
				ImageURL:    "/images/p7.png",
				Units:       1,
			},
			{
				BaseModel:   models.BaseModel{CreatedBy: "System"},
				Title:       "Pune Off-Grid Farm",
				Location:    "Mulshi, Pune",
				Description: "A complete solar-powered Eco-Pod installation in a remote farm.",
				ImageURL:    "/images/p3.png",
				Units:       1,
			},
		}
		for _, p := range portfolio {
			db.Create(&p)
		}
		log.Println("Seeded database with 5 portfolio items.")
	}
}

// Helper function to read environment variable or fallback to default
func getEnv(key, fallback string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return fallback
}
