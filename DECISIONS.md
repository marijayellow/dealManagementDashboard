# Architecture / Decision Document

## 1. Architecture Choice

The project uses a **component-based Vue 3 architecture** with the `<script setup>` syntax.

- **Folder structure:** Separate directories for pages, components, stores, services, routes, and mocks. All images are stored in the `assets` folder.
- **Componentization:** The Dashboard page is split into smaller, reusable components to reduce complexity and improve maintainability.
- **Language choice:** JavaScript was chosen over TypeScript due to tight time constraints.
- **Data fetching:** Polling (pull) is used instead of WebSockets because no backend support is available.
- **Pagination:** Traditional pagination is implemented instead of infinite scroll for simplicity and time efficiency.
- **Services:** `dealService.js` handles API calls and deduplication logic.
- **State management:** Pinia stores manage global state, including deals data, pagination, and user roles.

**Reasoning:**  
This structure separates UI, state, and service logic clearly, making the codebase easier to maintain, test, and extend. It remains simple yet scalable enough for medium-sized applications.

---

## 2. State Management Choice

**Pinia** was selected for state management due to its simplicity and seamless integration with Vue 3’s Composition API.

- **DealsStore:** Manages deals data, pagination, loading and error states, as well as polling.
- **UserStore:** Handles role-based access and permissions.

**Reasoning:**

- Preserves data across navigation (e.g., returning from a deal page to the dashboard).
- Lightweight and reactive, keeping components clean and focused on UI logic.
- Ideal for this task, where multiple components need to access and share deals data and user role information.
- Easy to maintain and scale for medium-sized applications without overcomplicating the architecture.

---

## 3. Scalability Approach

If the application needs to support more data, users, or complexity:

- **Backend filtering and search:** Move all search, filters, and deduplication to the backend to reduce frontend load.
- **Pagination or infinite scroll with API support:** Fetch only visible chunks of data.
- **WebSocket updates:** Replace polling with WebSockets for real-time updates without unnecessary API calls.
- **Virtualized rendering:** For very large tables, use libraries like `vue-virtual-scroller` to optimize DOM performance.
- **State persistence:** Cache data in IndexedDB or local storage to reduce repeated network requests.

---

## 4. Bottlenecks and Risks

### Bottlenecks / Limitations

- Frontend filtering and search only apply to already loaded deals; cannot filter all dataset.
- Large datasets can cause performance issues due to repeated filter computations.
- Polling every 5 seconds may not scale well for high user count.
- Deduplication happens in memory, which may grow with many records.

### Technical Risks

- Frontend-only role simulation is not secure; real enforcement requires backend.
- Mock API may not fully reflect production edge cases.
- Tailwind + Flex usage simplifies responsive design, but cross-browser testing is needed for full coverage.
- Debounce and filter logic could become a performance bottleneck on very large datasets.

**Mitigation ideas:**

- Move search, filters, and deduplication logic to the backend for more accurate and complete results.
- Replace polling with WebSockets to handle real-time updates efficiently.
- Introduce virtual scrolling or pagination enhancements for handling long lists of data.
- Implement secure backend role checks.
