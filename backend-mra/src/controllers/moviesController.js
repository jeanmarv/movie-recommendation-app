const moviesModel = require("../models/moviesModel");

const getUserMovies = async (req, res) => {
    const { clientId } = req.params;

    try {
        // Chama a função do modelo para obter os filmes do usuário
        const movies = await moviesModel.getUserMovies(clientId);

        // Retorna os filmes encontrados
        res.status(200).json(movies);
    } catch (error) {
        console.error('Erro ao obter os filmes do usuário:', error);
        res.status(500).send(`Erro interno do servidor. Por favor, tente novamente mais tarde.`);
    }
}

const addMovieCont = async (req, res) => {
    const { user_id, filme, evaluation } = req.body;
  
    try {
      const result = await moviesModel.addMovie(user_id, filme, evaluation);
      res.status(201).send(`Filme adicionado com sucesso ou já existe`);
    } catch (error) {
      res.status(500).send(`Erro interno do servidor. Por favor, tente novamente mais tarde.`);
    }
  };


module.exports = { getUserMovies, addMovieCont };

