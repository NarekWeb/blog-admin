import { defineStore } from "pinia";

export const useSideMenuStore = defineStore("sideMenu", {
  state: () => ({
    menu: [
      {
        icon: "HomeIcon",
        pageName: "dashboard",
        title: "Dashboard",
      },

      "devider",
    ],
  }),
});
