import { Controller, Post, UseInterceptors, Headers, Body, Get, Param, Put, Delete, Query, UseGuards, UseFilters } from '@nestjs/common';
import { ResponseInterceptor } from '../shared/interceptors/response.interceptor';
import { CreateCourseDto, UpdateCourseDto } from './course.dto';
import { ApiTags, ApiBearerAuth, ApiHeader, ApiOperation,  ApiConsumes, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../shared/guard/jwt-auth.guard';
import { AppExceptionFilter } from '../shared/filters/app-exception.filter';
import { CourseService } from './course.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { localOptions } from './multer.option';
import { PayloadJWTI } from '../auth/auth.dto';
import { JwtDecorator } from '../shared/decorator/jwt.decorator';
@Controller('course')
@ApiTags('Course') 
@UseFilters(new AppExceptionFilter())
@UseInterceptors(ResponseInterceptor)
export class CourseController {
    constructor(private readonly nameService: CourseService) { }
    @ApiBearerAuth() // Protecctión de recurso mediante autenticación para swagger
    @UseGuards(new JwtAuthGuard()) // Protección de rutas para el endpoint
    @ApiHeader({ name: 'Authorization', required: true })
    @ApiResponse({ type: CreateCourseDto, status: 200 })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('banner',localOptions))
    @Post()
    async create(@Body() body: CreateCourseDto) {
        return await this.nameService.create(body);
    }

    // Listar pais
    @ApiBearerAuth() // Protecctión de recurso mediante autenticación para swagger
    @UseGuards(new JwtAuthGuard()) // Protección de rutas para el endpoint
    @ApiHeader({ name: 'Authorization', required: true })
    @ApiResponse({ type: [CreateCourseDto], status: 201 })
    @Get()
    async list(@JwtDecorator() jwt: PayloadJWTI) {
        return await this.nameService.list(jwt);
    }

    // Detalle del pais
    @Get(':id')
    @ApiBearerAuth() // Protecctión de recurso mediante autenticación para swagger
    @UseGuards(new JwtAuthGuard()) // Protección de rutas para el endpoint
    @ApiHeader({ name: 'Authorization', required: true })
    @ApiResponse({ type: CreateCourseDto, status: 201 })
    async detail(@Param('id') id: number) {
        return await this.nameService.detail(id);
    }

    // Actualizar pais
    @Put(':id')
    @ApiBearerAuth() // Protecctión de recurso mediante autenticación para swagger
    @UseGuards(new JwtAuthGuard()) // Protección de rutas para el endpoint
    @ApiResponse({ type: CreateCourseDto, status: 201 })
    @ApiHeader({ name: 'Authorization', required: true })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('banner',localOptions))
    async update(@Param('id') id: number, @Body() body: Partial<UpdateCourseDto>) {
        return await this.nameService.update(id, body);
    }

    // Eliminar pais
    @Delete(':id')
    @ApiBearerAuth() // Protecctión de recurso mediante autenticación para swagger
    @UseGuards(new JwtAuthGuard()) // Protección de rutas para el endpoint
    @ApiHeader({ name: 'Authorization', required: true })
    @ApiResponse({ status: 201, description: 'course_deleted'})
    async delete(@Param('id') id: number) {
        return await this.nameService.delete(id);
    }
}