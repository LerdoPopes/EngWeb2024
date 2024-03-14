// alunos_server.js
// EW2024 : 04/03/2024
// by jcr

var http = require('http')
var axios = require('axios')
const { parse } = require('querystring');

var templates = require('./templates.js')          // Necessario criar e colocar na mesma pasta
var static = require('./static.js')             // Colocar na mesma pasta

// Aux functions
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

function getComposersByPeriodo(periodo){
    return axios.get("http://localhost:17001/compositores?periodo=" + periodo)
    .then(resp =>{
        return resp.data
    })
    .catch(erro =>{
        throw erro
    })
}

// Server creation

var alunosServer = http.createServer((req, res) => {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                // GET / --------------------------------------------------------------------
                if(req.url == "/"){
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write(templates.mainPage(d))
                    res.end()
                }
                // GET /compositores --------------------------------------------------------------------
                else if(req.url == "/compositores"){
                    axios.get("http://localhost:17001/compositores?_sort=id")
                        .then(resp => {
                            console.log("entrei no normal get")
                            var compositores = resp.data
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write(templates.composersListPage(compositores,d))
                            res.end()
                        })
                        .catch(erro => {
                            //res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista de alunos</p>")
                            res.write("<p>" + erro + "</p>")
                            res.end()
                        })
                }

                // GET /periodos --------------------------------------------------------------------

                else if(req.url == "/periodos"){
                    axios.get("http://localhost:17001/periodos?_sort=id")
                        .then(resp => {
                            var periodos = resp.data
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write(templates.periodosListPage(periodos,d))
                            res.end()
                        })
                        .catch(erro => {
                            //res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista de alunos</p>")
                            res.write("<p>" + erro + "</p>")
                            res.end()
                        })
                }
                
                // GET /compositores/:id --------------------------------------------------------------------

                else if(/\/compositores\/(C)[0-9]+$/i.test(req.url)){
                    var id = req.url.split("/")[2]
                    axios.get("http://localhost:17001/compositores/" + id)
                    .then(resp =>{
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write(templates.compositorPage(resp.data,d))
                        res.end()
                    })
                    .catch(erro =>{
                        res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write("<p>Não foi possível obter o compositor " + id + "</p>")
                        res.write("<p>" + erro + "</p>")
                        res.end()
                    })

                }
                
                // GET /periodos/:id --------------------------------------------------------------------

                else if(/\/periodos\/[A-Za-z]+$/i.test(req.url)){
                    var periodo = req.url.split("/")[2]
                    getComposersByPeriodo(periodo)
                    .then(resp =>{
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write(templates.periodoPage(periodo,resp,d))
                        res.end()
                    })
                    .catch(erro =>{
                        //res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write("<p>Não foi possível obter o compositor " + periodo + "</p>")
                        res.write("<p>" + erro + "</p>")
                        res.end()
                    })
                }

                // GET /compositores/registo --------------------------------------------------------------------

                else if (req.url == "/compositores/registo"){
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write(templates.compositorFormPage(d))
                    res.end()
                }

                // GET /periodos/registo --------------------------------------------------------------------

                else if(req.url == "/periodos/registo"){
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write(templates.periodoFormPage(d))
                    res.end()
                }
               
                // GET /compositores/edit/:id --------------------------------------------------------------------

                else if(/\/compositores\/edit\/(C)[0-9]+$/i.test(req.url)){
                    var id = req.url.split("/")[3]
                    axios.get("http://localhost:17001/compositores/" + id)
                        .then(resp => {
                            var composer = resp.data
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write(templates.compositorFormEditPage(composer,d))
                            res.end()
                        })
                        .catch(erro => {
                            res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write("<p>Não foi possível obter o aluno " + id + "</p>")
                            res.write("<p>" + erro + "</p>")
                            res.end()
                        })
                }

                // GET /periodos/edit/:id --------------------------------------------------------------------
                
                else if(/\/periodos\/edit\/[A-Za-z]+$/i.test(req.url)){
                    var periodo = req.url.split("/")[3]
                    axios.get("http://localhost:17001/periodos/" + periodo)
                        .then(resp => {
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write(templates.periodoFormEditPage(resp.data,d))
                            res.end()
                        })
                        .catch(erro => {
                            res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write("<p>Não foi possível obter o periodo " + periodo + "</p>")
                            res.write("<p>" + erro + "</p>")
                            res.end()
                        })
                }
               
                // GET /compositores/delete/:id --------------------------------------------------------------------
                
                else if(/\/compositores\/delete\/(C)[0-9]+$/i.test(req.url)){
                    var id = req.url.split("/")[3]
                    axios.delete("http://localhost:17001/compositores/" + id)
                    .then(resp =>{
                        console.log("entrei no normal delete")
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write(templates.composersListPage(resp.data,d))
                        res.end()
                    })
                    .catch(erro =>{
                        res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write("<p>Não foi possível obter a lista de compositores</p>")
                        res.write("<p>" + erro + "</p>")
                        res.end()
                    })
                }
                
                // GET /periodos/delete/:id --------------------------------------------------------------------

                else if(/\/periodos\/delete\/[A-Za-z]+$/i.test(req.url)){
                    var id = req.url.split("/")[3]
                    axios.delete("http://localhost:17001/periodos/" + id)
                    .then(resp =>{
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write(templates.periodosListPage(resp.data,d))
                        res.end()
                    })
                    .catch(erro =>{
                        res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write("<p>Não foi possível obter a lista de periodos</p>")
                        res.write("<p>" + erro + "</p>")
                        res.end()
                    })
                }

                // GET ? -> Lancar um erro

                else{
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write("<p>Método GET não suportado: " + req.url + "</p>")
                    res.write("<p>< a href='/'>Return</a></p>")
                    res.end()
                }
                break

            case "POST":
                
                // POST /compositores --------------------------------------------------------------------
                
                if(req.url == "/compositores"){
                    collectRequestBodyData(req, resultado => {
                        axios.post("http://localhost:17001/compositores?_sort=id",resultado)
                        .then(resp => {
                            var compositores = resp.data
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write(templates.composersListPage(compositores,d))
                            res.end()
                        })
                        .catch(erro => {
                            //res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista de alunos</p>")
                            res.write("<p>" + erro + "</p>")
                            res.end()
                        })
                    })
                }

                // POST /periodos --------------------------------------------------------------------

                else if(req.url == "/periodos"){
                    collectRequestBodyData(req, resultado => {
                        axios.post("http://localhost:17001/periodos?_sort=id",resultado)
                        .then(resp => {
                            var periodos = resp.data
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write(templates.periodosListPage(periodos,d))
                            res.end()
                        })
                        .catch(erro => {
                            //res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista de alunos</p>")
                            res.write("<p>" + erro + "</p>")
                            res.end()
                        })
                    })
                }

                // POST /compositores/registo --------------------------------------------------------------------

                else if(req.url == "/compositores/registo"){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.post("http://localhost:17001/compositores", result)
                                .then(resp => {
                                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                                    res.end("<p>Registo</p> inserido " + JSON.stringify(result) + " com sucesso")
                                })
                                .catch(erro => {
                                    res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'})
                                    res.write("<p>Não foi possível adicionar o compositor</p>")
                                    res.write("<p>" + erro + "</p>")
                                    res.end()
                                })
                        }
                        else{
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write("<p>Erro: Não foi possível obter os dados do formulário</p>")
                            res.write("<p>< a href="/">Return</a></p>")
                            res.end()
                        }
                    })
                }

                // POST /compositores/registo --------------------------------------------------------------------
                
                else if(req.url == "/periodos/registo"){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.post("http://localhost:17001/periodos", result)
                                .then(resp => {
                                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                                    res.end("<p>Registo</p> inserido " + JSON.stringify(result) + " com sucesso")
                                })
                                .catch(erro => {
                                    res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'})
                                    res.write("<p>Não foi possível adicionar o periodo</p>")
                                    res.write("<p>" + erro + "</p>")
                                    res.end()
                                })
                        }
                        else{
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write("<p>Erro: Não foi possível obter os dados do formulário</p>")
                            res.write("<p>< a href="/">Return</a></p>")
                            res.end()
                        }
                    })
                }

                // POST /compositores/edit/:id --------------------------------------------------------------------

                else if(/\/compositores\/edit\/C[0-9]+$/i.test(req.url)){
                    collectRequestBodyData(req, resultado =>{
                        var id = req.url.split("/")[3]
                        axios.put("http://localhost:17001/compositores/" + id, resultado)
                        .then(resp =>{
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write(templates.editConfirmPage(d))
                            res.end()
                        })
                        .catch(erro =>{
                            res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista de compositores</p>")
                            res.write("<p>" + erro + "</p>")
                            res.end()
                        })
                    })
                }

                // POST /periodos/edit/:id --------------------------------------------------------------------

                else if(/\/periodos\/edit\/[A-Za-z]+$/i.test(req.url)){
                    collectRequestBodyData(req, resultado =>{
                        var periodo = req.url.split("/")[3]
                        axios.put("http://localhost:17001/periodos/" + periodo, resultado)
                        .then(resp =>{
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write(templates.editConfirmPage(d))
                            res.end()
                        })
                        .catch(erro =>{
                            res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista de periodos</p>")
                            res.write("<p>" + erro + "</p>")
                            res.end()
                        })
                    })
                }
                
                // POST /compositores/delete/:id --------------------------------------------------------------------

                else if(/\/compositores\/delete\/C[0-9]+$/i.test(req.url)){
                    console.log("entrei")
                    var id = req.url.split("/")[3]
                    axios.delete("http://localhost:17001/compositores/" + id)
                    .then(resp =>{
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write(templates.deleteConfirmPage(d))
                        res.end()
                    })
                    .catch(erro =>{
                        res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write("<p>Não foi possível obter a lista de compositores</p>")
                        res.write("<p>" + erro + "</p>")
                        res.end()
                    })
                }

                // POST /periodos/delete/:id --------------------------------------------------------------------

                else if(/\/periodos\/delete\/[A-Za-z]+$/i.test(req.url)){
                    var periodo = req.url.split("/")[3]
                    axios.delete("http://localhost:17001/periodos/" + periodo)
                    .then(resp =>{
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write(templates.deleteConfirmPage(d))
                        res.end()
                    })
                    .catch(erro =>{
                        res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write("<p>Não foi possível obter a lista de periodos</p>")
                        res.write("<p>" + erro + "</p>")
                        res.end()
                    })
                }

                // POST ? -> Lancar um erro

                else{
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write("<p>Método POST não suportado: " + req.url + "</p>")
                    res.write("<p>< a href="/">Return</a></p>")
                    res.end()

                }
                break

            default: 
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.write("<p>Método não suportado: " + req.method + "</p>")
                res.end()
                break
        }
    }
})

alunosServer.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})
 
