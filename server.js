const express = require("express");
const app = express();
const cors = require("cors");
const fetch = require("node-fetch");
const enforce = require('express-sslify');

app.use(cors());
app.use(express.json());
app.use(enforce.HTTPS({trustProtoHeader: true}))

app.get('/', (req,res) => {
  res.send('its Working')
});

app.post("/jobs", (req, res) => {
  fetch(
    `https://jobs.github.com/positions.json?description=${req.body.description}&location=${req.body.location}&page=${req.body.page}`
  )
    .then(response => response.json())
    .then(jobs => res.send(jobs))
    .catch(err => res.status(400).json("ERRORRRRR!!!!"));
});

app.get("/initialJobs", (req, res) => {
  fetch(
    'https://jobs.github.com/positions.json?description=javascript&page=1'
  )
    .then(response => response.json())
    .then(jobs => res.send(jobs))
    .catch(err => res.status(400).json("ERRORRRRR!!!!"));
});

app.listen(process.env.PORT || 3001 , () => console.log(`Listening on port ${process.env.PORT} !`));
