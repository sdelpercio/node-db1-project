const express = require('express');
const db = require('../data/dbConfig.js');

const router = express.Router();

router.get('/', (req, res) => {
	db.select('*')
		.from('accounts') // returns a promise
		.then(rows => {
			res.status(200).json({ data: rows });
		})
		.catch(err => {
			res.status(500).json({ error: 'Could not retrieve accounts.', err });
		});
});
router.get('/:id', (req, res) => {
	db('accounts')
		.where({ id: req.params.id })
		.first() // grabs first element of array
		.then(account => {
			res.status(200).json({ data: account });
		})
		.catch(err => {
			res.status(500).json({ error: 'Could not retrieve account.', err });
		});
});
router.post('/', (req, res) => {
	db('accounts')
		.insert(req.body, 'id') // we add id to inform postgres to send back id
		.then(ids => {
			res.status(201).json({ results: ids });
		})
		.catch(err => {
			res.status(500).json({ error: 'Could not post.', err });
		});
});
router.put('/:id', (req, res) => {
	db('accounts')
		.where({ id: req.params.id }) // important to filter fist
		.update(req.body) // include changes in with updating
		.then(count => {
			if (count > 0) {
				res.status(200).json({ message: 'Record updated.' });
			} else {
				res.status(404).json({ message: 'account not found.' });
			}
		})
		.catch(err => {
			res.status(500).json({ error: 'error updating post.', err });
		});
});
router.delete('/:id', (req, res) => {
	db('accounts')
		.where({ id: req.params.id }) // important to filter fist
		.del() // deletes records
		.then(count => {
			if (count > 0) {
				res.status(200).json({ message: 'Record deleted.' });
			} else {
				res.status(404).json({ message: 'account not found.' });
			}
		})
		.catch(err => {
			res.status(500).json({ error: 'error deleting account.', err });
		});
});

module.exports = router;
