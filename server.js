require('dotenv').config();
const express = require('express');
const app =express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/dbCon')
const PORT = process.env.PORT || 3500;

//db connection
connectDB();

app.use(logger);

app.use(credentials)

app.use(cors(corsOptions));

app.use(express.urlencoded({extended: false}));

//built-in middleware for json
app.use(express.json());

app.use(cookieParser());

//Serve static files
app.use(express.static(path.join(__dirname, '/public')));

//Routes
app.use('/', require('./routes/root'))
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));


app.use(verifyJWT);
app.use('/employees', require('./routes/api/employees'));
app.use('/users', require('./routes/api/users'));
app.all('*', (req, res)=> {
    res.status(404);
    if (req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')){
        res.json({error: '404 Not found'});
    }else if ('txt'){
        res.type('text').send('404 Not found');
    }
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server start on http://localhost:${PORT}`));
})