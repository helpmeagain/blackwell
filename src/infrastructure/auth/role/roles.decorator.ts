// https://docs.nestjs.com/security/authorization
import { SetMetadata } from '@nestjs/common';
import { Role } from './roles-type';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
