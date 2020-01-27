const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const fetch = require("node-fetch");

app.use(cors());
app.use(express.json());

app.post("/jobs", (req, res) => {
  fetch(
    `https://jobs.github.com/positions.json?description=${req.body.description}&location=${req.body.location}`
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

app.listen(port, () => console.log(`Listening on port ${port} !`));
