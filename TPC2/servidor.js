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

    if (req.url == "/cidades") {
        //Lista cidades
        axios.get("http://localhost:17001/cidades?_sort=nome").then(
        (resp) => {
                let lista = resp.data

                res.write("<h1 style='text-align:center;background-color:Blue'>Cidades</h1>");
                res.write("<ul>")
                for(elem in lista){
                    res.write("<li><a href='/cidades/" + lista[elem].id + "'>" + lista[elem].nome + "</a></li>")
                }
                res.write("</ul>")
                res.end();
            }
        ).catch( erro =>{
            console.log("Erro: " + erro);
            res.write("<p>Erro ao obter as cidades: " + erro + "</p>");
            res.end(); 
        }
        )
    }
    else if (req.url.startsWith("/cidades/")){
        
        //Tratamento de cada cidade
        var codigoCidade = req.url.split("/")[2];
        
        axios.get("http://localhost:17001/cidades/" + codigoCidade)
            .then((resp) => {
                var cidade = resp.data;
    
                var cabecalho = `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>Cidades</title>
                        <meta charset="UTF-8">
                    </head>
                    <body>
                `;

                res.write(cabecalho);
                res.write("<h1 style='text-align:center;background-color:Blue'>" + cidade.nome + "</h1>");
                res.write("<p><b>Código da Cidade: </b>"+cidade.id+"</p>")
                res.write("<p><b>População: </b>"+cidade.população+"</p>")
                res.write("<p><b>Destrito: </b>"+cidade.distrito+"</p>")
                res.write("<p><b>Descrição: </b>"+cidade.descrição+"</p>")
                res.write("<h3 style='text-align:center'><a href='/cidades'>Voltar</a></h3>");

                res.write("</body>");
                res.write("</html>");
                res.end();
            })
            .catch((erro) => {
                console.log("Erro: " + erro);
                res.write("<p>Erro ao obter informações da cidade: " + erro + "</p>");
                res.end(); 
            });
        }

}).listen(1902);
