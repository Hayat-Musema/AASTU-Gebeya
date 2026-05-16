# AASTU Gebeya — Backend API

Node.js / Express / MongoDB REST API for the AASTU Gebeya student marketplace.

---

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Copy the example env file and fill in your values
cp .env.example .env

# 3. Start MongoDB locally (or use MongoDB Atlas and update MONGO_URI)

# 4. Run in development (auto-restarts on file changes)
npm run dev

# 5. Run in production
npm start
```

The server starts on **http://localhost:5000** by default.

---

## Environment Variables (`.env`)

| Variable         | Description                              | Default                        |
|------------------|------------------------------------------|--------------------------------|
| `MONGO_URI`      | MongoDB connection string                | `mongodb://localhost:27017/aastu_gebeya` |
| `JWT_SECRET`     | Secret key for signing JWTs             | *(must be set)*                |
| `JWT_EXPIRES_IN` | JWT expiry duration                      | `7d`                           |
| `PORT`           | Server port                              | `5000`                         |
| `CLIENT_ORIGIN`  | Frontend URL for CORS                    | `http://localhost:5173`        |
| `NODE_ENV`       | `development` or `production`            | `development`                  |

---

## API Reference

All endpoints are prefixed with `/api`.  
Protected routes require: `Authorization: Bearer <token>`

---

### Auth — `/api/auth`

| Method | Endpoint         | Auth | Description                        |
|--------|------------------|------|------------------------------------|
| POST   | `/register`      | No   | Create a new buyer or seller account |
| POST   | `/login`         | No   | Sign in and receive a JWT          |
| GET    | `/me`            | Yes  | Get the current user's profile     |
| POST   | `/logout`        | Yes  | Invalidate session (client-side)   |

**POST `/api/auth/register`**
```json
{
  "fullName": "Hayat Musema",
  "email": "hayat@aastustudent.edu.et",
  "password": "secret123",
  "role": "seller",
  "department": "Software Engineering",
  "phone": "0911234567",
  "campusBlock": "Block 43"
}
```
Response `201`:
```json
{
  "success": true,
  "token": "<jwt>",
  "user": { "id", "fullName", "email", "role", "avatarInitials", ... }
}
```

**POST `/api/auth/login`**
```json
{ "email": "hayat@aastustudent.edu.et", "password": "secret123" }
```
Response `200`: same shape as register.

---

### Users — `/api/users`

| Method | Endpoint              | Auth         | Description                        |
|--------|-----------------------|--------------|------------------------------------|
| GET    | `/profile`            | Yes          | Get own profile + listings + orders |
| PUT    | `/profile`            | Yes          | Update own profile fields          |
| PUT    | `/change-password`    | Yes          | Change password                    |
| GET    | `/:id/public`         | No           | Get a seller's public profile      |

**PUT `/api/users/profile`** — any subset of:
```json
{
  "fullName": "Hayat M.",
  "phone": "0922345678",
  "department": "Software Engineering",
  "campusBlock": "Block 12",
  "yearOfStudy": 3
}
```

---

### Products — `/api/products`

| Method | Endpoint         | Auth          | Description                              |
|--------|------------------|---------------|------------------------------------------|
| GET    | `/`              | No            | List products (paginated, filterable)    |
| GET    | `/featured`      | No            | 8 most-viewed products (home page)       |
| GET    | `/recent`        | No            | 8 most recently listed (home page)       |
| GET    | `/:id`           | No            | Single product detail + view increment   |
| POST   | `/`              | Yes (seller)  | Create a new listing (multipart/form)    |
| PUT    | `/:id`           | Yes (seller)  | Update own listing                       |
| DELETE | `/:id`           | Yes (seller)  | Soft-delete own listing                  |

**GET `/api/products` query params:**
- `page` (default 1), `limit` (default 12, max 50)
- `category` — `Dorm Gear | Books | Electronics | Stationary | Cloths | Accessories`
- `condition` — `New | Used | Like New | Good | Refurbished`
- `search` — full-text search on name/description
- `sort` — `recent | price-low | price-high | popular`

**POST `/api/products`** — `multipart/form-data`:
```
name, description, price, category, condition, campusBlock
images (up to 3 files, max 5MB each, JPEG/PNG/WebP)
```

---

### Orders — `/api/orders`

| Method | Endpoint            | Auth          | Description                              |
|--------|---------------------|---------------|------------------------------------------|
| POST   | `/`                 | Yes           | Place a new order                        |
| GET    | `/my`               | Yes           | Get own orders as buyer                  |
| GET    | `/seller`           | Yes (seller)  | Get orders containing seller's products  |
| GET    | `/:id`              | Yes           | Get single order (buyer or seller)       |
| PATCH  | `/:id/status`       | Yes (seller)  | Update order status                      |
| PATCH  | `/:id/payment`      | Yes           | Confirm/fail mobile payment              |

**POST `/api/orders`**
```json
{
  "items": [
    { "productId": "<id>", "qty": 1 },
    { "productId": "<id>", "qty": 1 }
  ],
  "deliveryAddress": {
    "fullName": "Hayat Musema",
    "phone": "0911234567",
    "campusLocation": "Block 54, Room 202",
    "additionalNotes": "Call before coming"
  },
  "paymentMethod": "cash"
}
```
`paymentMethod`: `cash | telebirr | cbe_birr`

**PATCH `/api/orders/:id/status`**
```json
{ "orderStatus": "confirmed" }
```
`orderStatus`: `confirmed | in_progress | completed | cancelled`

**PATCH `/api/orders/:id/payment`**
```json
{ "paymentStatus": "confirmed" }
```

---

## Project Structure

```
Backend/
├── server.js              # Entry point — Express app setup
├── .env                   # Environment variables (not committed)
├── .env.example           # Template for .env
├── config/
│   └── db.js              # MongoDB connection
├── middleware/
│   ├── auth.js            # JWT protect + requireRole
│   └── errorHandler.js    # Central error handler
├── models/
│   ├── User.js            # User schema (buyer/seller)
│   ├── Product.js         # Product listing schema
│   └── Order.js           # Order schema
├── routes/
│   ├── auth.js            # /api/auth
│   ├── users.js           # /api/users
│   ├── products.js        # /api/products
│   └── orders.js          # /api/orders
└── uploads/               # Uploaded product images (served as static)
```

---

## Frontend Integration Notes

Store the JWT in `localStorage` or a React context after login/register:
```js
localStorage.setItem('token', data.token)
```

Attach it to every protected request:
```js
fetch('/api/users/profile', {
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
})
```

The frontend Vite dev server runs on `http://localhost:5173` and the backend on `http://localhost:5000`. CORS is pre-configured for this.
