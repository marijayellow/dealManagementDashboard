import dealsData from "../mock/deals.json";

/**
 * Simulate network delay
 */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Deduplicate deals by `id`
 * If duplicates exist, keep the one with the latest `updatedAt`
 */
function dedupeDeals(deals) {
  const map = new Map();

  deals.forEach((deal) => {
    const existing = map.get(deal.id);

    if (!existing) {
      map.set(deal.id, deal);
    } else {
      // Keep the deal with the newer updatedAt timestamp
      const existingDate = new Date(existing.updatedAt);
      const newDate = new Date(deal.updatedAt);

      if (newDate > existingDate) {
        map.set(deal.id, deal);
      }
    }
  });

  return Array.from(map.values());
}

/**
 * Fetch deals with simulated API delay, deduplication and pagination
 */
export async function fetchDeals({ page = 1, limit = 5 }) {
  await delay(500);

  // Uncomment to simulate random API errors
  // if (Math.random() < 0.2) throw new Error("Failed to fetch deals");

  // Simulate API returning duplicates
  const noisyData = [...dealsData, ...dealsData.slice(0, 3)];

  // Deduplicate entire dataset
  const uniqueDeals = dedupeDeals(noisyData);

  // Paginate the clean data
  const start = (page - 1) * limit;
  const paginated = uniqueDeals.slice(start, start + limit);

  return {
    data: paginated,
    total: uniqueDeals.length,
  };
}

/**
 * Merge existing deals with new deals and deduplicate
 * Useful for pagination and data refresh
 */
export function mergeDeals(existingDeals, newDeals) {
  const merged = [...existingDeals, ...newDeals];
  return dedupeDeals(merged);
}
