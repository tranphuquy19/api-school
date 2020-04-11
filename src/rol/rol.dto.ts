import { IsUUID, IsString, IsNotEmpty, IsOptional, IsBoolean, IsNumber, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
export class CreateRolDto {
    @ApiPropertyOptional()
    @IsString()
    @IsOptional() 
    value: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional() 
    description: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional() 
    path: string;
    @ApiPropertyOptional()
    @IsBoolean()
    @IsOptional() 
    status: boolean;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional() 
    updateBy: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional() 
    updateDt: string;
    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional() 
    schoolId: number;
}

// tslint:disable-next-line: max-classes-per-file
export class UpdateRolDto{
    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional() 
    id?: number;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional() 
    value?: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional() 
    description?: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional() 
    path?: string;
    @ApiPropertyOptional()
    @IsBoolean()
    @IsOptional() 
    status?: boolean;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional() 
    updateBy?: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional() 
    updateDt?: string;
    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional() 
    schoolId: number;
}
