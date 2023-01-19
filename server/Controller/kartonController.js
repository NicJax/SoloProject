const db = require('../../database/kartonModel');

const kartonController = {};

kartonController.getUsers = (req, res, next) => {
    const sqlString = 'SELECT * FROM "Users"'
    console.log('getting all users');
    db.query(sqlString).then((data) => {
        console.log(data.rows);
        res.locals.allUsers = data.rows;
        return next();
      });
}

module.exports = kartonController;



// starWarsController.getCharacters = (req, res, next) => {
//   // write code here
//   const sqlString = 'SELECT people.*, species.name AS species, planets.name AS homeworld FROM people LEFT OUTER JOIN species ON people.species_id = species._id LEFT OUTER JOIN planets ON people.homeworld_id = planets._id'; 
//   db.query(sqlString)
//   .then((parsedData)  => {
//     res.locals.people = parsedData.rows;
//      return next();
//   }).catch((err) => {
//     console.log('error with .query function');
//   });
//   // imputs should be text, params, and callback
// };

// starWarsController.getSpecies = (req, res, next) => {
//   // write code here
//   console.log(req.query);
//   let specId = [];
//   for (let i = req.url.length - 1; req.url[i] !== '='; i--) {
//     specId.unshift(req.url[i]);
//   }
//   const sqlValues = [req.query.id];
//   const sqlSpecString = 'SELECT species.name, species._id, species.classification, species.average_height, species.average_lifespan, species.language, planets.name AS homeworld FROM species LEFT OUTER JOIN planets ON species.homeworld_id = planets._id WHERE species._id = ($1);';
//   db.query(sqlSpecString, sqlValues)
//   .then((parsedData)  => {
//     res.locals.species = parsedData.rows;
//      return next();
//   }).catch((err) => {
//     console.log('error with .query function');
//   });
//   // imputs should be text, params, and callback
// };

// starWarsController.getHomeworld = (req, res, next) => {
//   // write code here
//   const sqlHmString = 'SELECT planets.*, planets.* FROM planets LEFT OUTER JOIN people ON people.homeworld_id = planets._id WHERE planets._id =';
//   const homeword_id = [req.query.id];
  
//   next();
// };

// starWarsController.getFilm = (req, res, next) => {
//   // write code here

//   next();
// };

// starWarsController.addCharacter = (req, res, next) => {
//   // write code here

//   next();
// };

// module.exports = starWarsController;

// //SELECT title, episode id, director, producer, From films where _id = 1, 
// // log and message in the error handler is helpful- log to the backend, and meesgae to the frontend/ 
// // destructure the properties of the post request body. 
// // INSERT INTO people (name, gender, species_id, birth yera, eye colore, skin color, hair color,mass , height, homeworld_id) VALUES ($1,.... $10) RETURNING * 

// // useNewUrlParser : truel, 
// // const Schema = new Schema 

// // global error handler 
// // .catch(err => {
// //
// //})

// //app.use((err, req, res, next) => 
// // const errorObj = Object.assign({}, default error, err))