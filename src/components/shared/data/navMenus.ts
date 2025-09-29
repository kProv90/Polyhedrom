import { useRouter } from "vue-router";
import type { NavMenuItem } from "./models";

const router = useRouter();

const guestMenu: Array<NavMenuItem> = [
  {
    title: "Selling Point",
    icon: "mdi-view-dashboard",
    action: () => router.push("/"),
  },
  {
    title: "Selling Point",
    icon: "mdi-view-dashboard",
    action: () => router.push("/"),
  },
  {
    title: "Selling Point",
    icon: "mdi-view-dashboard",
    action: () => router.push("/"),
  },
  {
    title: "Selling Point",
    icon: "mdi-view-dashboard",
    action: () => router.push("/"),
  },
  {
    title: "Selling Point",
    icon: "mdi-view-dashboard",
    action: () => router.push("/"),
  },
  {
    title: "Selling Point",
    icon: "mdi-view-dashboard",
    action: () => router.push("/"),
  },
  {
    title: "Selling Point",
    icon: "mdi-view-dashboard",
    action: () => router.push("/"),
  },
  {
    title: "Selling Point",
    icon: "mdi-view-dashboard",
    action: () => router.push("/"),
  },
];

const userMenu: Array<NavMenuItem> = [];
const dmMenu: Array<NavMenuItem> = [];
const playerMenu: Array<NavMenuItem> = [];
const adminMenu: Array<NavMenuItem> = [];

export { guestMenu, userMenu, dmMenu, playerMenu, adminMenu };
