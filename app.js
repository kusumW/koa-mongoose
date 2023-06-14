const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const router =require ('./src/router/web.js');
const app = new Koa();
require('dotenv').config(); 
const PORT = process.env.PORT;
const URL = process.env.DATABASE_URL;

// Connect to MongoDB
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });

app.use(bodyParser());

// Register the router middleware
app.use(router.routes()).use(router.allowedMethods());
