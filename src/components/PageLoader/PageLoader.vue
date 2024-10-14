<template>
  <div class="flex h-screen w-full bg-gray-500 bg-opacity-25  absolute z-100" >
    <div class="m-auto">
      <div class="flex mx-auto my-auto">
        <LoadingIcon icon="three-dots" class="w-8 h-8 mx-auto"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageLoader',
}
</script>

<script setup>

import {onMounted, onUnmounted} from "vue";

onMounted(() => {
  document.body.style.overflow = "hidden";
})

onUnmounted(() => {
   document.body.style.overflow = "unset";
})
</script>
