import { Controller, Post, UseInterceptors, Headers, Body, Get, Param, Put, Delete, Query, UseGuards, UseFilters } from '@nestjs/common';
import { ResponseInterceptor } from '../shared/interceptors/response.interceptor';
import { CreatePersonDto, UpdatePersonDto } from './person.dto';
import { ApiTags, ApiBearerAuth, ApiHeader, ApiOperation,  ApiConsumes, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../shared/guard/jwt-auth.guard';
import { AppExceptionFilter } from '../shared/filters/app-exception.filter';
import { PersonService } from './person.service';
@Controller('person')
@ApiTags('Person') 
@UseFilters(new AppExceptionFilter())
@UseInterceptors(ResponseInterceptor)
export class PersonController {
    constructor(private readonly nameService: PersonService) { }
    // @ApiBearerAuth() // Protecctión de recurso mediante autenticación para swagger
    // @UseGuards(new JwtAuthGuard()) // Protección de rutas para el endpoint
    // @ApiHeader({ name: 'Authorization', required: true })
    @Post()
    @ApiResponse({ type: CreatePersonDto, status: 200 })
    async create(@Body() body: CreatePersonDto) {
        return await this.nameService.create(body);
    }

    // Listar pais
    @ApiBearerAuth() // Protecctión de recurso mediante autenticación para swagger
    @UseGuards(new JwtAuthGuard()) // Protección de rutas para el endpoint
    @ApiHeader({ name: 'Authorization', required: true })
    @ApiResponse({ type: [CreatePersonDto], status: 201 })
    @Get()
    async list() {
        return await this.nameService.list();
    }

    // Detalle del pais
    @Get('gender')
    @ApiBearerAuth() // Protecctión de recurso mediante autenticación para swagger
    @UseGuards(new JwtAuthGuard()) // Protección de rutas para el endpoint
    @ApiHeader({ name: 'Authorization', required: true })
    async listGender() {
        return await this.nameService.listGender();
    }

    // Detalle del pais
    @Get('identification')
    @ApiBearerAuth() // Protecctión de recurso mediante autenticación para swagger
    @UseGuards(new JwtAuthGuard()) // Protección de rutas para el endpoint
    @ApiHeader({ name: 'Authorization', required: true })
    async listIdentificationType() {
        return await this.nameService.listIdentificationType();
    }


    // Detalle del pais
    @Get(':id')
    @ApiBearerAuth() // Protecctión de recurso mediante autenticación para swagger
    @UseGuards(new JwtAuthGuard()) // Protección de rutas para el endpoint
    @ApiHeader({ name: 'Authorization', required: true })
    @ApiResponse({ type: CreatePersonDto, status: 201 })
    async detail(@Param('id') id: number) {
        return await this.nameService.detail(id);
    }

    // Actualizar pais
    @Put(':id')
    @ApiBearerAuth() // Protecctión de recurso mediante autenticación para swagger
    @UseGuards(new JwtAuthGuard()) // Protección de rutas para el endpoint
    @ApiResponse({ type: CreatePersonDto, status: 201 })
    @ApiHeader({ name: 'Authorization', required: true })
    async update(@Param('id') id: number, @Body() body: Partial<UpdatePersonDto>) {
        return await this.nameService.update(id, body);
    }

    // Eliminar pais
    @Delete(':id')
    @ApiBearerAuth() // Protecctión de recurso mediante autenticación para swagger
    @UseGuards(new JwtAuthGuard()) // Protección de rutas para el endpoint
    @ApiHeader({ name: 'Authorization', required: true })
    @ApiResponse({ status: 201, description: 'person_deleted'})
    @ApiOperation({ summary: 'Elimina un usuario de un usuario del sistema'})
    async delete(@Param('id') id: number) {
        return await this.nameService.delete(id);
    }
}