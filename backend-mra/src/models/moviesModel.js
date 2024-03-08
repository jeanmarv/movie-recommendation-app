const connection = require("./connections");

const getUserMovies = async (userId) => {
    try {
        const [rows] = await connection.execute('SELECT * FROM `movie-recommendation-app`.Filmes WHERE user_id = ?', [userId]);
        return rows;
    } catch (error) {
        console.error('Erro ao obter os filmes do usuário:', error);
        throw error;
    }
}

const newUser = async (username, password) =>{
    try {
        const [rows] = await connection.execute('INSERT INTO `movie-recommendation-app`.Users (Username, Password) VALUES (?, ?)', [username, password]);
        return rows.affectedRows > 0; // Retorna true se um novo usuário foi criado com sucesso
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        throw error; // Lança o erro para ser tratado pelo controlador
    }
}

module.exports = { getUserMovies, newUser };

