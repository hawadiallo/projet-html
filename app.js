'use strict';

/* DEPENDENCIES */
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const pug = require('pug');
const methodOverride = require('method-override');
const sassMiddleware = require('node-sass-middleware');
const helmet = require('helmet');

/* ROUTES */
const routes = require('./app/routes/indexes');

let app = express();

app.use(helmet());
app.disable('x-powered-by');

//- Method override
app.use(methodOverride('_method'));

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'pug');

//- sass middleware
app.use(sassMiddleware({
    /* Options */
    src: path.join(__dirname, './assets/sass/'),
    dest: path.join(__dirname, './assets/css/'),
    indentedSyntax: true,
    debug: true,
    outputStyle: 'compressed',
    prefix:  '/css'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
}));

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, '', '')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './assets/')));
app.use(cookieParser());

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
