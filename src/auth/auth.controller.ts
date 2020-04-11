import { Controller, Post, UseInterceptors, Headers, Body, Get, Param, Put, Delete, Query, UseFilters } from '@nestjs/common';
import { ResponseInterceptor } from '../shared/interceptors/response.interceptor';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthLoginDto } from './auth.dto';
import { AuthService } from './auth.service';
import { AppExceptionFilter } from '../shared/filters/app-exception.filter';

@Controller('auth')
@ApiTags('Auth')
@UseInterceptors(ResponseInterceptor)
@UseFilters(new AppExceptionFilter())
export class AuthController {
    constructor(private readonly nameService: AuthService) { }
    // Login de un usuario
    @Post()
    @ApiOperation({ summary: 'Permite realizar el login de un usuario del sistema.'})
    async auth(@Body() body: AuthLoginDto) {
        return await this.nameService.auth(body.nickname,body.password);
    }
}