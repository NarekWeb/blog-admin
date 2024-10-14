<template>
    <div class="rich_text">
        <component
                :is="tagName"
                ref="editorRef"
                v-editor-directive="{ props, emit, cacheData }"
                class="select"
        ></component>    </div>
</template>

<script setup>
import { inject, onMounted, ref } from 'vue'
import { init } from './index'
import UploadAdapter from '@/utils/UploadAdapter'

const toolbar = {
  items: [
    'heading',
    '|',
    'bold',
    'italic',
    'link',
    'bulletedList',
    'numberedList',
    '|',
    'outdent',
    'indent',
    '|',
    'imageInsert',
    'blockQuote',
    'insertTable',
    'mediaEmbed',
    'undo',
    'redo',
    'underline',
    'horizontalLine',
    'ckbox',
    'fontColor',
    'fontFamily',
    'fontSize',
    'alignment',
    'fontBackgroundColor',
    'findAndReplace',
    'imageUpload'
  ]
}

const heading = {
  options: [
    { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
    { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
    { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
    { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
  ]
}

const language = 'en'
const image = {
  toolbar: [
    'imageTextAlternative',
    'toggleImageCaption',
    'imageStyle:inline',
    'imageStyle:block',
    'imageStyle:side',
    'linkImage'
  ],
}
const table = {
  contentToolbar: [
    'tableColumn',
    'tableRow',
    'mergeTableCells'
  ],
}
const vEditorDirective = {
  mounted (el, { value }) {
    value.props.config.toolbar = toolbar
    value.props.config.image = image
    value.props.config.table = table
    value.props.config.heading = heading

    init(el, ClassicEditor, value)
  },
}

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  config: {
    type: Object,
    default: () => ({}),
  },
  tagName: {
    type: String,
    default: 'div',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  refKey: {
    type: String,
    default: null,
  },
  ready:{
    type:Boolean,
    default:false
  }
})

const emit = defineEmits()

const editorRef = ref()
const cacheData = ref('')

const bindInstance = () => {
  if (props.refKey) {
    const bind = inject(`bind[${props.refKey}]`)
    if (bind) {
      bind(editorRef.value)
    }
  }
}

onMounted(() => {
  bindInstance()
})
</script>
<style>
.ck-content a {
    text-decoration: underline !important;
}
</style>
