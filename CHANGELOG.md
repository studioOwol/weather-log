# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.0] - 2025-11-21

### Added

- **Internationalization (i18n)**: Complete multi-language support
  - English and Korean language support
  - Language selector in Settings
  - Dynamic location translation based on selected language
  - Localized date formatting for all components
  - Namespace-based translation organization (common, settings, auth, filter, card)
- **Pre-commit Hooks**: Husky integration with TypeScript type checking
  - Automatic type checking before commits
  - Incremental compilation for faster checks
  - Prevents commits with type errors

### Changed

- **WeatherCard UI**: Moved Edit button to Note section for better UX
- **Loading States**: Replaced text loading with animated spinner component
- **Location Display**: Now uses real-time geocoding with language-aware caching
  - Locations update automatically when language changes
  - Efficient caching reduces API calls

### Technical

- Implemented language change detection to invalidate geocode cache
- Updated all modals (Add, Edit, Delete) with i18n support

## [1.0.0] - 2025-11-20

Initial Release

### Features

- **Weather Cards**: Create, read, update, and delete weather records with notes
- **Bookmarks**: Save and manage favorite weather records
- **Filtering & Search**:
  - Filter by date, location, and memo content
  - Server-side filtering with URL parameters
  - Real-time search functionality
- **Infinite Scrolling**: Smooth pagination for large datasets
- **Dark Mode**: System-aware dark theme support
- **Authentication**: User signup/login with Supabase
- **Responsive Design**: Mobile-first design with tablet and desktop layouts
- **Optimistic Updates**: Instant UI feedback for better UX
- **Location Search**: Nominatim API integration for location autocomplete
- **Masonry Layout**: Dynamic grid layout for weather cards
- **Custom Loading States**: Smooth loading animations

### Technical

- React 19 + TypeScript
- React Query for state management
- Supabase for backend
- Tailwind CSS v4 for styling
- Vite for build tooling
