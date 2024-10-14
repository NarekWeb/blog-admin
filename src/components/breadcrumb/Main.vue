<template>
  <nav aria-label="breadcrumb" class="-intro-x h-[45px] mr-auto">
    <ol class="breadcrumb breadcrumb-light">
      <li class="" :class="['breadcrumb-item', pageIndex != Object.keys(pages).length - 1 ? 'active' : '' ]"
          v-for="(page, pageIndex) in pages" key="pageIndex">
        <a href="#">{{ page }}</a>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  name: 'Breadcrumb',
}
</script>

<script setup>
import {computed, ref} from 'vue'
import {useRouter} from "vue-router";

const pages = computed(() => useRouter().currentRoute.value.fullPath.split("/").filter(e => e));
</script>
