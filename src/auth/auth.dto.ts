import { IsUUID, IsDate, IsNumber, IsString, IsNotEmpty, IsOptional, IsBoolean, IsEnum } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
export class AuthLoginDto{
    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    nickname: string;
    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    password: string;
}

// tslint:disable-next-line: max-classes-per-file
export class PayloadJWTI {
    rolId: number;
    userId: string;
}