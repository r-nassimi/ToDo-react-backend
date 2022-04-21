const dotenv = require('dotenv').config()

const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const app = express();

const apiRoutes = require("./src/modules/routes/routes");

app.use(cors());
app.set('Access-Control-Allow-Origin', '*')
app.use(express.json())
app.use("/", apiRoutes);

const url = process.env.APP_URL;
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});