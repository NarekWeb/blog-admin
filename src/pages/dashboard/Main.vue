<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Blog Layout</h2>
    <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
      <button class="btn btn-primary shadow-md mr-2" @click="openCreateModal">Add New Post</button>
    </div>
  </div>
  <div class="intro-y grid grid-cols-12 gap-6 mt-5" >
    <div
      v-for="(post, postIndex) in posts"
      :key="post.id"
      class="intro-y col-span-12 md:col-span-6 xl:col-span-4 box cursor-pointer"
      @click="showPost(post)"
    >
      <div
        class="flex items-center border-b border-slate-200/60 dark:border-darkmode-400 px-5 py-4"
      >
        <div class="w-10 h-10 flex-none image-fit">

        </div>
        <div class="ml-3 mr-auto">

        </div>
        <Dropdown class="ml-3">
          <DropdownToggle
            tag="a"
            href="javascript:;"
            class="w-5 h-5 text-slate-500"
          >
            <MoreVerticalIcon class="w-5 h-5"/>
          </DropdownToggle>
          <DropdownMenu class="w-40">
            <DropdownContent>
              <DropdownItem>
                <Edit2Icon class="w-4 h-4 mr-2"/>
                Edit Post
              </DropdownItem>
              <DropdownItem>
                <TrashIcon class="w-4 h-4 mr-2"/>
                Delete Post
              </DropdownItem>
            </DropdownContent>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div class="p-5">
        <a href="" class="block font-medium text-base mt-5">{{
            post.title
          }}</a>
        <div class="text-slate-600 dark:text-slate-500 mt-2">
          {{ post.content }}
        </div>
      </div>
    </div>
  </div>

  <post-create-edit
    :post="selectedPost"
    v-if="createPostModalStatus"
    v-model="createPostModalStatus"
    @postCreated="onPostCreated"
    @postUpdated="onPostUpdated"
    @modalClosed=onModalClosed
  />

  <!-- BEGIN: Modal Content -->
  <Modal :show="deleteModal" @hidden="deleteModal = false">
    <ModalBody class="p-0">
      <div class="p-5 text-center">
        <XCircleIcon class="w-16 h-16 text-danger mx-auto mt-3" />
        <div class="text-3xl mt-5">Are you sure?</div>
        <div class="text-slate-500 mt-2">
          Do you really want to delete <b>{{ selectedPost.title }}</b> post <br />This
          process cannot be undone.
        </div>
      </div>
      <div class="px-5 pb-8 text-center">
        <button class="btn btn-outline-secondary w-24 mr-1" type="button" @click="deleteModal = false">
          Cancel
        </button>
        <button class="btn btn-danger w-24" type="button" @click="deletePost(selectedPost.id)">
          Delete
        </button>
      </div>
    </ModalBody>
  </Modal>
</template>

<script setup>
import {ref, provide, reactive, onMounted} from 'vue'
import {PostService} from "@/services/api/post/post.service";
import PostCreateEdit from "@/components/post/PostCreateEdit.vue";
import router from "@/router";

const importantNotesRef = ref();
let selectedPost = ref({})
const createPostModalStatus = ref(false)
const posts = reactive([])

provide("bind[importantNotesRef]", (el) => {
  importantNotesRef.value = el;
});

const openCreateModal = () => {
  selectedPost.value = {}
  createPostModalStatus.value = true
}

const onModalClosed = ()=>{
  selectedPost.value = {}
  createPostModalStatus.value = false
}

const onPostCreated = async (post) => {
  onModalClosed()
  posts.unshift(post)
}

const showPost = (post) => {
  router.push({ name: 'postShow', params: { id: post.id }})
}

const onPostUpdated = (post) => {
  createPostModalStatus.value = false
  let index = posts.findIndex(item => item.id === post.id)
  if (index === -1) return
  posts[index] = post
}

let fetchPosts = async () => {
  let fetchedPosts = await PostService.fetchPosts();
  console.log(fetchedPosts)
  posts.push(...fetchedPosts);
}

onMounted(() => {
  fetchPosts()
})
</script>
