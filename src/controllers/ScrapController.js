const cheerio = require('cheerio');
//const request = require('request');
const Word = require('../models/Word');
//const SearchController = require('./SearchController');
const fetch = require('node-fetch');
module.exports = {
  
  async scrap(nome){
    
    const page = 'https://dictionary.cambridge.org/pt/dicionario/ingles/';
    const nome_req = nome;
    const link = page+nome_req;

    var _nome = nome_req;
    var _type="";
    var _def="";
    var _exemple="";

    console.log(link);

    const htmlPage = await this.getHtml(link);
    const $ = cheerio.load(htmlPage);

    var index=0;        
    //Pega type------------------------------------------------------   
    $('span[class="pos dpos"]').each((i, el)=>{
      const item = $(el).attr('title');//.text();
      if(index==0){
        _type=item;
        index++;
      }
      return _type;  
    });
    var index=0;

    //Pega definição---------------------------------------
    $('div[class="def ddef_d db"]').each((i, el)=>{
      const item = $(el).text();
      if(index==0){
        _def=item;
        index++;
      }
      return _def;  
    });
    var index=0;

    //Pega exemplo-----------------------------------------------------------
    $('span[class="eg deg"]').each((i, el)=>{
      const item = $(el).text();
      if(index==0){
        _exemple=item;
        index++;
      }
      return _exemple;  
    });
        
    _def = _def.replace(/:/g, " ");

    return {
      "nome":_nome,
      "type":_type,
      "def":_def,
      "exemple":_exemple,
    };
  },

  async getHtml(link){
    
    const htmlPage = (await fetch(link)).text();
    return htmlPage;
  },

  async store(nome, type, def, exemple){

    console.log("nome: " + nome + "type: " + type + "def: " + def + "exemple: " + exemple);
  
    let word = await Word.findOne({ nome: nome });
  
    if(!word){
  
     word = await Word.create({ nome, type, def, exemple });
  
    }
    
    console.log(word);

    return word;
  
  }
}