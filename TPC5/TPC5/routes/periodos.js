var express = require('express');
var router = express.Router();
var axios = require('axios')

function getCompositoresByPeriodo(periodo){
    return axios.get("http://localhost:17001/compositores?periodo=" + periodo)
    .then(resp =>{
        return resp.data
    })
    .catch(erro =>{
        throw erro
    })
}

router.get('/', function(req, res, next) {
    var d = new Date().toISOString().substring(0, 16)
    axios.get("http://localhost:17001/periodos")
        .then(resp => {
            res.status(200).render('periodosListPage', {lista: resp.data, data: d, title: 'Periodos'})
        })
        .catch(erro => {
            res.status(501).render('error', {error: 'Error fetching periodos'})
        })
});

router.get('/registo', function(req, res, next) {
    var d = new Date().toISOString().substring(0, 16)
    res.status(200).render('registerPeriodoPage', {title: 'Register Periodo', data: d})
});

router.post('/registo', function(req, res, next) {
    axios.post("http://localhost:17001/periodos", req.body)
        .then(resp => {
            res.status(200).redirect('/periodos')
        })
        .catch(erro => {
            res.status(501).render('error', {error: 'Error fetching periodos'})
        })
});

router.get('/:id', function(req, res, next) {
    var d = new Date().toISOString().substring(0, 16)
    axios.get("http://localhost:17001/periodos/" + req.params.id)
        .then(resp => {
            getCompositoresByPeriodo(req.params.id)
                .then(compositores => {
                    res.status(200).render('periodoPage', {periodo: req.params.id, compositores: compositores, data: d})
                })
                .catch(erro => {
                    res.status(501).render('error', {error: 'Error fetching compositores'})
                })
        })
        .catch(erro => {
            res.status(501).render('error', {error: 'Error fetching periodo'})
        })
});

router.get('/edit/:id', function(req, res, next) {
    var d = new Date().toISOString().substring(0, 16)
    axios.get("http://localhost:17001/periodos/" + req.params.id)
        .then(resp => {
            res.status(200).render('editPeriodoPage', {periodo: resp.data, data: d, title: 'Edit Periodo'})
        })
        .catch(erro => {
            res.status(501).render('error', {error: 'Error fetching periodo'})
        })
});

router.post('/edit/:id', function(req, res, next) {
    axios.put("http://localhost:17001/periodos/" + req.params.id, req.body)
        .then(resp => {
            res.status(200).redirect('/periodos')
        })
        .catch(erro => {
            res.status(501).render('error', {error: 'Error fetching periodos'})
        })
});

router.get('/delete/:id', function(req, res, next) {
    axios.delete("http://localhost:17001/periodos/" + req.params.id)
        .then(resp => {
            res.status(200).redirect('/periodos')
        })
        .catch(erro => {
            res.status(501).render('error', {error: 'Error fetching periodos'})
        })
});

module.exports = router;