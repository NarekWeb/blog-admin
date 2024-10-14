import { watch } from "vue";
import UploadAdapter from '@/utils/UploadAdapter'

const init = async (el, editorBuild, { props, emit, cacheData }) => {
  // Initial data
  cacheData = props.modelValue;
  props.config.initialData = props.modelValue;

  // Init CKEditor
  const editor = await editorBuild.create(el, props.config);

  // Attach CKEditor instance
  el.CKEditor = editor;

  // Set initial disabled state
  // editor.isReadOnly = props.disabled;

  // Set on change event
  editor.model.document.on("change:data", () => {

    // editor.data.processor = new HtmlDataProcessor(); // editor.getData() in HTML.

    const data = editor.getData();
    console.log('Editor ::::', editor.getData())
    cacheData = data;
    emit("update:modelValue", data);
  });

  // Set on focus event
  editor.editing.view.document.on("focus", (evt) => {
    emit("focus", evt, editor);
  });

  // Set on blur event
  editor.editing.view.document.on("blur", (evt) => {
    emit("blur", evt, editor);
  });

  // Set on ready event
  emit("ready", editor);

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

  onReady(editor)

  // Watch model change
  watch(props, () => {
    console.log('Vallue::::', props.modelValue, )

    if (cacheData !== props.modelValue) {
      el.CKEditor.setData(props.modelValue);
    }
  });
};

export { init };
