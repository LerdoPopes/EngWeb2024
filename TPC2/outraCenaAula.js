var http = require('http');
var meta = require('./auxiliar');
var url = require('url')
var axios = require('axios')
const { myDateTime } = require('./auxiliar');

/*
http.createServer((req,res) => {
    console.log(req.method + " " + req.url);


    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})

    var q = url.parse(req.url,true)
    res.write('True: <pre>'
        + JSON.stringify(q)
        + "</pre>")

    var q2 = url.parse(req.url,false)
    res.write('False: <pre>'
    + JSON.stringify(q2)
    + "</pre>")
    res.end()
}).listen(1902);
*/

http.createServer((req,res) => {
    console.log(req.method + " " + req.url + " " + meta.myDateTime());

    var q = url.parse(req.url,true)

    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})

    if(q.pathname == "/"){
        //Lista cidades
        axios.get("http://localhost:17001/cidades").then(
            (resp) => {
                let lista = resp.data

                res.write("<ul>")
                for(elem in lista){
                    res.write("<li><a href='/cidades/" + lista[elem].nome + ">" + lista[elem].nome + "</a></li>")
                }
                res.write("</ul>")
                res.end();
            }
        ).catch( erro =>{
            console.log("Erro: " + erro)
        }
        )
    }
    else{
        res.write("Não é permitido")
    } 

}).listen(1902);
