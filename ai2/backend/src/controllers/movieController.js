var Genre = require('../models/genre');
var Movie = require('../models/movie');
var sequelize = require('../models/database');
const controllers = {}
sequelize.sync()

controllers.movie_create = async(req, res) => {
    const { description, title, photo, genre } = req.body;
    const data = await Movie.create({
        title: title,
        photo: photo,
        description: description,
        genre: genre
    })
    .then(function(data) {
        return data
    })
    .catch(error => {
        return error;
    })

    res.status(200).json({
        success: true,
        message: "Movie added!",
        data: data
    });
}

controllers.movie_list = async(req, res) => {
    const data = await Movie.findAll({ include: [Genre] })
    .then(function(data) {
        return data;
    })
    .catch(error => {
        return error;
    });
    res.json({ success: true, data: data,});
}


controllers.movie_delete = async(req, res) => {
    const { id } = req.params;
    var act = false;
    const data = await Movie.destroy({
        where: {id: id}
    })
    .then(function() {
        act = true;
    })
    .catch(error => {
        return error
    })
    
    res.json({success: act, message: "Movie deleted!"}); //Debug
}

controllers.movie_get = async(req, res) => {
    const { id } = req.params;
    const data = await Movie.findAll({
        include: [Genre],
        where: {id: id}
    })
    .then(function(data) {
        return data;
    })
    .catch(error => {
        return error;
    });

    res.json({ success: true, data: data });
}
module.exports = controllers;


