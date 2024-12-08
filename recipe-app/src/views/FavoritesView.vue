<template>
  <div class="favorites">
    <h1>Mina favoritrecept</h1>
    
    <div v-if="favorites.length" class="recipes-grid">
      <RecipeCard 
        v-for="recipe in favorites" 
        :key="recipe.id" 
        :recipe="recipe"
      />
    </div>
    <div v-else class="empty-state">
      <p>Du har inga sparade favoritrecept än.</p>
      <router-link to="/" class="home-link">
        Hitta recept att spara
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useFavoriteStore } from '@/stores/favoriteStore';
import RecipeCard from '@/components/RecipeCard.vue';

const favoriteStore = useFavoriteStore();
const favorites = computed(() => favoriteStore.favorites);
</script>

<style scoped>
.favorites {
  padding: 1rem;
}

.recipes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.empty-state {
  text-align: center;
  margin-top: 2rem;
  padding: 2rem;
  background: #f5f5f5;
  border-radius: 8px;
}

.home-link {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

.home-link:hover {
  background: #3aa876;
}
</style> 