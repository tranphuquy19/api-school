import { Controller, Post, UseInterceptors, Headers, Body, Get, Param, Put, Delete, Query, UseGuards, UseFilters } from '@nestjs/common';
import { ResponseInterceptor } from '../shared/interceptors/response.interceptor';
import { CreateSchoolDto, UpdateSchoolDto } from './school.dto';
import { ApiTags, ApiBearerAuth, ApiHeader, ApiOperation,  ApiConsumes, ApiResponse, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '../shared/guard/jwt-auth.guard';
import { AppExceptionFilter } from '../shared/filters/app-exception.filter';
import { SchoolService } from './school.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { localOptions } from './multer.option';
@Controller('school')
@ApiTags('School') 
@UseFilters(new AppExceptionFilter())
@UseInterceptors(ResponseInterceptor)
export class SchoolController {
    constructor(private readonly nameService: SchoolService) { }
    //@ApiBearerAuth() // Protecctión de recurso mediante autenticación para swagger
    //@UseGuards(new JwtAuthGuard()) // Protección de rutas para el endpoint
    //@ApiHeader({ name: 'Authorization', required: true })
    @ApiBody({ type: CreateSchoolDto })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('htmlBanner',localOptions))
    @ApiResponse({ type: CreateSchoolDto, status: 200 })
    @Post()
    async create(@Body() body: CreateSchoolDto) {
        return await this.nameService.create(body);
    }

    // Listar pais
    @ApiBearerAuth() // Protecctión de recurso mediante autenticación para swagger
    @UseGuards(new JwtAuthGuard()) // Protección de rutas para el endpoint
    @ApiHeader({ name: 'Authorization', required: true })
    @ApiResponse({ type: [CreateSchoolDto], status: 201 })
    @Get()
    async list() {
        return await this.nameService.list();
    }

    // Detalle del pais
    @Get(':id')
    @ApiBearerAuth() // Protecctión de recurso mediante autenticación para swagger
    @UseGuards(new JwtAuthGuard()) // Protección de rutas para el endpoint
    @ApiHeader({ name: 'Authorization', required: true })
    @ApiResponse({ type: CreateSchoolDto, status: 201 })
    async detail(@Param('id') id: number) {
        return await this.nameService.detail(id);
    }

    // Actualizar pais
    @Put(':id')
    @ApiBearerAuth() // Protecctión de recurso mediante autenticación para swagger
    @UseGuards(new JwtAuthGuard()) // Protección de rutas para el endpoint
    @ApiResponse({ type: CreateSchoolDto, status: 201 })
    @ApiHeader({ name: 'Authorization', required: true })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('htmlBanner',localOptions))
    async update(@Param('id') id: number, @Body() body: Partial<UpdateSchoolDto>) {
        return await this.nameService.update(id, body);
    }

    // Eliminar pais
    @Delete(':id')
    @ApiBearerAuth() // Protecctión de recurso mediante autenticación para swagger
    @UseGuards(new JwtAuthGuard()) // Protección de rutas para el endpoint
    @ApiHeader({ name: 'Authorization', required: true })
    @ApiResponse({ status: 201, description: 'user_deleted'})
    @ApiOperation({ summary: 'Elimina un usuario de un usuario del sistema'})
    async delete(@Param('id') id: number) {
        return await this.nameService.delete(id);
    }
}