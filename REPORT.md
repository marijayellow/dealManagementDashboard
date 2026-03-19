### 1. Planned vs Actual Time Spent

| Task                  | Planned Time | Actual Time |
| --------------------- | ------------ | ----------- |
| Project setup         | 1h           | 1h          |
| UI Development        | 4h           | 5h          |
| API Integration       | 4h           | 4h          |
| Search Implementation | 1h           | 1.5h        |
| Filters               | 1h           | 1h          |
| Deduplication Logic   | 1h           | 1.5h        |
| Responsive Design     | 3h           | 3h          |
| i18n                  | 2h           | 2h          |
| Role-based Access     | 1h           | 1h          |
| Documentation         | 2h           | 2h          |

Total Planned: 20h
Total Actual: 22h

### 2. Challenges Encountered

- Deduplication + pagination required careful handling to ensure only the latest deal is displayed.
- Partner role view vs Admin role required testing to avoid showing hidden deals or missing load more.
- Role-based logic only simulated on frontend; real security requires backend enforcement.
- Responsive table → card view for mobile required extra styling work.

### 3. Design Decisions Made

- Used Pinia for state management to enable easier caching, polling, reactive updates, and to keep data consistent between pages.
- Deduplication logic applied after every fetch and merge to satisfy requirement for latest updated record.
- Search implemented with 300ms debounce to reduce unnecessary filtering computations.
- Filters kept generic and reusable; amount filter uses numeric comparison.
- Role-based access is simulated via useUserStore; Admin sees all, Partner sees assigned deals only.
- Table → card transformation on mobile for better usability.

### 4. Improvements with One More Day of Work

- Implement frontend + backend secure role enforcement.
- Enhance caching strategy to reduce redundant fetches further.
- Add unit tests for stores, deduplication, and filter logic.
- Improve accessibility and keyboard navigation for table/cards.

### 5. Known Limitations / Technical Debt

- Role-based access is frontend-only; insecure in a real environment.
- Polling interval fixed at 5 seconds; no dynamic adjustment.
- Debounce and filter performance not optimized for very large datasets.
- Mock API used; some behaviors (errors, duplicates) are simulated.
