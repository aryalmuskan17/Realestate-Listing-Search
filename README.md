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

```text
backend/
frontend/
README.md