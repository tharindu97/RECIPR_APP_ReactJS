import React, { useEffect, useState } from 'react';
import Recipe from './Recipe';
import './App.css';

const  App = () => {

  const APP_ID = 'c21ca05a';
  const APP_KEY = '06b2793c7d7e8c527dd2d10941a06584';


  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken')

  useEffect(() => {
    getRecipes();
  },[query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e =>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }



  return (
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input className="search-bar" type="text" 
          value={search}
          onChange={updateSearch} 
        />
        <button className="search-button" type="submit">Search</button>
      </form>
      { recipes.map(recipe => (
        <Recipe
          key = {recipe.recipe.label} 
          title = {recipe.recipe.label}
          calories = {recipe.recipe.calories}
          image = {recipe.recipe.image}
          ingredients = {recipe.recipe.ingredients}
        />
       ))}
    </div>
  );
}

export default App;

