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

- Reusable Vue components (SearchInput, TableFilters, LanguageSwitcher, Header and DealTable)

### Pages

- Dashboard.vue, DealDetail.vue for main views

### Pagination

- Implemented a "Load More" pagination approach.
- A button progressively loads additional data, keeping the UI simple and avoiding performance issues.
- This approach was chosen due to time constraints and its ease of handling API errors and retries.
- Infinite scroll was considered but omitted for simplicity.

### Stores

- Pinia stores handle application state
- Used Pinia for state management to keep data consistent between pages.
- Also for enabling easier caching, polling, reactive updates.

#### useDealsStore

- Manages deals data, pagination, polling, caching

#### useUserStore

- Simulates role-based access (Admin / Partner)

### Services

- dealService.js simulates API fetches, deduplication, and merging

### Routing

- Vue Router handles navigation between dashboard and deal details

### i18n

- vue-i18n handles translations

### Assets

- Flag icons and other static resources

### Data flow

1. Dashboard fetches deals from the service.
2. Data is stored in useDealsStore.
3. Filters and search are applied using computed properties.
4. Role-based access checks are performed via useUserStore.

## 3. Responsive Design Approach

- Tailwind CSS and Flexbox were used to achieve a responsive layout in a simple and efficient way, taking into account the limited time available for completing the task.
- Mobile/desktop adjustments use Tailwind responsive classes (md: prefixes)
- Table headers hidden on mobile, replaced by inline labels per card
- Desktop - Full table view
- Mobile - Table transforms into card-style rows for readability

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

### Top 5 Frontend Security Risks & Mitigations

#### 5.1. Cross-Site Scripting (XSS)

- **Risk:** Malicious scripts could be injected via user input and executed in the browser.
- **Mitigation:**
  - No use of `v-html` or raw HTML rendering
  - All user input is treated as untrusted
  - Vue automatically escapes interpolated values (`{{ }}`)

---

#### 5.2. Dependency Vulnerabilities

- **Risk:** Third-party libraries may contain known security vulnerabilities.
- **Mitigation:**
  - Use of well-known and actively maintained libraries (Vue, Pinia, Axios)
  - Dependencies kept up to date
  - Minimal number of external libraries used

---

#### 5.3. Sensitive Data Exposure

- **Risk:** Sensitive data could be exposed in logs or stored insecurely.
- **Mitigation:**
  - No sensitive data stored in the application
  - No logging of user-related or critical data
  - Mock data used for all API simulations

---

#### 5.4. Improper Error Handling

- **Risk:** Poor error handling can expose internal logic or break the UI.
- **Mitigation:**
  - Errors are caught and displayed in a user-friendly way
  - No stack traces or internal details exposed to the UI
  - Retry mechanism implemented for failed API calls

---

#### 5.5. Token Storage / Authentication Issues

- **Risk:** Insecure storage of authentication tokens (e.g., localStorage) can lead to account compromise.
- **Mitigation:**
  - No authentication system implemented (role-based access is simulated only)
  - Clear documentation that real-world implementation requires secure backend handling (e.g., HTTP-only cookies)

---

### Note

The application demonstrates secure frontend practices, but real security must be enforced on the backend in production systems.

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
