# Pan-India Scaling Website Implementation Plan

Based on the competitor research and your `FSD.txt`, I will build a premium, highly-converting website designed to scale your manufacturing business across India. The design will focus on a "Basic to Luxury" narrative, utilizing a modern, high-end aesthetic (dark themes, glassmorphism, smooth animations) to wow potential clients.

## User Review Required

> [!IMPORTANT]
> **Design Aesthetic:** I plan to use a sleek, modern "Dark Mode" aesthetic with premium accents (like electric blue or gold) to make the "Space Capsules" look futuristic and luxurious, similar to Zusbo or high-end real estate sites. 
> 
> **Database:** I will create the initial Database Tables (`Products` and `Leads`) in your Go backend.
>
> Please confirm if this design direction and database approach works for you.

## Proposed Changes

We will build the core MVP of the website, focusing on product showcasing and lead generation.

### Design System & Assets

#### [NEW] Assets & Images
- I will generate high-quality placeholder images of "Space Capsules" and "Apple Cabins" using AI image generation to make the website look professional from day one.
- Install `framer-motion` for smooth, luxury animations.
- Install `lucide-react` for modern, clean icons.

### Frontend (Next.js)

#### [MODIFY] frontend/src/app/layout.tsx
- Add a global `Navbar` with links to Products, Portfolio, and Contact.
- Add a global `Footer` with trust signals (ISO Certified, Make in India).

#### [MODIFY] frontend/src/app/page.tsx
- **Hero Section:** High-impact headline with an AI-generated capsule background and a "Request Quote" CTA.
- **Why Choose Us:** Highlight Pan-India delivery, Tata Steel durability, and smart automation.
- **Product Tiers:** Quick links to Basic and Luxury lines.

#### [NEW] frontend/src/app/products/page.tsx
- A grid layout fetching products from the Go backend.
- Displays Sq. Ft / Gaj dimensions, specs, and dynamic pricing.

#### [NEW] frontend/src/components/LeadForm.tsx
- A form component to capture user name, phone, location (Pan-India), and desired capsule type.

### Backend (Go / Postgres)

#### [NEW] backend/models/models.go
- Create `Product` model (Name, Category, Price, Dimensions, Features).
- Create `Lead` model (Name, Phone, Location, InterestedProduct).

#### [MODIFY] backend/main.go
- Set up GORM AutoMigrate for the new models.
- Create `GET /api/products` to serve catalog data to the frontend.
- Create `POST /api/leads` to save inquiries to the database.
- Configure CORS so the frontend can securely call the backend.

## Verification Plan

1. **Backend Testing:** Run the backend and verify the `/api/products` endpoint returns the seeded catalog. Send a test POST request to `/api/leads` and check the Postgres database.
2. **Frontend Testing:** Verify that the homepage animations trigger smoothly.
3. **Integration Testing:** Submit the "Request Quote" form on the frontend and verify it successfully saves to the database.
