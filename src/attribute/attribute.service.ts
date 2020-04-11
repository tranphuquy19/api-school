import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';;
import { CreateAttributeDto, UpdateAttributeDto } from './attribute.dto';
import { Tab } from '../../db/entitys/tab';
import { Attribute } from '../../db/entitys/attribute';
import { APP_LOGGER } from '../../logger/index';
@Injectable()
export class AttributeService { 
    constructor(
        @Inject('TabRepository') private readonly tab: typeof Tab,
        @Inject('AttributeRepository') private readonly attribute: typeof Attribute,
    ) { }
    async create(body: CreateAttributeDto) {
        return new Promise(async (resolve, reject) => {
            try {
                const tab = await this.tab.findByPk(body.tabId);
                if (!tab) {
                    throw new HttpException({ message: 'tab_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
                }
                const result = await this.attribute.create(body);
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
                const result =  await this.attribute.findAll({
                    include:[
                        {
                            model: Tab
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
                const result =  await this.attribute.findOne({
                    where: {
                        id,
                    },
                    include:[
                        {
                            model: Tab
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


    async update(id: number, body: Partial<UpdateAttributeDto>) {
        return new Promise(async (resolve, reject) => {
            try {
                const existAttribute = await this.attribute.findOne({
                    where:{
                        id,
                    }
                })
                if (!existAttribute) {
                    throw new HttpException({ message: 'attribute_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
                }
                if(body.tabId){
                    const tab = await this.tab.findByPk(body.tabId);
                    if (!tab) {
                        throw new HttpException({ message: 'tab_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
                    }
                }
                const result = await this.attribute.update(body, {
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
                const result = await this.attribute.findOne({ where: { id } })
                if (!result) {
                    throw new HttpException({ message: 'tab_not_found' }, HttpStatus.NOT_FOUND)
                }
                const remove = await this.attribute.destroy({
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