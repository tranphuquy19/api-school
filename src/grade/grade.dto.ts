import { IsUUID, IsString, IsNotEmpty, IsOptional, IsBoolean, IsNumber, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
export class CreateGradeDto {
    @ApiPropertyOptional()
    @IsString()
    @IsOptional() 
    name: string;
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
    levelId: number;
}

// tslint:disable-next-line: max-classes-per-file
export class UpdateGradeDto{
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
    levelId: number;
}
