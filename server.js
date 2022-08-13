const express = require('express');
const app = express();

const DatosArray = require('./api.js');
const DbURL = new DatosArray();

/* ----------- middleware ----------- */

app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//--------------------------------------------
//cargamos el engine

app.set("view engine", "ejs");
app.set("views", "./views");

/* ------------- methods ------------ */

app.get('/', (req, res) => {
    res.render("view", {
        db: DbURL.listarTodo()
    });
}); 

app.post('/api/shorturl',(req,res)=>{
    const {url} = req.body

    if(DbURL.validURL(url)){
        let id = DbURL.guardar({original_url:url});
        res.json({
            "original_url": url,
            "short_url": id
        });
    }else{
        res.json({
            error: 'invalid url'
        });
    }
});

app.get('/api/shorturl/:data',(req,res)=>{
    let {data} = req.params;
    let obj = DbURL.listarPorId(parseInt(data));
    if(obj){
        res.redirect(obj.original_url);
    }else{
        res.json({
            error: 'invalid url'
        });
    }
});


/* ------------ listeners ----------- */

const port=8080;
const server = app.listen(port,()=>console.log('escuchando el puerto'+port));
server.on('error',error=>console.log('error en el server'+error));
