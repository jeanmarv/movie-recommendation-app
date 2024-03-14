const moviesModel = require("../models/moviesModel");

const getUserMovies = async (req, res) => {
    const user_id = 1;

    try {
        // Chama a função do modelo para obter os filmes do usuário
        const movies = await moviesModel.getUserMovies(user_id);

        // Retorna os filmes encontrados
        res.status(200).json(movies);
    } catch (error) {
        console.error('Erro ao obter os filmes do usuário:', error);
        res.status(500).send(`Erro interno do servidor. Por favor, tente novamente mais tarde.${user_id}`);
    }
}


module.exports = { getUserMovies };

