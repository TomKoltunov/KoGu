const PAGES = {
  HOME: "home",
  ABOUT: "about",
  CHECKOUT: "checkout",
} as const;

type Page = (typeof PAGES)[keyof typeof PAGES];

export const NAVBAR_LINKS: Record<Page, { label: string; path: string }> = {
  home: {
    label: "Home",
    path: "/",
  },
  about: {
    label: "About us",
    path: "/aboutUs",
  },
  checkout: {
    label: "Checkout",
    path: "/checkout",
  },
};
