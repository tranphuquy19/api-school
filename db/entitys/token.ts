
import { Column, DataType, Table, Model, ForeignKey, CreatedAt, UpdatedAt, BelongsTo, HasMany, BelongsToMany, HasOne } from 'sequelize-typescript';
import { ApiPropertyOptional } from '@nestjs/swagger';
@Table({
    tableName: 'token'
})
export class Tokens extends Model<Tokens> {
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
        field: 'token',
    }) 
    token: string;

    @ApiPropertyOptional()
    @Column({
        type: DataType.NUMBER,
        allowNull: true,
        validate: {
            notEmpty: false,
        },
        field: 'users_id',
    })
    usersId: number;

    @ApiPropertyOptional()
    @Column({
        type: DataType.NUMBER,
        allowNull: true,
        validate: {
            notEmpty: false,
        },
        field: 'accounts_id',
    })
    accountsId: number;

    @CreatedAt public created_at: Date;
    @UpdatedAt public updated_at: Date;

}
