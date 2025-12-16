# Spotify Tracks Table Management App

A high-performance table management application built with React and TanStack Table, designed to efficiently handle large datasets (30,000+ records).

# Live Demo
See Demo: https://spotify-app-lake.vercel.app/

## Features

- **Efficient Table Rendering:** Handles large datasets smoothly using pagination
- **Sorting:** 
  -- Single-column sorting
  -- Ascending / descending toggle
  -- Visual indicators on column headers
- **Global Search:** 
  -- Searches across multiple columns 
  -- Debounced input (300ms) for better performance 
- **Pagination:** 
  -- Page size options: 10, 25, 50, 100
  -- Previous / Next navigation
  -- Page count and row count display
- **CSV Export:** 
  -- Export filtered & sorted data
  -- Correct handling of commas and special characters
- **Loading & Error States:** 
  -- User-friendly loading indicator
  -- Error handling when dataset fails to load

### Advanced Features (Bonus)
- **Column Management:** 
  -- Toggle column visibility
  -- User preferences persisted using localStorage
- **Bulk Actions:** 
  -- Multi-row selection using checkboxes
  -- Select all rows on current page
  -- Export selected rows to CSV

# Dataset
Dataset: Spotify Tracks Dataset
Size: ~30,000 songs
Source: Kaggle
Fields Included: Track name, artist, album, genre, popularity, tempo, energy, danceability, duration, release date, explicit flag

## Why this dataset?
The Spotify dataset contains a mix of strings, numbers, booleans, and dates, making it ideal for demonstrating sorting, filtering, searching, and performance handling in a real-world scenario.


## Technical Decisions / Libraries

- **TanStack Table v8:** 
  -- Headless and lightweight
  -- Full control over filtering, sorting, pagination, and selection
  -- Excellent performance with large datasets

### State Management
- **React hooks:** useState, useEffect, useMemo
- **CSV Parsing - PapaParse:** 
  -- Explicit delimiter configuration to handle real-world CSV inconsistencies
  -- Type-safe parsing with TypeScript support