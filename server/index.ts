import Koa from 'koa';
import Router from 'koa-router';
import fetch from 'node-fetch';

const app = new Koa();
const router = new Router();

router.get('/', (ctx) => {
  ctx.body = 'Hello Koa';
});

const getDepartures = async (stationCode: string) => {
  const res = await fetch(`https://api.gotransit.com/Api/schedules/stops/${stationCode}/departures?Page=1&PageLimit=10`);
  const departures = await res.json();
  return departures;
};

router.get('/departures', async (ctx) => {
  const stationCode = ctx.query.station as string;
  const departures = await getDepartures(stationCode);
  ctx.body = departures;
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8080, () => {
  console.log('Server listening on port 8080');
});
