# Architecture / Decision Document (Phase 2)

As agreed, I implemented the requested features and below is a short overview of the approach I chose, along with the reasoning behind the technical decisions made within a limited timeframe.

---

# 1. Backend Simulation and Pagination Improvements

A backend simulation layer was implemented inside the `dealService`.

I considered creating a real backend using Node.js + Express with a database, but due to the time constraints, I decided to implement a lightweight backend simulation approach that still demonstrates a realistic frontend/backend data flow.

```text
components
   ↓
Pinia store
   ↓
dealService.js  ← simulated backend layer
   ↓
mock deals.json ← simulated database
```

## Current Data Flow

### Frontend Layer

The frontend no longer performs filtering and pagination directly on already loaded data inside the component.

Instead:

- the dashboard sends parameters such as:
  - `page`
  - `limit`
  - `search`
  - `filters`
  - `current role`
- the store forwards those parameters to the service layer
- the service simulates backend processing and returns the result

---

### Simulated Backend Layer (`dealService`)

The `dealService` now simulates:

- backend filtering
- backend search
- backend pagination
- role-based access control
- network delay
- data deduplication

The flow works as follows:

1. the frontend sends query parameters
2. the service reads the entire dataset (`deals.json`)
3. role-based authorization is simulated
4. search and filters are applied to the complete dataset
5. pagination is executed
6. only the requested page of data is returned

This makes the frontend behave as if it were communicating with a real backend API.

---

## Number-Based Pagination

The previous `Load More` approach was removed and replaced with proper clickable page-number pagination.

This allows:

- direct navigation to any page
- a more realistic user experience
- behavior closer to production applications

Pagination is connected to the simulated backend layer, meaning every page change triggers a new simulated API request.

---

## Search and Filters Now Work Across the Entire Dataset

Previously:

- search
- status filters
- amount filters

worked only on already loaded deals.

Now:

- search and filtering operate on the complete dataset (`deals.json`)
- filtering happens before pagination
- the backend simulation returns only the relevant page

This approach much more closely reflects real backend-driven applications.

---

# 2. Login Simulation and Role-Based Access

A `User Switcher` was added to the header in order to simulate user login with different roles.

## Supported Roles

- Admin
- Partner 1
- Partner 2

---

## How It Works

When a role is selected:

1. a user login is simulated
2. the frontend sends the selected role to the backend layer
3. the backend returns only deals accessible to that role
4. pagination resets to the first page
5. a new request is triggered

This simulates a realistic authorization flow.

---

## Role-Based Access Control

The following features were added:

- deal filtering by role
- protected Deal Details page access
- role tags
- visibility indicators showing which roles can access each deal

Additionally, an issue was fixed where the `No Access` state remained visible after switching roles and refreshing the page.

---

# 3. UI/UX Improvements and Minor Fixes

Several smaller improvements were also implemented, including:

- search and filter styling improvements
- modernized checkbox filters
- i18n translations added
- access information section
- minor refactors and code cleanup

---

# Conclusion

Given the time constraints, my focus was to implement an architecture that:

- feels realistic
- simulates production-like data flow
- demonstrates the kind of engineering decisions and reasoning that would also be applied in a real frontend/backend integration

If needed, more advanced functionality can be added later, such as:

- a real backend (Express/Node.js)
- database integration
- authentication
- fully implemented API endpoints

```

```
