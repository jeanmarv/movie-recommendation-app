const userModel = require("../models/userModel");

const validateLoginCont = async (req, res) => {
    const { Username, Password } = req.body;

    try {
        const user = await userModel.validateLogin(Username, Password);

        if (user) {
            res.status(200).send('Login bem-sucedido!');
        } else {
            res.status(401).send('Credenciais inválidas. Por favor, tente novamente.');
        }
    } catch (error) {
        console.error('Erro ao verificar credenciais:', error);
        res.status(500).send(`Erro interno do servidor. Por favor, tente novamente mais tarde.${Username}${Password}`);
    }
}

module.exports = { validateLoginCont };
