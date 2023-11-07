<template>
  <div class="modal_body">
    <div class="modal_item">
      <label for="date">Date</label>
      <input type="date" name="date" id="" v-model="ExpenseData.date" required autocomplete="off" />
    </div>
    <div class="modal_item">
      <label for="cost">Montant</label>
      <input type="number" name="cost" id="" required autocomplete="off" min="1" v-model="ExpenseData.cost" />
    </div>
    <div class="modal_item">
      <label for="wording">Description</label>
      <input type="text" name="wording" id="" required pattern="(?=.*?[A-Z])(?=.*?[0-9])" autocomplete="off"
        v-model="ExpenseData.wording" />
    </div>
    <div class="modal_item">
      <label for="categorie">Categorie</label>
      <select name="categorie" v-model="ExpenseData.category_id">
        <option v-for="category in categories" :key="category._id" :value="category._id">{{ category.name }}</option>
      </select>
    </div>
    <div class="button_modal">
      <button type="submit" @click="addExpense">Enregistrer</button>
    </div>

  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, computed } from "vue";
import { clientHttp } from "../libs/clientHttp"
const token = localStorage.getItem('token');
const isModalOpen = ref(false)
const userConnectedId = ref("")

let userData = ref({
  id: ""
})
const categories = ref([]);
if (token) {
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  console.log(decodedToken);
  userData.value.id = decodedToken.id;

}
const categorieData = ref({
  name: "",
  budget: 0,
  user_id: userData.value.id
});
const ExpenseData = ref({
  date: "",
  cost: 0,
  wording: "",
  category_id: "",
  user_id: userData.value.id
});
onMounted(() => {
  getAllCategories();
})


async function getAllCategories() {
  userConnectedId.value = userData.value.id
  try {
    const response = await clientHttp.get('/categories/getAllCategories')
    if (userConnectedId.value) {
      const userCategories = response.data.filter(category => category.user_id === userConnectedId.value || category.user_id === null)
      categories.value = userCategories
      console.log(response.data)
    } else {
      console.log("l'id de l'utilisateur est manquant ")
    }

  } catch (error) {
    console.log(error)
  }
}
async function addExpense() {
  if (ExpenseData.value.date.trim() === "" || ExpenseData.value.cost === null || ExpenseData.value.wording.trim() === "" || ExpenseData.value.category_id.trim() === "" || ExpenseData.value.user_id.trim() === "") {
    console.log("Veuillez remplir tous les champs")
    return
  } else {
    try {
      const response = await clientHttp.post('/expenses/addExpense', ExpenseData.value)
      ExpenseData.value = {
        date: "",
        cost: 0,
        wording: "",
        category_id: "",
        user_id: userData.value.id
      }
      isModalOpen.value = false
      console.log(response.data)
    }
    catch (error) {
      console.log(error)
    }
  }


}
</script>
<style scoped>
.button_modal button {
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

.modal_header h2,
.modal_item label {
  font-size: 20px;
  user-select: none;
  text-transform: uppercase;
}

.modal_item input {
  width: 100%;
  padding: 10px;
  border-radius: 9px;
  border: 1px solid rgb(140, 126, 126);
  margin: 10px 0;
}

.modal_item {
  width: 100%;
}

.modal_item select {
  width: 100%;
  padding: 10px;
  border-radius: 9px;
  border: 1px solid rgb(140, 126, 126);
  margin: 10px 0;
}

.modal_body {
  padding: 40px;
  max-width: 500px;
}

.modal_close {
  background-color: #17627a;
  border-radius: 5px;
  width: 30px;
  height: 30px;
  color: white;
  border: none;
}

.button.modal {
  display: flex;
  justify-content: center;
}
</style>
