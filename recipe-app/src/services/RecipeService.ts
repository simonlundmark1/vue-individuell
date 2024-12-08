import { Recipe } from '@/types/Recipe';

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const BASE_URL = 'https://api.spoonacular.com/recipes';

export class RecipeService {
  static async searchRecipes(query: string = ''): Promise<Recipe[]> {
    try {
      const response = await fetch(
        `${BASE_URL}/complexSearch?apiKey=${API_KEY}&query=${query}&addRecipeInformation=true`
      );
      
      if (!response.ok) {
        throw new Error('Kunde inte hämta recept');
      }
      
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching recipes:', error);
      throw error;
    }
  }

  static async getRecipeById(id: number): Promise<Recipe> {
    try {
      const response = await fetch(
        `${BASE_URL}/${id}/information?apiKey=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Kunde inte hämta receptet');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching recipe:', error);
      throw error;
    }
  }
} 