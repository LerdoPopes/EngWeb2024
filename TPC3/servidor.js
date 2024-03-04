var http = require('http');
var url = require('url')
var axios = require('axios')

http.createServer((req,res) => {
    console.log(req.method + " " + req.url);
    var q = url.parse(req.url,true)

    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})

    if (req.url == "/films") {
        //Lista Filmes
        axios.get("http://localhost:17001/films?_sort=nome").then(
        (resp) => {
                let lista = resp.data

                res.write("<h1 style='text-align:center;background-color:Blue'>Filmes</h1>");
                res.write("<ul>")
                for(elem in lista){
                    res.write("<li><a href='/films/" + lista[elem].id + "'>" + lista[elem].title + "</a></li>")
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
    else if (req.url.startsWith("/films/")){
        let idFilme = req.url.split("/")[2];
        //Tratamento de cada filme
        axios.get("http://localhost:17001/films/"+idFilme+"")
            .then((resp) => {
                let filme = resp.data;
                let cabecalho = `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>Cidades</title>
                        <meta charset="UTF-8">
                    </head>
                    <body>
                `;
                res.write(cabecalho);

                res.write("<h1 style='text-align:center;background-color:Blue'>" + filme.title + "</h1>");
                res.write("<p><b>Código do Filme: </b>"+filme.id+"</p>")
                res.write("<p><b>Ano do Filme: </b>"+filme.year+"</p>")
                res.write("<p><b>Cast: </b>"+filme.cast+"</p>")
                res.write("<p><b>Genres: </b>"+filme.genres+"</p>")
                res.write("<h3 style='text-align:center'><a href='/films'>Voltar</a></h3>");

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
        else if (req.url == "/cast") {
            //Lista Atores
            axios.get("http://localhost:17001/cast?_sort=actor").then(
            (resp) => {
                    let lista = resp.data
    
                    res.write("<h1 style='text-align:center;background-color:Blue'>Atores</h1>");
                    res.write("<ul>")
                    for(elem in lista){
                        res.write("<li><a href='/cast/" + lista[elem].id + "'>" + lista[elem].actor + "</a></li>")
                    }
                    res.write("</ul>")
                    res.end();
                }
            ).catch( erro =>{
                console.log("Erro: " + erro);
                res.write("<p>Erro ao obter os atores: " + erro + "</p>");
                res.end(); 
            }
            )
        }
        else if (req.url.startsWith("/cast/")){
            let idAtor = req.url.split("/")[2];
            //Tratamento de cada Ator
            axios.get("http://localhost:17001/cast/"+idAtor+"")
                .then((resp) => {
                    let ator = resp.data;
                    let cabecalho = `
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <title>Atores</title>
                            <meta charset="UTF-8">
                        </head>
                        <body>
                    `;
                    res.write(cabecalho);
    
                    res.write("<h1 style='text-align:center;background-color:Blue'>" + ator.actor + "</h1>");
                    res.write("<p><b>Código do Ator: </b>"+ator.id+"</p>")
                    res.write("<h3 style='text-align:center'><a href='/cast'>Voltar</a></h3>");
    
                    res.write("</body>");
                    res.write("</html>");
                    res.end();
                })
                .catch((erro) => {
                    console.log("Erro: " + erro);
                    res.write("<p>Erro ao obter informações do ator: " + erro + "</p>");
                    res.end(); 
                });
        }
        else if (req.url == "/genres") {
            //Lista Genres
            axios.get("http://localhost:17001/genres?_sort=genre").then(
            (resp) => {
                    let lista = resp.data
    
                    res.write("<h1 style='text-align:center;background-color:Blue'>Genres</h1>");
                    res.write("<ul>")
                    for(elem in lista){
                        res.write("<li><a href='/genres/" + lista[elem].id + "'>" + lista[elem].genre + "</a></li>")
                    }
                    res.write("</ul>")
                    res.end();
                }
            ).catch( erro =>{
                console.log("Erro: " + erro);
                res.write("<p>Erro ao obter as genres: " + erro + "</p>");
                res.end(); 
            }
            )
        }
        else if (req.url.startsWith("/genres/")){
            let idGenre = req.url.split("/")[2];
            //Tratamento de cada Genre
            axios.get("http://localhost:17001/genres/"+idGenre+"")
                .then((resp) => {
                    let genre = resp.data;
                    let cabecalho = `
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <title>Genres</title>
                            <meta charset="UTF-8">
                        </head>
                        <body>
                    `;
                    res.write(cabecalho);
    
                    res.write("<h1 style='text-align:center;background-color:Blue'>" + genre.genre + "</h1>");
                    res.write("<p><b>Código da Genre: </b>"+genre.id+"</p>")
                    res.write("<h3 style='text-align:center'><a href='/genres'>Voltar</a></h3>");
    
                    res.write("</body>");
                    res.write("</html>");
                    res.end();
                })
                .catch((erro) => {
                    console.log("Erro: " + erro);
                    res.write("<p>Erro ao obter informações da genre: " + erro + "</p>");
                    res.end(); 
                });
            }

}).listen(1902);
