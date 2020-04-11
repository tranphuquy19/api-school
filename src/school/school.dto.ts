import { IsUUID, IsString, IsNotEmpty, IsOptional, IsBoolean, IsNumber, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
export class CreateSchoolDto {
    @ApiPropertyOptional()
    @IsString()
    @IsOptional() 
    name: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional() 
    code: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional() 
    startDate: string;
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
}

// tslint:disable-next-line: max-classes-per-file
export class UpdateSchoolDto{
    @ApiPropertyOptional()
    @IsString()
    @IsOptional() 
    id?: number;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional() 
    name?: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional() 
    code?: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional() 
    startDate?: string;
    @ApiPropertyOptional()
    @IsString()
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
}
