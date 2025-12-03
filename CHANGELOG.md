# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.2.0] - 2025-12-03

### Added

- **Google OAuth Login**: Sign in with Google account
  - One-click authentication with Google
- **Mobile Bottom Navigation**: Mobile-optimized navigation bar at the bottom
  - Home, Bookmarks, and Settings icons for quick access
  - Icon-only design for clean mobile UX
- **Manual Address Refresh**: Edit modal now includes a refresh button to update location information
  - Language tracking for geocoded addresses
  - Refresh button appears when language changes
  - Prevents unnecessary API calls with language-based caching

### Changed

- **Mobile UI Improvements**:
  - Header navigation hidden on mobile screens
  - Settings sheet no rounded corners on mobile for drawer-like appearance
- **Typography**: Applied IBM Plex Sans KR font

## [1.1.0] - 2025-11-21

### Added

- **Internationalization (i18n)**: Complete multi-language support
  - English and Korean language support
  - Language selector in Settings
  - Localized date formatting for all components
  - Namespace-based translation organization (common, settings, auth, filter, card)
- **Pre-commit Hooks**: Husky integration with TypeScript type checking
  - Automatic type checking before commits
  - Incremental compilation for faster checks
  - Prevents commits with type errors

### Technical

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
