import { SetMetadata } from "@nestjs/common";
import { Roles } from "../enums/roles.enum";

export const Role = (...roles: Roles[]) => SetMetadata("roles", roles); 