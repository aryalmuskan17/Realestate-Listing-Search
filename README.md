# Real Estate Listing Search

A full-stack real-estate listing search application built with Node.js, Express, PostgreSQL, React, and Vite.

## Overview

This project implements a real-estate listing search system with filtering, pagination, and role-based data visibility.

Users can search listings using multiple filters and view property details. Admin users can access additional internal metadata not visible to normal users.

## Features

- Property listings API
- Search and filters:
  - keyword
  - suburb
  - property type
  - min price
  - max price
  - beds
  - baths
- Property detail page
- Pagination support
- Admin-only metadata visibility
- PostgreSQL relational database
- Indexed queries for performance
- Basic API tests with Jest and Supertest

## Tech Stack

### Backend
- Node.js
- Express
- PostgreSQL
- pg
- Jest
- Supertest

### Frontend
- React
- Vite
- Axios
- React Router

## Project Structure

```

backend/
frontend/
README.md

```

## Running the Application

### Backend

```

cd backend
npm install
npm run dev

```

### Frontend

```

cd frontend
npm install
npm run dev

```

Backend runs on: http://localhost:5001  
Frontend runs on: http://localhost:5173  

## Database Setup

### Create the database:

```

createdb realestate_listing_search
psql realestate_listing_search

```

### Create tables:

```

CREATE TABLE agents (
id SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL,
email VARCHAR(120) UNIQUE NOT NULL,
phone VARCHAR(30),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE properties (
id SERIAL PRIMARY KEY,
title VARCHAR(200) NOT NULL,
description TEXT,
price INTEGER NOT NULL,
beds INTEGER NOT NULL,
baths INTEGER NOT NULL,
suburb VARCHAR(100) NOT NULL,
property_type VARCHAR(50) NOT NULL,
address VARCHAR(200),
internal_status_notes TEXT,
agent_id INTEGER REFERENCES agents(id) ON DELETE SET NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

```

### Create indexes:

```

CREATE INDEX idx_properties_price ON properties(price);
CREATE INDEX idx_properties_suburb ON properties(suburb);
CREATE INDEX idx_properties_property_type ON properties(property_type);
CREATE INDEX idx_properties_beds ON properties(beds);
CREATE INDEX idx_properties_baths ON properties(baths);

```

## Seed Data

### Insert agent:

```

INSERT INTO agents (name, email, phone)
VALUES ('Ramesh Shrestha', 'ramesh@realestate.com.np', '9841000000');

```

### Insert properties:

```

INSERT INTO properties
(title, description, price, beds, baths, suburb, property_type, address, internal_status_notes, agent_id)
VALUES
(
'Modern House in Budhanilkantha',
'Beautiful house with mountain view and parking space.',
25000000,
4,
3,
'Budhanilkantha',
'House',
'Budhanilkantha, Kathmandu',
'Admin: Owner flexible on price',
1
),
(
'Apartment in Boudha',
'Close to Boudhanath Stupa, great for rental investment.',
12000000,
2,
2,
'Boudha',
'Apartment',
'Boudha, Kathmandu',
'Admin: High rental demand area',
1
),
(
'Affordable Flat in Lalitpur',
'Budget-friendly flat in a peaceful residential area.',
8000000,
2,
1,
'Lalitpur',
'Flat',
'Imadol, Lalitpur',
'Admin: Needs minor renovation',
1
);

```

## Example API Calls

```

GET /listings
GET /listings?suburb=Boudha
GET /listings?price_min=10000000&price_max=20000000
GET /listings?keyword=mountain
GET /listings?page=1&limit=2
GET /listings/1
GET /listings/1?is_admin=true

```

## Testing

### Run backend tests:

```

cd backend
npm test

```
```