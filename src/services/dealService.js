import dealsData from "../mock/deals.json";

/**
 * Simulate network delay
 */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Deduplicate deals by id
 */
function dedupeDeals(deals) {
  const map = new Map();

  deals.forEach((deal) => {
    const existing = map.get(deal.id);

    if (!existing) {
      map.set(deal.id, deal);
    } else {
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
 * FETCH DEALS
 * Simulates backend filtering + authorization
 */
export async function fetchDeals({
  user,
  search = "",
  statuses = [],
  minAmount = null,
  maxAmount = null,
}) {
  await delay(500);

  // Simulate duplicated backend data
  const noisyData = [...dealsData, ...dealsData.slice(0, 3)];

  // Deduplicate
  let filtered = dedupeDeals(noisyData);

  // ROLE AUTHORIZATION
  if (user.role !== "Admin") {
    filtered = filtered.filter((deal) =>
      user.assignedDealIds.includes(deal.id),
    );
  }

  // SEARCH
  const term = search.toLowerCase().trim();

  if (term) {
    filtered = filtered.filter(
      (deal) =>
        deal.name.toLowerCase().includes(term) ||
        deal.account.toLowerCase().includes(term) ||
        deal.status.toLowerCase().includes(term),
    );
  }

  // STATUS FILTER
  if (statuses.length) {
    filtered = filtered.filter((deal) =>
      statuses.includes(deal.status),
    );
  }

  // MIN AMOUNT
  if (minAmount !== null) {
    filtered = filtered.filter(
      (deal) => deal.amount >= minAmount,
    );
  }

  // MAX AMOUNT
  if (maxAmount !== null) {
    filtered = filtered.filter(
      (deal) => deal.amount <= maxAmount,
    );
  }

  return {
    data: filtered,
    total: filtered.length,
  };
}

/**
 * GET SINGLE DEAL
 */
export async function getDealById(id) {
  await delay(300);

  const deal = dealsData.find(
    (d) => String(d.id) === String(id),
  );

  if (!deal) {
    throw new Error(`Deal with ID ${id} not found`);
  }

  return deal;
}