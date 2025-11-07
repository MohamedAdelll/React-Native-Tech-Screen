/**
 * Formats a date into a human-readable string.
 * - If the date is today, returns "Today at HH:MM AM/PM"
 * - If the date is yesterday, returns "Yesterday at HH:MM AM/PM"
 * - Otherwise, returns "MM/DD/YY"
 */
export function formatDate(d: Date) {
  if (isToday(d)) {
    return `Today at ${formatTime(d)}`;
  }

  if (isYesterday(d)) {
    return `Yesterday at ${formatTime(d)}`;
  }

  return d.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
}

/**
 * Formats a Date object into a time string "HH:MM AM/PM"
 */
function formatTime(d: Date) {
  return d.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

function isDayOffset(d: Date, offsetDays: number = 0) {
  const now = new Date();
  const targetDate = new Date(now);
  targetDate.setDate(now.getDate() + offsetDays);

  return (
    d.getFullYear() === targetDate.getFullYear() &&
    d.getMonth() === targetDate.getMonth() &&
    d.getDate() === targetDate.getDate()
  );
}
export const isYesterday = (d: Date) => isDayOffset(d, -1);
export const isToday = isDayOffset;
// We wouldn't need this function for the current requirements,
// but it's here for completeness
export const isTomorrow = (d: Date) => isDayOffset(d, 1);
