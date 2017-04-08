
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('kcors');
const send = require('koa-send');
const compress = require('koa-compress');
const nba = require('nba');
const players = require('nba/data/players.json');

const app = new Koa();
const router = new Router();

app.use(require('koa-static')('../build'));

app.use(compress({
  filter: function (content_type) {
    return /text/i.test(content_type)
  },
  threshold: 2048,
  flush: require('zlib').Z_SYNC_FLUSH
}));

app.use(cors());

// x-repsonse time

app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// logging
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

router.get('/players', (ctx, next) => {
  ctx.body = players;
});

function getPlayerDetails(PlayerID) {
  try {
    return nba.stats.playerInfo({ PlayerID });
  } catch(err) {
    console.error(err);
  }
}

function getPlayerShots(PlayerID) {
  try {
    return nba.stats.shots({ PlayerID });
  } catch(err) {
    console.error(err);
  }
}

router
  .param('playerId', (playerId, ctx, next) => {
    ctx.state.playerId = playerId;
    if (!ctx.state.playerId) return ctx.status = 404;
    return next();
  })
  .get('/player-details/:playerId', async (ctx) => {
    await getPlayerDetails(ctx.state.playerId)
      .then(data => ctx.body = data);
  })
  .get('/player-shots/:playerId', async (ctx) => {
    await getPlayerShots(ctx.state.playerId)
      .then(data => ctx.body = data);
  });

app
  .use(router.routes())
  .use(router.allowedMethods());

app.use(async (ctx) => {
  await send(ctx, 'index.html', { root: '../build' })
})

app.listen(8080, () => console.log('app starting on port 8080'));
