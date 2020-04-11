
import { Column, DataType, Table, Model, ForeignKey, CreatedAt, UpdatedAt, BelongsTo, HasMany, BelongsToMany, HasOne } from 'sequelize-typescript';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { Rol } from './rol';
import { Person } from './person';
import { Course } from './course';
import { AlumnList } from './alumn-list';
@Table({
    tableName: 'User'
})
export class Users extends Model<Users> {
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
        type: DataType.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        field: 'nickName',
    })
    nickName: string;

    @ApiPropertyOptional()
    @Column({
        type: DataType.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        field: 'email',
    })
    email: string;


    @ApiPropertyOptional()
    @Column({
        type: DataType.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        field: 'password',
    })
    password: string;

    @ApiPropertyOptional()
    @Column({
        type: DataType.BOOLEAN,
        allowNull: true,
        validate: {
            notEmpty: false,
        },
        field: 'status',
    })
    status: boolean;

   
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
    @ForeignKey(()=>Person)
    @Column({
        type: DataType.NUMBER,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        field: 'personId',
    })
    personId: number;

    @ApiPropertyOptional()
    @ForeignKey(()=>Rol)
    @Column({
        type: DataType.NUMBER,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        field: 'rolId',
    })
    rolId: number;

    @CreatedAt public created_at: Date;
    @UpdatedAt public updated_at: Date;

    @BelongsTo(()=>Person)
    person: Person;

    @BelongsTo(()=>Rol)
    rol: Rol;
    
    @HasMany(()=>Course)
    couse: Course[];

    @HasMany(()=>AlumnList)
    alumnList: AlumnList[];
}
