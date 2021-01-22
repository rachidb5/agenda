const mongoose = require('mongoose');
const validator = require('validator')
const bcryptjs = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
});

const UserModel = mongoose.model('User', UserSchema);

class User {
    constructor(body){
        this.body = body
        this.errors = []
        this.user = null
    }

    async login(){
        this.valida()
        if(this.errors.length>0) return;
        this.user = await UserModel.findOne({ email: this.body.email })

        if(!this.user){
            this.errors.push('Usuário inexistente')
            return
        }

        if(!bcryptjs.compareSync(this.body.password, this.user.password)){
            this.errors.push('Senha inválida')
            this.user = null
        }
    }
    async register(){
        this.valida()
        if(this.errors.length > 0) return;

        await this.userExists()

        if(this.errors.length > 0) return;

        const salt = bcryptjs.genSaltSync()
        this.body.password = bcryptjs.hashSync(this.body.password, salt)
        
        
        this.user = await UserModel.create(this.body)
       
    }
    async userExists(){
       const user = await UserModel.findOne({ email: this.body.email})
        if(user) this.errors.push('Usuário já cadastrado')
    }


    valida(){
        this.cleanUp()
        if(!validator.isEmail(this.body.email)) this.errors.push('email inválido')
        if(this.body.password.length < 3 || this.body.password.length > 50 ){
            this.errors.push('Senha invalida')}

    }
    cleanUp(){
        for(const key in this.body){
           if (typeof this.body[key] !== 'string'){
               this.body[key] = ''
           }
        }
        this.body={
            email: this.body.email,
            password: this.body.password
        }
    }
}


module.exports = User;
