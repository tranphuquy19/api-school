import { Controller, Post, UseInterceptors, Headers, Body, Get, Param, Put, Delete, UseGuards, UseFilters } from '@nestjs/common';
import { ResponseInterceptor } from '../shared/interceptors/response.interceptor';
import { CreateUsersDto, UpdateUsersDto } from './users.dto';
import { ApiTags, ApiBearerAuth, ApiHeader, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../shared/guard/jwt-auth.guard';
import { AppExceptionFilter } from '../shared/filters/app-exception.filter';
import { UsersService } from './users.service';
@Controller('users')
@ApiTags('Users') 
@UseFilters(new AppExceptionFilter())
@UseInterceptors(ResponseInterceptor)
export class UsersController {
    constructor(private readonly nameService: UsersService) { }
    // @ApiBearerAuth() // Protecctión de recurso mediante autenticación para swagger
    // @UseGuards(new JwtAuthGuard()) // Protección de rutas para el endpoint
    // @ApiHeader({ name: 'Authorization', required: true })
    @Post()
    // @UseGuards(new JwtAuthGuard()) 
    @ApiResponse({ type: CreateUsersDto, status: 200 })
    async create(@Body() body: CreateUsersDto) {
        return await this.nameService.create(body);
    }

    // Listar pais
    @ApiBearerAuth() // Protecctión de recurso mediante autenticación para swagger
    @UseGuards(new JwtAuthGuard()) // Protección de rutas para el endpoint
    @ApiHeader({ name: 'Authorization', required: true })
    @ApiResponse({ type: [CreateUsersDto], status: 201 })
    @Get()
    async list() {
        return await this.nameService.list();
    }

    // Detalle del pais
    @Get(':id')
    @ApiBearerAuth() // Protecctión de recurso mediante autenticación para swagger
    @UseGuards(new JwtAuthGuard()) // Protección de rutas para el endpoint
    @ApiHeader({ name: 'Authorization', required: true })
    @ApiResponse({ type: CreateUsersDto, status: 201 })
    async detail(@Param('id') id: number) {
        return await this.nameService.detail(id);
    }

    // Actualizar pais
    @Put(':id')
    @ApiBearerAuth() // Protecctión de recurso mediante autenticación para swagger
    @UseGuards(new JwtAuthGuard()) // Protección de rutas para el endpoint
    @ApiResponse({ type: CreateUsersDto, status: 201 })
    @ApiHeader({ name: 'Authorization', required: true })
    async update(@Param('id') id: number, @Body() body: Partial<UpdateUsersDto>) {
        return await this.nameService.update(id, body);
    }

    // Eliminar pais
    @Delete(':id')
    @ApiBearerAuth() // Protecctión de recurso mediante autenticación para swagger
    @UseGuards(new JwtAuthGuard()) // Protección de rutas para el endpoint
    @ApiHeader({ name: 'Authorization', required: true })
    @ApiResponse({ status: 201, description: 'user_deleted'})
    async delete(@Param('id') id: number) {
        return await this.nameService.delete(id);
    }
}