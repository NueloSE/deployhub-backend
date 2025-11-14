import { Request, Response } from "express";
import { register } from "../metrics/promMetrics";

export const getHealthStatus = async (req: Request, res: Response) => {
  const metrics = await register.getMetricsAsJSON();

  const totalRequestsMetric = metrics.find(
    (m) => m.name === "deployhub_total_requests"
  );
  const totalErrorsMetric = metrics.find(
    (m) => m.name === "deployhub_total_errors"
  );
  const responseTimeMetric = metrics.find(
    (m) => m.name === "deployhub_response_time_ms"
  );

  const totalRequests = totalRequestsMetric?.values[0]?.value || 0;
  const totalErrors = totalErrorsMetric?.values[0]?.value || 0;
  const errorRate = totalRequests > 0 ? (totalErrors / totalRequests) * 100 : 0;

  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    service: "DeployHub Backend API",
    totalRequests,
    errorRate,
    responseTimeHistogram: responseTimeMetric || null,
  });
};
