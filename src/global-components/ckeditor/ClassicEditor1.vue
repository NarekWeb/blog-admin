<template>
    <ClassicEditorMain   :value="modelValue"
                         @input="$emit('update:modelValue', $event.target.value)"  @ready="onReady"/>
</template>

<script setup>
import UploadAdapter from '@/utils/UploadAdapter'
// import ClassicEditorMain from '@/global-components/ckeditor/ClassicEditorMain'
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

const onInit = (editor) => {
  editor.plugins.get('FileRepository').createUploadAdapter = function (loader) {
    return new UploadAdapter(loader)
  }
}

const onReady = (editor) => {
  onInit(editor)
  // Insert the toolbar before the editable area.
  editor.ui.getEditableElement().parentElement.insertBefore(
    editor.ui.view.toolbar.element,
    editor.ui.getEditableElement(),
  )
}
</script>

<style scoped>

</style>