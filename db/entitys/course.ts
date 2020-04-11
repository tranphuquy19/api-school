
import { Column, DataType, Table, Model, ForeignKey, CreatedAt, UpdatedAt, BelongsTo, HasMany, BelongsToMany, HasOne } from 'sequelize-typescript';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { School } from './school';
import { Year } from './year';
import { Users } from './users';
import { Grade } from './grade';
import { Week } from './week';
@Table({
    tableName: 'Course'
})
export class Course extends Model<Course> {
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
        type: DataType.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        field: 'status',
    })
    status: boolean;
    

    @ApiPropertyOptional()
    @Column({
        type: DataType.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        field: 'name',
    })
    name: string;

    @ApiPropertyOptional()
    @Column({
        type: DataType.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        field: 'banner',
    })
    banner: string;


   
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
    
    @ApiPropertyOptional()
    @ForeignKey(()=>Year)
    @Column({
        type: DataType.NUMBER,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        field: 'yearId',
    })
    yearId: number;

    @ApiPropertyOptional()
    @ForeignKey(()=>Users)
    @Column({
        type: DataType.NUMBER,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        field: 'teacherId',
    })
    teacherId: string;

    @ApiPropertyOptional()
    @ForeignKey(()=>Grade)
    @Column({
        type: DataType.NUMBER,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        field: 'gradesId',
    })
    gradesId: string;

    @CreatedAt public created_at: Date;
    @UpdatedAt public updated_at: Date;

    @BelongsTo(()=>Year)
    year: Year;

    @BelongsTo(()=>Users)
    teacher: Users;

    @BelongsTo(()=>Grade)
    grades: Grade;

    @HasMany(()=>Week)
    week: Week[];

}
