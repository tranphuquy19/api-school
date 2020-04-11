import { IsUUID, IsString, IsNotEmpty, IsOptional, IsBoolean, IsNumber, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
export class CreatePersonDto {
    @ApiPropertyOptional()
    @IsString()
    @IsOptional() 
    identification: string;

    @ApiPropertyOptional()
    @ApiPropertyOptional({enum: ['dni', 'carnet_extranjeria', 'pasaporte', 'ruc', 'otros']})
    @IsEnum({
        dni: 'dni', carnet_extranjeria: 'carnet_extranjeria' , pasaporte: 'pasaporte', ruc: 'ruc', otros: 'otros',
    })
    identificationType: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    firstName: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional() 
    lastName: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional() 
    bornDate: string;

    @ApiPropertyOptional({enum: ['masculino', 'femenino', 'otros']})
    @IsEnum({
        masculino: 'masculino', femenino: 'femenino' , otros: 'otros',
    })
    gender: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional() 
    startDate: string;

    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional() 
    schoolId: number;
}

// tslint:disable-next-line: max-classes-per-file
export class UpdatePersonDto{
    @ApiPropertyOptional()
    @IsString()
    @IsOptional() 
    id?: number;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional() 
    identification?: string;

    @ApiPropertyOptional()
    @ApiPropertyOptional({enum: ['dni', 'carnet_extranjeria', 'pasaporte', 'ruc', 'otros']})
    @IsEnum({
        dni: 'dni', carnet_extranjeria: 'carnet_extranjeria' , pasaporte: 'pasaporte', ruc: 'ruc', otros: 'otros',
    })
    identificationType?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional() 
    firstName?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional() 
    lastName?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional() 
    bornDate?: string;

    @ApiPropertyOptional({enum: ['masculino', 'femenino', 'otros',]})
    @IsEnum({
        masculino: 'masculino', femenino: 'femenino' , otros: 'otros',
    })
    gender?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional() 
    startDate?: string;
    
    @ApiPropertyOptional()
    @IsString()
    @IsOptional() 
    schoolId?: number;
}
