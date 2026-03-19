import dealsData from "../mock/deals.json";

// simulate delay-a
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// DEDUP LOGIC
function dedupeDeals(deals) {
  const map = new Map();

  deals.forEach((deal) => {
    const existing = map.get(deal.id);

    if (!existing) {
      map.set(deal.id, deal);
    } else {
      // keep the newer (updatedAt)
      const existingDate = new Date(existing.updatedAt);
      const newDate = new Date(deal.updatedAt);

      if (newDate > existingDate) {
        map.set(deal.id, deal);
      }
    }
  });

  return Array.from(map.values());
}

export async function fetchDeals({ page = 1, limit = 5 }) {
  await delay(500);

  // Simulate error
  // if (Math.random() < 0.2) {
  //   throw new Error("Failed to fetch deals");
  // }

  // Simulate noisy API (duplikati)
  const noisyData = [...dealsData, ...dealsData.slice(0, 3)];

  // dedupe complete dataset (as backend truth)
  const uniqueDeals = dedupeDeals(noisyData);

  // pagination with CLEAN data
  const start = (page - 1) * limit;
  const paginated = uniqueDeals.slice(start, start + limit);

  return {
    data: paginated,
    total: uniqueDeals.length,
  };
}

// MERGE + DEDUP (for pagination)
export function mergeDeals(existingDeals, newDeals) {
  const merged = [...existingDeals, ...newDeals];

  return dedupeDeals(merged);
}
