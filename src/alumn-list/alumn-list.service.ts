import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';;
import { CreateAlumnListDto, UpdateAlumnListDto } from './alumn-list.dto';
import { Year } from '../../db/entitys/year';
import { Users } from '../../db/entitys/users';
import { Grade } from '../../db/entitys/grade';
import { AlumnList } from '../../db/entitys/alumn-list';
import { APP_LOGGER } from '../../logger/index';
@Injectable()
export class AlumnListService { 
    constructor(
        @Inject('AlumnListRepository') private readonly alumnList: typeof AlumnList,
        @Inject('UsersRepository') private readonly users: typeof Users,
        @Inject('YearRepository') private readonly year: typeof Year,
        @Inject('GradeRepository') private readonly grade: typeof Grade,
    ) { }
    async create(body: CreateAlumnListDto) {
        return new Promise(async (resolve, reject) => {
            try {
                const users = await this.users.findByPk(body.userId);
                if (!users) {
                    throw new HttpException({ message: 'user_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
                }
                const year = await this.year.findByPk(body.yearId);
                if (!year) {
                    throw new HttpException({ message: 'year_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
                }
                const grade = await this.grade.findByPk(body.gradeId);
                if (!grade) {
                    throw new HttpException({ message: 'grade_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
                }
                const result = await this.alumnList.create(body);
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
                const result =  await this.alumnList.findAll({
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
                result.map(item=>{
                    item.user.password = undefined;
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
                const result =  await this.alumnList.findOne({
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
                result.user.password = undefined;
                resolve(result);
            } catch (error) {
                APP_LOGGER.error('ERROR: ',new Error(JSON.stringify(error)));
                reject(error);
            }
        })
    }


    async update(id: number, body: Partial<UpdateAlumnListDto>) {
        return new Promise(async (resolve, reject) => {
            try {
                const existAlumn = await this.alumnList.findOne({
                    where:{
                        id,
                    }
                })
                if (!existAlumn) {
                    throw new HttpException({ message: 'alumn_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
                }
                if(body.userId){
                    const users = await this.users.findByPk(body.userId);
                    if (!users) {
                        throw new HttpException({ message: 'user_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
                    }
                }
                if(body.yearId){
                    const year = await this.year.findByPk(body.yearId);
                    if (!year) {
                        throw new HttpException({ message: 'year_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
                    }
                }
                if(body.gradeId){
                    const grade = await this.grade.findByPk(body.gradeId);
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
                const result = await this.alumnList.findOne({ where: { id } })
                if (!result) {
                    throw new HttpException({ message: 'alumn_not_found' }, HttpStatus.NOT_FOUND)
                }
                const remove = await this.alumnList.destroy({
                    where: {
                        id,
                    },
                });
                if (remove) {
                    resolve({
                        status: 1,
                        message: 'alumn_deleted'
                    })
                }
            } catch (error) {
                APP_LOGGER.error('ERROR: ',new Error(JSON.stringify(error)));
                reject(error);
            }
        });
    }
}