const userModel = require("../models/userModel");

const validateLoginCont = async (req, res) => {
    const { Username, Password } = req.body;

    try {
        const user = await userModel.validateLogin(Username, Password);

        if (user) {
            res.status(200).send(`Login bem-sucedido!${user}`);
            console.log(user);
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
            res.status(200).send('Usuário criado com sucesso!');
        } else {
            res.status(400).send('Erro ao criar usuário. Por favor, tente novamente.');
        }
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).send('Erro interno do servidor. Por favor, tente novamente mais tarde.');
    }
}

module.exports = { validateLoginCont, newUserCont };
