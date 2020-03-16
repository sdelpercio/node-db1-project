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

module.exports = router;
