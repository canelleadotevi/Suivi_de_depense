import { createRouter, createWebHistory } from 'vue-router'
import PlanificationView from '@/views/PlanificationView.vue'
import DepensesView from '@/views/DepensesView.vue'  
import SignupView from '@/views/SignupView.vue'
import AccueilView from '@/views/AccueilView.vue'
import AddCategoryView from '@/views/AddCategoryView.vue'
import HomeView from '@/views/HomeView.vue'
import ExpenseFilterView from '@/views/ExpenseFilterView.vue'
import SigninView from '@/views/SigninView.vue'
import VerifyEmailView from '@/views/VerifyEmailView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [ 
    {
      path:'/',
      name:'home',
      component:HomeView
    },
    {
      path: '/verify',
      name:'verify',
      component: VerifyEmailView
    },
     {
      path:'/signin',
      name: 'signin',
      component: SigninView
    },
    {
      path:'/signup',
      name: 'signup',
      component: SignupView,
      
    } ,
    {
      path: '/accueil',
      name: 'accueil',
      component: AccueilView
    },
    {
      path:'/addcategory',
      name:'addcategory',
      component:AddCategoryView
    },
    {
      path: '/depenses',
      name: 'Depenses',
      component: DepensesView
    },
    {
      path: '/pLanification',
      name: 'Planification',
      component: PlanificationView
    },
    {
      path:'/expensefilter',
      name:'expensefilter',
      component:ExpenseFilterView
    }
   ]
})
 
export default router
