import { Request } from "express";
import { userEntity } from "../entities/user.entity";

export interface UserRequest extends Request {
    user? : userEntity;
}