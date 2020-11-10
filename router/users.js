const express = require('express');
const conn = require('../dao/conn');
const router = express.Router(); //获得一个路由对象
const crypto = require('crypto');
const { log } = require('console');
console.log(conn);
router.route('/')
    .get((req, res, next) => {
        res.json({ 'method': 'get' });
    })
    .post((req, res, next) => {
        res.json({ 'method': 'post' });
    });
router.route('/reg')
    .post((req, res, next) => {
        // console.log(req.body);
        let md5 = crypto.createHash('md5');
        let passResult = md5.update(req.body.password).digest('hex');
        // console.log(passResult);
        let sql = `insert into users(user_name, user_password, user_email, user_phone, user_address) values('${req.body.username}','${passResult}','${req.body.email}','${req.body.phone}','${req.body.address}')`;
        // console.log(sql);

        conn.query(sql, (err, result) => {
            if (err) console.log(err);
            console.log(result);
            if (result.insertId) {
                // console.log(cookies);
                res.cookie('username', req.body.username);
                res.cookie('isLogined', true);
                res.json({ msg: "注册成功" });
            } else {
                res.json({ msg: "用户名已存在" })
            }
        });
    });

router.route('/login')
    .post((req, res, next) => {
        console.log(req.cookies);

    });

module.exports = router;