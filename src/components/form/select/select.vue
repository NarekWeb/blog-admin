<template>
  <Multiselect
    v-if="props.show"
    v-model="value"
    @change="selectedChange"
    :options="props.options"
    :mode="props.mode"
    :searchable="props.searchable"
    :disabled="props.disabled"
    :placeholder="props.placeholder"
    :required="props.required"
    :loading="props.loading"
    :classes="{
  container: 'relative cursor-pointer mx-auto w-full flex items-center justify-end box-border cursor-pointer border dark:bg-darkmode-800 border-gray-300 rounded bg-white text-base leading-snug outline-none',
  containerDisabled: 'cursor-default bg-gray-100 opacity-50',
  containerOpen: 'border-r-4 border-slate-200 dark:border-darkmode-200',
  containerOpenTop: 'border-r-4 dark:border-slate-200',
  containerActive: 'dark:border-darkmode-800',
  singleLabel: 'flex items-center h-full max-w-full absolute left-0 top-0 pointer-events-none bg-transparent leading-snug pl-3.5 pr-16 box-border rtl:left-auto rtl:right-0 rtl:pl-0 rtl:pr-3.5',
  singleLabelText: 'overflow-ellipsis overflow-hidden block whitespace-nowrap max-w-full',
  multipleLabel: 'flex items-center h-full absolute left-0 top-0 pointer-events-none bg-transparent leading-snug pl-3.5 rtl:left-auto rtl:right-0 rtl:pl-0 rtl:pr-3.5',
  search: 'dark:bg-darkmode-800 w-full absolute inset-0 outline-none appearance-none box-border border-0 text-base font-sans bg-white  text-white rounded pl-1 rtl:pl-0 rtl:pr-1',
  tags: 'flex-grow flex-shrink flex flex-wrap items-center mt-1 pl-2 rtl:pl-0 rtl:pr-2',
  tag: 'dark:text-slate-300 dark:bg-darkmode-400 bg-slate-200 bg-cyan-900 text-black text-sm py-1 pl-2 rounded mr-1 mb-1 flex items-center whitespace-nowrap rtl:pl-0 rtl:pr-2 rtl:mr-0 rtl:ml-1',
  tagDisabled: 'pr-2 opacity-50 rtl:pl-2',
  tagRemove: 'dark:text-slate-300 flex items-center justify-center p-1 mx-0.5 rounded-sm hover:bg-black hover:bg-opacity-10 group',
  tagRemoveIcon: 'bg-multiselect-remove bg-center  dark:text-slate-300 bg-no-repeat opacity-30 inline-block w-3 h-3 group-hover:opacity-60',
  tagsSearchWrapper: '        inline-block relative mx-1 mb-1 flex-grow flex-shrink h-full',
  tagsSearch: 'dark:bg-darkmode-400 absolute inset-0 border-0 outline-none appearance-none p-0 text-base font-sans box-border w-full',
  tagsSearchCopy: 'dark:bg-darkmode-800 invisible whitespace-pre-wrap inline-block h-px',
  placeholder: 'flex items-center h-full absolute left-0 top-0 pointer-events-none bg-transparent leading-snug pl-3.5 text-gray-400 rtl:left-auto rtl:right-0 rtl:pl-0 rtl:pr-3.5',
  caret: 'bg-multiselect-caret bg-center bg-no-repeat w-2.5 h-4 py-px box-content mr-3.5 relative z-10 opacity-40 flex-shrink-0 flex-grow-0 transition-transform transform pointer-events-none rtl:mr-0 rtl:ml-3.5',
  caretOpen: 'rotate-180 pointer-events-auto',
  clear: 'dark:text-white pr-3.5 relative z-10 opacity-40 transition duration-300 flex-shrink-0 flex-grow-0 flex hover:opacity-80 rtl:pr-0 rtl:pl-3.5',
  clearIcon: 'bg-multiselect-remove bg-center bg-no-repeat w-2.5 h-4 py-px box-content inline-block',
  spinner: 'bg-multiselect-spinner bg-center bg-no-repeat w-4 h-4 z-10 mr-3.5 animate-spin flex-shrink-0 flex-grow-0 rtl:mr-0 rtl:ml-3.5',
  inifite: 'flex items-center justify-center w-full',
  inifiteSpinner: 'bg-multiselect-spinner bg-center bg-no-repeat w-4 h-4 z-10 animate-spin flex-shrink-0 flex-grow-0 m-3.5',
  dropdown: 'dark:text-slate-300 dark:bg-darkmode-800 max-h-60 absolute -left-px -right-px bottom-0 transform translate-y-full border border-gray-300 -mt-px overflow-y-scroll z-50 bg-white flex flex-col rounded-b',
  dropdownTop: '-translate-y-full top-px bottom-auto rounded-b-none rounded-t',
  dropdownHidden: 'hidden',
  options: 'flex flex-col p-0 m-0 list-none',
  optionsTop: '',
  group: 'p-0 m-0',
  groupLabel: 'flex text-sm box-border items-center justify-start text-left py-1 px-3 font-semibold bg-gray-200 cursor-default leading-normal',
  groupLabelPointable: 'cursor-pointer',
  groupLabelPointed: 'bg-gray-300 text-gray-700',
  groupLabelSelected: 'bg-green-600 text-white',
  groupLabelDisabled: 'bg-gray-100 text-gray-300 cursor-not-allowed',
  groupLabelSelectedPointed: 'bg-green-600 text-white opacity-90',
  groupLabelSelectedDisabled: 'text-green-100 bg-green-600 bg-opacity-50 cursor-not-allowed',
  groupOptions: 'p-0 m-0',
  option: 'dark:bg-darkmode-800 flex items-center justify-start box-border text-left cursor-pointer text-base leading-snug py-2 px-3',
  optionPointed: 'dark:bg-darkmode-400 dark:text-slate-300 text-gray-800 bg-gray-100',
  optionSelected: 'text-white bg-cyan-900 dark:bg-darkmode-400',
  optionDisabled: 'text-gray-300 cursor-not-allowed',
  optionSelectedPointed: 'text-white bg-cyan-900 opacity-90',
  optionSelectedDisabled: 'text-green-100 bg-cyan-900 bg-opacity-50 cursor-not-allowed',
  noOptions: 'py-2 px-3 text-gray-600 bg-white text-left',
  noResults: 'py-2 px-3 text-gray-600 bg-white text-left',
  fakeInput: 'bg-transparent absolute left-0 right-0 -bottom-px w-full h-px border-0 p-0 appearance-none outline-none text-transparent',
  spacer: 'h-9 py-px box-content',
}"
  />
</template>

<script setup>
import Multiselect from '@vueform/multiselect'
import { ref, watch } from "vue";
const value = ref([])
const emit = defineEmits(['update:modelValue', 'value'])
const props = defineProps({
  options: {
    type: Array,
    required: true,
    default() {
      return []
    },
  },
  modelValue: {
    type: [String, Number, Array],
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  show: {
    type: Boolean,
    default: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  mode: {
    type: String,
    default: 'single'
  },
  placeholder: {
    type: String,
    default: ''
  },
  searchable: {
    type: Boolean,
    default: true
  }
})

watch(() => props.modelValue, () => {
  value.value = props.modelValue
})

const selectedChange = (value) => {
  emit('update:modelValue', value)
}
</script>
