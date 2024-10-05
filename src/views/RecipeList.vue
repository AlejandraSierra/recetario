<template>
  <v-container>
    <v-row class="mb-8">
      <v-col cols="12">
        <v-btn color="primary" class="router-link-light-text">
          <RouterLink to="/recipe-creator">Crear nueva receta</RouterLink>
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="mb-8">
      <v-col cols="12">
        <h4>Listado de recetas</h4>
      </v-col>
    </v-row>
    <v-row class="mb-8">
      <v-col cols="12">
        <v-data-table :headers="headers" :items="recipes" density="comfortable" hover color="primary">
          <template v-slot:[`item.actions`]="{ item }">
            <a @click="editRecipe(item.id)">Editar</a>
            <span> | </span>
            <a @click="deleteRecipe(item.id)">Eliminar</a>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    search: '',
    headers: [
      { title: 'Receta', key: 'name', width: '55%' },
      { title: 'Categoría', key: 'category', width: '30%' },
      { title: 'Opciones', key: 'actions', wdith: '15%', align: 'end', sortable: false }
    ],
    recipes: []
  }),

  computed: {
  },

  watch: {
  },

  methods: {
    async loadData() {
      try {
        // Realizando la petición GET con Axios
        const response = await axios.get('http://localhost:8080/recipes', {
          headers: {
            'Content-Type': 'application/json'
          },
          // Configuración adicional para CORS si fuera necesario
          withCredentials: false // No enviar cookies ni autenticación
        });

        // Asignando los datos obtenidos al array `recipes`
        this.recipes = response.data.recipes;
      } catch (error) {
        this.error = 'Error fetching recipes'; // Manejar posibles errores
        console.error(error);
      }
    },
    editRecipe(recipeId){
      this.$router.push(`/recipe-creator/${recipeId}`);
    },
    async deleteRecipe(recipeId) {
      try {
        // Realizando la petición DELETE con Axios
        const response = await axios.delete(`http://localhost:8080/recipes/${recipeId}`, {
          headers: {
            'Content-Type': 'application/json'
          },
          // Configuración adicional para CORS si fuera necesario
          withCredentials: false // No enviar cookies ni autenticación
        });

        // Asignando los datos obtenidos al array `recipes`
        this.recipes = response.data;
        console.log(this.recipes);

        // eliminar la receta con id recipeId de la lista de this.recipes

      } catch (error) {
        this.error = `Error deleting the recipe: ${error}`; // Manejar posibles errores
        console.error(error);
      }
    },
  },

  mounted() {
    this.loadData();
  }
}
</script>

<style>
button.router-link-light-text>span.v-btn__content>a {
  text-decoration: none;
  color: white;
}
</style>
