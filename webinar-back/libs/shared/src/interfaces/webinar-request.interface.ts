import { Request } from "express";
import { PurchaseWebinar } from "./purchase-webinar.interface";
import { UserRequest } from "./user-request.interface";

export interface webinarRequest extends UserRequest {
    webinar?: PurchaseWebinar;
}