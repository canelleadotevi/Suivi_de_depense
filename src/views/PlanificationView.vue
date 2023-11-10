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

    <div class="categoriesGraph">
      <div class="categoriesCraph_content">
        <div class="graphTitle">
        <h6>Suivez l'évolution de vos dépenses </h6>
        </div>
        <div class="allGraph">
        <div class="graph" v-for="(category, index) in canvasCategories" :key="index">
          <canvas :id="'myChart' + index"></canvas>
        </div>
      </div>
      </div>
    </div>

  </main>
  <footer>
    <Pagefooter></Pagefooter>
  </footer>
</template>
<script lang="ts" setup>
import { ref, onMounted, watchEffect, nextTick } from "vue";
import { clientHttp } from "../libs/clientHttp"
import { useToast } from "vue-toast-notification";
import Chart from 'chart.js/auto';
const $toast = useToast();
import Navbar from "@/components/Navbar.vue";
import Pagefooter from "@/components/Pagefooter.vue";
const is_opened = ref(false);
const userConnectedId = ref("");
const userData = ref({ id: "" });
const categories = ref([]);
const categoriesWithFinalBudget = ref<Category[]>([]);
const canvasCategories = ref<Category[]>([]);
onMounted(async () => {

  await getAllCategories();

  await loadCategoriesWithFinalBudget();



})
const token = localStorage.getItem('token');

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
      console.log('categories.value', categories.value);

      return categories.value
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
const selectedCategory = ref("");

async function addBudget() {
  try {
    const categoryID = selectedCategory.value;
    console.log('categorieData', categorieData);
    console.log('categoryID', categoryID);
    const response = await clientHttp.post(`/categories/addBudgetToCategory/${categoryID}`, { budget: categorieData.value.budget })
    is_opened.value = false;
    getAllCategories();
  $toast.open({message: response.data.message,position: "top-right", duration: 3000})
  } catch (error) {
  $toast.open({message: "Erreur lors de la mise à jour de la catégorie",position: "top-right", duration: 3000})

  }
}
async function fetchFinalBudget(categoryID: string): Promise<number | string> {
  try {
    const response = await clientHttp.get(`/categories/finalBudget/${categoryID}`);
    console.log('response.data.finalBudget', response.data.finalBudget)
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
  return categoriesWithBudget;
}

const createChart = async (category, canvasId, chartType) => {
  await nextTick();
  const labels = ['Compte', 'Dépense', 'Solde restant'];
  const data = {
    labels: labels,
    datasets: [{
      label: category.name,
      data: [category.budget, category.budget - category.finalBudget, category.finalBudget],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(75, 192, 192)',
        'rgb(255, 205, 86)'
      ]
    }]
  };

  const ctx = document.getElementById(canvasId).getContext('2d');
  new Chart(ctx, {
    type: chartType,
    data: data,
    options: {
    },
  });
};

watchEffect(async () => {
  canvasCategories.value = await loadCategoriesWithFinalBudget()
  canvasCategories.value.forEach((category, index) => {
    createChart(category, 'myChart' + index, 'polarArea');
  });
});





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

.graph {
  width: 300px;
  height: 300px;
}

button.record {
  margin-bottom: 15px;

}


.allGraph {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 50px 0px;
}
.categoriesGraph {
  display: flex;
  justify-content: center;

}

.graphTitle {
  display: flex;
  justify-content: center;

  color: #17627a;
}

.modal_body {
  padding: 20px;
}
</style>
