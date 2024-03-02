const express = require('express');
const errorHandler = require('./errorHandler');

const app = express();

app.use((req, res, next) => {
    setTimeout(next, 1000);
});
app.get('/arena', (req, res) => {
    res.send('Welcome to my world');
});
app.get('/settings', (req, res) => {
    random-syntax-error;
});
app.get('/logistics', (req, res, next) => {
    try {
        throw new Error('Something went wrong in the logistics module');
    } 
    catch (err) {
        next(err);
    }
});
app.get('/', (req,res)=>{
    res.redirect('/arena');
});
app.use(errorHandler);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});