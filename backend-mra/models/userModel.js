const connection = require("./connections");

const validateLogin = async (username, password) => {
    const [rows, fields] = await connection.execute('SELECT * FROM `movie-recommendation-app`.Users WHERE Username = ? AND Password = ?', [username, password]);
    return rows[0];
}

const newUser = async (username, password) =>{
    const [rows, fields] = await connection.execute('INSERT INTO `movie-recommendation-app`.Users (Username, Password) VALUES (?, ?)', [username, password]);
    return rows[0];
}

module.exports = { validateLogin, newUser };

