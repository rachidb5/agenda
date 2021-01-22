const User = require('../models/userModel')


exports.index = (req,res)=>{
    console.log(req.session.user)
    //if(req.session.user) return res.render('login-logado')
    res.render('login')
}

exports.register = async function(req,res){
    const register = new User(req.body)
    
    try{
        const register = new User(req.body)
    await register.register()

    if(register.errors.length > 0 ){
        req.flash('errors', register.errors)
        req.session.save(function(){
            return res.redirect('back')
        });
         return;
    }
    req.flash('success', 'Usuário criado com sucesso')
        req.session.save(function(){
            return res.redirect('back')
        });
        
    
    } catch(e){
        console.log(e)
       return res.render('404')

    }
}

exports.login = async function(req,res){
    try{
        const login = new User(req.body)
        await login.login()
    
        if(login.errors.length>0){
            req.flash('errors', login.errors)
            req.session.save(function(){
                return res.redirect('back')
            })
            return
        }
      
    
        req.flash('success', 'Você entrou no sistema')
        req.session.user = login.user
        req.session.save(function(){
            return res.redirect('back')
        })
    } catch (e){
        console.log(e)
        return res.render('404')
    }
  
}

exports.logout = function(req,res){
    req.session.destroy()
    res.redirect('/')
}
    