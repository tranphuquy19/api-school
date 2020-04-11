
import { Column, DataType, Table, Model, ForeignKey, CreatedAt, UpdatedAt, BelongsTo, HasMany, BelongsToMany, HasOne } from 'sequelize-typescript';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { Rol } from './rol';
import { Person } from './person';
import { Users } from './users';
import { Level } from './level';
import { Year } from './year';
@Table({
    tableName: 'School'
})
export class School extends Model<School> {
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
        field: 'name',
    })
    name: string;

    @ApiPropertyOptional()
    @Column({
        type: DataType.CHAR(45),
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        field: 'code',
    })
    code: string;


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
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        field: 'state',
    })
    state: boolean;
    

    @ApiPropertyOptional()
    @Column({
        type: DataType.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        field: 'htmlTitle',
    })
    htmlTitle: string;

    @ApiPropertyOptional()
    @Column({
        type: DataType.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        field: 'htmlBody',
    })
    htmlBody: string;

    @ApiPropertyOptional()
    @Column({
        type: DataType.TEXT,
        allowNull: true,
        validate: {
            notEmpty:false,
        },
        field: 'htmlBanner',
    })
    htmlBanner: string;


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

    @HasMany(()=>Rol)
    rol: Rol[];

    @HasMany(()=>Person)
    person: Person[];

    @HasMany(()=>Level)
    level: Level[];

    @HasMany(()=>Year)
    year: Year[];
}
