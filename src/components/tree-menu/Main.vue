<template>
  <li>
    <div :class="[selected[level] === category.id && 'text-white bg-primary', disabled && 'opacity-50' , 'flex justify-between items-center truncate  p-1 px-2 rounded']" >
      <button :class="[selected[level] === category.id && 'text-white bg-primary', 'w-full text-left flex justify-items-start items-center']" :disabled="disabled" @click="$emit('select', category, level)">
        <FolderPlusIcon v-if="category.childrenCount && selected[level] !== category.id" class="block pr-1 w-5" />
        <FolderMinusIcon v-if="category.childrenCount && selected[level] === category.id" class="block pr-1 w-5" />
        <span v-if="!category.childrenCount" class="block pr-2 w-5" />
        <span> {{ category.title }} </span>
      </button>
      <div class="flex justify-between" v-if="selected[level] === category.id">
        <Tippy tag="a" href="javascript:;"
               :class="[disabled && 'opacity-50', 'tooltip', 'mr-1']"
               :content="`Edit ${label} Category`"
               :options="{
                    theme: 'light',
                  }"
               @click="editCategory(category)"
        >
          <EditIcon class="w-4 h-4 mr-1 ml-1"/>
        </Tippy>

        <Tippy tag="a" href="javascript:;"
               :class="[disabled && 'opacity-50', 'tooltip', 'mr-1', 'text-danger']"
               :content="`Delete ${label} Category`"
               :options="{
                    theme: 'light',
                  }"
               @click="deleteCategory(category)"
        >
          <Trash2Icon class="w-4 h-4 mr-1"/>
        </Tippy>

        <Tippy tag="a" href="javascript:;"
               class="tooltip"
               :class="[disabled && 'opacity-50', 'tooltip']"
               :content="`Create ${label} Category`"
               :options="{
                    theme: 'light',
                  }"
               @click="addNewCategory(category, level)"
        >
          <PlusIcon class="w-4 h-4" />
        </Tippy>
       </div>
    </div>

      <ul v-if="selected[level] === category.id && children[category.id]" class="pl-2 pt-1 flex flex-col">
        <vue-draggable-next :list="children[category.id]" class="dragArea list-group " @change="orderCategory(children[category.id])"
                            style="width:100% !important;" tag="tbody">
        <tree-menu
          v-for="c in children[category.id]"
          :key="c.id"
          :category="c"
          :selected="selected"
          :children="children"
          :disabled="disabled"
          :level="level + 1"
          @select="(v, l) => $emit('select', v, l)"
          @addNewCategory="(v) => $emit('addNewCategory', v)"
          @deleteCategory="(v) => $emit('deleteCategory', v)"
          @editCategory="(v) => $emit('editCategory', v)"
          @ordere="(v) => $emit('ordered', v)"
        />
        </vue-draggable-next>

      </ul>
  </li>
</template>

<script>
export default {
  name: 'TreeMenu',
}
</script>

<script setup>
import { VueDraggableNext } from 'vue-draggable-next'
import {ref} from "vue";

const props = defineProps({
  category: {
    type: Object,
    required: true,
  },
  selected: {
    type: Array,
    required: true,
  },
  level: {
    type: Number,
    default: 0,
  },
  children: {
    type: Object,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: 'Showroom',
  },
});

const emit = defineEmits(['select', 'addNewCategory', 'deleteCategory', 'editCategory', 'ordered']);

const addNewCategory = (category, level) => {
  emit('addNewCategory', category)
}

const deleteCategory = (category) => {
  emit('deleteCategory', category)
}

const editCategory = (category) => {
  emit('editCategory', category)
}

const orderCategory = ( categories) => {
  emit('ordered',  categories, props.category.id)
}
</script>
