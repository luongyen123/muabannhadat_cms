import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
import Dashboard from "@/pages/Dashboard.vue";
import TableList from "@/pages/TableList.vue";
import Login from "@/pages/Login.vue";
import User from "@/pages/User.vue"
const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard,
        meta: {permisions: 1}
      },
      {
        path: "table-list",
        name: "table-list",
        component: TableList,
        meta: {permisions: 1}
      },
      {
        path: "user-list",
        name: "user-list",
        component: User,
        meta: {permisions: 1}
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    name:"Login"
  },
  { path: "*", component: NotFound }
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
