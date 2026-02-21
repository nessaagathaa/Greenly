import { Injectable } from "@nestjs/common";
import { DatabaseService } from '../../libs/database/database.service';
import { RegisterDTO } from "./auth.dto";

@Injectable()
export class AuthRepository{
    constructor(
        private readonly db:DatabaseService
    ){}

    async registerUser(data:RegisterDTO){
        const user=await this.db.user.create({
            data:{
                email:data.email,
                passwordHash:data.password,
                profile:{
                    create:{
                        fullName:data.name
                    }
                }
            },            
        })
    }

    async checkUserByEmail(email:string){
        return await this.db.user.findUnique({
            where:{
                email:email
            }
        })
    }
    async checkUserById(id:number){
        return await this.db.user.findUnique({
            where:{
                id:id
            }
        })    
    }

}