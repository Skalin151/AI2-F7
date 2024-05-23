var Movie = require('../models/movie');
var Genre = require('../models/genre');
var sequelize = require('../models/database');
const controllers = {}
sequelize.sync()


// Thumbs Up
controllers.movie_create_unique = async(req, res) => {
    const { title } = req.body;
    const existingMovie = await Movie.findOne({
        where: { title: title }
    });

    if (existingMovie) {
        res.status(400).json({
            success: false,
            message: "Filme com este título já existe!"
        });
    } else {
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
            message: "Filme adicionado!",
            data: data
        });
    }
}

controllers.movie_list = async(req, res) => {
    const data = await Movie.findAll({ include: [Genre] })
  .then(function(data) {
        return data;
    })
  .catch(error => {
        return error;
    });
    res.json({ success: true, data: data});
}


//Não funciona, no idea why
controllers.movie_update = async (req, res) => {
    const { id } = req.params;
    const { title, photo, description, genreID } = req.body;
    try {
      const data = await Movie.update({
        title: title,
        photo: photo,
        description: description,
        genreID: genreID
      }, { where: { id: id } });
      
      res.json({ success: true, data: data, message: "Filme atualizado!" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Erro a atualizar filme", error: error.message });
    }
  };

  // Thumbs up
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
    
    res.json({success: act, message: "Filme apagado!"}); //Debug
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