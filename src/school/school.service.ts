import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';;
import { CreateSchoolDto, UpdateSchoolDto } from './school.dto';
import { School } from '../../db/entitys/school';
import { APP_LOGGER } from '../../logger/index';
@Injectable()
export class SchoolService { 
    constructor(
        @Inject('SchoolRepository') private readonly school: typeof School,
    ) { }
    async create(body: CreateSchoolDto) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await this.school.create(body);
                result.htmlBanner = process.env.STORAGE + 'school/' + result.htmlBanner;
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
                const result =  await this.school.findAll();
                result.map(item =>{
                    item.htmlBanner = process.env.STORAGE + 'school/' + item.htmlBanner;
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
                const result =  await this.school.findOne({
                    where: {
                        id,
                    },
                });
                result.htmlBanner = process.env.STORAGE + 'school/' + result.htmlBanner;
                resolve(result);
            } catch (error) {
                APP_LOGGER.error('ERROR: ',new Error(JSON.stringify(error)));
                reject(error);
            }
        })
    }


    async update(id: number, body: Partial<UpdateSchoolDto>) {
        return new Promise(async (resolve, reject) => {
            try {
                const existSchool = await this.school.findOne({
                    where:{
                        id,
                    }
                })
                if (!existSchool) {
                    throw new HttpException({ message: 'school_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
                }
                const result = await this.school.update(body, {
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
                const result = await this.school.findOne({ where: { id } })
                if (!result) {
                    throw new HttpException({ message: 'school_not_found' }, HttpStatus.NOT_FOUND)
                }
                const remove = await this.school.destroy({
                    where: {
                        id,
                    },
                });
                if (remove) {
                    resolve({
                        status: 1,
                        message: 'school_deleted'
                    })
                }
            } catch (error) {
                APP_LOGGER.error('ERROR: ',new Error(JSON.stringify(error)));
                reject(error);
            }
        });
    }
}