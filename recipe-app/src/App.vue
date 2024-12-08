<template>
  <nav>
    <div class="nav-links">
      <router-link to="/">Hem</router-link>
      <router-link to="/favorites">Favoriter</router-link>
    </div>
  </nav>

  <router-view v-slot="{ Component }">
    <Suspense>
      <component :is="Component" />
      <template #fallback>
        <div>Laddar...</div>
      </template>
    </Suspense>
  </router-view>
</template>

<script setup lang="ts">
import { provide } from 'vue';

//API  med defaultvärde
provide('apiKey', import.meta.env.VITE_SPOONACULAR_API_KEY || 'default-key');
</script>

<style>
/* Global styles */
* {
  font-family: 'Roboto', sans-serif;
}

nav {
  padding: 1rem;
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.nav-links {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  gap: 2rem;
}

nav a {
  text-decoration: none;
  color: #2c3e50;
  font-weight: 500;
  font-size: 1.1rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

nav a:hover {
  background-color: #e9ecef;
}

nav a.router-link-active {
  color: #42b983;
  background-color: #e9ecef;
}
</style> 