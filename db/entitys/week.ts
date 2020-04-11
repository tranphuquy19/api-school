
import { Column, DataType, Table, Model, ForeignKey, CreatedAt, UpdatedAt, BelongsTo, HasMany, BelongsToMany, HasOne } from 'sequelize-typescript';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { School } from './school';
import { Course } from './course';
import { AlumnList } from './alumn-list';
import { Tab } from './tab';
@Table({
    tableName: 'Week'
})
export class Week extends Model<Week> {
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
        type: DataType.DATE,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        field: 'endDate',
    })
    endDate: string;


  
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
    @ForeignKey(()=>Course)
    @Column({
        type: DataType.NUMBER,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        field: 'courseId',
    })
    courseId: number;

    @CreatedAt public created_at: Date;
    @UpdatedAt public updated_at: Date;

    @BelongsTo(()=>Course)
    course: Course;

    @HasMany(()=>Tab)
    tab: Tab[];
}
