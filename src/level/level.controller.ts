import { Controller, Post, UseInterceptors, Headers, Body, Get, Param, Put, Delete, Query, UseGuards, UseFilters } from '@nestjs/common';
import { ResponseInterceptor } from '../shared/interceptors/response.interceptor';
import { CreateLevelDto, UpdateLevelDto } from './level.dto';
import { ApiTags, ApiBearerAuth, ApiHeader, ApiOperation,  ApiConsumes, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../shared/guard/jwt-auth.guard';
import { AppExceptionFilter } from '../shared/filters/app-exception.filter';
import { LevelService } from './level.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { localOptions } from './multer.option';
@Controller('level')
@ApiTags('Level') 
@UseFilters(new AppExceptionFilter())
@UseInterceptors(ResponseInterceptor)
export class LevelController {
    constructor(private readonly nameService: LevelService) { }
    @ApiBearerAuth() // Protecctión de recurso mediante autenticación para swagger
    @UseGuards(new JwtAuthGuard()) // Protección de rutas para el endpoint
    @ApiHeader({ name: 'Authorization', required: true })
    @Post()
    @ApiResponse({ type: CreateLevelDto, status: 200 })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('htmlBanner',localOptions))
    async create(@Body() body: CreateLevelDto) {
        return await this.nameService.create(body);
    }

    // Listar pais
    @ApiBearerAuth() // Protecctión de recurso mediante autenticación para swagger
    @UseGuards(new JwtAuthGuard()) // Protección de rutas para el endpoint
    @ApiHeader({ name: 'Authorization', required: true })
    @ApiResponse({ type: [CreateLevelDto], status: 201 })
    @Get()
    async list() {
        return await this.nameService.list();
    }

    // Detalle del pais
    @Get(':id')
    @ApiBearerAuth() // Protecctión de recurso mediante autenticación para swagger
    @UseGuards(new JwtAuthGuard()) // Protección de rutas para el endpoint
    @ApiHeader({ name: 'Authorization', required: true })
    @ApiResponse({ type: CreateLevelDto, status: 201 })
    async detail(@Param('id') id: number) {
        return await this.nameService.detail(id);
    }

    // Actualizar pais
    @Put(':id')
    @ApiBearerAuth() // Protecctión de recurso mediante autenticación para swagger
    @UseGuards(new JwtAuthGuard()) // Protección de rutas para el endpoint
    @ApiResponse({ type: CreateLevelDto, status: 201 })
    @ApiHeader({ name: 'Authorization', required: true })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('htmlBanner',localOptions))
    async update(@Param('id') id: number, @Body() body: Partial<UpdateLevelDto>) {
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