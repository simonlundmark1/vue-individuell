**Receptsökning och visning**

Hemsidan hämtar en lista med recept från ett api och visar upp dom responsivt i form av recipe cards. Sökfunktion fetchar från API och filtrerar ut recepten i realtid. 
Recepten går att lägga till och ta bort som favorit, och går sen att hitta på egen sida. Persistent storage med pinia. Vue router för navigering.


**Hur jag använt mig av AI för att lösa uppgiften:**

Använde mig av chatGPT för att få steg för steg förklaring till hur man strukturerar upp projektet innan jag började. Använde mig sedan av både chatGPT och claude i Cursor för att bygga upp komponenter och ställa
frågor kring hur och varför man använder varje metod. Cursor kunde till och med hitta ett recept-API (spoonacular) som fungerade nästan helt problemfritt.
Fick stundvis förslag på en del deprecated metoder men i det stora hela gick det ganska smärtfritt.

Environment Variables
VITE_SPOONACULAR_API_KEY=your_api_key

https://spoonacular.com/food-api
