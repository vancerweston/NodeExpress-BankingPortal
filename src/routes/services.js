const express = require('express');
const router = express.Router();
const {accounts, writeJSON} = require('../data');

router.get('/transfer', function(req, res) {
    res.render('transfer');
});

router.post('/transfer', function(req, res) {
    const { from, to, amount } = req.body;
    accounts[from].balance -= parseInt(amount, 10);
    accounts[to].balance += parseInt(amount, 10);
    writeJSON();
    res.render('transfer', {message: "Transfer Completed"});
});

router.get('/payment', function(req, res) {
    res.render('payment', {account: accounts.credit});
});

router.post('/payment', function(req, res) {
    const { amount } = req.body;
    accounts.credit.balance -= parseInt(amount, 10);
    accounts.credit.available += parseInt(amount, 10);
    writeJSON();
    res.render('payment', {
        message: "Payment Successful",
        account: accounts.credit
    });
});


module.exports = router;