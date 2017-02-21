const express = require('express');
const app = express();
const nba = require('nba');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

/**
 * Endpoint to get all basketball players
 */
app.get('/players', (req, res) => {
  const players = require('nba/data/players.json');
  res.json(players);
});

/**
 * Endpoint to grab individual player's details
 */
app.get('/player-details/:id', (req, res) => {
  nba.stats.playerInfo({ PlayerID: req.params.id })
    .then(data => res.send(data))
    .catch(err => {
      console.error(err);
      res.sendStatus(404);
    });
});

/**
 * Endpoint to grab a player's shooting stats
 */
app.get('/player-shots/:id', (req, res) => {
  nba.stats.shots({ PlayerID : req.params.id })
    .then(data => res.send(data))
    .catch(err => {
      console.error(err);
      res.sendStatus(404);
    });
});

app.listen(3333, () => console.log('app working on port 3333'));