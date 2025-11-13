import express from "express";
import client from "prom-client";

export const metricsRouter = express.Router();

const register = new client.Registry();
client.collectDefaultMetrics({ register });

metricsRouter.get("/", async (_, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});
