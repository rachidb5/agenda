const mongoose = require('mongoose');
const validator = require('validator')

const contatoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, required: false, default: '' },
  email: { type: String, required: false, default: '' },
  telefone: { type: String, required: false, default: '' },
  crieadoEm: { type: Date,  default: Date.now }, 
});

const contatoModel = mongoose.model('contato', contatoSchema);

function contato(body){
    this.body=body
    this.errors = []
    this.contato = null
}

contato.buscaPorId = async function(id){
    if(typeof id!=='string') return
    const user = await contatoModel.findById(id)
    return user
}


contato.prototype.register = async function(){
    this.valida()
    if(this.errors.length>0) return;
    this.contato = await contatoModel.create(this.body)

}
contato.prototype.valida = function(){
    this.cleanUp()
    if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('email inválido')
    if(!this.body.nome) this.errors.push('Nome é campo obrigatorio')
    if(!this.body.email && !this.body.telefone) this.errors.push('Você precisa pelo menos do telefone ou email do contato')
  
}

contato.prototype.cleanUp = function(){
    for(const key in this.body){
       if (typeof this.body[key] !== 'string'){
           this.body[key] = ''
       }
    }
    this.body={
       nome: this.body.nome,
       sobrenome: this.body.sobrenome,
       email: this.body.email,
       telefone: this.body.telefone
    }
}

module.exports = contato;
