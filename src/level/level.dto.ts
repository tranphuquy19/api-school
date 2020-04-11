import { IsUUID, IsString, IsNotEmpty, IsOptional, IsBoolean, IsNumber, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
export class CreateLevelDto {
    @ApiPropertyOptional()
    @IsString()
    @IsOptional() 
    name: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional() 
    state: boolean;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional() 
    htmlTitle: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional() 
    htmlBody: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional() 
    htmlBanner: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional() 
    updateBy: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional() 
    updateDt: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional() 
    schoolId: number;
}

// tslint:disable-next-line: max-classes-per-file
export class UpdateLevelDto{
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
    htmlTitle?: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional() 
    htmlBody?: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional() 
    htmlBanner?: string;
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
