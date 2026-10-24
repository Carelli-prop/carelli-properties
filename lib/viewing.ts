export const slotMinutes = 30;
export const minDaysAhead = 1;
export const maxDaysAhead = 60;

type DayWindow = { start: string; end: string };

// PLACEHOLDER windows until Matt confirms the real ones.
// 0 = Sunday through 6 = Saturday.
export const weeklyWindows: Record<number, DayWindow[]> = {
  0: [],
  1: [{ start: "10:00", end: "16:00" }],
  2: [{ start: "10:00", end: "16:00" }],
  3: [{ start: "10:00", end: "16:00" }],
  4: [{ start: "10:00", end: "16:00" }],
  5: [{ start: "10:00", end: "16:00" }],
  6: [],
};

export function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function fromISODate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function humanDate(iso: string): string {
  return fromISODate(iso).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export type BookableDate = { iso: string; label: string };

export function bookableDates(): BookableDate[] {
  const out: BookableDate[] = [];
  const today = new Date();
  for (let i = minDaysAhead; i <= maxDaysAhead; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const iso = toISODate(d);
    if ((weeklyWindows[d.getDay()] ?? []).length > 0) {
      out.push({ iso, label: humanDate(iso) });
    }
  }
  return out;
}

function minutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function hhmm(total: number): string {
  const h = Math.floor(total / 60);
  const m = total % 60;
  return `${`${h}`.padStart(2, "0")}:${`${m}`.padStart(2, "0")}`;
}

export function slotsForDate(iso: string): string[] {
  const windows = weeklyWindows[fromISODate(iso).getDay()] ?? [];
  const out: string[] = [];
  for (const w of windows) {
    const start = minutes(w.start);
    const end = minutes(w.end);
    for (let t = start; t + slotMinutes <= end; t += slotMinutes) {
      out.push(hhmm(t));
    }
  }
  return out;
}

export function isBookableDate(iso: string): boolean {
  return bookableDates().some((d) => d.iso === iso);
}

export function isValidSlot(iso: string, time: string): boolean {
  return slotsForDate(iso).includes(time);
}

export function nextAvailableSlot(
  takenByDate: Record<string, string[]>,
  fromIso: string
): { iso: string; time: string; label: string } | null {
  const dates = bookableDates().filter((d) => d.iso >= fromIso);
  for (const d of dates) {
    const taken = new Set(takenByDate[d.iso] ?? []);
    const free = slotsForDate(d.iso).find((t) => !taken.has(t));
    if (free) return { iso: d.iso, time: free, label: humanDate(d.iso) };
  }
  return null;
}
