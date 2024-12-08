<template>
  <div class="recipe-card">
    <img :src="recipe.image" :alt="recipe.title">
    <div class="content">
      <h3>{{ recipe.title }}</h3>
      <p>Tillagningstid: {{ recipe.readyInMinutes }} minuter</p>
      <p>Portioner: {{ recipe.servings }}</p>
      <div class="actions">
        <router-link :to="`/recipe/${recipe.id}`" class="view-button">
          Visa recept
        </router-link>
        <button 
          @click="toggleFavorite" 
          :class="{ 'is-favorite': isFavorite }"
        >
          {{ isFavorite ? '❤️' : '🤍' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Recipe } from '@/types/Recipe';
import { useFavoriteStore } from '@/stores/favoriteStore';

const props = defineProps<{
  recipe: Recipe
}>();

const favoriteStore = useFavoriteStore();

const isFavorite = computed(() => 
  favoriteStore.favorites.some(fav => fav.id === props.recipe.id)
);

const toggleFavorite = () => {
  if (isFavorite.value) {
    favoriteStore.removeFromFavorites(props.recipe.id);
  } else {
    favoriteStore.addToFavorites(props.recipe);
  }
};
</script>

<style scoped>
.recipe-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background: white;
  transition: transform 0.2s;
}

.recipe-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.recipe-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.content {
  padding: 1rem;
}

.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
}

.view-button {
  background: #42b983;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
}

button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
}
</style> 