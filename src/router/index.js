import VueRouter from "vue-router";
import Vue from "vue";

import MyBoards from "../MyBoards.vue";
import Boards from "../Boards.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: MyBoards },
  { path: "/boards/:boardId", component: Boards },
];

const router = new VueRouter({ routes, mode: "history" });

export default router;
