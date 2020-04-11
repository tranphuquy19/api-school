
import { Column, DataType, Table, Model, ForeignKey, CreatedAt, UpdatedAt, BelongsTo, HasMany, BelongsToMany, HasOne } from 'sequelize-typescript';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { School } from './school';
@Table({
    tableName: 'Person'
})
export class Person extends Model<Person> {
    @ApiPropertyOptional()
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    })
    public id: number;

    @ApiPropertyOptional()
    @Column({
        type: DataType.CHAR(45),
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        field: 'identification',
    })
    identification: string;

    @ApiPropertyOptional()
    @Column({
        type: DataType.ENUM(
            'dni', 'carnet_extranjeria', 'pasaporte', 'ruc', 'otros'
        ),
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        field: 'identificationType',
    })
    identificationType: string;


    @ApiPropertyOptional()
    @Column({
        type: DataType.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        field: 'firtsName',
    })
    firstName: string;

    @ApiPropertyOptional()
    @Column({
        type: DataType.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        field: 'lastName',
    })
    lastName: string;


    @ApiPropertyOptional()
    @Column({
        type: DataType.DATE,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        field: 'bornDate',
    })
    bornDate: string;

    @ApiPropertyOptional()
    @Column({
        type: DataType.ENUM(
            'masculino', 'femenino', 'otros',
        ),
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        field: 'gender',
    })
    gender: string;

    @ApiPropertyOptional()
    @Column({
        type: DataType.DATE,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        field: 'startDate',
    })
    startDate: string;

    
    @ApiPropertyOptional()
    @ForeignKey(()=>School)
    @Column({
        type: DataType.NUMBER,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        field: 'schoolId',
    })
    schoolId: number;


    @ApiPropertyOptional()
    @Column({
        type: DataType.TEXT,
        allowNull: true,
        validate: {
            notEmpty: false,
        },
        field: 'update_by',
    })
	updateBy:string;

	 @ApiPropertyOptional()
    @Column({
        type: DataType.TEXT,
        allowNull: true,
        validate: {
            notEmpty: false,
        },
        field: 'update_dt',
    })
	updateDt: string;

    @CreatedAt public created_at: Date;
    @UpdatedAt public updated_at: Date;

    @BelongsTo(()=>School)
    school: School;

}
