import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import type { Recipe } from '@/types/Recipe';

const STORAGE_KEY = 'favorite-recipes';

export const useFavoriteStore = defineStore('favorites', () => {
  // Initialize from localStorage
  const storedFavorites = localStorage.getItem(STORAGE_KEY);
  const favorites = ref<Recipe[]>(storedFavorites ? JSON.parse(storedFavorites) : []);

  // Watch for changes and update localStorage
  watch(favorites, (newFavorites) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
  }, { deep: true });

  const addToFavorites = (recipe: Recipe) => {
    if (!favorites.value.some(fav => fav.id === recipe.id)) {
      favorites.value.push(recipe);
    }
  };

  const removeFromFavorites = (recipeId: number) => {
    favorites.value = favorites.value.filter(recipe => recipe.id !== recipeId);
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites
  };
}); 