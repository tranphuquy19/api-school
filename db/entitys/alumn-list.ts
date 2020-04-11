
import { Column, DataType, Table, Model, ForeignKey, CreatedAt, UpdatedAt, BelongsTo, HasMany, BelongsToMany, HasOne } from 'sequelize-typescript';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { Year } from './year';
import { Users } from './users';
import { Grade } from './grade';
@Table({
    tableName: 'AlumnList'
})
export class AlumnList extends Model<AlumnList> {
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
        field: 'state',
    })
    state: boolean;
    

  
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
        field: 'userId',
    })
    userId: string;

    @ApiPropertyOptional()
    @ForeignKey(()=>Grade)
    @Column({
        type: DataType.NUMBER,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        field: 'gradeId',
    })
    gradeId: string;

    @CreatedAt public created_at: Date;
    @UpdatedAt public updated_at: Date;

    @BelongsTo(()=>Year)
    year: Year;

    @BelongsTo(()=>Users)
    user: Users;

    @BelongsTo(()=>Grade)
    grades: Grade;

}
