const connection = require("./connections");

const validateLogin = async (username, password) => {
    const [rows] = await connection.execute('SELECT * FROM `movie-recommendation-app`.Users WHERE Username = ? AND Password = ?', [username, password]);
    return rows[0];
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

module.exports = { validateLogin, newUser };

