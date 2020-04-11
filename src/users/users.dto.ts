import { IsUUID, IsString, IsNotEmpty, IsOptional, IsBoolean, IsNumber, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
export class CreateUsersDto {
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    nickName: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    email: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    password: string;
    @ApiPropertyOptional()
    @IsBoolean()
    @IsOptional()
    status: boolean;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    updateBy:string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    updateDt: string;
    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional()
    rolId: number;
    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional()
    personId: number;
}

// tslint:disable-next-line: max-classes-per-file
export class UpdateUsersDto{
    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional()
    id?: number;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    nickName?: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    email?: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    password?: string;
    @ApiPropertyOptional()
    @IsBoolean()
    @IsOptional()
    status?: boolean;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    updateBy?:string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    updateDt?: string;
    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional()
    rolId: number;
    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional()
    personId: number;
}
