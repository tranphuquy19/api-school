import { IsUUID, IsString, IsNotEmpty, IsOptional, IsBoolean, IsNumber, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
export class CreateYearDto {
    @ApiPropertyOptional()
    @IsString()
    @IsOptional() 
    name: string;
    @ApiPropertyOptional()
    @IsBoolean()
    @IsOptional() 
    status: boolean;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional() 
    description: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional() 
    startDate: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional() 
    endDate: string;
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
export class UpdateYearDto{
    @ApiPropertyOptional()
    @IsString()
    @IsOptional() 
    id?: number;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional() 
    name?: string;
    @ApiPropertyOptional()
    @IsBoolean()
    @IsOptional() 
    status?: boolean;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional() 
    description?: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional() 
    startDate?: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional() 
    endDate?: string;
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
    schoolId?: number;
}
