### 1. Planned vs Actual Time Spent

| Task                  | Planned Time | Actual Time |
| --------------------- | ------------ | ----------- |
| Project setup         | 1h           | 1h          |
| UI Development        | 3h           | 4h          |
| API Integration       | 3h           | 3h          |
| Search and filters    | 2h           | 2h          |
| Deduplication Logic   | 1h           | 1.5h        |
| Responsive Design     | 3h           | 3h          |
| i18n                  | 2h           | 2.5h        |
| Role-based Access     | 1h           | 1h          |
| Documentation         | 2h           | 2h          |
| Test, fixes, refactor | 3h           | 4h          |

Total Planned: 21h
Total Actual: 24h

### 2. Challenges Encountered

- Deduplication + pagination required careful handling to ensure only the latest deal is displayed.
- Partner role view vs Admin role required testing to avoid showing hidden deals or missing load more.
- Role-based logic only simulated on frontend; real security requires backend enforcement.
- Responsive table → card view for mobile required extra styling work.
- Proper testing of UI states (loading, no results, retry) was challenging to ensure consistent and correct behavior.
- Finding the right Tailwind CSS classes for responsive layout and clean UI required experimentation and fine-tuning.

### 3. Design Decisions Made

- Used Pinia for state management to enable easier caching, polling, reactive updates, and to keep data consistent between pages.
- Deduplication logic applied after every fetch and merge to satisfy requirement for latest updated record.
- Search implemented with 300ms debounce to reduce unnecessary filtering computations.
- Filters kept generic and reusable; amount filter uses numeric comparison.
- Role-based access is simulated via useUserStore; Admin sees all, Partner sees assigned deals only.
- Table → card transformation on mobile for better usability using Tailwind.

### 4. Improvements with One More Day of Work

- Improve accessibility and keyboard navigation for table/cards.
- Add unit tests for stores, deduplication, and filter logic.
- Infinite scroll better UX experience than pagination

### 5. Known Limitations / Technical Debt

- Search and filters operate only on already loaded data on the frontend and do not cover the full dataset; this should be handled on the backend in a real-world scenario.
- WebSocket-based real-time updates would be a better solution than polling, but require backend support; current implementation uses polling as a simpler simulation.
- Role-based access is frontend-only; insecure in a real environment.
- Mock API used; some behaviors (errors, duplicates) are simulated.
