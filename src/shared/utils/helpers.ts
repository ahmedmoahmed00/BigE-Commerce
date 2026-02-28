export function formatCurrency(value: number, minimumFractionDigits = 1) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits,
  }).format(value);
}

export function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateStr));
}

export function formatNumber(num: number, digits = 3) {
  const formatter = new Intl.NumberFormat("en-US", {
    minimumIntegerDigits: digits,
    useGrouping: false,
  });

  return formatter.format(num);
}

export function calcMinutesLeft(dateStr: string) {
  const d1 = new Date().getTime();
  const d2 = new Date(dateStr).getTime();
  return Math.round((d2 - d1) / 60000);
}

export function formattedDate(dateStr: string) {
  const formattedDate = dateStr ? new Date(dateStr).toLocaleDateString() : "";

  return formattedDate;
}
