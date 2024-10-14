<template>
  <div class="flex ml-[30%] mt-[18%] text-white">
    <div class="mr-4" >
      <button @click.stop="goBack" :disabled="isDisabled" :class="isDisabled ? 'opacity-50': ''">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
    </div>

    <div>
      <button @click="goForward" :disabled="isDisabledForward" :class="isDisabledForward ? 'opacity-50': ''">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HistoryMoveButtons',
}
</script>

<script setup>
import {ref, onMounted, watch, computed} from "vue";
import {useRouter} from "vue-router";


const router = useRouter()
const isDisabled = ref(!!router.options.history.state.back)
const isDisabledForward = ref(!!router.options.history.state.forward)

const goBack = () => {
  window.history.back()
}

const goForward = () => {
  window.history.forward()
}

onMounted(() => {
  isDisabled.value = true
  isDisabledForward.value = true
})


watch(() => router, () => {

  if (router.options.history.state.back === null) {
    isDisabled.value = true
  } else {
    isDisabled.value = false
  }
}, {deep: true}),

watch(() => router, () => {

  if (router.options.history.state.forward === null) {
    isDisabledForward.value = true
  } else {
    isDisabledForward.value = false
  }
}, {deep: true})

</script>
