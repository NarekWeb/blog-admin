import { createRouter, createWebHistory } from "vue-router";
import SideMenu from "@/layouts/side-menu/Main";
import Dashboard from "@/pages/dashboard/Main";
import Login from "@/pages/login/Main";
import guest from "@/router/middlewares/guest";
import PostShow from "@/pages/dashboard/PostShow.vue";

const routes = [
  {
    path: "/",
    component: SideMenu,
    children: [
      {
        path: "/",
        name: "post",
        component: Dashboard,
        meta: {
          title: "Posts",
        },
      },
      {
        path: "/posts",
        name: "posts",
        component: Dashboard,
        meta: {
          title: "Posts",
        },
      },
      {
        path: "/posts/:id",
        name: "postShow",
        component: PostShow,
        meta: {
          title: "Post show",
        },
      },
    ],
    // meta: {
    //   middleware: auth,
    // },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      middleware: [guest],
      title: "ZERO Admin Panel - Login",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 };
  },
});

function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];

  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    context.next(...parameters);

    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title);
  const previousNearestWithMeta = from.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);

  if (nearestWithTitle) {
    document.title = nearestWithTitle.meta.title;
  } else if (previousNearestWithMeta) {
    document.title = previousNearestWithMeta.meta.title;
  }

  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
      to,
    };
    const nextMiddleware = nextFactory(context, middleware, 1);

    return middleware[0]({ ...context, next: nextMiddleware });
  }

  return next();
});

export default router;
