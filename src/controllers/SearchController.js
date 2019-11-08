const Word = require('../models/Word');
const scrap = require('./ScrapController');

module.exports = {

  async show(req, res){

    const { nome_word } = req.headers;

    const word = await Word.findOne({ nome: nome_word });
    
    if(!word){
      var new_word;
      new_word = await scrap.scrap(nome_word)
      //console.log("oia o dado aqui: " + "nome: " + new_word["nome"] + "   type :" + new_word["type"], "   def: " + new_word["def"] + "   exemple: " + new_word["exemple"]);

      new_word = await scrap.store(new_word["nome"],new_word["type"],new_word["def"],new_word["exemple"]);

      console.log(new_word);

      return res.json(new_word);
    }
    else{
      return res.json(word);
    }
  }
  
};
