import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';;
import { CreateLevelDto, UpdateLevelDto } from './level.dto';
import { School } from '../../db/entitys/school';
import { Level } from '../../db/entitys/level';
import { APP_LOGGER } from '../../logger/index';
@Injectable()
export class LevelService { 
    constructor(
        @Inject('SchoolRepository') private readonly school: typeof School,
        @Inject('LevelRepository') private readonly level: typeof Level,
    ) { }
    async create(body: CreateLevelDto) {
        return new Promise(async (resolve, reject) => {
            try {
                const school = await this.school.findByPk(body.schoolId);
                if (!school) {
                    throw new HttpException({ message: 'school_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
                }
                const result = await this.level.create(body);
                result.htmlBanner = process.env.STORAGE + 'level/' + result.htmlBanner;
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
                const result =  await this.level.findAll({
                    include:[
                        {
                            model: School,
                        }
                    ]
                }); 
                result.map(item =>{
                    item.htmlBanner = process.env.STORAGE + 'level/' + item.htmlBanner;
                    item.school.htmlBanner = process.env.STORAGE + 'school/' +  item.school.htmlBanner;
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
                const result =  await this.level.findOne({
                    where: {
                        id,
                    },
                    include:[
                        {
                            model: School,
                        }
                    ]
                });
                result.htmlBanner = process.env.STORAGE + 'level/' + result.htmlBanner;
                result.school.htmlBanner = process.env.STORAGE + 'school/' +  result.school.htmlBanner;
                resolve(result);
            } catch (error) {
                APP_LOGGER.error('ERROR: ',new Error(JSON.stringify(error)));
                reject(error);
            }
        })
    }


    async update(id: number, body: Partial<UpdateLevelDto>) {
        return new Promise(async (resolve, reject) => {
            try {
                const existLevel = await this.level.findOne({
                    where:{
                        id,
                    }
                })
                if (!existLevel) {
                    throw new HttpException({ message: 'school_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
                }
                if(body.schoolId){
                    const school = await this.school.findByPk(body.schoolId);
                    if (!school) {
                        throw new HttpException({ message: 'school_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
                    }
                }
                const result = await this.level.update(body, {
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
                const result = await this.level.findOne({ where: { id } })
                if (!result) {
                    throw new HttpException({ message: 'level_not_found' }, HttpStatus.NOT_FOUND)
                }
                const remove = await this.level.destroy({
                    where: {
                        id,
                    },
                });
                if (remove) {
                    resolve({
                        status: 1,
                        message: 'level_deleted'
                    })
                }
            } catch (error) {
                APP_LOGGER.error('ERROR: ',new Error(JSON.stringify(error)));
                reject(error);
            }
        });
    }
}