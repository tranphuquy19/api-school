import {  IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
export class CreateTokensDto {

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    token?: string;

    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional()
    usersId?: number;

}

// tslint:disable-next-line: max-classes-per-file
export class UpdateTokensDto extends CreateTokensDto{
    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    id?: number;
}
