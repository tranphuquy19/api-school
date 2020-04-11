import { createParamDecorator } from '@nestjs/common';
export const JwtDecorator = createParamDecorator((data, req) => req.user);
