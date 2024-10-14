<template>
  <!-- BEGIN: Top Bar -->
  <div
    class="top-bar-boxed h-[70px] md:h-[65px] z-[51] border-b border-white/[0.08] -mt-7 md:mt-0 -mx-3 sm:-mx-8 md:-mx-0 px-3 md:border-b-0 relative md:fixed md:inset-x-0 md:top-0 sm:px-8 md:px-10 md:pt-10 md:bg-gradient-to-b md:from-slate-100 md:to-transparent dark:md:from-darkmode-700"
  >
    <div class="h-full flex items-center">
      <!-- BEGIN: Logo -->
      <a href="" class="logo -intro-x hidden md:flex xl:w-[60px] block">
          <span class="logo__text text-white text-lg leading-normal ml-3"> ZERO </span>
      </a>

      <!-- END: Logo -->
      <!-- BEGIN: Breadcrumb -->
      <nav aria-label="breadcrumb" class="-intro-x h-[45px] mr-auto">
        <HistoryMoveButtons />
      </nav>
      <!-- <Breadcrumb />-->
      <!-- END: Breadcrumb -->
      <!-- BEGIN: Search -->
      <div class="intro-x relative mr-3 sm:mr-6">
        <div class="search-result" :class="{ show: searchDropdown }">
          <div class="search-result__content">
            <div class="search-result__content__title">Pages</div>
            <div class="mb-5">
              <a href="" class="flex items-center">
                <div
                  class="w-8 h-8 bg-success/20 dark:bg-success/10 text-success flex items-center justify-center rounded-full"
                >
                  <InboxIcon class="w-4 h-4" />
                </div>
                <div class="ml-3">Mail Settings</div>
              </a>
              <a href="" class="flex items-center mt-2">
                <div
                  class="w-8 h-8 bg-pending/10 text-pending flex items-center justify-center rounded-full"
                >
                  <UsersIcon class="w-4 h-4" />
                </div>
                <div class="ml-3">Users & Permissions</div>
              </a>
              <a href="" class="flex items-center mt-2">
                <div
                  class="w-8 h-8 bg-primary/10 dark:bg-primary/20 text-primary/80 flex items-center justify-center rounded-full"
                >
                  <CreditCardIcon class="w-4 h-4" />
                </div>
                <div class="ml-3">Transactions Report</div>
              </a>
            </div>
            <div class="search-result__content__title">Users</div>
            <div class="mb-5">
              <a
                v-for="(faker, fakerKey) in $_.take($f(), 4)"
                :key="fakerKey"
                href
                class="flex items-center mt-2"
              >
                <div class="w-8 h-8 image-fit">
                  <img
                    alt="Enigma Tailwind HTML Admin Template"
                    class="rounded-full"
                    :src="faker.photos[0]"
                  />
                </div>
                <div class="ml-3">{{ faker.users[0].name }}</div>
                <div
                  class="ml-auto w-48 truncate text-slate-500 text-xs text-right"
                >
                  {{ faker.users[0].email }}
                </div>
              </a>
            </div>
            <div class="search-result__content__title">Products</div>
            <a
              v-for="(faker, fakerKey) in $_.take($f(), 4)"
              :key="fakerKey"
              href
              class="flex items-center mt-2"
            >
              <div class="w-8 h-8 image-fit">
                <img
                  alt="Enigma Tailwind HTML Admin Template"
                  class="rounded-full"
                  :src="faker.images[0]"
                />
              </div>
              <div class="ml-3">{{ faker.products[0].name }}</div>
              <div
                class="ml-auto w-48 truncate text-slate-500 text-xs text-right"
              >
                {{ faker.products[0].category }}
              </div>
            </a>
          </div>
        </div>
        <DarkModeSwitcher />
      </div>

      <!-- END: Search -->

      <!-- BEGIN: Account Menu -->
      <Dropdown class="intro-x w-8 h-8">
        <DropdownToggle
          tag="div"
          role="button"
          class="w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in scale-110"
          @click="isShowDropdown = true"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide text-white mx-auto">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </DropdownToggle>
        <transition>
          <DropdownMenu class="w-56" v-if="isShowDropdown">
            <DropdownContent
              class="bg-primary/80 before:block before:absolute before:bg-black before:inset-0 before:rounded-md before:z-[-1] text-white"
            >
              <DropdownItem class="dropdown-item hover:bg-white/5" @click="logOut">
                <ToggleRightIcon class="w-4 h-4 mr-2" /> Logout
              </DropdownItem>
            </DropdownContent>
          </DropdownMenu>
        </transition>
      </Dropdown>
      <!-- END: Account Menu -->
    </div>
  </div>
  <!-- END: Top Bar -->
</template>

<script setup>
import {computed, ref} from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import DarkModeSwitcher from "@/components/dark-mode-switcher/Main.vue";
import HistoryMoveButtons from "@/components/historyMove/HistoryMoveButtons";

const router = useRouter()
const store = useAuthStore()
const searchDropdown = ref(false);
const isShowDropdown = ref(false);

const pages = computed(() => router.currentRoute.value.fullPath.split("/").filter(e => e));

const logOut = () => {
  store.ACT_LOGOUT()
  isShowDropdown.value = false

  setTimeout(() => {
    router.push('/login')
  }, 500)
};
</script>
