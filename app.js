const express = require('express'); 
const port = process.env.PORT || 3000;
const path = require('path');
const app = express();
const registerRouter = require('./index');
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views'));
app.use(registerRouter);

app.listen(port,() =>{
    console.log('listening on port',port);
})