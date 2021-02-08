const getFoodDetail = (item) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${item}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showFoodGrid(data.meals))
    .catch((error) => showError());
};

const ingredientsData = (item) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${item}`)
    .then((res) => res.json())
    .then((data) => foodIngredients(data.meals[0]));
};

document
  .getElementById("searchBtn")
  .addEventListener("click", function (event) {
    const searchFood = document.getElementById("searchBar").value;
    getFoodDetail(searchFood);
    document.getElementById("searchBar").value = "";
  });

const showFoodGrid = (data) => {
  data.forEach((item) => {
    const searchedFood = `
        <a onClick="ingredientsData('${item.strMeal}')">       
        <img src="${item.strMealThumb}">
        <h3 class="food-name">${item.strMeal}</h3>
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

const foodIngredients = (data) => {
  const images = data.strMealThumb;
  const foodName = data.strMeal;
  const text = `
    
    <img src="${images}">
        <h3>${foodName}</h3>
        <h4>Ingredients</h4>
    `;

  const ingredientsList = document.createElement("ul");
  ingredientsList.className = "ingredients-list";
  const ingredient = "strIngredient";
  for (let i = 1; i < 10; i++) {
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
  showIngredients.innerHTML = text;
  showIngredients.appendChild(ingredientsList);
  document.getElementById("foodList").style.display = "block";
  showIngredients.style.display = "block";
};
