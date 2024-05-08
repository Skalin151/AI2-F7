var Sequelize = require('sequelize');
var SequelizeDB = require('./database');
const Genre = require('./genre');

Genre.sync();

var Movie = SequelizeDB.define('movie', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
        title: Sequelize.STRING,
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

Movie.sync();

Movie.belongsTo(Genre)


module.exports = Movie