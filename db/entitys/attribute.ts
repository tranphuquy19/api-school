
import { Column, DataType, Table, Model, ForeignKey, CreatedAt, UpdatedAt, BelongsTo, HasMany, BelongsToMany, HasOne } from 'sequelize-typescript';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { Tab } from './tab';
@Table({
    tableName: 'Attribute'
})
export class Attribute extends Model<Attribute> {
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
        field: 'type',
    })
    type: string;



    @ApiPropertyOptional()
    @Column({
        type: DataType.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        field: 'value',
    })
    value: string;

    @ApiPropertyOptional()
    @Column({
        type: DataType.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        field: 'title',
    })
    title: string;


    @ApiPropertyOptional()
    @Column({
        type: DataType.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        field: 'description',
    })
    description: string;

    
    @ApiPropertyOptional()
    @ForeignKey(()=>Tab)
    @Column({
        type: DataType.NUMBER,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        field: 'tabId',
    })
    tabId: number;


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

    @BelongsTo(()=>Tab)
    tab: Tab;

}
