const connection = require("./connections");

const getUserMovies = async (userId) => {
    try {
        const [rows] = await connection.execute('SELECT filme, evaluation FROM `movie-recommendation-app`.Filmes WHERE user_id = ?', [userId]);
        return rows;
    } catch (error) {
        console.error('Erro ao obter os filmes do usuário:', error);
        throw error;
    }
}

const addMovie = async (user_id, filme, evaluation) => {
    try {
      // Verifica se o filme já existe para o usuário
      const existingMovie = await connection.query('SELECT * FROM `movie-recommendation-app`.Filmes WHERE user_id = ? AND filme = ?', [user_id, filme]);
  
      if (existingMovie[0][0] !== undefined) {
        return { success: true, message: 'Filme ja existe no catalogo.' };
      }
  
      // Insere um novo filme
      await connection.query('INSERT INTO `movie-recommendation-app`.Filmes (user_id, filme, evaluation) VALUES (?, ?, ?)', [user_id, filme, evaluation]);
  
      return { success: true, message: 'Filme adicionado com sucesso.' };
    } catch (error) {
      console.error('Erro ao adicionar filme:', error);
      throw error;
    }
  };

module.exports = { getUserMovies, addMovie };

