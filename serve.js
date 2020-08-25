

//usei o express pra criar e conigurar meu servidor
const express = require("express")
const serve = express()


const db = require("./db")

 //   const ideas = [
    //     {
    //         img:"https://image.flaticon.com/icons/png/512/3003/3003127.png",
    //         title:"Curso de Programação",
    //         category:"Estudo",
    //         description:"Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
    //         url:"https://www.youtube.com/"
    //     },
    //     {
    //         img:"https://image.flaticon.com/icons/png/512/3003/3003162.png",
    //         title:"Curso de exercicios",
    //         category:"Saude",
    //         description:"Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
    //         url:"https://www.youtube.com/"
    //     },
    //     {
    //         img:"https://image.flaticon.com/icons/png/512/3003/3003209.png",
    //         title:"Curso de meditação",
    //         category:"meditação",
    //         description:"Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
    //         url:"https://www.youtube.com/"
    //     },
    //     {
    //         img:"https://image.flaticon.com/icons/svg/864/864811.svg",
    //         title:"karaokê",
    //         category:"Diversão em familia",
    //         description:"Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
    //         url:"https://www.youtube.com/"
    //     },
    //]


//configurar arquivos estáticos (css ,scripts ,imagem)
serve.use(express.static("public"))

// habilitar uso req.body
serve.use(express.urlencoded({extended:true}))

//configurçao do nunjucks
const nunjucks = require("nunjucks")
const { query } = require("express")
nunjucks.configure("views", {
    express: serve,
    noCache: true, //boolean
})

//  deletar um dado da tabela
const methodOverride =require("method-override")
serve.use(methodOverride('_method'));

serve.delete('/:id', (req, res) => {
  const query = `DELETE FROM ideas WHERE id = ?;`;

  const { id } = req.params;

  db.run(query, [id], (err) => {
    if (err) return res.send('Erro no banco de dados!');

    return res.redirect('/ideias');
  });
});


//criei um rota /
// e capturo o pedido do cliente para responder
serve.get("/", function(req,res){
    db.all(`SELECT * FROM ideas`,function(err, rows){
      if (err) return console.log(err)

        const reversedIdeas = [...rows].reverse()
        let lastIdeas =[]
        for( let idea of reversedIdeas){
            if (lastIdeas.length < 2){
                lastIdeas.push(idea)
            }
        }

        return res.render("index.html",{ ideas:lastIdeas })
    })
})
serve.get("/ideias", function(req,res){


    db.all(`SELECT * FROM ideas`,function(err, rows){
        if (err) {
        console.log(err)
        return res.send("Erro no banco de dados!")
    }
    const reversedIdeas = [...rows].reverse()
    return res.render("ideias.html",{ideas: reversedIdeas })

    }) 
}) 

serve.post("/", function(req , res){
   //  inserir dados na tabela
   const query = `
   INSERT INTO ideas(
       image,   
       title,
       category,
       description,
       link
   ) VALUES (?,?,?,?,?);
  `

   const values = [
      req.body.image,
      req.body.title,
      req.body.category,
      req.body.description,
      req.body.link
    
   ]

    db.run(query, values, function(err){
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
            
        } 
        return res.redirect("/ideias")

    })
})


//liguei meu servidor na porta 3000
serve.listen(3000)