const express = require('express');
const conn = require('../dao/conn');
const router = express.Router(); //获得一个路由对象
const crypto = require('crypto');
// console.log(conn);
router.route('/')
    .get((req, res, next) => {
        res.json({ 'method': 'get' });
    })
    .post((req, res, next) => {
        res.json({ 'method': 'post' });
    });
router.route('/reg')
    .post((req, res, next) => {

        // console.log(conn)
        // console.log(req.body);

        let searchUser = `select * from users where user_name = '${req.body.username}'`;

        conn.query(searchUser, (err, results) => {
            if (err) console.log(err);
            if (results.length) {
                res.json({ msg: '用户名已存在', username: req.body.username, error: 1 })
            } else {
                // let md5 = crypto.createHash('md5');
                // let passResult = md5.update(req.body.userpassword).digest('hex');
                let sql = `insert into users (user_name, user_password) values('${req.body.username}','${req.body.userpassword}')`;
                // console.log(req.body.username, passResult);
                conn.query(sql, (err, result) => {
                    if (err) console.log(err);
                    // console.log(1);
                    // console.log(result.insertId);
                    if (result.insertId) {
                        // console.log(res.cookie);
                        res.cookie('username', req.body.username);
                        res.cookie('isLogined', true);
                        res.json({ msg: "注册成功" });
                    } else {
                        res.json({
                            msg: "用户名已存在",
                            username: req.body.username,
                            error: 0
                        })
                    }
                });
            }
        })


    });

router.route('/login')
    .post((req, res, next) => {

        let searchUser = `select * from users where user_name = '${req.body.username}'`;
        // let passResult = md5.update(req.body.userpassword).digest('hex');
        let password = `select * from users where user_password = '${req.body.userpassword}'`;
        conn.query(searchUser, (err, resultUser) => {
            if (err) console.log(err);
            if (resultUser.length) {
                conn.query(password, (err, resultpassword) => {
                    if (err) console.log(err);
                    if (resultpassword.length) {
                        res.json({
                            msg: "登录成功",
                        })
                    } else {
                        res.json({
                            msg: "密码错误",
                        })
                    }
                })

            } else {
                res.json({
                    msg: "账号错误",
                })
            }

        })
    });

module.exports = router;