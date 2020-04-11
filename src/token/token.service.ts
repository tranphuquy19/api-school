import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';;
import { CreateTokensDto, UpdateTokensDto } from './token.dto';
import * as dotenv from 'dotenv';
import { Tokens } from '../../db/entitys/token';
import { APP_LOGGER } from '../../logger/index';
dotenv.config();
@Injectable()
export class TokensService { 
    constructor(
        @Inject('TokensRepository') private readonly tokens: typeof Tokens,
    ) { }
    async create(body: CreateTokensDto) {
        return new Promise(async (resolve, reject) => {
            try {
                const result: any = await this.tokens.create(body);
                resolve(result);
            } catch (error) {
                // tslint:disable-next-line: no-console
                
                APP_LOGGER.error('ERROR: ',new Error(JSON.stringify(error)));
                reject(error);
            }
        });
    }

    async list() {
        return new Promise(async (resolve,reject)=>{
            try {
                const result =  await this.tokens.findAll();
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
                const result =  await this.tokens.findOne({
                    where: {
                        id,
                    }
                });
                resolve(result);
            } catch (error) {
                
                APP_LOGGER.error('ERROR: ',new Error(JSON.stringify(error)));
                reject(error);
            }
        })
    }


    async update(id: number, body: Partial<UpdateTokensDto>) {
        return new Promise(async (resolve, reject) => {
            try {
                const existToken = await this.tokens.findOne({
                    where:{
                        id,
                    }
                })
                if (!existToken) {
                    throw new HttpException({ message: 'token_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
                }
                const result = await this.tokens.update(body, {
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
                const result = await this.tokens.findOne({ where: { id } })
                if (!result) {
                    throw new HttpException({ message: 'token_not_found' }, HttpStatus.NOT_FOUND)
                }
                const remove = await this.tokens.destroy({
                    where: {
                        id,
                    },
                });
                if (remove) {
                    resolve({
                        status: 1,
                        message: 'token_deleted'
                    })
                }
            } catch (error) {
                APP_LOGGER.error('ERROR: ',new Error(JSON.stringify(error)));
                reject(error);
            }
        });
    }
}