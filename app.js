const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error')

const db = require('./util/database')

//db.execute().then(result => console.log(result))


app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);

// 핸들바는 자동으로 추가되지 않아서 이렇게 직접 reuire로 가져오고 엔진에 직접 추가해야한다!!
//app.engine('handlebars', expressHbs({layoutDir: 'views/layouts/', defaultLayout: 'main-layout' }));
//app.set('view engine', 'handlebars');
//app.set('view engine', 'pug');
