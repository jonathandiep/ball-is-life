const express = require('express');
const app = express();
const nba = require('nba');

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
 * Endpoint to grab a team's stats
 * leagueAverages property is something to pay attention to
 */
app.get('/player-shots/:id', (req, res) => {
  nba.stats.shots({ PlayerID : req.params.id })
    .then(data => res.send(data))
    .catch(err => {
      console.error(err);
      res.sendStatus(404);
    });
});

app.listen(3000, () => console.log('app working on port 3000'));