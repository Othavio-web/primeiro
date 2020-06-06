const express = require("express")
const server  = express()
//pegar o banco de dados
const db = require("./database/db.js")
//configurar pasta publica
server.use(express.static("public"))
//habilitar o uso do req.body na aplicação
server.use(express.urlencoded({extended:true}))
//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})
//ligar servidor
server.listen(3000)
//configurar home (caminhos da aplicação)
//req - requisição
//res- resposta
server.get("/", (req, res)=>{
    return res.render("index.html", {title: "Titulo"})
})
server.get("/create-point", (req, res)=>{
    //strings das urls
    //console.log(res.query)
    return res.render("create-point.html", {saved: true})
})
server.post("/save-point", (rec, res)=>{
    //rec.body: corpo do formulario
    //inserir dados no BD
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
        rec.body.image,
        rec.body.name,
        rec.body.addres,
        rec.body.address2,
        rec.body.state,
        rec.body.city,
        rec.body.items
    ]
    function afterInsertData(err){
        if(err){
            return console.log(err)
        }else{
            console.log("Cadastrado com sucesso")
            console.log(this)
        }
        return res.render("create-pont.html", {saved:true})
    }
    db.run(query, values, afterInsertData)
        
    
})
server.get("/search", (req, res)=>{
    const search = req.query.search
    if(search = ""){
        return res.render("search-results.html", {total:0})
    }
    //pegar os dados do DB
    db.all(`SELECT * FROM places WHERE city like '%${search}%'`, function(err, rows){
        if(err){
            console.log(err)
            return res.send("erro no cadastro")
        }else{
            console.log("Aqui esta o seus registros:")
            console.log(rows)
        }
        //mostrar a pagina html com os dados do DB
        return res.render("search-results.html", {places: rows, total: total})
        const total = rows.length
    })
    
})