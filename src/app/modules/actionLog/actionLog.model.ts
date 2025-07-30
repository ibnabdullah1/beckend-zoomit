import { Schema, model } from "mongoose";
import { IActionLog } from "./actionLog.interface";

const actionLogSchema = new Schema({
  email: String,
  role: String,
  method: String,
  route: String,
  action: String,
  clientDetails: {
    ipAddress: String,
    userAgent: String,
    browserUrl: String,
    accessedAt: Date,
  },
  serverDetails: {
    hostname: String,
    platform: String,
    uptime: String,
  },

  requestStatusCode: Number,
  responseStatusCode: Number,
  timestamp: { type: Date, default: Date.now },
});

export const ActionLog = model<IActionLog>("ActionLog", actionLogSchema);
