import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';;
import { CreateYearDto, UpdateYearDto } from './year.dto';
import { School } from '../../db/entitys/school';
import { Year } from '../../db/entitys/year';
import { APP_LOGGER } from '../../logger/index';
@Injectable()
export class YearService { 
    constructor(
        @Inject('SchoolRepository') private readonly school: typeof School,
        @Inject('YearRepository') private readonly year: typeof Year,
    ) { }
    async create(body: CreateYearDto) {
        return new Promise(async (resolve, reject) => {
            try {
                const school = await this.school.findByPk(body.schoolId);
                if (!school) {
                    throw new HttpException({ message: 'school_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
                }
                const result = await this.year.create(body);
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
                const result =  await this.year.findAll({
                    include: [
                        {
                            model: School,
                        }
                    ]
                }); 
                result.map(item =>{
                    item.school.htmlBanner = process.env.STORAGE + 'school/' +  item.school.htmlBanner;
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
                const result =  await this.year.findOne({
                    where: {
                        id,
                    },
                    include: [
                        {
                            model: School,
                        }
                    ]
                });
                result.school.htmlBanner = process.env.STORAGE + 'school/' +  result.school.htmlBanner;
                resolve(result);
            } catch (error) {
                APP_LOGGER.error('ERROR: ',new Error(JSON.stringify(error)));
                reject(error);
            }
        })
    }


    async update(id: number, body: Partial<UpdateYearDto>) {
        return new Promise(async (resolve, reject) => {
            try {
                const existYear = await this.year.findOne({
                    where:{
                        id,
                    }
                })
                if (!existYear) {
                    throw new HttpException({ message: 'year_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
                }
                if(body.schoolId){
                    const school = await this.school.findByPk(body.schoolId);
                    if (!school) {
                        throw new HttpException({ message: 'school_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
                    }
                }
                const result = await this.year.update(body, {
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
                const result = await this.year.findOne({ where: { id } })
                if (!result) {
                    throw new HttpException({ message: 'year_not_found' }, HttpStatus.NOT_FOUND)
                }
                const remove = await this.year.destroy({
                    where: {
                        id,
                    },
                });
                if (remove) {
                    resolve({
                        status: 1,
                        message: 'year_deleted'
                    })
                }
            } catch (error) {
                APP_LOGGER.error('ERROR: ',new Error(JSON.stringify(error)));
                reject(error);
            }
        });
    }
}