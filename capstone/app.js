const path = require('path');
const express = require('express');
const csrf = require('csurf');
const expressSession = require('express-session');

const createSessionConfig = require('./config/session');
const db = require('./data/database');
const addCsrfTokenMiddleware = require('./middlewares/csrf-tokens');
const errorHandlerMiddleware = require('./middlewares/error-handler');
const checkAuthStatusMiddleware = require('./middlewares/check-auth');
const protectRoutes = require('./middlewares/protect-routes');
const cartMiddleware = require('./middlewares/cart');
const User = require('./models/user.model');

const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/products.routes');
const baseRoutes = require('./routes/base.routes');
const adminRoutes = require('./routes/admin.routes');
const cartRoutes = require('./routes/cart.routes');
const orderRoutes = require('./routes/order.routes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use('/products/assets', express.static('product-data'));
app.use(express.urlencoded( {extended: false } ));
app.use(express.json());

const sessionConfig = createSessionConfig();
app.use(expressSession(sessionConfig));

app.use(csrf());
app.use(cartMiddleware);
app.use(addCsrfTokenMiddleware);
app.use(checkAuthStatusMiddleware);

app.use(baseRoutes);
app.use(authRoutes);
app.use(productRoutes);
app.use('/cart', cartRoutes);
// app.use(protectRoutes);
app.use('/admin', adminRoutes);
app.use('/orders', orderRoutes);


app.use(errorHandlerMiddleware);
db.connectToDatabase().then(User.createDefaultAdminIfMissing).then(function() {
    app.listen(3000);
}).catch(function(error) {
    console.log('Failed to connect to the database');
    console.log(error);
});