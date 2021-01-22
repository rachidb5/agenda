const Contato = require('../models/contatoModel')

exports.index = async(req, res) => {
  const contatos = await Contato.buscaContato()
  res.render('index', { contatos });
}

