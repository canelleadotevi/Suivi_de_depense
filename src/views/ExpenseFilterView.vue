<template>
<!--   <body>
    <header>
      <Navbar></Navbar>
    </header>

    <main>
      <section class="box_body">
        <div class="container">
          <div class="box_body_content">
            <div class="box_item">
              <div class="title">
                <h1>Historique de toutes vos dépenses</h1>
              </div>
              <div class="chooseDate">
                <label for="">Choisir la date</label>
                <input type="date" v-model="selectedDate" @change="loadExpenses" />
              </div>
              <select v-model="selectedCategory">
                <option value="">Sélectionnez une catégorie</option>
                <option v-for="categorieData in categories_users" :key="categorieData.id_categorie"
                  :value="categorieData.name">
                  {{ categorieData.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </section>
    </main>
    <footer>
      <Pagefooter></Pagefooter>
    </footer>
  </body> -->
</template>
<script lang="ts" setup>
/* import Navbar from "@/components/Navbar.vue";
import Pagefooter from "@/components/Pagefooter.vue";
import { onMounted, ref, computed, watchEffect } from "vue";
import { supabase } from "@/lib/supabase";
import image9 from "@/assets/images/user.jpg";
import { storeToRefs } from "pinia";
import { useCategorieStore } from "@/stores/categories_users";
import { useExpenseStore } from "@/stores/expenses";
const { categories_users } = storeToRefs(useCategorieStore());
const { expenses } = storeToRefs(useExpenseStore());
const { initialise } = useCategorieStore();
const { initialiseExpense } = useExpenseStore();

const userId = ref();
const ExpenseData = ref({
  date: "2023-09-01",
  cost: 0,
  libelle: "",
  id_user: userId.value,
  id_category: 0,
});

const categorieData = storeToRefs(useCategorieStore()).categorieData;
const date1 = new Date(ExpenseData.value.date);
const date2 = new Date(ExpenseData.value.date);
const selectedDate = ref(new Date());
const selectedCategory = ref()
onMounted(async () => {
  await initialise();
  await initialiseExpense();
  loadExpenses();
});
const isSameDate = (date1, date2) => {
  const date1Obj = new Date(date1);
  const date2Obj = new Date(date2);
  console.log("Date1:", date1Obj);
  console.log("Date2:", date2Obj);
  return (
    date1Obj.getFullYear() === date2Obj.getFullYear() &&
    date1Obj.getMonth() === date2Obj.getMonth() &&
    date1Obj.getDate() === date2Obj.getDate()
  );
};
isSameDate(2023 - 8 - 25, 2023 - 9 - 28);
const filteredExpenses = ref<Expense[]>([]);

const loadExpenses = () => {
  if (selectedDate) {

    filteredExpenses.value = expenses.value.filter(

      (expense) =>
        expense.id_category === categorieData?.value?.id_categorie &&
        isSameDate(expense.date, selectedDate.value)
    );
  }
};

watchEffect(() => {
  loadExpenses();
});*/
</script>
<style scoped>
/*
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.container {
  max-width: 1080px;
  margin: 0 auto;
  padding: 0;
}
body {
  z-index: -1px;
}
.box_body_content {
  display: flex;
  justify-content: center;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 5px 15px,
    rgba(0, 0, 0, 0.12) 0px -4px 20px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 8px 10px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  width: 100%;
  padding: 100px 0;
  margin: 60px 0;
  border-radius: 5px;
  background-color: whitesmoke;
}

.title h1 {
  color: #17627a;
  font-size: 24px;
  font-weight: bold;
  padding-bottom: 40px;
}

.all_button {
  display: flex;
  justify-content: space-between;
  padding-top: 15px;
}

button {
  background-color: #17627a;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
}

button a {
  text-decoration: none;
  color: white;
} */
</style>
