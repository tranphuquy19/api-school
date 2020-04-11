import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';;
import { CreateGradeDto, UpdateGradeDto } from './grade.dto';
import { Level } from '../../db/entitys/level';
import { Grade } from '../../db/entitys/grade';
import { APP_LOGGER } from '../../logger/index';
@Injectable()
export class GradeService { 
    constructor(
        @Inject('LevelRepository') private readonly level: typeof Level,
        @Inject('GradeRepository') private readonly grade: typeof Grade,
    ) { }
    async create(body: CreateGradeDto) {
        return new Promise(async (resolve, reject) => {
            try {
                const level = await this.level.findByPk(body.levelId);
                if (!level) {
                    throw new HttpException({ message: 'level_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
                }
                const result = await this.grade.create(body);
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
                const result =  await this.grade.findAll({
                    include:[
                        {
                            model: Level,
                        }
                    ]
                });
                result.map(item =>{
                    item.level.htmlBanner = process.env.STORAGE + 'level/' + item.level.htmlBanner;
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
                const result =  await this.grade.findOne({
                    where: {
                        id,
                    },
                    include:[
                        {
                            model: Level,
                        }
                    ]
                });
                result.level.htmlBanner = process.env.STORAGE + 'level/' + result.level.htmlBanner;
                resolve(result);
            } catch (error) {
                APP_LOGGER.error('ERROR: ',new Error(JSON.stringify(error)));
                reject(error);
            }
        })
    }


    async update(id: number, body: Partial<UpdateGradeDto>) {
        return new Promise(async (resolve, reject) => {
            try {
                const existGrade = await this.grade.findOne({
                    where:{
                        id,
                    }
                })
                if (!existGrade) {
                    throw new HttpException({ message: 'grade_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
                }
                if(body.levelId){
                    const school = await this.level.findByPk(body.levelId);
                    if (!school) {
                        throw new HttpException({ message: 'level_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
                    }
                }
                const result = await this.grade.update(body, {
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
                const result = await this.grade.findOne({ where: { id } })
                if (!result) {
                    throw new HttpException({ message: 'grade_not_found' }, HttpStatus.NOT_FOUND)
                }
                const remove = await this.grade.destroy({
                    where: {
                        id,
                    },
                });
                if (remove) {
                    resolve({
                        status: 1,
                        message: 'grade_deleted'
                    })
                }
            } catch (error) {
                APP_LOGGER.error('ERROR: ',new Error(JSON.stringify(error)));
                reject(error);
            }
        });
    }
}