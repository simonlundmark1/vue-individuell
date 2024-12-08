<template>
  <div class="not-found">
    <h1>404 - Sidan hittades inte</h1>
    <p>Tyvärr kunde vi inte hitta sidan du letar efter.</p>
    <router-link to="/" class="home-link">
      Gå till startsidan
    </router-link>
  </div>
</template>

<script setup lang="ts">
// Ingen logik behövs här
</script>

<style scoped>
.not-found {
  text-align: center;
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
}

h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

p {
  color: #666;
  margin-bottom: 2rem;
}

.home-link {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.home-link:hover {
  background: #3aa876;
}
</style> 