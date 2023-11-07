<template>
  <header>
    <Navbar></Navbar>
  </header>
  <main class="planification_wrapper">
    <div class="wrapper">
      <p>
        <span style="color: #17627a;">Cliquez ici pour ajouter un nouveau budget par catégorie</span>
        <button style="
            background-color: #17627a;
            padding: 10px 18px;
            border: none;
            border-radius: 5px;
            margin-left: 15px;
            color: white;
          " @click="is_opened = true">
          Ajouter
        </button>
      </p>
    </div>
    <div class="overlay" :class="{
      open: is_opened === true,
      close: is_opened === false,
    }">
      <div class="modal">
        <div class="modal_content">
          <div class="modal_header">
            <h2>Ajouter un budget</h2>
            <button @click="is_opened = false" class="modal_close">X</button>
          </div>
          <div class="modal_body">
            <div class="modal_item">
              <label for="name"> Sélectionnez une Catégorie</label>
              <div class="input_name">
                <select v-model="selectedCategory" required>
                  <option v-for="category in categories" :key="category._id" :value="category._id">
                    {{ category.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="modal_item">
              <label for="name">BUDGET</label>
              <div class="input_name">
                <input type="number" id="" pattern="(?=.*?[0-9])" class="" required min="1"
                  v-model="categorieData.budget" />
              </div>
            </div>
            <div class="button">
              <button type="submit" @click="addBudget" class="record">
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="table">
      <table>
        <thead>
          <tr>
            <th>Catégorie</th>
            <th>Comptes</th>
            <th>Solde</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in categoriesWithFinalBudget" :key="category._id">
            <td>{{ category.name }}</td>
            <td>
              {{ category.budget != null ? category.budget : 0 }}
            </td>
            <td>
              {{ category.finalBudget }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="graph">
        <canvas id="myChart"></canvas>
    </div>
  </main>
  <footer>
    <Pagefooter></Pagefooter>
  </footer>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { clientHttp } from "../libs/clientHttp"
const is_opened = ref();
import { useToast } from "vue-toast-notification";
const $toast = useToast();
import Navbar from "@/components/Navbar.vue";
import Pagefooter from "@/components/Pagefooter.vue";
onMounted(() => {
  getAllCategories();
  const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
  loadCategoriesWithFinalBudget();
})
const userConnectedId = ref("")
const token = localStorage.getItem('token');
let userData = ref({
  id: ""
})
const categories = ref([]);
if (token) {
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  console.log(decodedToken);
  userData.value.id = decodedToken.id;

}
async function getAllCategories() {
  userConnectedId.value = userData.value.id
  try {
    const response = await clientHttp.get('/categories/getAllCategories')
    if (userConnectedId.value) {
      const userCategories = response.data.filter(category => category.user_id === userConnectedId.value || category.user_id === null)
      categories.value = userCategories
      loadCategoriesWithFinalBudget();
      console.log(response.data)
    } else {
      console.log("l'id de l'utilisateur est manquant ")
    }

  } catch (error) {
    console.log(error)
  }
}
const categorieData = ref({
  name: "",
  budget: 0,
  user_id: userData.value.id,
});

/*
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/users";
import { useExpenseStore } from "@/stores/expenses";
const { userConnect } = storeToRefs(useUserStore());
const { userData } = useUserStore();
import image9 from "@/assets/images/user.jpg";
import { useCategorieStore } from "@/stores/categories_users";
import { supabase } from "@/lib/supabase";
import { count } from "console";
import { resolve } from "path/posix";
const { initialise } = useCategorieStore();
const { getExpensesCostByCategory } = useExpenseStore();
const newBudget = ref(0);
const userId = ref();
onMounted(async () => {
  await initialise();
  user();
  userData();
  getId();
});
const userCategorie = ref();
const userCategories = ref();
const newIdConnect = ref();
async function userCategorieInSelect() {
  try {
    newIdConnect.value = await getId();

    const { data, error } = await supabase
      .from("categories_users")
      .select("*")
      .eq("id_user", Id.value);

    if (error) {
      console.error("Erreur lors de la récupération des catégories :", error);
      return;
    }
    if (data) {
      let newData = [{}];
      await Promise.all(
        data.map(async (categorie) => {
          const response = await getExpensesCostByCategory(categorie.id);
          if (response) {
            const total_cost = response.reduce(
              (acc, expense) => acc + expense.cost,
              0
            );
            const modifiedcategorie = {
              ...categorie,
              finalBudget:categorieData.value.budget - total_cost,
            };
            newData.push(modifiedcategorie);
          }
        })
      );
      userCategories.value = newData;
      return userCategories;
    } else {
      console.log("Aucune catégorie trouvée pour cet utilisateur.");
    }
  } catch (error) {
    console.error("Une erreur s'est produite :", error);
  }
}
userCategorieInSelect();
const emailUser = ref();
async function user() {
  const userId = await supabase.auth.getUser();
  emailUser.value = userId.data.user?.email;
}
user();
const Id = ref();
async function getId() {
  const user = await supabase.auth.getUser();
  Id.value = user.data.user?.id;
  console.log("je suis l'id", Id.value);
}
getId();

let errors = ref("");
let success = ref("");
*/
const selectedCategory = ref("");

async function addBudget() {
  try {
    const categoryID = selectedCategory.value;
    console.log('categorieData', categorieData);
    console.log('categoryID', categoryID);
    const response = await clientHttp.post(`/categories/addBudgetToCategory/${categoryID}`, { budget: categorieData.value.budget })
    is_opened.value = false;
    getAllCategories();
    $toast.success(response.data.message)
  } catch (error) {
    $toast.error("Erreur lors de la mise à jour de la catégorie")
  }
}
async function fetchFinalBudget(categoryID: string): Promise<number | string> {
  try {
    const response = await clientHttp.get(`/categories/finalBudget/${categoryID}`);
    return response.data.finalBudget;
  } catch (error) {
    console.log(error);
    return "Erreur lors de la récupération du budget";
  }
}

interface Category {
  _id: string;
  name: string;
  budget: number;
  finalBudget: number | string;
}

const categoriesWithFinalBudget = ref<Category[]>([]);

async function loadCategoriesWithFinalBudget() {
  const categoriesWithBudget: Category[] = [];
  for (const category of categories.value) {
    const finalBudget = await fetchFinalBudget(category._id);
    categoriesWithBudget.push({
      _id: category._id,
      name: category.name,
      budget: category.budget,
      finalBudget: finalBudget
    });
  }
  categoriesWithFinalBudget.value = categoriesWithBudget;
}

import Chart from 'chart.js/auto';
const labels = [
    'categories',
    'Compte',
    'Solde restant',
];

const data = {
    labels: labels,
    datasets: [{
        label: 'My First dataset',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [0, 1],
    }]
};

const config = {
    type: 'polarArea',
    data: data,
    options: {}
};

</script>
<style scoped>
p {
  font-size: 24px;
  font-weight: 400px;
  padding: 50px;
  text-align: center;
}

.table {
  z-index: -1;
}
.graph{
  width: 300px;
  height: 300px;
}

/* 


 */

/* .overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #333333d3;
  z-index: 100;
  display: none;
}

.open {
  display: block;
}

.close {
  display: none;
}

.close {
  display: none;
}

.modal {
  position: fixed;
  background-color: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  width: 30%;
  height: 50%;
  z-index: 100;
}

.modal_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}

.modal_header h2,
.modal_item label {
  font-size: 20px;
  user-select: none;
  text-transform: uppercase;
}



.modal_item input,
.modal_item select {
  display: block;
  width: 100%;
  padding: 10px;
  border-radius: 9px;
  border: 1px solid rgb(140, 126, 126);
  margin: 20px 0;
}

.modal_close {
  background-color: #17627a;
  border-radius: 5px;
  width: 30px;
  height: 30px;
  color: white;
  border: none;
  position: absolute;
  right: 60px;
}

.button {
  display: flex;
  justify-content: center;
} */

/* button.record {
  padding: 5px 10px;
  margin-top: 15px;
  border-radius: 9px;
  border: 1px solid transparent;
  background-color: #17627a;
  color: white;
  position: absolute;
} */
button.record {
  margin-bottom: 15px;

}


.modal_body {
  padding: 20px;
}
</style>
