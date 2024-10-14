<template>
  <div>
    <MobileMenu />
    <TopBar />
    <div class="flex overflow-hidden">
      <!-- BEGIN: Side Menu -->
      <nav class="side-nav">
        <ul>
          <!-- BEGIN: First Child -->
          <template v-for="(menu, menuKey) in formattedMenu">
            <li
              v-if="menu == 'devider'"
              :key="menu + menuKey"
              class="side-nav__devider my-6"
            ></li>
            <li v-else :key="menu + menuKey">
              <SideMenuTooltip
                tag="a"
                :content="menu.title"
                :href="
                  menu.subMenu
                    ? 'javascript:;'
                    : menu.pageName === 'dashboard' ? '/' : router.resolve({ name: menu.pageName }).path
                "
                class="side-menu"
                :class="{
                  'side-menu--active': menu.active || (menu.pageName === 'dashboard' && route.path === '/'),
                  'side-menu--open': menu.activeDropdown,
                }"
                @click="linkTo(menu, router, $event)"
              >
                <div class="side-menu__icon">
                  <component :is="menu.icon" />
                </div>
                <div class="side-menu__title">
                  {{ menu.title }}
                  <div
                    v-if="menu.subMenu"
                    class="side-menu__sub-icon"
                    :class="{ 'transform rotate-180': menu.activeDropdown }"
                  >
                    <ChevronDownIcon />
                  </div>
                </div>
              </SideMenuTooltip>



              <!-- BEGIN: Second Child -->
              <transition @enter="enter" @leave="leave">
                <ul v-if="menu.subMenu && menu.activeDropdown">
                  <li
                    v-for="(subMenu, subMenuKey) in menu.subMenu"
                    :key="subMenuKey"
                  >
                    <SideMenuTooltip
                      tag="a"
                      :content="subMenu.title"
                      :href="
                        subMenu.subMenu
                          ? 'javascript:;'
                          : router.resolve({ name: subMenu.pageName }).path
                      "
                      class="side-menu"
                      :class="{ 'side-menu--active': subMenu.active }"
                      @click="linkTo(subMenu, router, $event)"
                    >
                      <div class="side-menu__icon">
                        <ActivityIcon />
                      </div>
                      <div class="side-menu__title">
                        {{ subMenu.title }}
                        <div
                          v-if="subMenu.subMenu"
                          class="side-menu__sub-icon"
                          :class="{
                            'transform rotate-180': subMenu.activeDropdown,
                          }"
                        >
                          <ChevronDownIcon />
                        </div>
                      </div>
                    </SideMenuTooltip>
                    <!-- BEGIN: Third Child -->
                    <transition @enter="enter" @leave="leave">
                      <ul v-if="subMenu.subMenu && subMenu.activeDropdown">
                        <li
                          v-for="(
                            lastSubMenu, lastSubMenuKey
                          ) in subMenu.subMenu"
                          :key="lastSubMenuKey"
                        >
                          <SideMenuTooltip
                            tag="a"
                            :content="lastSubMenu.title"
                            :href="
                              lastSubMenu.subMenu
                                ? 'javascript:;'
                                : router.resolve({
                                    name: lastSubMenu.pageName,
                                  }).path
                            "
                            class="side-menu"
                            :class="{
                              'side-menu--active': lastSubMenu.active,
                            }"
                            @click="linkTo(lastSubMenu, router, $event)"
                          >
                            <div class="side-menu__icon">
                              <ZapIcon />
                            </div>
                            <div class="side-menu__title">
                              {{ lastSubMenu.title }}
                            </div>
                          </SideMenuTooltip>
                        </li>
                      </ul>
                    </transition>
                    <!-- END: Third Child -->
                  </li>
                </ul>
              </transition>
              <!-- END: Second Child -->
            </li>
          </template>
          <!-- END: First Child -->
        </ul>
      </nav>
      <!-- END: Side Menu -->
      <!-- BEGIN: Content -->
      <div class="content">
        <router-view />
      </div>
      <!-- END: Content -->
    </div>
  </div>
  <Notification :options="notifyStore.getOptions" class="flex flex-col sm:flex-row bg-white" :class="notifyStore.getOptions.type" refKey="basicNonStickyNotification" >
    <template v-if="notifyStore.getOptions.type==='success'">
      <div class="flex items-center">

      <div class="text-green-500 rounded-full toast-success mr-3 border border-ocean_green">
        <svg class="bi bi-check" fill="currentColor" height="1.8em" viewBox="0 0 16 16"
             width="1.8em" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"
                fill-rule="evenodd"/>
        </svg>
      </div>
      </div>
    </template>
    <template v-else-if="notifyStore.getOptions.type==='error'">
      <div class="flex items-center">

      <div class="text-red-500 rounded-full toast-danger mr-3 border border-red-500">
        <svg class="bi bi-x" fill="currentColor" height="1.8em" viewBox="0 0 16 16"
             width="1.8em" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"
                fill-rule="evenodd"/>
          <path d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"
                fill-rule="evenodd"/>
        </svg>
      </div>
      </div>
    </template>
    <template v-else-if="notifyStore.getOptions.type==='info'">
      <div class="flex items-center">

      <div class="text-blue-500 rounded-full toast-info mr-3 border border-boston_blue ">
        <svg class="bi bi-info" fill="currentColor" height="1.8em" viewBox="0 0 16 16"
             width="1.8em" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z"/>
          <circle cx="8" cy="4.5" r="1"/>
        </svg>
      </div>
      </div>
    </template>
    <template v-else>
      <div class="flex items-center">
      <div class="text-orange-500 rounded-full bg-red-300 mr-3 border border-orange-500 ">
        <svg class="bi bi-exclamation" fill="currentColor" height="1.8em" viewBox="0 0 16 16"
             width="1.8em" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
        </svg>
      </div>
      </div>
    </template>
    <div class="font-medium flex items-center">{{ notifyStore.getOptions.title }}</div>
    <a class="font-medium text-primary dark:text-slate-400 mt-1 sm:mt-0 sm:ml-40" href="">{{ notifyStore.getOptions.message }}</a>
  </Notification>
