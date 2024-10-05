<template>
  <v-container>
    <v-row class="mb-8">
      <v-col cols="12">
        <h4>{{isEdit ? `Editar receta ${recipe.name}` : 'Nueva Receta'}}</h4>
      </v-col>
    </v-row>
    <v-form v-model="recipeForm" ref="recipeForm">
      <v-row class="mb-6">
        <v-col cols="12">
          <h6>Datos generales</h6>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <p class="overline">Nombre</p>
          <v-text-field v-model="recipe.name" placeholder="Ingresa el nombre de la receta" variant="underlined"
            color="primary"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <p class="overline">Descripción corta</p>
          <v-text-field v-model="recipe.shortDescription" placeholder="Ingresa la descripción corta de la receta 0/200"
            variant="underlined" persistent-counter counter="200" color="primary">
          </v-text-field>
        </v-col>
        <v-col cols="12">
          <p class="overline">Descripción</p>
          <v-textarea v-model="recipe.longDescription" placeholder="Ingresa la descripción de la receta"
            variant="underlined" auto-grow color="primary"></v-textarea>
        </v-col>
        <v-col cols="12" sm="6">
          <p class="overline">Categoría</p>
          <v-select 
            v-model="recipe.category" 
            :items="helpers.categories"
            item-title=name
            item-value=id
            placeholder="Selecciona una o varias categorías" 
            chips multiple 
            variant="underlined" 
            closable-chips
            color="primary">
            <template v-slot:selection="{ item, index }">
              <v-chip v-if="index < 5">
                <span>{{ item.name }}</span>
              </v-chip>
              <span v-if="index === 5" class="text-grey text-caption align-self-center">
                (+{{ value.length - 5 }} otros)
              </span>
            </template>
          </v-select>
        </v-col>
        <v-col cols="12" sm="6">
          <p class="overline">Dificultad</p>
          <v-select v-model="recipe.difficult" :items="helpers.difficulties" placeholder="Selecciona la dificultad"
            variant="underlined" color="primary" item-title=name item-value=value>
          </v-select>
        </v-col>
        <v-col cols="12" sm="6">
          <p class="overline">Tiempo de elaboración (minutos)</p>
          <v-text-field v-model="recipe.cookingTime" placeholder="Ingresa el tiempo de elaboración en minutos"
            variant="underlined" color="primary" type="number" min="0" step="10">
          </v-text-field>
        </v-col>
      </v-row>
      <v-row class="my-6">
        <v-col cols="12">
          <h6>Ingredientes</h6>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="2">
          <p class="overline">Porciones</p>
          <v-text-field v-model="recipe.portions" variant="underlined" color="primary" type="number" min="1" max="50">
          </v-text-field>
        </v-col>
      </v-row>
      <v-form v-model="ingredientForm" @submit.prevent="addIngredient">
        <v-row>
          <v-col cols="12" md="2">
            <p class="overline">Cantidad</p>
            <v-text-field v-model="ingredient.amount" variant="underlined" color="primary" type="number" min="0.1">
            </v-text-field>
          </v-col>
          <v-col cols="12" md="2">
            <p class="overline">Unidades</p>
            <v-select v-model="ingredient.units" :items="helpers.ingredientsUnits" placeholder="Unidad"
              variant="underlined" color="primary" item-title=name item-value=id>
            </v-select>
          </v-col>
          <v-col cols="12" md="5">
            <p class="overline">Ingrediente</p>
            <v-text-field v-model="ingredient.name" placeholder="Nombre del ingrediente" variant="underlined"
              color="primary">
            </v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <p class="overline">Alérgenos</p>
            <v-select v-model="ingredient.allergens" :items="helpers.allergens" placeholder="Indica alérgenos" chips
              multiple variant="underlined" closable-chips color="primary" item-title=name item-value=id>
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index < 2">
                  <span>{{ item.title }}</span>
                </v-chip>
                <span v-if="index === 2" class="text-grey text-caption align-self-center">
                  (+{{ value.length - 2 }} otros)
                </span>
              </template>
            </v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col v-if="isEditIngredient" @click="clearIngredientForm" cols="2">
            <v-btn class="ma-0">
              Cancelar edición
            </v-btn>
          </v-col>
          <v-col cols="10">
            <v-btn class="ma-0" type="submit">
              {{ isEditIngredient ? "Actualizar ingrediente" : "Añadir ingrediente +" }}
              <!-- <v-icon
                icon="mdi-plus"
                end
              ></v-icon> -->
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <p>Ingredientes añadidos para {{ recipe.portions }} porciones</p>
          </v-col>
        </v-row>
      </v-form>
      <v-row>
        <v-col cols="12">
          <v-table density="comfortable" theme="primary">
            <thead>
              <tr>
                <th class="text-left">
                  Cantidad
                </th>
                <th class="text-left">
                  Unidades
                </th>
                <th class="text-left">
                  Ingrediente
                </th>
                <th class="text-left">
                  Alérgenos
                </th>
                <th class="text-left">
                  Opciones
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(ingredient, index) in recipe.ingredients" :key="ingredient.name">
                <td>{{ ingredient.amount }}</td>
                <td>{{ getUnitName(ingredient.units) }}</td>
                <td>{{ ingredient.name }}</td>
                <td>{{ mapAllergenNames(ingredient.allergens) }}</td>
                <td><a @click="editIngredient(index)">Editar</a> | <a @click="deleteIngredient(index)">Eliminar</a></td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
      <v-row class="my-6">
        <v-col cols="12">
          <h6>Utensilios</h6>
        </v-col>
      </v-row>
      <v-row class="justify-space-between">
        <v-col cols="6">
          <p class="overline">utensilios</p>
        </v-col>
        <v-col v-if="!allSelected" cols="3">
          <v-text-field ref="searchField" v-model="search" label="Buscar utensilios" hide-details single-line
            variant="underlined" dense></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-list class="d-flex">
            <template v-for="item in cookware">
              <v-list-item class="px-2" v-if="!selected.includes(item)" :key="item.id" :disabled="loading"
                density="compact" base-color="white" rounded="50px" variant="plain" @click="selected.push(item)">
                <!-- <v-list-item-title v-text="item.text"></v-list-item-title> -->
                <v-chip :disabled="loading" variant="outlined" color="success">
                  {{ item.name }}
                </v-chip>
              </v-list-item>
            </template>
          </v-list>
        </v-col>
        <v-col cols="12">
          <p class="overline">utensilios seleccionados</p>
        </v-col>
        <v-col v-for="(selection, i) in selections" :key="selection.name" class="py-1 pe-0" cols="auto">
          <v-chip :disabled="loading" closable @click:close="selected.splice(i, 1)">
            {{ selection.name }}
          </v-chip>
        </v-col>
      </v-row>
      <v-row class="my-6">
        <v-col cols="12">
          <h6>Instrucciones</h6>
        </v-col>
      </v-row>
      <v-form v-model="instructionsForm" @submit.prevent="addInstruction">
        <v-row>
          <v-col cols="12" sm="2">
            <p class="overline">Paso</p>
            <v-text-field v-model="instruction.step" variant="underlined" color="primary" type="number" min="1">
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="10">
            <p class="overline">Instrucción</p>
            <v-text-field v-model="instruction.description" placeholder="Ingresa la instrucción" variant="underlined"
              color="primary">
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col v-if="isEditInstruction" @click="clearInstructionForm" cols="2">
            <v-btn class="ma-0">
              Cancelar edición
            </v-btn>
          </v-col>
          <v-col cols="10">
            <v-btn class="ma-0" type="submit">
              {{ isEditInstruction ? "Actualizar instrucción" : "Añadir instrucción +" }}
              <!-- <v-icon
                icon="mdi-plus"
                end
              ></v-icon> -->
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-table density="comfortable" theme="primary">
              <thead>
                <tr>
                  <th class="text-left">
                    Instrucción
                  </th>
                  <th class="text-left">
                    Opciones
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(instruction, index) in recipe.instructions" :key="instruction.step">
                  <td>{{ instruction.step }}. {{ instruction.description }}</td>
                  <td><a @click="editInstruction(index)">Editar</a> | <a @click="deleteInstruction(index)">Eliminar</a></td>
                </tr>
              </tbody>
            </v-table>
          </v-col>
        </v-row>
      </v-form>
      <v-row class="my-6">
        <v-col cols="12">
          <h6>Acompañamientos</h6>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <p class="overline">Acompañamientos</p>
          <v-textarea v-model="recipe.sideSuggestions"
            placeholder="Ingresa las diferentes opciones de acompañamientos que puede tener esta receta"
            variant="underlined" auto-grow color="primary"></v-textarea>
        </v-col>
      </v-row>
      <v-row class="my-6">
        <v-col cols="12">
          <h6>Multimedia</h6>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <p class="overline">Imagen en miniatura</p>
          <v-text-field v-model="recipe.smallImage" placeholder="Arrastra y suelta una imagen" variant="underlined"
            color="primary">
          </v-text-field>
        </v-col>
        <v-col cols="6">
          <p class="overline">Imagen principal</p>
          <v-text-field v-model="recipe.largeImage" placeholder="Arrastra y suelta una imagen" variant="underlined"
            color="primary">
          </v-text-field>
        </v-col>
        <v-col cols="6">
          <p class="overline">video tutorial</p>
          <v-text-field v-model="recipe.video" placeholder="Ingresa la URL del video tutorial" variant="underlined"
            color="primary">
          </v-text-field>
        </v-col>
      </v-row>
      <template v-if="validationErrorAlert">
        <v-row>
          <v-col cols="12">
            <v-alert
              v-model="validationErrorAlert"
              icon="mdi-firework"
              border="start"
              close-label="Close Alert"
              color="deep-orange-accent-4"
              title="¡Hay un error en tu receta!"
              variant="tonal"
              closable
            >
              {{ validationError }}
            </v-alert>
          </v-col>
        </v-row>
      </template>
      <v-row>
        <v-col cols="12">
          <v-btn @click="goToRecipeList()">
            Cancelar
          </v-btn>
          <v-btn class="me-4" color="primary" @click="validateRecipeForm()">
            {{ isEdit ? 'Guardar Cambios' : 'Crear Receta' }}
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import axios from 'axios';
import { useRoute } from 'vue-router';
export default {
  data: () => ({
    recipeForm: false,
    ingredientForm: false,
    instructionsForm: false,
    email: null,
    password: null,
    loading: false,
    recipe: {},
    ingredient: {},
    allergenNames: '',
    instruction: {},
    helpers: {},
    search: '',
    selected: [],
    recipes: {},
    recipeId: null,
    isEdit: false,
    isEditIngredient: false,
    ingredientsTableData: [],
    editedIngredientIndex: null,
    isEditInstruction: false,
    instructionsTableData: [],
    editedInstructionIndex: null,
    validationError: '',
    validationErrorAlert: false
  }),

  computed: {
    // allSelected() {
    //   return this.selected.length === this.helpers.cookware.length
    // },
    cookware() {
      const search = this.search.toLowerCase()

      if (!search) return this.helpers.cookware

      return this.helpers.cookware.filter(item => {
        const text = item.text.toLowerCase()

        return text.indexOf(search) > -1
      })
    },
    selections() {
      const selections = []

      for (const selection of this.selected) {
        selections.push(selection)
      }

      return selections
    }
  },

  watch: {
    selected() {
      this.search = ''
    },
  },

  methods: {
    checkRecipeId() {

    },
    async loadEditingRecipeData(recipeId) {
      try {
        let url = `http://localhost:8080/recipes/${recipeId}`;
        // Realizando la petición GET con Axios
        const response = await axios.get(url, {
          headers: {
            'Content-Type': 'application/json; charset=utf8',
          },
          // Configuración adicional para CORS si fuera necesario
          withCredentials: false // No enviar cookies ni autenticación
        });
        
        this.formatExistingRecipe(response.data.recipe);
        
      } catch (error) {
        this.error = 'Error fetching recipes'; // Manejar posibles errores
        console.error(error);
      }
    },
    async loadHelpers() {
      try {
        let url = 'http://localhost:8080/recipes/helpers';
        // Realizando la petición GET con Axios
        const response = await axios.get(url, {
          headers: {
            'Content-Type': 'application/json; charset=utf8',
          },
          // Configuración adicional para CORS si fuera necesario
          withCredentials: false // No enviar cookies ni autenticación
        });
        
        // Asignando los datos obtenidos al array `recipes`
        this.helpers = response.data.helpers;
      } catch (error) {
        this.error = 'Error fetching recipes'; // Manejar posibles errores
        console.error(error);
      }
    },
    formatExistingRecipe(existingRecipeData){
      // Asignando los datos obtenidos al array `recipes`
      this.recipe = existingRecipeData;
      this.loadRecipeCookware();
    },
    createRecipe(){
      this.axios.post('http://localhost:8080/recipeeeees', this.recipe)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
          this.loading = false
        });
    },
    updateRecipe(recipeId){
      console.log(recipeId);
      this.axios.put(`http://localhost:8080/recipeeeees/${recipeId}`, this.recipe)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
          this.loading = false
        });
    },
    required(v) {
      return !!v || 'Field is required'
    },
    mapAllergenNames(ingredientAllergens){
      if(ingredientAllergens && ingredientAllergens.length > 0){
        return ingredientAllergens.map(allergenId => {
          const allergen = this.helpers.allergens.find(a => a.id === allergenId);
          return allergen ? allergen.name : '';
        }).join(', ');
      }else{
        return 'Ninguno';
      }
    },
    loadRecipeCookware() {
      this.selected = this.recipe.cookware.map((id) => {
        return this.helpers.cookware.find((item) => item.id === id);
      });
    },
    getUnitName(ingredientUnitId){
      const unit = this.helpers.ingredientsUnits.find(a => a.id === ingredientUnitId);
      return unit ? unit.name : 0;
    },
    addIngredient() {
      if(this.isEditIngredient){
        this.recipe.ingredients[this.editedIngredientIndex] = this.ingredient;
        this.isEditIngredient = false;
        this.editedIngredientIndex = null;
      }else{
        this.recipe.ingredients.push(this.ingredient);
      }
      
      this.clearIngredientForm();
    },
    clearIngredientForm(){
      if(this.isEditIngredient){
        this.isEditIngredient = false;
      }

      this.ingredient = {
        amount: '',
        units: '',
        name: '',
        allergens: []
      }
    },
    deleteIngredient(ingredientIndex){
      this.recipe.ingredients.splice(ingredientIndex, 1);
    },
    editIngredient(ingredientIndex){
      this.isEditIngredient = true;
      this.editedIngredientIndex = ingredientIndex;
      this.ingredient = { ...this.recipe.ingredients[ingredientIndex] };
    },
    addInstruction() {
      if(this.isEditInstruction){
        this.recipe.instructions[this.editedInstructionIndex] = this.instruction;
        this.isEditInstruction = false;
        this.editedInstructionIndex = null;
      }else{
        this.recipe.instructions.push(this.instruction);
      }
      this.clearInstructionForm();
    },
    clearInstructionForm(){
      if(this.isEditInstruction){
        this.isEditInstruction = false;
      }

      this.instruction = {
        step: '',
        description: '',
      }
    },
    deleteInstruction(instructionIndex){
      this.recipe.instructions.splice(instructionIndex, 1);
    },
    editInstruction(instructionIndex){
      this.isEditInstruction = true;
      this.editedInstructionIndex = instructionIndex;
      this.instruction = { ...this.recipe.instructions[instructionIndex] };
    },
    goToRecipeList() {
      this.$router.push(`/recipe-list`);
    },
    validateRecipeForm() {
      this.validationError = '';
      this.validationErrorAlert = false;
      const recipe = this.recipe;

      const textFields = [recipe.name, recipe.shortDescription, recipe.longDescription, recipe.sideSuggestions, recipe.smallImage, recipe.largeImage, recipe.video];
      textFields.forEach(recipeItem => {
        if(recipeItem === ''){
          this.validationErrorAlert = true;
          this.validationError = 'Ningun campo de texto puede estar vacío: Revisa los campos Nombre, Descripciones, Tiempo de elaboración, Acompañamientos y Multimedia.';
        }
      });

      const selectFields = [recipe.category, recipe.difficult, recipe.cookware];
      selectFields.forEach(recipeItem => {
        if(recipeItem.length < 1){
          this.validationErrorAlert = true;
          this.validationError = 'Ningun campo de selección puede estar vacío: Revisa los campos Categorías, Dificultad y Utensilios.';
        }
      });

      if(recipe.portions < 1){
        this.validationErrorAlert = true;
        this.validationError = 'Tu receta debe tener una cantidad de porciones válida: Entre 1 y 50.';
      }

      const ingredientsAmount = Object.values(recipe.ingredients).length;

      if(ingredientsAmount < 1){
        this.validationErrorAlert = true;
        this.validationError = 'Tu receta debe tener ingredientes.';
      }

      if(ingredientsAmount > 0){
        recipe.ingredients.forEach(ingredient => {

          if(Object.entries(ingredient).length == 0){
            this.validationErrorAlert = true;
            this.validationError = 'Todos tus ingredientes deben tener datos válidos: Cantidad, Unidad y Nombre.';
          }
          if(ingredient.amount == '' || ingredient.amount <= 0 ){
            this.validationErrorAlert = true;
            this.validationError = 'Comprueba que todos tus ingredientes tengan una cantidad válida: mayor a 0.1.';
          }
          if(ingredient.name == ''){
            this.validationErrorAlert = true;
            this.validationError = 'Comprueba que todos tus ingredientes tengan un nombre asignado';
          }
          if(ingredient.units == '' || ingredient.units < 0){
            this.validationErrorAlert = true;
            this.validationError = 'Comprueba que todos tus ingredientes tengan una unidad de cantidad asignada.';
          }
        });
      }

      const instructionsAmount = Object.values(recipe.instructions).length;

      if(instructionsAmount < 1){
        this.validationErrorAlert = true;
        this.validationError = 'Tu receta debe tener instrucciones.';
      }

      if(instructionsAmount > 0){
        recipe.instructions.forEach(instruction => {

          if(Object.entries(instruction).length == 0){
            this.validationErrorAlert = true;
            this.validationError = 'Todas tus instrucciones deben tener datos válidos: Paso e Instrucción.';
          }
          if(instruction.step == ''){
            this.validationErrorAlert = true;
            this.validationError = 'Comprueba que todas tus instrucciones tengan un paso.';
          }
          if(instruction.description == ''){
            this.validationErrorAlert = true;
            this.validationError = 'Comprueba que todos tus ingredientes tengan una descripción.';
          }
        });
      }

      if(this.validationErrorAlert == false && this.isEdit){
        this.updateRecipe(this.recipeId);
      }

      if(this.validationErrorAlert == false && !this.isEdit){
        this.createRecipe()
      }
    }
  },

  mounted(){
    const route = useRoute();
    this.loadHelpers();
    
    if(route.params.id){
      this.recipeId = route.params.id;
      this.isEdit = true;
      this.loadEditingRecipeData(this.recipeId);
    }
  }
}
</script>

<style>
.v-text-field .v-field--no-label input,
.v-text-field .v-field--active input,
.v-textarea textarea,
.v-select .v-field .v-field__input {
  padding: 10px;
}
</style>
