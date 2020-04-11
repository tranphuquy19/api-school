import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';;
import { CreateWeekDto, UpdateWeekDto } from './week.dto';
import { Course } from '../../db/entitys/course';
import { Week } from '../../db/entitys/week';
import { APP_LOGGER } from '../../logger/index';
@Injectable()
export class WeekService { 
    constructor(
        @Inject('WeekRepository') private readonly week: typeof Week,
        @Inject('CourseRepository') private readonly course: typeof Course,
    ) { }
    async create(body: CreateWeekDto) {
        return new Promise(async (resolve, reject) => {
            try {
                const school = await this.course.findByPk(body.courseId);
                if (!school) {
                    throw new HttpException({ message: 'course_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
                }
                const result = await this.week.create(body);
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
                const result =  await this.week.findAll({
                    include: [
                        {
                            model: Course,
                        }
                    ]
                });
                result.map(item=>{
                    item.course.banner =  process.env.STORAGE + 'course/' +  item.course.banner;
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
                const result =  await this.week.findOne({
                    where: {
                        id,
                    },
                    include: [
                        {
                            model: Course,
                        }
                    ]
                });
                result.course.banner =  process.env.STORAGE + 'course/' +  result.course.banner;
                resolve(result);
            } catch (error) {
                APP_LOGGER.error('ERROR: ',new Error(JSON.stringify(error)));
                reject(error);
            }
        })
    }


    async update(id: number, body: Partial<UpdateWeekDto>) {
        return new Promise(async (resolve, reject) => {
            try {
                const existWeek = await this.week.findOne({
                    where:{
                        id,
                    }
                })
                if (!existWeek) {
                    throw new HttpException({ message: 'week_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
                }
                if(body.courseId){
                    const school = await this.course.findByPk(body.courseId);
                    if (!school) {
                        throw new HttpException({ message: 'course_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
                    }
                }
                const result = await this.week.update(body, {
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
                const result = await this.week.findOne({ where: { id } })
                if (!result) {
                    throw new HttpException({ message: 'week_not_found' }, HttpStatus.NOT_FOUND)
                }
                const remove = await this.week.destroy({
                    where: {
                        id,
                    },
                });
                if (remove) {
                    resolve({
                        status: 1,
                        message: 'week_deleted'
                    })
                }
            } catch (error) {
                APP_LOGGER.error('ERROR: ',new Error(JSON.stringify(error)));
                reject(error);
            }
        });
    }
}