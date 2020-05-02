import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Problems from "@/views/Problems.vue";
const Answer = () => import("@/views/Answer.vue");
const Contest = () => import("@/views/Contest.vue");
const Status = () => import("@/views/Status.vue");
const User = () => import("@/views/User.vue");
const ContestCheck = () => import("@/views/ContestCheck.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/problems",
    name: "Problems",
    component: Problems,
  },
  {
    path: "/problems/:pid",
    name: "Answer",
    component: Answer,
  },
  {
    path: "/contest",
    name: "Contest",
    component: Contest,
  },
  {
    path: "/status",
    name: "Status",
    component: Status,
  },
  {
    path: "/user/:uname",
    name: "user",
    component: User,
  },
  {
    path: "/contest/:cid",
    name: "ContestCheck",
    component: ContestCheck,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
