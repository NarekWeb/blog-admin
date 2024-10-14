<template>
  <Modal :show="props.modelValue" :slideOver="true" backdrop="static" size="modal-xl" @hidden="closeModal">
    <a class="absolute top-0 left-0 right-auto mt-4 -ml-12" href="javascript:" @click="closeModal">
      <XIcon class="w-8 h-8 text-slate-400"/>
    </a>

    <!-- BEGIN: Slide Over Header -->
    <ModalHeader class="p-5 flex justify-between">
      <h2 class="font-medium text-base mr-auto">
        <span v-if="props.post.id">Update Post</span>
        <span v-else>Create Post</span>
      </h2>
      <div class="form-check form-switch  items-start">
        <label for="post-form-5" class="form-check-label mr-2">Active</label>
        <input id="post-form-5" v-model="postData.active" class="form-check-input" type="checkbox" required/>
      </div>
    </ModalHeader>
    <!-- END: Slide Over Header -->
    <form @submit.prevent="props.post?.id ? updatePost() : createPost()">
      <div class="modal-body">
        <div class="mt-3">
          <label class="form-label" for="modal-form-1">Title <span class="text-red-600 text-sm">*</span></label>
          <input id="modal-form-2" v-model="postData.title" class="form-control" placeholder="title" type="text"
                 required/>
        </div>

        <div class="mt-3">
          <SelectCover
            :selectedCover="selectedCover"
            @selectedCoverId="selectedCoverId"
            required
          />
        </div>

        <div class="mt-3">
          <label class="form-label" for="modal-form-1">Description <span class="text-red-600 text-sm">*</span></label>
          <classic-editor v-model="postData.description" aria-required="true"/>
        </div>
      </div>

      <!-- BEGIN: Slide Over Footer -->
      <ModalFooter class="w-full absolute bottom-0 flex justify-end flex justify-end">
        <button class="btn btn-outline-secondary w-20 mr-1" type="button" @click="closeModal">
          Cancel
        </button>
        <ButtonLoader v-if="!props.post.id" :is-loading="isLoading">Create</ButtonLoader>
        <ButtonLoader v-if="props.post.id" :is-loading="isLoading">Update</ButtonLoader>
      </ModalFooter>
      <!-- END: Slide Over Footer -->
    </form>
  </Modal>
</template>

<script>
export default {
  name: 'PostCreateEdit',
}
</script>

<script setup>
import {onBeforeMount, ref, watch} from 'vue'
import {useNotifyStore} from '@/stores/notify'
import {PostService} from '@/services/api/post/post.service'
import ButtonLoader from "@/components/button-loader/Main";
import ClassicEditor from "@/global-components/ckeditor/ClassicEditor";

const isLoading = ref(false);
const notifyShow = useNotifyStore().notifyShow
const props = defineProps({
  modelValue: {
    type: Boolean,
  },
  post: {
    type: Object,
  },
})
const emit = defineEmits(['postCreated', 'postUpdated','modalClosed'])
const postData = ref({
  id: null,
  description: '',
  active: true,
  title: '',
  coverId: null,
})

const selectedCover = ref({
  id: null,
  url: null,
})

const selectedCoverId = (coverId) => {
  postData.value.coverId = coverId
}

const closeModal = () => {
  emit('modalClosed')
}

const createPost = async () => {
  try {
    isLoading.value = true
    const createdPost = await PostService.createPost(postData.value)
    const response = await PostService.fetchPostById(createdPost.id)

    await notifyShow('Post has been successfully created', 'success', 'success')
    emit('postCreated', response)

    closeModal()
  } finally {
    isLoading.value = false
  }
}

const updatePost = async () => {
  try {
    isLoading.value = true
    await PostService.updatePost(postData.value)

    await notifyShow('Post has been successfully updated', 'success', 'success')
    emit('postUpdated', postData.value)

    closeModal()
  } finally {
    isLoading.value = false
  }
}

onBeforeMount( () => {
  if (props.post.id) {
    postData.value.id = props.post.id
    postData.value.title = props.post.title
    postData.value.description = props.post.description
    postData.value.coverId = props.post.cover.id
    selectedCover.value = props.post.cover
  } else {
    postData.value = {
      id: null,
      description: '',
      active: true,
      title: '',
      coverId: null,
    }

    selectedCover.value = {
      id: null,
      url: null,
    }
  }
})
</script>

<style scoped>
:deep .modal-xl {
  width: 50% !important;
}
.modal.modal-slide-over.show {
  z-index: 63!important;
}
</style>
