import { userEntity } from "../entities/user.entity";

export interface ForgetPassword {
    resetLink: string;
    email: string;
    expDate: Date;
}