import { IsUUID, IsString, IsNotEmpty, IsOptional, IsBoolean, IsNumber, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
export class CreateCourseDto {
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    name: string;
    @ApiPropertyOptional({ type: 'file',format: 'binary' })
    @IsString()
    @IsOptional()
    banner:  string;
    @ApiPropertyOptional()
    @IsString()
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
    @IsString()
    @IsOptional() 
    yearId: number;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional() 
    teacherId: number;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional() 
    gradesId: number;
}

// tslint:disable-next-line: max-classes-per-file
export class UpdateCourseDto{
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
    banner: string;
    @ApiPropertyOptional()
    @IsString()
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
    yearId?: number;
    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional() 
    teacherId?: number;
    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional() 
    gradesId?: number;
}
