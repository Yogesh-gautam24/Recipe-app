const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipedetailscontent = document.querySelector('.recipe-details-content');
const recipeclosebtn = document.querySelector('.recipe-close-btn');

const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "<h2>Retching Recipes......</h2>";
    try {


        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();

        recipeContainer.innerHTML = "";
        response.meals.forEach(meal => {
            const receiptDiv = document.createElement('div');
            receiptDiv.classList.add('recipe');
            receiptDiv.innerHTML = `
        <img src = "${meal.strMealThumb}">
        <h3> ${meal.strMeal}</h3>
         <p><span> ${meal.strArea}</span> Dish</p>
         <p> Belongs to <span> ${meal.strCategory} </span> Category </p>`;


            const button = document.createElement('button');
            button.textContent = "view Recipe";
            receiptDiv.appendChild(button);
            button.addEventListener('click', () => {
                openRecipePopup(meal);
            })
            recipeContainer.appendChild(receiptDiv);
        });
    } catch (error) {
        recipeContainer.innerHTML = `<img style= "max-width:300px"src= "https://images.pexels.com/photos/2882552/pexels-photo-2882552.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" >`;
    }


}
// function to fetch ingredients and measurements
const fetchIngredients = (meal) => {
    // console.log(meal);
    let ingredientsList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`
        } else {
            break;
        }
    }
    return ingredientsList;
}
const openRecipePopup = (meal) => {
    recipedetailscontent.innerHTML = `
    <h2 class = "recipename">${meal.strMeal}</h2>
    <h3>Ingredients:</h3>
    <ul class="ingredientList">${fetchIngredients(meal)}</ul>
    <div class= "recipeInstruction">
    <h3>Instructions:</h3>
    <p >${meal.strInstructions}</p>
</div>
    
    `;

    recipedetailscontent.parentElement.style.display = "block";
}
recipeclosebtn.addEventListener('click', () => {
    recipedetailscontent.parentElement.style.display = "none";

});

searchBtn.addEventListener('click', (e) => {

    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if (!searchInput) {
        recipeContainer.innerHTML = `<h2>Type the mael in the search box.</h2>`;
        return;
    }
    fetchRecipes(searchInput);
    // console.log("buttonclicked");
});
