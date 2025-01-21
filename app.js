const express = require('express');
const mongoose = require('mongoose');
const app = express();
const { requireAuth, errorHandler } = require('./middlewares/userMiddleware');
const authRoute = require('./routes/userRoute');

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/stockMarketCrm')
    .then(() => {
        console.log('Database is connected');
    })
    .catch(() => {
        console.log('Database is not connected');
    });

app.use('/auth', authRoute);


app.use('/protectedRoute', requireAuth, (req, res) => {
    res.send('This is a protected route');
});


app.use(errorHandler);

app.get('/', (req, res) => res.send('Hello World!'));

const port = 3000;
app.listen(port, () => console.log(`App listening on port ${port}!`));
