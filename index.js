const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

app.use(cors({ 
    origin: true, 
    credentials: true // Optional: Use this if you need to send cookies with requests
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/public/assets', express.static(path.join(__dirname, 'public/assets')));

app.use(express.static(path.join(__dirname, 'frontend/dist')));

app.use("/api/v1/users", require('./Home.js'));

// app.get('*', (req, res) => {
  app.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname, 'frontend/dist', 'index.html'));
  res.send("App is running");
});

app.listen(port, () => {
  console.log("Server Listening on PORT:", port);
});
