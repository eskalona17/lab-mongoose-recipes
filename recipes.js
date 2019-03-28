const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

const Recipe = require('./models/recipe_schema.js');

const recipeData = require('./data.js');


mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');


  Recipe.collection.drop().then(() => {
    Recipe.create(
      { 
      title: 'Arroz', 
      cuisine: 'Spanish' 
    })
    .then(recipe =>  console.log('The recipe is saved and its value is: ', recipe) )
    .then(() => Recipe.insertMany(recipeData))
    .then(() => Recipe.updateOne(
      { 
      title: "Rigatoni alla Genovese"
    }, 
    { 
      duration: 100 
    }))
    .then(() => Recipe.deleteOne({ 
      title: "Carrot Cake"
    }))
    .then(() => mongoose.connection.close())
    .then(() => console.log('Mongoose default connection disconnected through app termination'))
}).catch(err => { 
  console.log('An error happened:', 
  err) 
});


    
}).catch(err => {
  console.error('Error connecting to mongo', err);
});