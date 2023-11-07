<template>
  <body>
    <header>
      <Navbar></Navbar>
    </header>
    <main>
      <div class="categories_wrapper">
        <section class="categories">
          <div class="container">
            <div class="categorie_wrapper">
              <div class="categorie_content">
                <div class="title">
                  <h2>Mes catégories</h2>
                </div>
                <div class="add_category">
                  <h3>Cliquez ici pour ajouter une catégorie</h3>
                  <button @click="is_open = true">+</button>
                </div>
                <div class="all_categories">

                  <div class="all_categories_content" v-for="( category, index) in categories" :key="index">
                    <div class="div">

                      <div class="trash">
                        <DeleteIcon @click="onDEleteCategoryClick(category._id)"></DeleteIcon>
                      </div>
                      <div class="modify">
                        <ModifyIcon @click="openModal(category._id)"></ModifyIcon>
                      </div>
                      <div class="category_item_content">
                        <div class="category_content_image" style="background-color: #17627a;">
                          <!-- <img src="@/assets/images/user.jpg" /> -->
                        </div>
                        <div class="category_title">
                          <h2>{{ category.name }}</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="overlay" :class="{ open: is_open === true, close: is_open === false }">
                  <div class="modal">
                    <div class="modal_content">
                      <div class="modal_header">
                        <h2>Ajouter une catégorie</h2>
                        <button @click="is_open = false" class="modal_close">
                          X
                        </button>
                      </div>
                      <div class="modal_body">
                        <div class="modal_item">
                          <label for="name">Nom</label>
                          <div class="input_name">
                            <input required type="text" id="" pattern="(?=.*?[A-Z])(?=.*?[a-z])" class=""
                              v-model="category.name" />
                          </div>

                          <div class="button">
                            <button type="submit" class="record" @click="createCategory">Enregistrer</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="overlay" :class="{
                  open: is_opened === true,
                  close: is_opened === false,
                }">
                  <div class="modal">
                    <div class="modal_content">
                      <div class="modal_header">
                        <h2>Modifier</h2>
                        <button @click="is_opened = false" class="modal_close">
                          X
                        </button>
                      </div>
                      <div class="modal_body">
                        <div class="modal_item">
                          <label for="name">Nom</label>
                          <div class="input_name">
                            <input type="text" id="name" name="name" pattern="(?=.*?[A-Z])(?=.*?[a-z])" class="" required
                              v-model="categoryData.name" />
                          </div>

                        </div>
                        <div class="button">
                          <button type="submit" class="record" @click="updateCategory">
                            Enregistrer
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

    </main>
    <footer class="page-footer">
      <Pagefooter></Pagefooter>
    </footer>
  </body>
</template>
<script lang="ts" setup>
import { onMounted, ref, computed } from "vue";
import { clientHttp , setAuthHeader  } from "../libs/clientHttp";
import { useToast } from "vue-toast-notification";
const $toast = useToast();
import DeleteIcon from "@/components/DeleteIcon.vue";
import ModifyIcon from "@/components/ModifyIcon.vue";
import Navbar from "@/components/Navbar.vue";
import Pagefooter from "@/components/Pagefooter.vue";
import { defaultCategories } from "@/api/database"

onMounted(() => {
  createDefaultCategories();
  getAllCategories();
  updateCategory();
})

const is_opened = ref(false);
const is_open = ref();
const category = ref({
  name: "",
  user_id: ""
})
const categories = ref([])
let userData = ref({
  id: "",
})


const token = localStorage.getItem('token');
if (token) {
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  console.log(decodedToken);
  userData.value.id = decodedToken.id;

}
/* async function createDefaultCategories() {
  try {

    defaultCategories.value.forEach((category) => {
      category.user_id = userData.value.id;
    });
    const userId = userData.value.id; 
    const ckeckAndCreate = await clientHttp.post(`/categories/createDefaultCategorie/${userId}`, { defaultCategories: defaultCategories.value })
    console.log('ckeckAndCreate',ckeckAndCreate)
  }catch(error){
    console.log('error',error)
  }
}
 */
 async function createDefaultCategories() {
    try {
      console.log('defaultCategories',defaultCategories.value)
        defaultCategories.value.forEach(category => {
            category.user_id = userData.value.id;
        });
        const userId = userData.value.id; 
        const checkAndCreate = await clientHttp.post(`/categories/createDefaultCategories/${userId}`, { defaultCategories: defaultCategories.value });
    } catch (error) {
      console.log(error)
    }
}

async function createCategory() {
  try {
    const userId = userData.value.id;
    category.value.user_id = userId
    console.log('category.value', category.value)
    if (category.value.name.trim() === "" && userId?.trim() === "") {
      $toast.error('Tous les champs sont requis')
      return
    }
    const res = await clientHttp.post('/categories/createCategory', category.value);
    console.log(res.data)
    category.value.name = ""
    category.value.user_id = ""
    is_open.value = false
    getAllCategories();
  } catch (error) {
    $toast.error("Erreur");
  }
}
const userConnectedId = ref("")
async function getAllCategories() {
  userConnectedId.value = userData.value.id
  try {
    const response = await clientHttp.get('/categories/getAllCategories')
    if (userConnectedId.value) {
      const userCategories = response.data.filter(category => category.user_id === userConnectedId.value || category.user_id === null)
      categories.value = userCategories
    } else {
    }
  } catch (error) {
    console.log(error)
  }
}
const categoryData = ref({
  name: "",
})

const selectedCategoryId = ref<string>('')
const openModal = async (categoryId: string) => {
  is_opened.value = true;
  try {
    const response = await clientHttp.get(`/categories/findCategory/${categoryId}`);
    const categoryDetails = response.data
    categoryData.value.name = categoryDetails.name
    selectedCategoryId.value = categoryDetails._id
  }
  catch (error) {
    console.log(error)
  }
  console.log('categoryId', categoryId)
}
const updateCategory = async () => {
  console.log('selectedCategoryId.value', selectedCategoryId.value)
  if (categoryData.value.name && selectedCategoryId.value) {
    console.log('categoryData.value', categoryData.value)
    try {
      const response = await clientHttp.post(`/categories/updateCategory/${selectedCategoryId.value}`, categoryData.value);
      getAllCategories();
      is_opened.value = false;
      $toast.success(response.data.message)
    } catch (error) {
      $toast.error("Erreur");
    }
  } else {
    $toast.error('tous les champs sont requis')
  }
}
const onDEleteCategoryClick = async (categoryId: string) => {
  try {
    console.log(categoryId)
    const response = await clientHttp.post(`/categories/deleteCategory/${categoryId}`)
    getAllCategories();
    $toast.success(response.data.message)
  } catch (error) {
    $toast.error("Erreur")
  }
}

</script>
<style scoped>
header {
  overflow-x: hidden;
}
</style>
