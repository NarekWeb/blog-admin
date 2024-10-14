<template>
  <select
    v-select-directive="{ props, emit, computedOptions }"
    class="tom-select"
    :required="props.required"
    :name="props.name"
    :disabled="disabled"
  >
    <slot/>
  </select>
</template>

<script setup>
import {computed, onBeforeMount, watch} from "vue";
import { setValue, init, reInit } from "./index";
import dom from "@left4code/tw-starter/dist/js/dom";

const vSelectDirective = {
  mounted(el, { value }) {
    // Clone the select element to prevent tom select remove the original element
    const clonedEl = dom(el).clone().insertAfter(el)[0];
    dom(el).addClass("w-0 h-0 overflow-hidden p-0 focus:ring-0 !border-transparent");

    // Initialize tom select
    setValue(clonedEl, value.props);
    setValue(el, value.props);
    init(el, clonedEl, value.props, value.emit, value.computedOptions);
  },
  updated(el, { value }) {
    const clonedEl = dom(el).next()[0];
    setValue(clonedEl, value.props);
    setValue(el, value.props);
    reInit(el, clonedEl, value.props, value.emit, value.computedOptions);
  },
};

const props = defineProps({
  options: {
    type: Object,
    default() {
      return {};
    },
  },
  modelValue: {
    type: [String, Number, Array],
    default: "",
  },
  required: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: '',
  },
});

const emit = defineEmits();

// Compute all default options
const computedOptions = computed(() => {
  let options = {
    ...props.options,
    plugins: {
      dropdown_input: {},
      ...props.options.plugins,
    },
  };

  if (Array.isArray(props.modelValue)) {
    options = {
      persist: false,
      create: true,
      onDelete: function (values) {
        return confirm(
          values.length > 1
            ? "Are you sure you want to remove these " +
                values.length +
                " items?"
            : 'Are you sure you want to remove "' + values[0] + '"?'
        );
      },
      ...options,
      plugins: {
        remove_button: {
          title: "Remove this item",
        },
        ...options.plugins,
      },
    };
  }

  return options;
});

// Watch value change
watch(
  computed(() => props.modelValue),
  () => {
    emit("change");
  }
);
</script>
