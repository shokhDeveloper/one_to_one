import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUser, User } from './dto/dto';

@Controller('user')
export class UserController {
    constructor(private readonly appService: UserService){};
    @HttpCode(200)
    @Get()
    async getUsers(){
        return this.appService.getUsers() 
    }
    @HttpCode(201)
    @Post()
    async createUser(@Body() dto:User){
        return this.appService.createUser(dto)
    }
    @HttpCode(200)
    @Get(":id")
    async getUser(@Param("id") id: string){
        return this.appService.getUser(id)
    }
    @HttpCode(200)
    @Delete(":id")
    async deleteUser(@Param("id") id: string){
        return this.appService.deleteUser(id)   
    }
    @HttpCode(200)
    @Put(":id")
    async updateUser(@Param("id") id: string, @Body() dto: UpdateUser){
        return this.appService.updateUser(id, dto)
    }
}
