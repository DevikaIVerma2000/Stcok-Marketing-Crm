const express = require('express');
const mongoose = require('mongoose');
const app = express();
const { requireAuth, errorHandler } = require('./middlewares/userMiddleware');
const authRoute = require('./routes/userRoute');
const userDetailRoutes = require('./routes/userDetailRoute');
const roleRoute = require('./routes/roleRoute');
const permissionRoute = require('./routes/permissionRoutes')
const rolePermissionRoute = require('./routes/rolePermissionRoute')
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/stockMarketCrm')
    .then(() => {
        console.log('Database is connected');
    })
    .catch(() => {
        console.log('Database is not connected');
    });

app.use('/auth', authRoute);
app.use('/api', userDetailRoutes);
app.use('/role',roleRoute);
app.use('/permission',permissionRoute);
app.use('/rolePermission', rolePermissionRoute);

app.use('/protectedRoute', requireAuth, (req, res) => {
    res.send('This is a protected route');
});


app.use(errorHandler);

app.get('/', (req, res) => res.send('Hello World!'));

const port = 3000;
app.listen(port, () => console.log(`App listening on port ${port}!`));
