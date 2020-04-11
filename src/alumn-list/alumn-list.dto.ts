import { IsUUID, IsString, IsNotEmpty, IsOptional, IsBoolean, IsNumber, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
export class CreateAlumnListDto {
    @ApiPropertyOptional()
    @IsBoolean()
    @IsOptional() 
    state: boolean;
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
    yearId: number;
    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional() 
    userId: number;
    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional() 
    gradeId: number;
}

// tslint:disable-next-line: max-classes-per-file
export class UpdateAlumnListDto{
    @ApiPropertyOptional()
    @IsString()
    @IsOptional() 
    id?: number;
    @ApiPropertyOptional()
    @IsBoolean()
    @IsOptional() 
    state?: boolean;
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
    yearId?: number;
    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional() 
    userId?: number;
    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional() 
    gradeId?: number;
}
