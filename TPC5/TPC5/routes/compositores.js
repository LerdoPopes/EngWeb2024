var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET composers listing. */
router.get('/', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get("http://localhost:17001/compositores")
    .then(resp => {
        res.status(200).render('composersListPage', {lista: resp.data, data: d, title: 'Compositores'})
    })
    .catch(erro => {
        res.status(501).render('error', {error: 'Error fetching compositores'})
    })
});

router.get('/registo', function(req, res, next) {
    var d = new Date().toISOString().substring(0, 16)
    res.status(200).render('composerRegisterPage', {data: d, title: 'Register Compositor'})
});

router.get('/:id', function(req, res, next) {
    var d = new Date().toISOString().substring(0, 16)
    axios.get("http://localhost:17001/compositores/" + req.params.id)
        .then(resp => {
            res.status(200).render('composerPage', {compositor: resp.data, data: d})
        })
        .catch(erro => {
            res.status(501).render('error', {error: 'Error fetching compositor'})
        })
    });

router.get('/edit/:id', function(req, res, next) {
    var d = new Date().toISOString().substring(0, 16)
    axios.get("http://localhost:17001/compositores/" + req.params.id)
        .then(resp => {
            res.status(200).render('composerEditPage', {compositor: resp.data, data: d, title: 'Edit Compositor'})
        })
        .catch(erro => {
            res.status(501).render('error', {error: 'Error fetching compositor'})
        })
});

router.get('/delete/:id', function(req, res, next) {
    axios.delete("http://localhost:17001/compositores/" + req.params.id)
        .then(resp => {
            res.status(200).redirect('/compositores')
        })
        .catch(erro => {
            res.status(501).render('error', {error: 'Error deleting compositor'})
        })
});

router.post('/registo', function(req, res, next) {
    axios.post("http://localhost:17001/compositores", req.body)
        .then(resp => {
            res.status(200).redirect('/compositores')
        })
        .catch(erro => {
            res.status(501).render('error', {error: 'Error creating compositor'})
        })
});

router.post('/edit/:id', function(req, res, next) {
    axios.put("http://localhost:17001/compositores/" + req.params.id, req.body)
        .then(resp => {
            res.status(200).redirect('/compositores')
        })
        .catch(erro => {
            res.status(501).render('error', {error: 'Error updating compositor'})
        })
});


module.exports = router;