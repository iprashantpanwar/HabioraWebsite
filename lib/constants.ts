// Facts on this page come from the app itself (shared/src/commonMain). When the app
// changes a threshold or a limit, change it here too — nothing below is marketing guesswork.

export const SITE = {
  name: "Habiora",
  tagline: "Every habit you keep becomes a tree.",
  description:
    "A mindful habit tracker where every small step becomes a tree. Plant a habit, show up for it, and watch your own little forest grow.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
};

/** Store listings. Null until they are live — the site never links to a listing that doesn't exist. */
export const STORE_LINKS = {
  appStore: process.env.NEXT_PUBLIC_APP_STORE_URL || null,
  googlePlay: process.env.NEXT_PUBLIC_GOOGLE_PLAY_URL || null,
};

export const HAS_STORE_LINKS = Boolean(STORE_LINKS.appStore || STORE_LINKS.googlePlay);

export const WAITLIST_ENDPOINT = process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT || null;

/** Where every "get the app" button points: the stores once live, the early-access form until then. */
export const PRIMARY_CTA_HREF = HAS_STORE_LINKS ? "#get-the-app" : "#early-access";

export const NAV_LINKS = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Your Habitat", href: "#habitat" },
  { label: "FAQ", href: "#faq" },
] as const;

export type Species = "pine" | "blossom" | "amber";

/** HabitStage.kt — a tree's stage is set by the total days its habit was kept, not by a streak. */
export const STAGES = [
  { label: "Seed", days: 0, line: "A habit, planted." },
  { label: "Sprout", days: 1, line: "Your tree has sprouted." },
  { label: "Sapling", days: 7, line: "A full week of showing up." },
  { label: "Young tree", days: 30, line: "Branches are growing." },
  { label: "Mature tree", days: 100, line: "Flowers bloom." },
  { label: "Flourishing", days: 365, line: "A year together." },
] as const;

export type StageIndex = 0 | 1 | 2 | 3 | 4 | 5;

export function stageForDays(days: number): StageIndex {
  let stage = 0;
  STAGES.forEach((s, i) => {
    if (days >= s.days) stage = i;
  });
  return stage as StageIndex;
}

/** HabitMilestones.FREE_ACTIVE_HABIT_LIMIT */
export const FREE_TREE_LIMIT = 3;

/** Islands.CAPACITY */
export const ISLAND_CAPACITY = 6;

export const FAQS = [
  {
    q: "Is Habiora free?",
    a: `Yes. A free forest grows up to ${FREE_TREE_LIMIT} trees at once, with streaks, milestones, charts and every tree species included. Premium lets you grow as many trees as you plant.`,
  },
  {
    q: "What happens if I miss a day?",
    a: "Your tree keeps every day you've already given it. A tree grows by the total number of days you've kept its habit, so a missed day pauses growth — it never takes growth away.",
  },
  {
    q: "Do I have to do a habit every single day?",
    a: "No. Set the rhythm that fits: daily, a few times a week, or a number of times a month. A five-a-week habit simply has two spare days, whichever two they turn out to be.",
  },
  {
    q: "Can I track a habit I want to quit?",
    a: "Yes. Every habit is either something to build or something to let go of. For a quit habit, you mark each day you stayed clean, and its tree grows the same way.",
  },
  {
    q: "How does a tree grow?",
    a: "Every tree moves through six stages — seed, sprout, sapling, young tree, mature tree and flourishing — at 1, 7, 30, 100 and 365 days kept. Each new stage is celebrated when you reach it.",
  },
  {
    q: "Can I take a break from a habit?",
    a: "You can let a tree rest. It steps out of your forest without losing its growth, and you can bring it back whenever you're ready.",
  },
] as const;
