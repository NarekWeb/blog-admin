<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg leading-normal font-medium mr-auto">Showroom Product Show</h2>
  </div>
  <!-- BEGIN: Invoice -->
  <div class="intro-y news xl:w-3/5 p-5 box mt-8">
    <!-- BEGIN: Blog Layout -->
    <h2 class="intro-y font-medium text-xl sm:text-2xl mb-1.5">
      {{ post.title }}
    </h2>

    <div class="intro-y text-justify leading-relaxed">
      <p class="mb-5">{{ post.content }}</p>
    </div>
    <!-- END: Blog Layout -->
    <!-- BEGIN: Comments -->
    <div class="intro-y mt-5 pt-5 border-t border-slate-200/60 dark:border-darkmode-400">
      <div class="news__input relative mt-5">
        <MessageCircleIcon
          class="w-5 h-5 absolute my-auto inset-y-0 ml-6 left-0 text-slate-500"
        />
        <textarea
          v-model="comment"
          class="form-control border-transparent bg-slate-100 pl-16 py-6 resize-none"
          rows="1"
          placeholder="Post a comment..."
        ></textarea>
        <button class="btn btn-success" @click="createComment(post.id)">Add Comment</button>
      </div>
    </div>

    <div class="intro-y mt-10 pb-10">
      <div class="pt-5" v-for="(comment, index) in post.comments" :key="comment.id">
        <div class="flex">
          <Dropdown class="ml-3" >
            <DropdownToggle
              tag="a"
              href="javascript:;"
              class="w-5 h-5 text-slate-500"
            >
              <MoreVerticalIcon class="w-5 h-5" />
            </DropdownToggle>
            <DropdownMenu class="w-40">
              <DropdownContent>
                <DropdownItem>
                  <Edit2Icon class="w-4 h-4 mr-2" /> Edit Post
                </DropdownItem>
                <DropdownItem @click="onDeleteComment(comment.id, index)">
                  <TrashIcon class="w-4 h-4 mr-2"/> Delete Post
                </DropdownItem>
              </DropdownContent>
            </DropdownMenu>
          </Dropdown>
          <div class="ml-3 flex-1">
            <div class="text-slate-500 text-xs sm:text-sm">
              {{ comment.createdAt }}
            </div>
            <div class="mt-2">{{ comment.body }}</div>
          </div>
          <div>
            <span class="mr-2 cursor-pointer" @click="onLike(comment)">like {{ comment.likeCount }}</span>
            <span class="cursor-pointer" @click="onDislike(comment)">dislike {{ comment.dislikeCount }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- END: Comments -->
  </div>
  <!-- END: Invoice -->
</template>

<script setup>
import {ref, watch} from "vue";
import {PostService} from '@/services/api/post/post.service'
import {useRoute} from "vue-router";
import {ReactionService} from "@/services/api/reaction/reaction.service";
import {CommentService} from "@/services/api/coment/comment.service";

const route = useRoute()
const post = ref({
  id: null,
  comments: [],
  content: '',
  title: '',
})
const comment = ref('')
const dropdownRefs = ref([]); // Array to hold references to each dropdown

const onLike = async (comment) => {
  await ReactionService.createReaction({
    commentId: comment.id,
    reactionType: 'like',
  })
  await fetchPost(route.params.id)
}

const onDislike = async (comment) => {
  await ReactionService.createReaction({
    commentId: comment.id,
    reactionType: 'dislike',
  })
  await fetchPost(route.params.id)
}

const createComment = async (postId) => {
  await CommentService.createComment({
    body: comment.value,
    postId: postId,
  })

  await fetchPost(route.params.id)

  comment.value = ''
}

const onDeleteComment = async (commentId, index) => {
  await CommentService.deleteComment(commentId)
  await fetchPost(route.params.id)

  // Close the specific dropdown for the comment
  dropdownRefs.value[index]?.hide();
}

const fetchPost = async (postId) => {
  post.value = await PostService.fetchPost(postId)
}

watch(() => route.params.id, async (v) => {
  if (route.params.id) {
    await fetchPost(route.params.id)
  }
}, {immediate: true})
</script>
