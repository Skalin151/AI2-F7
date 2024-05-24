var Sequelize = require('sequelize');
var SequelizeDB = require('./database');
const Genre = require('./genre');


Genre.sync();

var Movie = SequelizeDB.define('movie', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
    },
    title: {
        type: Sequelize.STRING,
        
        },
        
        photo: Sequelize.STRING,
        description: Sequelize.STRING,
        genreId: 
        {
        type: Sequelize.INTEGER,
        references: 
        {
        model: Genre,
        key: 'id'
        }
    }
},
{
    timestamps: false,
});

/*
// Criar alguns exemplos de filmes
const movie1 = new Movie({
    title: 'Kung Fu Panda',
    photo: 'https://upload.wikimedia.org/wikipedia/en/9/99/Kung_Fu_Panda_Game_Cover.jpg',
    description: 'Panda que faz Kung Fu',
    genreId: 1
  });
  
  const movie2 = new Movie({
    title: 'Your Lie in April',
    photo: 'https://m.media-amazon.com/images/M/MV5BYThlNWY5ZDgtYTIxNC00ZjdiLWJmNGUtMDFjMDlmZTAzOWFiXkEyXkFqcGdeQXVyNTM4NzAzNjc@._V1_.jpg',
    description: 'Mentiras em abril',
    genreId: 2
  });

  movie1.save((err, movie) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Filme criado com sucesso: ${movie.title}`);
    }
  });
  
  movie2.save((err, movie) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Filme criado com sucesso: ${movie.title}`);
    }
  });

*/


Movie.sync();

Movie.belongsTo(Genre)


module.exports = Movie