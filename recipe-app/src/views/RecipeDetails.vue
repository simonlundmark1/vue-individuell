<template>
  <div v-if="recipe" class="recipe-details">
    <img :src="recipe.image" :alt="recipe.title">
    <div class="content">
      <h1>{{ recipe.title }}</h1>
      <div class="meta">
        <p>Tillagningstid: {{ recipe.readyInMinutes }} minuter</p>
        <p>Portioner: {{ recipe.servings }}</p>
        <button 
          @click="toggleFavorite" 
          :class="{ 'is-favorite': isFavorite }"
          class="favorite-btn"
        >
          {{ isFavorite ? 'Ta bort från favoriter' : 'Lägg till i favoriter' }}
        </button>
      </div>
      <div class="summary" v-html="recipe.summary"></div>
      <h2>Instruktioner</h2>
      <div class="instructions" v-html="recipe.instructions"></div>
    </div>
  </div>
  <div v-else-if="error" class="error">
    {{ error }}
  </div>
  <div v-else>Laddar...</div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import type { Recipe } from '@/types/Recipe';
import { useFavoriteStore } from '@/stores/favoriteStore';

const route = useRoute();
const recipe = ref<Recipe | null>(null);
const error = ref<string>('');
const favoriteStore = useFavoriteStore();

const isFavorite = computed(() => 
  recipe.value ? favoriteStore.favorites.some(fav => fav.id === recipe.value?.id) : false
);

const toggleFavorite = () => {
  if (!recipe.value) return;
  
  if (isFavorite.value) {
    favoriteStore.removeFromFavorites(recipe.value.id);
  } else {
    favoriteStore.addToFavorites(recipe.value);
  }
};

const fetchRecipe = async () => {
  const id = route.params.id;
  error.value = '';
  
  try {
    const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
    if (!apiKey) {
      throw new Error('API nyckel saknas');
    }

    const response = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Receptet kunde inte hittas');
      } else if (response.status === 402) {
        throw new Error('API kvoten är slut för dagen');
      }
      throw new Error('Kunde inte hämta receptet');
    }

    const data = await response.json();
    if (!data.id || !data.title) {
      throw new Error('Ogiltig data från API');
    }

    recipe.value = data;
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Ett okänt fel uppstod';
    recipe.value = null;
  }
};

onMounted(() => {
  fetchRecipe();
});
</script>

<style scoped>
.recipe-details {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

.recipe-details img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
}

.content {
  margin-top: 2rem;
}

.meta {
  margin: 1rem 0;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 8px;
}

.favorite-btn {
  background: #42b983;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.favorite-btn.is-favorite {
  background: #e74c3c;
}

.summary, .instructions {
  line-height: 1.6;
  margin: 1rem 0;
}
</style> 