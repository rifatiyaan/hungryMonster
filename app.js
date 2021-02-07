const getFoodDetail = (food) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${food}`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => showFoodGrid(data.meals))
        .catch((err) => showError());
};

const ingredientsData = (food) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${food}`)
        .then((response) => response.json())
        .then((data) => sowIngredients(data.meals[0]));
};

const searchFood = () => {
    const searchFood = document.getElementById("searchBar").value;
    getFoodDetail(searchFood);
    document.getElementById("searchBar").value = "";
};
const showFoodGrid = (data) => {
    data.forEach((food) => {
        const searchedFood = `
        <a onClick="ingredientsData('${food.strMeal}')">       
        <img src="${food.strMealThumb}">
        <h3 class="food-name">${food.strMeal}</h3>
        </a>`;
        const foodDetails = document.createElement("div");
        foodDetails.className = "foodResult-card";
        foodDetails.innerHTML = searchedFood;
        const showFoodResult = document.getElementById("foodResult-card-grid");
        showFoodResult.appendChild(foodDetails);
    });
};

//Error handling
const showError = () => {
    document.getElementById("foodList").style.display = "none";
    document.getElementById("pop-up").style.display = "block";
};

const closeCard = () => {
    const showIngredients = document.getElementById("ingredients");
    showIngredients.style.display = "none";
    const foodContainer = document.getElementById("foodList");
    foodContainer.style.display = "block";
};

const sowIngredients = (data) => {
    const images = data.strMealThumb;
    const foodName = data.strMeal;
    const top = `
    <button onclick="closeCard()" class="close-card">x</button>
    <img src="${images}" alt="">
        <h3>${foodName}</h3>
        <h4>Ingredients</h4>
        
    `;

    const ingredientsList = document.createElement("ul");
    ingredientsList.className = "ingredients-list";
    const ingredient = "strIngredient";
    for (let i = 1; i < 11; i++) {
        const newIngredient = ingredient + i;
        if (data[newIngredient] == "") {
            break;
        } else {
            const list = document.createElement("li");
            list.innerHTML = `
            <li style="list-style:square">${data[newIngredient]}</li>
            `;
            ingredientsList.appendChild(list);
            console.log(data[newIngredient]);
        }
    }
    const showIngredients = document.getElementById("ingredients");
    showIngredients.innerHTML = top;
    showIngredients.appendChild(ingredientsList);
    document.getElementById("foodList").style.display = "none";
    showIngredients.style.display = "block";
    console.log(foodName);
    console.log(data.strIngredient5);
};