</template>

<script setup>
import { computed, onMounted, provide, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { helper as $h } from "@/utils/helper";
import { useSideMenuStore } from "@/stores/side-menu";
import TopBar from "@/components/top-bar/Main.vue";
import MobileMenu from "@/components/mobile-menu/Main.vue";
import DarkModeSwitcher from "@/components/dark-mode-switcher/Main.vue";
import MainColorSwitcher from "@/components/main-color-switcher/Main.vue";
import SideMenuTooltip from "@/components/side-menu-tooltip/Main.vue";
import { linkTo, nestedMenu, enter, leave } from "./index";
import dom from "@left4code/tw-starter/dist/js/dom";
import { useNotifyStore } from '@/stores/notify'
import PageLoader from "@/components/PageLoader/PageLoader";

const route = useRoute();
const router = useRouter();
const formattedMenu = ref([]);
const sideMenuStore = useSideMenuStore();
const sideMenu = computed(() => nestedMenu(sideMenuStore.menu, route));

provide("forceActiveMenu", (pageName) => {
  route.forceActiveMenu = pageName;
  formattedMenu.value = $h.toRaw(sideMenu.value);
});

watch(
  computed(() => route.path),
  () => {
    delete route.forceActiveMenu;
    formattedMenu.value = $h.toRaw(sideMenu.value);
  }
);
const notifyStore = useNotifyStore()
let notification = ref(notifyStore.getNotification)
const setNotification = notifyStore.setNotification
const basicNonStickyNotification = ref()
provide('bind[basicNonStickyNotification]', (el) => {
  // Binding
  basicNonStickyNotification.value = el
})
provide('bind[basicNonStickyNotification]', (el) => {
  // Binding
  setNotification(el)
})


onMounted(() => {
  dom("body").removeClass("error-page").removeClass("login").addClass("main");
  formattedMenu.value = $h.toRaw(sideMenu.value);
});
</script>
