<template>
  <body>
    <header>
      <Navbar></Navbar>
    </header>
    <main>
      <section class="expenses">
        <div class="depenses">
          <div class="container">
            <div class="depenses_content">
              <div class="add_expense">
                <div class="add_expense_title">
                  <span>Veuillez ajouter vos dépenses du jour</span>
                </div>
                <div class="add_button" style="display: flex; gap: 15px">
                  <button @click="is_open = true">Ajouter une dépense</button>
                  <button @click="isModalOpen = true">
                    Filtrer vos dépenses
                  </button>
                </div>
                <div class="table">
                  <table class="" width="80%">
                    <Expensestabheader></Expensestabheader>
                    <tbody style="background-color: gray">
                      <tr v-for=" expense in expenses" :key="expense._id">
                        <td>
                          {{ expense.wording }}
                        </td>
                        <td>
                          {{ expense.cost }}
                        </td>

                        <td>
                          {{ expense.date }}
                        </td>

                        <td>
                          {{ getCategoryName(expense.category_id) }}
                        </td>
                        <td>
                          <div class="div" style="display: flex; justify-content: space-around;">
                            <DeleteIcon @click="onDeleteExpenseClick(expense._id)"></DeleteIcon>

                            <!-- <ModifyIcon @click=""></ModifyIcon> -->
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="add_depenses">
                <div class="overlay_div">
                  <div class="overlay" :class="{
                    open: is_open === true,
                    close: is_open === false,
                  }">
                    <div class="modal">
                      <div class="modal_content">
                        <div class="modal_header">
                          <h2>Ajouter une dépense</h2>
                          <button @click="is_open = false" class="modal_close">
                            X
                          </button>
                        </div>
                        <Modalmain></Modalmain>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
               <div class="add_depenses">
                <div class="overlay_div">
                  <div class="overlay" :class="{
                    open: isModalOpen === true,
                    close: isModalOpen === false,
                  }">
                    <div class="modal">
                      <div class="modal_content">
                        <div class="modal_header">
                          <h2>Vos dépenses</h2>
                          <button @click="isModalOpen = false" class="modal_close">
                            X
                          </button>
                        </div>
                        <div class="modal_body">
                          <div class="modal_item">
                            <label for="date">Choisir la date</label>
                            <input type="date" v-model="selectDate" />
                          </div>
                          <div class="modal_item">
                            <label for="categorie">
                              Sélectionnez une catégorie
                            </label>
                            <select v-model="selectCategory">
                              <option value="null" selected>
                                Choisir une catégorie
                              </option>
                              <option v-for="categorie in  categories" :key="categorie._id" :value="categorie._id">
                                {{ categorie.name }}
                              </option>
                            </select>
                          </div>
                          <div class="button">
                            <button @click="isModalOpen = false" class="box_button">
                              Fermer
                            </button>
                            <button @click="searchExpenses" class="box_button">
                              Filtrer
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> 
            
            </div>
          </div>
        </div>
      </section>
    </main>
    <footer class="page-footer">
      <Pagefooter></Pagefooter>
    </footer>
  </body>
</template>
<script lang="ts" setup>
import ModifyIcon from "@/components/ModifyIcon.vue"
import Navbar from "@/components/Navbar.vue";
import Pagefooter from "@/components/Pagefooter.vue";
import Expensestable from "@/components/Expensestable.vue";
import Modalmain from "@/components/Modalmain.vue";
import Expensestabheader from "@/components/Expensestabheader.vue";
import router from "@/router";
import DeleteIcon from "@/components/DeleteIcon.vue";
import { onMounted, ref, computed } from "vue";
import { clientHttp } from "../libs/clientHttp";
import { useToast } from "vue-toast-notification";
const $toast = useToast();
const myModal = document.getElementById('myModal')
const myInput = document.getElementById('myInput')

const is_opened = ref(false)
onMounted(() => {
  getAllExpense();
  preloadCategoryNames();
  searchExpenses();
})
const categorie = ref("");
const category = {
  id: "",
  name: "",
};
const isModalOpen = ref(false);
const is_open = ref(false);
const userConnectedId = ref("")
const categories = ref([])
let userData = ref({
  id: ""
})
const token = localStorage.getItem('token');
if (token) {
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  console.log(decodedToken);
  userData.value.id = decodedToken.id;

}


const ExpenseData = ref({
  date: "",
  cost: 0,
  wording: "",
  category_id: "",
  user_id: ""
});
const expenses = ref([])
async function getAllExpense() {
  userConnectedId.value = userData.value.id
  try {
    const response = await clientHttp.get('/expenses/getAllExpense')
    $toast.success(response.data.message)
    if (userConnectedId.value) {
      const userExpenses = response.data.filter(expense => expense.user_id === userConnectedId.value)
      return expenses.value = userExpenses
    } else {
      $toast.error("Erreur")
    }
  } catch (error) {
    $toast.error("Erreur")
  }
}

const closeModal = () => {
  isModalOpen.value = false;
};

async function getAllCategories() {
  userConnectedId.value = userData.value.id
  try {
    const response = await clientHttp.get('/categories/getAllCategories')
    if (userConnectedId.value) {
      const userCategories = response.data.filter(category => category.user_id === userConnectedId.value || category.user_id === null)
      return categories.value = userCategories
    } else {
      console.log("l'id de l'utilisateur est manquant ")
    }

  } catch (error) {
    console.log(error)
  }
}
const categoryNames = ref<{ [key: string]: string }>({});

async function preloadCategoryNames() {
  try {
    const categories = await getAllCategories(); // Récupère toutes les catégories
    categories.forEach((category) => {
      categoryNames.value[category._id] = category.name; // Stocke le nom associé à l'ID
    });
  } catch (error) {
    console.error("Erreur lors du préchargement des noms de catégories :", error);
  }
}

