require('dotenv').config();

var express = require('express');
var app = express();
var user = require('./controllers/usercontroller');
var recipe = require('./controllers/recipecontroller');
var sequelize = require('./db');
var bodyParser = require('body-parser');

sequelize.sync();
app.use(bodyParser.json());
app.use(require('./middleware/headers'));

app.use('/recipes', user);

app.use(require('./middleware/validate-session'));

app.use('/recipes/recipe', recipe);

app.listen(process.env.PORT, function(){
    console.log(`'recipes server is listening on ${process.env.PORT}'`);
})