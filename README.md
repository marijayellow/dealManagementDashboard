# Deal Dashboard Application

## 1. Setup Instructions

### Prerequisites

- Node.js >= 18
- npm or yarn

### Install dependencies

```bash
npm install
# or
yarn install
Run the development server
npm run dev
# or
yarn dev

Open the browser at http://localhost:5173 (or the port indicated in console).

```

## 2. Architecture Explanation

The application is structured with the following layers:

### Components

Reusable Vue components (SearchInput, TableFilters, LanguageSwitcher, etc.)

### Pages

Dashboard.vue, DealDetail.vue for main views

### Stores

Pinia stores handle application state

#### useDealsStore

Manages deals data, pagination, polling, caching

#### useUserStore

Simulates role-based access (Admin / Partner)

### Services

dealService.js simulates API fetches, deduplication, and merging

### Routing

Vue Router handles navigation between dashboard and deal details

### i18n

vue-i18n handles translations

### Assets

Flag icons and other static resources

### Data flow

1. Dashboard fetches deals from the service.
2. Data is stored in useDealsStore.
3. Filters and search are applied using computed properties.
4. Role-based access checks are performed via useUserStore.

## 3. Responsive Design Approach

- Flexbox + Tailwind used to center filters and search
- Mobile/desktop adjustments use Tailwind responsive classes (md: prefixes)
- Table headers hidden on mobile, replaced by inline labels per card

### Desktop

Full table view

### Mobile

Table transforms into card-style rows for readability

## 4. Internationalization (i18n) Strategy

- vue-i18n used for translations
- Supported languages: English (en), Japanese (ja), German (de), Spanish (es)
- LanguageSwitcher component allows switching languages
- Selected language stored in sessionStorage for persistence
- All user-facing strings go through $t("...")

## 5. Security Considerations

Role-based access: Admin sees all deals, Partner sees assigned deals only

- Simulated on frontend via useUserStore
- Backend enforcement would be required in a real application

Safe data handling:

- No raw HTML rendering from user input
- All filters and search treat inputs as untrusted

Error handling:

- API errors and timeouts are simulated
- UI shows error messages and retry options

Deduplication:

- Ensures duplicate deals never appear in UI
- Keeps the most recently updated record

## 6. Features

- Dashboard with search and filters
- Role-based deal visibility
- Pagination with load more
- Debounced search for performance
- Deduplication logic to prevent duplicates
- Polling for real-time data simulation
- Fully responsive design
- Multi-language support
- Error handling and retry options
