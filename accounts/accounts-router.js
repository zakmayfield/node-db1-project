const express = require('express');
const db = require('../data/dbConfig');

const router = express.Router();

router.get('/', (req, res) => {
  //get accounts
  db('accounts')
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "Could not retrieve accounts" })
    })
})

router.get('/:id', (req, res) => {
  db('accounts').where({ id: req.params.id })
    .first()
    .then(account => {
      res.status(200).json(account);
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "Could not retrieve that account" })
    })
})

router.post('/', (req, res) => {
  db('accounts').insert(req.body, 'id')
    .then(ids => {
      res.status(200).json(ids);
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "Could not add that account" })
    })
})

router.put('/:id', (req, res) => {
  db('accounts').where({ id: req.params.id }).update(req.body)
    .then(count => {
      res.status(201).json(count);
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "Could not update that account" })
    })
})

router.delete('/:id', (req, res) => {
  db('accounts').where({ id: req.params.id }).del()
    .then(count => {
      res.status(201).json(count);
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "Could not update that account" })
    })
})

module.exports = router;