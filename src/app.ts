import express from "express";
import serviceRoutes from "./routes/servicesRoute";
import { requestTimer } from "./middleware/requestTimer";
import { metricsRouter } from "./routes/metricsRoute";
import  healthRouter  from "./routes/healthRoute";

const app = express();
app.use(express.json());
app.use(requestTimer);

app.use("/api/health", healthRouter);
app.use("/api/services", serviceRoutes);
app.use("/metrics", metricsRouter);

export default app;
