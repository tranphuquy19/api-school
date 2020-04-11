import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';;
import { CreateUsersDto, UpdateUsersDto } from './users.dto';
import * as bcrypt from 'bcrypt';
import { Users } from '../../db/entitys/users';
import { Person } from '../../db/entitys/person';
import { Rol } from '../../db/entitys/rol';
import { APP_LOGGER } from '../../logger/index';
@Injectable()
export class UsersService { 
    constructor(
        @Inject('UsersRepository') private readonly users: typeof Users,
        @Inject('PersonRepository') private readonly person: typeof Person,
        @Inject('RolRepository') private readonly rol: typeof Rol,
    ) { }
    async create(body: CreateUsersDto) {
        return new Promise(async (resolve, reject) => {
            try {
                const person = await this.person.findByPk(body.personId);
                if (!person) {
                    throw new HttpException({ message: 'person_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
                } 
                const rol = await this.rol.findByPk(body.rolId);
                if (!rol) {
                    throw new HttpException({ message: 'rol_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
                }
                body.password = await bcrypt.hashSync(body.password, 10);
                const result = await this.users.create(body);
                resolve(result);
            } catch (error) {
                // tslint:disable-next-line: no-console
                console.log(error);
                APP_LOGGER.error('ERROR: ',new Error(JSON.stringify(error)));
                reject(error);
            }
        });
    }

    async list() {
        return new Promise(async (resolve,reject)=>{
            try {
                const result =  await this.users.findAll({
                    include:[
                        {
                            model:Rol,
                        },
                        {
                            model:Person,
                        }
                    ]
                });
                result.map(item =>{
                    item.password= undefined;
                })
                resolve(result);
            } catch (error) {
                APP_LOGGER.error('ERROR: ',new Error(JSON.stringify(error)));
                reject(error);
            }
        })
    }

    async detail(id: number) {
        return new Promise(async(resolve,reject)=>{
            try {
                const result =  await this.users.findOne({
                    where: {
                        id,
                    },
                    include:[
                        {
                            model:Rol,
                        },
                        {
                            model:Person,
                        }
                    ]
                });
                result.password = undefined
                resolve(result);
            } catch (error) {
                console.log(error);
                APP_LOGGER.error('ERROR: ',new Error(JSON.stringify(error)));
                reject(error);
            }
        })
    }


    async update(id: number, body: Partial<UpdateUsersDto>) {
        return new Promise(async (resolve, reject) => {
            try {
                const existUser = await this.users.findOne({
                    where:{
                        id,
                    }
                })
                if (!existUser) {
                    throw new HttpException({ message: 'user_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
                }
                if(body.personId){
                    const person = await this.person.findByPk(body.personId);
                    if (!person) {
                        throw new HttpException({ message: 'person_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
                    }
                }
                if(body.rolId){
                    const rol = await this.rol.findByPk(body.rolId);
                    if (!rol) {
                        throw new HttpException({ message: 'rol_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
                    }
                }
                if (body.email){
                    const cuentasEmail =  await this.users.findOne({where:{email: body.email}});
                    if(cuentasEmail){
                        if(cuentasEmail.email === body.email){
                            body.email = undefined;
                        } else {
                            throw new HttpException({ message: 'email_duplicated' }, HttpStatus.UNPROCESSABLE_ENTITY);
                        }
                    }
                }
                if(body.password){
                    body.password = await bcrypt.hashSync(body.password, 10);
                }
                const result = await this.users.update(body, {
                    where: {
                        id,
                    },
                    returning: true,
                });
                resolve(result);
            } catch (error) {
                APP_LOGGER.error('ERROR: ',new Error(JSON.stringify(error)));
                reject(error);
            }
        });
    }


    async delete(id: number) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await this.users.findOne({ where: { id } })
                if (!result) {
                    throw new HttpException({ message: 'user_not_found' }, HttpStatus.NOT_FOUND)
                }
                const remove = await this.users.destroy({
                    where: {
                        id,
                    },
                });
                if (remove) {
                    resolve({
                        status: 1,
                        message: 'user_deleted'
                    })
                }
            } catch (error) {
                APP_LOGGER.error('ERROR: ',new Error(JSON.stringify(error)));
                reject(error);
            }
        });
    }
}