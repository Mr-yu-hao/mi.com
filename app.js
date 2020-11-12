// 后端应用路口
const express = require('express');
const path = require('path');

const usersRouter = require('./router/users');
const app = express();
const cookieParser = require('cookie-parser');
const createError = require('http-errors')
const productRouter = require('./router/product');

let conf = {
    port: 8088,
    host: 'localhost'
};

// 配置静态web服务

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser());


app.use('/users', usersRouter);
app.use('/product', productRouter);


app.use(function(req, res, next) {
    next(createError(404));
})

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.redirect('/html/404.html');
});

app.listen(conf.port, conf.host, () => {
    console.log(`server is running on http://${conf.host}:${conf.port}`);
})