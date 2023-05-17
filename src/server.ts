import http from "http";
import eventLogger from "./utils/eventLogger.utils";
import express, { Application } from "express";
import appDataSource from "./typeorm/database";
import fetchData from "./activity/services/fetchData.service";
import cron from "node-cron";
import ActivityEventEmitter from "./activity/services/emitter.service";

async function bootstrap() {
  process.on("uncaughtException", (e) => {
    eventLogger.logError(e.toString());
  });


  const app: Application = express();

  const port = 4000;

  app.set("port", port);

  const server = http.createServer({}, app);

  await appDataSource.initialize();

  server
    .listen(app.get("port"), () => {
      eventLogger.logInfo("app listening on port" + port);
    })
    .on("error", (e) => eventLogger.logWarn(e.toString()));

    const emitter = new ActivityEventEmitter();

emitter.on('activityEvent', (data) => {
  console.log('Received activity event:', data);
});
emitter.emit('activityEvent');
  //get users on ride cronjob
  cron.schedule("*/10 * * * * *", () => {
    fetchData.fetchEventData(
      "https://api.reservoir.tools/events/asks/v3?limit=10"
    );
  });
}

bootstrap();
