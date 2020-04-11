import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { APP_LOGGER } from '../../logger/index';
import { Users } from '../../db/entitys/users';
import { Tokens } from '../../db/entitys/token';
import { Rol } from '../../db/entitys/rol';
dotenv.config();
@Injectable()
export class AuthService { 
    constructor(
        @Inject('UsersRepository') private readonly users: typeof Users,
        @Inject('TokensRepository') private readonly tokens: typeof Tokens,
        @Inject('RolRepository') private readonly rol: typeof Rol,
        private readonly jwtService: JwtService,
    ) { }


    // LOGIN
    async auth(nickname: string, password: string){
        return new Promise(async(resolve,reject)=>{
            try {
                const users = await this.users.findOne({
                    where: {
                        nickname,
                    }
                });
                if(!users){
                    throw new HttpException({ message: 'nickname_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
                }
                if(users.status === false){
                    throw new HttpException({ message: 'user_disable' }, HttpStatus.UNPROCESSABLE_ENTITY);
                }
                if (!bcrypt.compareSync(password,users.password)) {
                    throw new HttpException({ message: 'password_incorrect' }, HttpStatus.UNPROCESSABLE_ENTITY);
                }
                const token = await this.createToken(users);
                resolve({
                    accessToken: token,
                });
            } catch (error) {
                APP_LOGGER.error('LOGIN: ', new Error(JSON.stringify(error)));
                reject(error);
            }
        });
    }


    // CREACIÓN DEL TOKEN DE SESIÓN
    async createToken(payload: Users) {
        try {
            const rol = await this.rol.findByPk(payload.rolId);
            const dataPayload = {
                userId: payload.id,
                roleId: rol.id,
            }
            const accessToken = await this.jwtService.sign(dataPayload);
            await this.tokens.create({
                token: accessToken,
                usersId: payload.id,
            });
            return accessToken;
        } catch (error) {
            APP_LOGGER.error('CREATE TOKEN: ',new Error(JSON.stringify(error)));
            return error;
        }
    }
}