// ...

// Modifier la méthode getCategoryName
function getCategoryName(categoryId: string) {
  return categoryNames.value[categoryId] || "Catégorie inconnue";
}


const selectDate = ref("")
const selectCategory = ref("")

 const searchExpenses = async  () => {
  try {
    console.log('selectDate', selectDate)
    console.log('selectCategory', selectCategory)
    const response = await clientHttp.get('/expenses/getExpensesByDateAndCategory', {
      params: {
        selectDate: selectDate.value,
        selectCategory: selectCategory.value
      }
    });

    if (response.status === 200) {
      expenses.value = response.data.expenses 

      selectCategory.value = "";
      selectDate.value = "";
      isModalOpen.value = false
    } else {
      console.log('Erreur : Impossible de récupérer les dépenses');
      return []; 
    }
  } catch (error) {
    console.error('Erreur :', error);
    return []; 
  }
}


const selectedExpenseId = ref<string>('')
const openModal = async (expenseId : string) =>{
  is_opened.value = true;
  try{
    const response = await clientHttp.get(`/categories/findCategory/${expenseId}`);
    const expenseDetails = response.data
    ExpenseData.value.wording = expenseDetails.wording
    ExpenseData.value.date = expenseDetails.date
    ExpenseData.value.cost = expenseDetails.cost
    ExpenseData.value.category_id = expenseDetails.category_id
    selectedExpenseId.value = expenseDetails._id
  }
  catch(error){
    console.log(error)
  }
  console.log('idddd',expenseId)

}
const updateExpense  = async  () =>{
  console.log('ooooo',selectedExpenseId.value)
      if ( ExpenseData.value.wording && ExpenseData.value.cost && ExpenseData.value.date && ExpenseData.value.category_id && ExpenseData.value.user_id   && selectedExpenseId.value) {
        try {
          const response = await clientHttp.put(`/expenses/updateExpense/${selectedExpenseId.value}`,ExpenseData.value); 
          getAllExpense();
          console.log(response.data)
        } catch (error) {
          console.log(error);
        }
      }else{
        console.log('tous les champs sont requis')
      }
} 
const onDeleteExpenseClick = async  (expenseId : string)=>{
try{
  console.log('expenseId',expenseId)
  const response = await  clientHttp.post(`/expenses/deleteExpense/${expenseId}`)
  getAllExpense();
  $toast.success(response.data.message)

}catch(error){
  $toast.error("Erreur")
}
}


</script>

<style scoped>

.add_expense_title span {
  font-size: 20px;
  font-weight: 500px;
  padding: 20px;
}

.depenses {
  padding: 80px;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #333333d3;
  display: none;
  z-index: 100px;
}
.table table {
  width: 800px;
  padding: 15px;
  z-index: -5px;
}

.table {
  display: flex;
  justify-content: center;
}

.button_border {
  display: flex;
  justify-content: space-between;
}

thead {
  border: 1px solid dark ;
  background-color: #17627a;
  color: white;
  font-size: 24px;
}

tr {
  width: 100%;
  border-bottom: 1px solid #17627a;
  background-color: whitesmoke;
}

td {
  color: #17627a;
  font-size: 24px;
  text-align: center;
}

.open {
  display: block;
}

.close {
  display: none;
}

.add_expense_title {
  display: flex;
  justify-content: center;
}

.modal {
  position: absolute;
  background-color: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  max-width: 600px;
  height: 600px;
  z-index: 200px;
}

.modal_header {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.modal_header h2,
.modal_item label {
  font-size: 20px;
  user-select: none;
  text-transform: uppercase;
}

.modal_body {
  padding: 20px;
}

.modal_item input {
  display: block;
  width: 100%;
  padding: 10px;
  border-radius: 9px;
  border: 1px solid rgb(140, 126, 126);
  margin: 10px 0;
}

.modal_item select {
  display: block;
  width: 100%;
  padding: 10px;
  border-radius: 9px;
  border: 1px solid rgb(140, 126, 126);
  margin: 10px 0;
}

.modal_close {
  background-color: #17627a;
  border-radius: 5px;
  width: 30px;
  height: 30px;
  color: white;
  border: none;
}

footer {
  z-index: -20px;
}

.button {
  display: flex;
  justify-content: center;
}

.box_button {
  background-color: #17627a;
  border-radius: 5px;
  padding: 10px 20px;
  border: none;
  margin-right: 15px;
  margin-top: 30px;
  color: white;
}

.add_button {
  display: flex;
  justify-content: center;
  top: 20px;
}

.add_button button {
  padding: 10px 20px;
  margin-bottom: 35px;
  border-radius: 9px;
  border: 1px solid transparent;
  background-color: #17627a;
  color: white;
}

.all_categories {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
}

.category_content {
  width: 250px;
  height: 250px;
  padding: 20px;
  border-radius: 9px;
  border: 2px solid transparent;
  background-color: rgb(86, 186, 86);
  color: white;
}

.category_title h2 {
  padding: 10px;
  font-size: 20px;
  display: flex;
  justify-content: center;
}

.image img {
  width: 100px;
  height: 100px;
  background-color: white;
  padding: 20px;
  border-radius: 50%;
  position: absolute;
  top: 40%;
  left: 20%;
}

.page-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: #17627a;
  padding: 10px 0;
  z-index: -1;
}

.button button {
  padding: 5px 10px;
  margin-top: 15px;
  border-radius: 9px;
  border: 1px solid transparent;
  background-color: #17627a;
  color: white;
}

.modal_header {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}
</style>
