var express = require("express");
var path = require('path');
const PORT = process.env.PORT || 5000
var app = express();
const { Pool } = require('pg');
require('dotenv').config();

/* This is the connection information to connect to Heroku */
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({connectionString: connectionString}); 
app.use(express.static(path.join(__dirname, 'public')));

app.set("port", PORT);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get("/displayIngredients", getIngredients);
app.get("/addIngredients", addIngredients);
app.get("/displayRecipes", getRecipes);
app.get("/addRecipes", addRecipe);

app.listen(PORT, function() {
    console.log("Listening on port", PORT);
});

function getIngredients(request, response) {
    const sql = 'SELECT * FROM ingredient';
    pool.query(sql, function(err, result) {
        if (err) {
            console.log("Error in query: ");
            console.log(err);
        }

        console.log("Back from Database with result:");
        console.log("Ingredients are: " + JSON.stringify(result.rows));
        response.render('pages/ingredients', {rows: result.rows});
    });
}

function addIngredients(request, response) {
    const ing_name = request.query.ingredient_name;
    const exp_day = request.query.expiration_day;
    const exp_month = request.query.expiration_month;
    const exp_year = request.query.expiration_year;
    console.log("Ingredient name:" + ing_name);
    console.log("Exp day: " + exp_day);
    console.log("Exp month: " + exp_month);
    console.log("Exp year: " + exp_year);
    const sql2 = 'INSERT INTO ingredient (ingredient_name, expiration_day, expiration_month, expiration_year) VALUES(\''+ ing_name + '\', ' + exp_day + ', ' + exp_month + ', ' + exp_year + ')';
    pool.query(sql2, function(err, result) {
        if (err) {
            console.log("Error in query: ");
            console.log(err);
        }
        console.log("Inserting into database...");
        console.log("Insert successful. Redirecting to ingredients page.");
        response.redirect("/check_ingredients.html");
        
    });
}


function getRecipes(request, response) {
    const sql = 'SELECT * FROM recipe';
    pool.query(sql, function(err, result) {
        if (err) {
            console.log("Error in query: ");
            console.log(err);
        }

        console.log("Back from Database with result:");
        console.log("Ingredients are: " + JSON.stringify(result.rows));
        response.render('pages/recipes', {rows: result.rows});
    });
}

function addRecipe(request, response) {
    const recipe_name = request.query.recipe_name;
    const ingredient_1 = request.query.ingredient_1;
    const ingredient_2 = request.query.ingredient_2;
    const ingredient_3 = request.query.ingredient_3;
    const ingredient_4 = request.query.ingredient_4;
    const ingredient_5 = request.query.ingredient_5;
    const servings = request.query.servings;
    const cooking_instructions = request.query.cooking_instructions;

    console.log("Recipe Name: " + recipe_name);
    console.log("Ingredient 1: " + ingredient_1);
    console.log("Ingredient 2: " + ingredient_2);
    console.log("Ingredient 3: " + ingredient_3);
    console.log("Ingredient 4: " + ingredient_4);
    console.log("Ingredient 5: " + ingredient_5);
    console.log("Servings " + servings);
    console.log("Cooking Instructions: " + cooking_instructions);
    const sql3 = 'INSERT INTO recipe (recipe_name, ingredient_1, ingredient_2, ingredient_3, ingredient_4, ingredient_5, servings, cooking_instructions) VALUES(\'' + recipe_name + '\', ' + ingredient_1 + '\', ' + ingredient_2 + '\', ' + ingredient_3 + '\', ' + ingredient_4 + '\', ' + ingredient_5 + ', ' + servings + '\', ' + cooking_instructions + ')';
    pool.query(sql3, function(err, result) {
        if (err) {
            console.log("Error in query: ");
            console.log(err);
        }
        console.log("Inserting into recipe database...");
        console.log("Insert successful. Redirection to recipe page.");
        response.redirect("/check_recipies.html");

    });


}