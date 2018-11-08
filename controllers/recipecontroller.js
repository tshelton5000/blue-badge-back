var router = require('express').Router();
var sequelize = require('../db');
var Recipe = sequelize.import('../models/recipe.js');

router.post('/new', function(req, res){
    let name = req.body.recipe.name;
    let description = req.body.recipe.description;
    let meal = req.body.recipe.meal;
    let picUrl = req.body.recipe.picUrl;
    let instructions = req.body.recipe.instructions;
    let userid = req.user.id;

    Recipe.create({
        name: name,
        description: description,
        meal: meal,
        picUrl: picUrl,
        instructions: instructions,
        userid: userid
    }).then(
        function createSuccess(recipeInfo){
            res.json({
                recipeInfo: recipeInfo
            });
        },
        function createError(err){
            res.send(500, err.message);
        }
    )
})

router.get('/:meal', function(req, res){
    let mealType = req.params.meal;
    let userid = req.user.id;

    Recipe
        .findAll({where: {meal: mealType, userid: userid}})
        .then(
            function findAllSuccess(data){
                res.json(data);
            },
            function findAllError(err){
                res.send(500, err.message);
            }
        )
})

router.put('/:id', function(req, res){
    let mealId = req.params.id;
    let userid = req.user.id;
    let name = req.body.recipe.name;
    let description = req.body.recipe.description;
    let meal = req.body.recipe.meal;
    let picUrl = req.body.recipe.picUrl;
    let instructions = req.body.recipe.instructions;

    Recipe
        .update({
            name: name,
            description: description,
            meal: meal,
            picUrl: picUrl,
            instructions: instructions
        }, {where: {id: mealId, userid: userid}})
        .then(
            function updateSuccess(){
                res.json({
                    newName: name,
                    newDescrip: description,
                    newMeal: meal,
                    newPic: picUrl,
                    newInstrucs: instructions
                })
            }, 
            function updateError(err){
                res.send(500, err.message);
            }
        )
})

router.delete('/:id', function(req, res){
    let mealId = req.params.id;
    let userId = req.user.id;

    Recipe
        .destroy({where: {id: mealId, userid: userId}})
        .then(
            function deleteSuccess(){
                res.send(`You removed the recipe with id: ${mealId}`);
            }, function deleteFailure(err){
                res.send(500, err.message);
            }
        )
})

module.exports = router;