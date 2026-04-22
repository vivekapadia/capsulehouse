# Enterprise Scaling Implementation Plan

This plan outlines the steps to transform the current prototype into a professional-grade global platform, including a significant expansion of your product catalog and portfolio.

## Phase 1: Content & Data Expansion (Immediate)

### 1. Product Catalog (10 Models)
We will expand the seeder in `backend/main.go` to include a diverse range of models:
1.  **Zenith X1:** Luxury panoramic space capsule (Flagship).
2.  **Alpha Cabin:** Essential utility living (Tata Steel built).
3.  **Eco-Pod S1:** Solar-integrated off-grid unit.
4.  **Nomad M2:** Mobile trailer-based capsule.
5.  **Horizon V3:** Vertical double-story capsule.
6.  **Glamping G1:** Luxury resort-focused model.
7.  **Office O2:** Prefabricated backyard workspace.
8.  **Vista P4:** Pool-side glass-heavy lounge unit.
9.  **Stealth Black:** Ultra-modern carbon-finish studio.
10. **Heritage H1:** Wood-accented modern cabin.

### 2. Portfolio Showcase (5 Case Studies)
We will create a structured `Portfolio` model in the backend and frontend:
1.  **Lonavala Retreat:** 4 Units installed for an Eco-Resort.
2.  **Manali Studio:** High-altitude thermal-insulated workspace.
3.  **Goa Beach Pod:** Corrosion-resistant aluminum seaside unit.
4.  **Bangalore Backyard:** A modern guest house installation.
5.  **Pune Farmhouse:** A complete off-grid solar capsule setup.

---

## Phase 2: Technical Hardening & Security

#### [MODIFY] backend/main.go
- **Secret Management:** Switch from hardcoded credentials to Environment Variables via `os.Getenv`.
- **Validation:** Implement server-side validation to prevent bad data from entering the database.

#### [NEW] frontend/src/app/admin/page.tsx
- **Admin Dashboard:** A password-protected page to view and manage leads.

---

## Phase 3: Immersive Showroom (UX)

#### [MODIFY] frontend/src/app/products/page.tsx
- **SSR Implementation:** Change product fetching to Server-Side Rendering for maximum SEO benefit.
- **Filtering:** Add category filters (Luxury, Utility, Office, Off-Grid).

#### [MODIFY] frontend/src/components/Capsule3D.tsx
- **Detail Enhancement:** Add textures and lighting presets to the 3D viewer to move closer to a "Global Standard."

---

## Verification Plan

### Content Verification
- Verify the `/products` page renders all 10 items correctly.
- Verify the `/portfolio` page displays the 5 case studies with high-quality descriptions.

### Technical Verification
- **Security Check:** Attempt to access the `/api/leads` endpoint without proper data and verify the backend rejects it.
- **Persistence Check:** Stop and start the Docker stack and ensure all 10 products and any submitted leads remain intact.
