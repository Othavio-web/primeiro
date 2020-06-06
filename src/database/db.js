//importar a dependência do sqlite 3
const sqlite3 = require("sqlite3").verbose()
//criar o objeto que irá fazer operações de DB
const db = new sqlite3.Database("./src/database/database.db")
//utilizar o objeto de BD para nossas operações
module.exports = db
db.serialize(()=>{
    //criar tabela com comandos sql
    db.run(`
        CREATE TABLE IF NOT EXISTS places(
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)
    //inserir dados
    const query = `
    INSERT INTO places(
        image,
        name,
        address,
        address2,
        state,
        city,
        items 
    ) VALUES(?,?,?,?,?,?,?);
`
    const values = [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.cosmeticsdesign-europe.com%2FArticle%2F2019%2F06%2F19%2FRecycling-revolution-Amorepacific-aims-to-recycle-100-of-its-empty-bottles-by-2025&psig=AOvVaw3rBAj_c5Y0uEf7CxqZG-6I&ust=1591320057210000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPC3iPKA5-kCFQAAAAAdAAAAABAD",
        "colectoria",
        "Guilherme Gemballa, jardim américa",
        "Número 260",
        "Santa Catarina",
        "Rio do Sul",
        "Resíduos eletrônicos e Lâmpadas"
    ]
    function afterInsertData(err){
        if(err){
            return console.log(err)
        }else{
            console.log("Cadastrado com sucesso")
            console.log(this)
        }
    }
    db.run(query, values, afterInsertData)
    //consultar os dados
    db.all(`SELECT * FROM places`, function(err, rows){
        if(err){
            return console.log(err)
        }else{
            console.log("Aqui esta o seus registros:")
            console.log(rows)
        }
    })
    //deletar um dado 
    db.run(`DELETE FROM places WHERE id =?`, [1], function(err){
        if(err){
            return console.log(err)
        }else{
            console.log("Registro deletado com sucesso")
            console.log(rows)
        }
    })
})