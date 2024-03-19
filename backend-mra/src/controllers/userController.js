const userModel = require("../models/userModel");
const moviesModel = require("../models/moviesModel");

const validateLoginCont = async (req, res) => {
    const { Username, Password } = req.body;

    try {
        const user = await userModel.validateLogin(Username, Password);

        if (user) {
            const movies = await moviesModel.getUserMovies(user.id);
            if (movies && movies.length > 0) {
                res.status(200).json(movies);
            }
            else {
                res.status(200).json(user.id);
            }
        } else {
            res.status(401).send('Credenciais inválidas. Por favor, tente novamente.');
        }
    } catch (error) {
        console.error('Erro ao verificar credenciais:', error);
        res.status(500).send(`Erro interno do servidor. Por favor, tente novamente mais tarde.`);
    }
}

const newUserCont = async (req, res) => {
    const { Username, Password } = req.body;

    try {
        const newUser = await userModel.newUser(Username, Password);

        if (newUser) {
            res.status(201).send('Usuário criado com sucesso!');
        } else {
            res.status(400).send('Erro ao criar usuário. Por favor, tente novamente.');
        }
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).send('Erro interno do servidor. Por favor, tente novamente mais tarde.');
    }
}

module.exports = { validateLoginCont, newUserCont };
