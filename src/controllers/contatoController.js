const Contato = require('../models/contatoModel')

exports.index = function(req,res){
res.render('contato')
}

exports.register = async function(req,res){

    try{
    const contato = new Contato(req.body)
    await contato.register()

    if(contato.errors.length>0){
        req.flash('errors', contato.errors)
        req.session.save(function(){
            return res.redirect('back')
        })
        return
    }

    req.flash('success', 'Contato salvo com sucesso')
        req.session.save(() => res.redirect(`/contato/${contato.contato._id}`)
        ); return;
    } catch(e){
            console.log(e)
            return res.render('404')
        }

}

exports.editIndex = async function(req,res){
    if(!req.params.id) return res.render('404')

    const contato = await Contato.buscaPorId(req.params.id)
    if(!contato) return res.render('404')

    res.render('contato', { contato })
}
