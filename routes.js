const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController')
const contatoController = require('./src/controllers/contatoController')
const userController = require('./src/controllers/userController')

const { loginRequired } = require('./src/middlewares/middleware')

// Rotas da home
route.get('/', homeController.index)

//rotas de login
route.get('/login', userController.index)
route.post('/login/register', userController.register)
route.post('/login/login', userController.login)
route.get('/login/logout', userController.logout)

//rotas de contato
route.get('/contato', loginRequired, contatoController.index)
route.post('/contato/register', loginRequired, contatoController.register)
route.get('/contato/:id', loginRequired, contatoController.editIndex)
route.post('/contato/edit/:id', loginRequired,  contatoController.edit)
route.get('/contato/delete/:id', loginRequired,  contatoController.delete)



module.exports = route
