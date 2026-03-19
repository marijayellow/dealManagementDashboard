# ESTIMATION PLAN

## 1. Work Breakdown Structure (WBS)

The project is divided into the following main tasks:

- UI Development (components, pages, code organization, stores, services)
- API Integration (mock service, pagination, error handling, caching strategy, polling)
- Search Implementation (with debounce)
- Filters (status, amount range)
- Deduplication Logic
- Responsive Design (table → card view)
- Internationalization (i18n)
- Security Review (safe input handling, role simulation)
- Test and fix potential issues, code refactoring
- Documentation

---

## 2. Estimation Method

Estimation is based on:

- Previous experience with Vue.js and similar projects
- Complexity of each feature
- Dependencies between tasks
- Time required for testing and debugging

Approach used:

- **Bottom-up estimation (WBS-based)**
- Each feature estimated individually and then summed

---

## 3. Estimate Table

| Task                  | Estimated Time | Confidence | Dependencies |
| --------------------- | -------------- | ---------- | ------------ |
| Project setup         | 1h             | High       | None         |
| UI Development        | 3h             | High       | None         |
| API Integration       | 3h             | Medium     | Mock data    |
| Search and Filters    | 2h             | High       | UI           |
| Deduplication logic   | 1h             | Medium     | API          |
| Responsive design     | 3h             | Medium     | UI           |
| i18n                  | 2h             | Medium     | UI           |
| Role-based access     | 1h             | Medium     | Store        |
| Documentation         | 2h             | High       | All features |
| Test, fixes, refactor | 3h             | Medium     | All features |

### Total Estimated Time: ~21 hours

---

## 4. Assumptions

- API contract is stable
- No authentication required (role simulation only)
- Mock data is sufficient for testing
- UI design is flexible
- No backend implementation required
- No strict performance constraints

---

## 5. Risks & Mitigation

### Risk 1: Duplicate data handling

- **Issue:** Incorrect deduplication could show outdated data
- **Mitigation:** Use `updatedAt` to always keep the latest record

### Risk 2: i18n inconsistencies

- **Issue:** Missing translations
- **Mitigation:** Centralize all strings and test all languages

### Risk 3: Frontend-only security

- **Issue:** Role-based logic not truly secure
- **Mitigation:** Clearly document that backend enforcement is required

### Risk 4: Pagination + Role Filtering mismatch

- **Issue:** Partner may not see all data immediately
- **Mitigation:** Document limitation and explain backend solution

### Risk 5: Lack of TypeScript usage

- **Issue:** Without TypeScript, there is a higher risk of runtime errors, invalid data types, and harder maintainability
- **Mitigation:** Introduce TypeScript for stricter type safety, especially for API data, props, and store logic

### Risk 6: Tailwind CSS browser compatibility

- **Issue:** Tailwind relies on modern CSS features (e.g. flexbox, grid, gap) which may not be fully supported in older browsers
- **Mitigation:** Use PostCSS with Autoprefixer (already included) and test in target browsers; define supported browser list if needed

---

## 6. Notes

- The solution prioritizes simplicity and clarity over over-engineering
- Focus is on clean architecture, maintainability, and realistic simulation
