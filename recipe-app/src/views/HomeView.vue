<template>
  <div class="home">
    <h1>Recept</h1>
    <div class="search">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="Sök recept..."
        @input="handleSearch"
      >
    </div>
    
    <div v-if="error" class="error">
      {{ error }}
    </div>
    
    <div class="recipes-grid" v-if="filteredRecipes.length">
      <RecipeCard 
        v-for="recipe in filteredRecipes" 
        :key="recipe.id" 
        :recipe="recipe"
      />
    </div>
    <div v-else-if="loading">Laddar recept...</div>
    <div v-else>Inga recept hittades</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import type { Recipe } from '@/types/Recipe';
import RecipeCard from '@/components/RecipeCard.vue';
import { useDebounce } from '@vueuse/core';

const recipes = ref<Recipe[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const searchQuery = ref('');
const debouncedSearch = useDebounce(searchQuery, 500);

// Computed property for filtered recipes
const filteredRecipes = computed(() => {
  if (!searchQuery.value) return recipes.value;
  const query = searchQuery.value.toLowerCase();
  return recipes.value.filter(recipe => 
    recipe.title.toLowerCase().includes(query)
  );
});

// Computed property for recipe count
const recipeCount = computed(() => recipes.value.length);

const fetchRecipes = async (query: string = '') => {
  loading.value = true;
  error.value = null;
  
  try {
    const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
    if (!apiKey) {
      throw new Error('API nyckel saknas');
    }

    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}&addRecipeInformation=true`
    );

    if (!response.ok) {
      if (response.status === 402) {
        throw new Error('API kvoten är slut för dagen');
      }
      throw new Error('Något gick fel vid hämtning av recept');
    }

    const data = await response.json();
    
    if (!Array.isArray(data.results)) {
      throw new Error('Ogiltig data från API');
    }

    recipes.value = data.results;
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Ett okänt fel uppstod';
    recipes.value = [];
  } finally {
    loading.value = false;
  }
};

const handleSearch = () => {
  fetchRecipes(searchQuery.value);
};

onMounted(() => {
  fetchRecipes();
});
</script>

<style scoped>
.recipes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  padding: 1rem;
}

.search {
  margin: 1rem;
}

input {
  width: 100%;
  max-width: 400px;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.error {
  color: #dc3545;
  padding: 1rem;
  margin: 1rem;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
}
</style> 