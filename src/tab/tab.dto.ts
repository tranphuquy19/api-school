import { IsUUID, IsString, IsNotEmpty, IsOptional, IsBoolean, IsNumber, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
export class CreateTabDto {
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
    updateBy: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional() 
    updateDt: string;
    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional() 
    weekId: number;
}

// tslint:disable-next-line: max-classes-per-file
export class UpdateTabDto{
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
    updateBy?: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional() 
    updateDt?: string;
    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional() 
    weekId?: number;
}
