/**
 * Centralized status class utility
 * Used across DealTable and DealDetails components
 */
export const statusClass = (status) => ({
  Open: "bg-gray-200 text-gray-700",
  Approved: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
}[status]);
