import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';;
import { CreateCourseDto, UpdateCourseDto } from './course.dto';
import { Year } from '../../db/entitys/year';
import { Users } from '../../db/entitys/users';
import { Grade } from '../../db/entitys/grade';
import { Course } from '../../db/entitys/course';
import { APP_LOGGER } from '../../logger/index';
import * as dotenv from 'dotenv';
import { PayloadJWTI } from '../auth/auth.dto';
dotenv.config();
@Injectable()
export class CourseService {  
    constructor(
        @Inject('CourseRepository') private readonly course: typeof Course,
        @Inject('UsersRepository') private readonly users: typeof Users,
        @Inject('YearRepository') private readonly year: typeof Year,
        @Inject('GradeRepository') private readonly grade: typeof Grade,
    ) { }
    async create(body: CreateCourseDto) {
        return new Promise(async (resolve, reject) => {
            try {
                const users = await this.users.findByPk(body.teacherId);
                if (!users) {
                    throw new HttpException({ message: 'teacher_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
                }
                const year = await this.year.findByPk(body.yearId);
                if (!year) {
                    throw new HttpException({ message: 'year_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
                }
                const grade = await this.grade.findByPk(body.gradesId);
                if (!grade) {
                    throw new HttpException({ message: 'grade_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
                }
                const result = await this.course.create(body);
                result.banner = process.env.STORAGE + 'course/' + result.banner;
                resolve(result);
            } catch (error) {
                // tslint:disable-next-line: no-console
                console.log(error);
                APP_LOGGER.error('ERROR: ',new Error(JSON.stringify(error)));
                reject(error);
            }
        });
    }

    async list(jwt: PayloadJWTI) {
        return new Promise(async (resolve,reject)=>{
            try {
                const result =  await this.course.findAll({
                    include:[
                        {
                            model: Year,
                        },
                        {
                            model: Users,
                        },
                        {
                            model: Grade,
                        },
                    ]
                });
                result.map(item =>{
                    item.banner = process.env.STORAGE + 'course/' + item.banner;
                    item.teacher.password = undefined;
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
                const result =  await this.course.findOne({
                    where: {
                        id,
                    },
                    include:[
                        {
                            model: Year,
                        },
                        {
                            model: Users,
                        },
                        {
                            model: Grade,
                        },
                    ]
                });
                result.banner = process.env.STORAGE + 'course/' + result.banner;
                result.teacher.password = undefined;
                resolve(result);
            } catch (error) {
                APP_LOGGER.error('ERROR: ',new Error(JSON.stringify(error)));
                reject(error);
            }
        })
    }


    async update(id: number, body: Partial<UpdateCourseDto>) {
        return new Promise(async (resolve, reject) => {
            try {
                const existCourse = await this.course.findOne({
                    where:{
                        id,
                    }
                })
                if (!existCourse) {
                    throw new HttpException({ message: 'course_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
                }
                if(body.teacherId){
                    const users = await this.users.findByPk(body.teacherId);
                    if (!users) {
                        throw new HttpException({ message: 'teacher_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
                    }
                }
                if(body.yearId){
                    const year = await this.year.findByPk(body.yearId);
                    if (!year) {
                        throw new HttpException({ message: 'year_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
                    }
                }
                if(body.gradesId){
                    const grade = await this.grade.findByPk(body.gradesId);
                    if (!grade) {
                        throw new HttpException({ message: 'grade_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
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
                const result = await this.course.findOne({ where: { id } })
                if (!result) {
                    throw new HttpException({ message: 'course_not_found' }, HttpStatus.NOT_FOUND)
                }
                const remove = await this.course.destroy({
                    where: {
                        id,
                    },
                });
                if (remove) {
                    resolve({
                        status: 1,
                        message: 'course_deleted'
                    })
                }
            } catch (error) {
                APP_LOGGER.error('ERROR: ',new Error(JSON.stringify(error)));
                reject(error);
            }
        });
    }
}