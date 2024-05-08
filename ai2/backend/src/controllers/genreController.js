var Genre = require('../models/genre');
var sequelize = require('../models/database');
const controllers = {}
sequelize.sync()

controllers.genre_create = async(req, res) => {
    const { description } = req.body;
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
        message: "Genre added!",
        data: data
    });
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
    res.json({ success: true, data: data, message: "Genre updated!"});
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

    res.json({success: act, message: "Genre removed!"})
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