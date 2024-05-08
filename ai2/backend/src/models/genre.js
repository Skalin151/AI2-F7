var Sequelize = require('sequelize');
var SequelizeDB = require('./database');

var Genre = SequelizeDB.define('genre', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
    },
    description: Sequelize.STRING
},
{
    timestamps: false,
});

Genre.sync();

module.exports = Genre