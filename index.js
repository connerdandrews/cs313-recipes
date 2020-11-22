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
    });
}