const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const app = express();

//importando routes
const customerRoutes = require('./routes/customer')
//setings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//midlewars
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '291200',
    port: 3306,
    database: 'crudnodejs'
}, 'single'));
app.use(express.urlencoded({extended: false}));


// routes
app.use('/', customerRoutes);

//staticos
app.use(express.static(path.join(__dirname, 'public')));

//server
app.listen(app.get('port'), () => {
    console.log('Server on port 3000');
});