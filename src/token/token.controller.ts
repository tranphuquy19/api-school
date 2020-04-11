import { Controller, Post, UseInterceptors, Headers, Body, Get, Param, Put, Delete, Query, UseGuards, UseFilters } from '@nestjs/common';
import { ResponseInterceptor } from '../shared/interceptors/response.interceptor';
import { CreateTokensDto, UpdateTokensDto } from './token.dto';
import { ApiTags, ApiBearerAuth, ApiHeader, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../shared/guard/jwt-auth.guard';
import { AppExceptionFilter } from '../shared/filters/app-exception.filter';
import { TokensService } from './token.service';
@Controller('tokens')
@ApiTags('Tokens') 
@UseFilters(new AppExceptionFilter())
@UseInterceptors(ResponseInterceptor)
export class TokensController {
    constructor(private readonly nameService: TokensService) { }
    @ApiBearerAuth() // Protecctión de recurso mediante autenticación para swagger
    @UseGuards(new JwtAuthGuard()) // Protección de rutas para el endpoint
    @ApiHeader({ name: 'Authorization', required: true })
    @Post()
    @UseGuards(new JwtAuthGuard()) 
    @ApiOperation({ summary: 'Crea una cuenta asociada a un negocio'})
    async create(@Body() body: CreateTokensDto) {
        return await this.nameService.create(body);
    }

    // Listar pais
    @ApiBearerAuth() // Protecctión de recurso mediante autenticación para swagger
    @UseGuards(new JwtAuthGuard()) // Protección de rutas para el endpoint
    @ApiHeader({ name: 'Authorization', required: true })
    @Get()
    @UseGuards(new JwtAuthGuard()) 
    @ApiOperation({ summary: 'Lista las cuentas'})
    async list() {
        return await this.nameService.list();
    }

    // Listar pais
    @ApiBearerAuth() // Protecctión de recurso mediante autenticación para swagger
    @UseGuards(new JwtAuthGuard()) // Protección de rutas para el endpoint
    @ApiHeader({ name: 'Authorization', required: true })
    @Get(':id')
    @UseGuards(new JwtAuthGuard()) 
    @ApiOperation({ summary: 'Lista las cuentas asociadas a un negocio'})
    async detail(@Param('id') id: number) {
        return await this.nameService.detail(id);
    }

    // Actualizar pais
    @Put(':id')
    @ApiBearerAuth() // Protecctión de recurso mediante autenticación para swagger
    @UseGuards(new JwtAuthGuard()) // Protección de rutas para el endpoint
    @ApiHeader({ name: 'Authorization', required: true })
    @ApiOperation({ summary: 'Actualiza un usuario de un usuario del sistema'})
    async update(@Param('id') id: number, @Body() body: Partial<UpdateTokensDto>) {
        return await this.nameService.update(id, body);
    }

    // Eliminar pais
    @Delete(':id')
    @ApiBearerAuth() // Protecctión de recurso mediante autenticación para swagger
    @UseGuards(new JwtAuthGuard()) // Protección de rutas para el endpoint
    @ApiHeader({ name: 'Authorization', required: true })
    @ApiOperation({ summary: 'Elimina un usuario de un usuario del sistema'})
    async delete(@Param('id') id: number) {
        return await this.nameService.delete(id);
    }
}