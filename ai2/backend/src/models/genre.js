var Sequelize = require('sequelize');
var SequelizeDB = require('./database');


var Genre = SequelizeDB.define('genre', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
    },
    description: Sequelize.STRING,
    unique: true
},
{
    timestamps: false,
});


const genre1 = new Genre({
    description: 'Fantasia'
  });
  
  const genre2 = new Genre({
    description: 'Romance'
  });

  genre1.save((err, genre) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Género criado com sucesso: ${genre.description}`);
    }
  });
  
  genre2.save((err, genre) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Género criado com sucesso: ${genre.description}`);
    }
  });


Genre.sync();

module.exports = Genre