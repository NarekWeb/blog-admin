<template>
  <div>
    <DarkModeSwitcher/>
    <div class="container sm:px-10">
      <div class="block xl:grid grid-cols-2 gap-4">
        <!-- BEGIN: Login Info -->
        <div class="hidden xl:flex flex-col min-h-screen">
          <a href="" class="-intro-x flex items-center pt-5">
            <img
              alt="Enigma Tailwind HTML Admin Template"
              class="w-6"
              src="@/assets/images/logo.svg"
            />
            <span class="text-white text-lg leading-normal ml-3"> ZERO </span>
          </a>
          <div class="my-auto">
            <img
              alt="Enigma Tailwind HTML Admin Template"
              class="-intro-x w-1/2 -mt-16"
              src="@/assets/images/illustration.svg"
            />
            <div
              class="-intro-x text-white font-medium text-4xl leading-tight mt-10"
            >
              A few more clicks to <br/>
              sign in to your account.
            </div>
            <div
              class="-intro-x mt-5 text-lg leading-normal text-white text-opacity-70 dark:text-slate-400"
            >
              Manage all your e-commerce accounts in one place
            </div>
          </div>
        </div>
        <!-- END: Login Info -->
        <!-- BEGIN: Login Form -->
        <div class="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
          <div
            class="my-auto mx-auto xl:ml-20 bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto"
          >
            <h2
              class="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left"
            >
              Sign In
            </h2>
            <div class="intro-x mt-2 text-slate-400 xl:hidden text-center">
              A few more clicks to sign in to your account. Manage all your
              e-commerce accounts in one place
            </div>
            <div class="intro-x mt-8">
              <input
                type="text"
                class="intro-x login__input form-control py-3 px-4 block"
                placeholder="Email"
                v-model="form.login"
              />
              <input
                type="password"
                class="intro-x login__input form-control py-3 px-4 block mt-4"
                placeholder="Password"
                v-model="form.password"
              />
            </div>
            <div
              class="intro-x flex text-slate-600 dark:text-slate-500 text-xs sm:text-sm mt-4"
            >
              <div class="flex items-center mr-auto">
                <input
                  id="remember-me"
                  type="checkbox"
                  class="form-check-input border mr-2"
                />
                <label class="cursor-pointer select-none" for="remember-me"
                >Remember me</label
                >
              </div>
              <a href="">Forgot Password?</a>
            </div>
            <div class="intro-x mt-5 xl:mt-8 text-center xl:text-left">
              <button
                class="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top"
                @click="login"
              >
                <svg v-show="isSubmit" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Login
              </button>
              <button
                class="btn btn-outline-secondary py-3 px-4 w-full xl:w-32 mt-3 xl:mt-0 align-top"
              >
                Register
              </button>
            </div>
            <div
              class="intro-x mt-10 xl:mt-24 text-slate-600 dark:text-slate-500 text-center xl:text-left"
            >
              By signin up, you agree to our
              <a class="text-primary dark:text-slate-200" href=""
              >Terms and Conditions</a
              >
              &
              <a class="text-primary dark:text-slate-200" href=""
              >Privacy Policy</a
              >
            </div>
          </div>
        </div>
        <!-- END: Login Form -->
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import DarkModeSwitcher from "@/components/dark-mode-switcher/Main.vue";
import dom from "@left4code/tw-starter/dist/js/dom";
import {useRouter} from 'vue-router'
import {CLIENT_ID, CLIENT_SECRET} from '@/common/config'
import {useAuthStore} from '@/stores/auth'

const form = reactive({
  login: '',
  password: ''
})
let loginPressed = ref(false)
const isSubmit = ref(false)

const router = useRouter()
const store = useAuthStore()
const storeLogin = store.login
const getUser = store.getUser
const login = async () => {
  isSubmit.value = true

  const credentials = {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    username: form.login.toLowerCase(),
    password: form.password,
    grant_type: 'password'
  }

  loginPressed = true
  await storeLogin(credentials)
  await checkAuthUser()
  loginPressed = false
}
const checkAuthUser = async () => {
  await getUser('auth/getUser')
  await router.push('/')
}

onMounted(() => {
  dom("body").removeClass("main").removeClass("error-page").addClass("login");
});
</script>
