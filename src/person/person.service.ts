import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';;
import { CreatePersonDto, UpdatePersonDto } from './person.dto';
import { School } from '../../db/entitys/school';
import { Person } from '../../db/entitys/person';
import { APP_LOGGER } from '../../logger/index';
@Injectable()
export class PersonService { 
    constructor(
        @Inject('SchoolRepository') private readonly school: typeof School,
        @Inject('PersonRepository') private readonly person: typeof Person,
    ) { }
    async create(body: CreatePersonDto) {
        return new Promise(async (resolve, reject) => {
            try {
                const school = await this.school.findByPk(body.schoolId);
                if (!school) {
                    throw new HttpException({ message: 'school_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
                }
                const result = await this.person.create(body);
                resolve(result);
            } catch (error) {
                // tslint:disable-next-line: no-console
                console.log(error);
                APP_LOGGER.error('ERROR: ',new Error(JSON.stringify(error)));
                reject(error);
            }
        });
    }
    
    async listGender() {
        return new Promise(async (resolve,reject)=>{
            try {
                const roles = await this.person.rawAttributes.gender.values;
                resolve(roles);
            } catch (error) {
                APP_LOGGER.error('ERROR: ',new Error(JSON.stringify(error)));
                reject(error);
            }
        })
    }


    async listIdentificationType() {
        return new Promise(async (resolve,reject)=>{
            try {
                const roles = await this.person.rawAttributes.identificationType.values;
                resolve(roles);
            } catch (error) {
                APP_LOGGER.error('ERROR: ',new Error(JSON.stringify(error)));
                reject(error);
            }
        })
    }


    async list() {
        return new Promise(async (resolve,reject)=>{
            try {
                const result =  await this.person.findAll({include:[
                    {
                        model: School,
                    }
                ]});
                result.map(item=>{
                    item.school.htmlBanner = process.env.STORAGE + 'school/' + item.school.htmlBanner;
                });
                resolve(result);
            } catch (error) {
                console.log(error);
                APP_LOGGER.error('ERROR: ',new Error(JSON.stringify(error)));
                reject(error);
            }
        })
    }

    async detail(id: number) {
        return new Promise(async(resolve,reject)=>{
            try {
                const result =  await this.person.findOne({
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


    async update(id: number, body: Partial<UpdatePersonDto>) {
        return new Promise(async (resolve, reject) => {
            try {
                const existPerson = await this.person.findOne({
                    where:{
                        id,
                    }
                })
                if (!existPerson) {
                    throw new HttpException({ message: 'person_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
                }
                const result = await this.person.update(body, {
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
                const result = await this.person.findOne({ where: { id } })
                if (!result) {
                    throw new HttpException({ message: 'person_not_found' }, HttpStatus.NOT_FOUND)
                }
                const remove = await this.person.destroy({
                    where: {
                        id,
                    },
                });
                if (remove) {
                    resolve({
                        status: 1,
                        message: 'person_deleted'
                    })
                }
            } catch (error) {
                APP_LOGGER.error('ERROR: ',new Error(JSON.stringify(error)));
                reject(error);
            }
        });
    }
}