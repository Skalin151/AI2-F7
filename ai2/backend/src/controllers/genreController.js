var Genre = require('../models/genre');
var sequelize = require('../models/database');
const controllers = {}
sequelize.sync()



controllers.genre_create_unique = async(req, res) => {
    const { description } = req.body;
    const existingGenre = await Genre.findOne({
        where: { description: description }
    });

    if (existingGenre) {
        res.status(400).json({
            success: false,
            message: "Este género já existe!"
        });
    } else {
        const data = await Genre.create({
            description: description
        })
       .then(function(data) {
            return data
        })
       .catch(error => {
            return error;
        })

        res.status(200).json({
            success: true,
            message: "Género adicionado!",
            data: data
        });
    }
}

controllers.genre_list = async(req, res) => {
    const data = await Genre.findAll()
   .then(function(data) {
        return data;
    })
   .catch(error => {
        return error;
    });
    res.json({success: true, data: data});
}

controllers.genre_update = async(req, res) => {
    const { id } = req.params;
    const { description } = req.body;
    const data = await Genre.update({
        description: description
    },{ where: { id: id}})
    .then(function(data) {
        return data;
    })
    .catch(error => {
        return error;
    })
    res.json({ success: true, data: data, message: "Género atualizado!"});
}

controllers.genre_delete = async(req, res) => {
    const { id } = req.params;
    var act = false;
    const data = await Genre.destroy({
        where: {id: id}
    })
    .then(function() {
        act = true
    })
    .catch(error => {
        return error;
    })

    res.json({success: act, message: "Género removido!"})
}


controllers.genre_get = async(req, res) => {
    const { id } = req.params;
    const data = await Genre.findAll({
        where: { id: id }
    })
   .then(function(data) {
        return data;
    })
   .catch(error => {
        return error;
    })
    res.json({ success: true, data: data});
}

module.exports = controllers;