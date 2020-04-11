import { IsUUID, IsString, IsNotEmpty, IsOptional, IsBoolean, IsNumber, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
export class CreateAttributeDto {
    @ApiPropertyOptional()
    @IsString()
    type: string;
    @ApiPropertyOptional()
    @IsString()
    value: string;
    @ApiPropertyOptional()
    @IsString()
    title: string;
    @ApiPropertyOptional()
    @IsString()
    description: string;
    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional() 
    tabId: number;
}

// tslint:disable-next-line: max-classes-per-file
export class UpdateAttributeDto{
    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional() 
    id: number;
    @ApiPropertyOptional()
    @IsString()
    type?: string;
    @ApiPropertyOptional()
    @IsString()
    value?: string;
    @ApiPropertyOptional()
    @IsString()
    title?: string;
    @ApiPropertyOptional()
    @IsString()
    description?: string;
    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional() 
    tabId?: number;
}
