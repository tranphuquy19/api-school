import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';;
import { CreateRolDto, UpdateRolDto } from './rol.dto';
import { Rol } from '../../db/entitys/rol';
import { School } from '../../db/entitys/school';
import { APP_LOGGER } from '../../logger/index';
@Injectable()
export class RolService { 
    constructor(
        @Inject('RolRepository') private readonly rol: typeof Rol,
        @Inject('SchoolRepository') private readonly school: typeof School,
    ) { }
    async create(body: CreateRolDto) {
        return new Promise(async (resolve, reject) => {
            try {
                const school = await this.school.findByPk(body.schoolId);
                if (!school) {
                    throw new HttpException({ message: 'school_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
                }
                const result = await this.rol.create(body);
                resolve(result);
            } catch (error) {
                APP_LOGGER.error('ERROR: ',new Error(JSON.stringify(error)));
                reject(error);
            }
        });
    }

    async list() {
        return new Promise(async (resolve,reject)=>{
            try {
                const result =  await this.rol.findAll({
                    include:[
                        {
                            model: School,
                        }
                    ]
                });
                result.map(item=>{
                    item.school.htmlBanner = process.env.STORAGE + 'school/' + item.school.htmlBanner;
                });
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
                const result =  await this.rol.findOne({
                    where: {
                        id,
                    },
                    include:[
                        {
                            model: School,
                        }
                    ]
                });
                result.school.htmlBanner = process.env.STORAGE + 'school/' + result.school.htmlBanner;
                resolve(result);
            } catch (error) {
                APP_LOGGER.error('ERROR: ',new Error(JSON.stringify(error)));
                reject(error);
            }
        })
    }


    async update(id: number, body: Partial<UpdateRolDto>) {
        return new Promise(async (resolve, reject) => {
            try {
                const existRol = await this.rol.findOne({
                    where:{
                        id,
                    }
                })
                if (!existRol) {
                    throw new HttpException({ message: 'rol_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
                }
                if(body.schoolId){
                    const school = await this.school.findByPk(body.schoolId);
                    if (!school) {
                        throw new HttpException({ message: 'school_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
                    }
                }
                const result = await this.rol.update(body, {
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
                const result = await this.rol.findOne({ where: { id } })
                if (!result) {
                    throw new HttpException({ message: 'rol_not_found' }, HttpStatus.NOT_FOUND)
                }
                const remove = await this.rol.destroy({
                    where: {
                        id,
                    },
                });
                if (remove) {
                    resolve({
                        status: 1,
                        message: 'rol_deleted'
                    })
                }
            } catch (error) {
                APP_LOGGER.error('ERROR: ',new Error(JSON.stringify(error)));
                reject(error);
            }
        });
    }
}