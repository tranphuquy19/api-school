import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';;
import { CreateTabDto, UpdateTabDto } from './tab.dto';
import { Week } from '../../db/entitys/week';
import { Tab } from '../../db/entitys/tab';
import { APP_LOGGER } from '../../logger/index';
@Injectable()
export class TabService { 
    constructor(
        @Inject('WeekRepository') private readonly week: typeof Week,
        @Inject('TabRepository') private readonly tab: typeof Tab,
    ) { }
    async create(body: CreateTabDto) {
        return new Promise(async (resolve, reject) => {
            try {
                const week = await this.week.findByPk(body.weekId);
                if (!week) {
                    throw new HttpException({ message: 'week_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
                }
                const result = await this.tab.create(body);
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
                const result =  await this.tab.findAll({
                    include: [
                        {
                            model: Week,
                        }
                    ]
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
                const result =  await this.tab.findOne({
                    where: {
                        id,
                    },
                    include: [
                        {
                            model: Week,
                        }
                    ]
                });
                resolve(result);
            } catch (error) {
                APP_LOGGER.error('ERROR: ',new Error(JSON.stringify(error)));
                reject(error);
            }
        })
    }


    async update(id: number, body: Partial<UpdateTabDto>) {
        return new Promise(async (resolve, reject) => {
            try {
                const existTab = await this.tab.findOne({
                    where:{
                        id,
                    }
                })
                if (!existTab) {
                    throw new HttpException({ message: 'tab_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
                }
                if(body.weekId){
                    const week = await this.week.findByPk(body.weekId);
                    if (!week) {
                        throw new HttpException({ message: 'week_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
                    }
                }
                const result = await this.tab.update(body, {
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
                const result = await this.tab.findOne({ where: { id } })
                if (!result) {
                    throw new HttpException({ message: 'tab_not_found' }, HttpStatus.NOT_FOUND)
                }
                const remove = await this.tab.destroy({
                    where: {
                        id,
                    },
                });
                if (remove) {
                    resolve({
                        status: 1,
                        message: 'tab_deleted'
                    })
                }
            } catch (error) {
                APP_LOGGER.error('ERROR: ',new Error(JSON.stringify(error)));
                reject(error);
            }
        });
    }
}