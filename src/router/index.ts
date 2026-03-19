import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../pages/Dashboard.vue";
import DealDetails from "../pages/DealDetails.vue";

const routes = [
  {
    path: "/",
    name: "dashboard",
    component: Dashboard,
  },
  { path: "/deal/:id", name: "deal", component: DealDetails },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
