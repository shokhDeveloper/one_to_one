import { Injectable, NotAcceptableException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUser, User } from './dto/dto';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService){}
    async getUsers(){
        return this.prismaService.user.findMany({include: {profile: {select: {bio: true}}}})
    }
    async createUser(user: User){
        return this.prismaService.user.create({
            data: {
                name: user.name,
                email: user.email,
                profile:{
                    create: {
                        bio: user.bio
                    }
                }
            }
        })
    }
    async getUser(id: string){
        let user = await this.prismaService.user.findFirst({where: {id: Number(id)}, include:{profile:{select: {bio: true}}}});
        if(!user) throw new NotAcceptableException("User is not found !");
        return user
    }
    async deleteUser(id: string){
        let user = await this.prismaService.user.findFirst({where: {id: Number(id)}});
        if(!user) throw new NotAcceptableException("User is not found !");
        let profile = await this.prismaService.profile.findFirst({where: {userId: user.id}})
        if(profile) await this.prismaService.profile.delete({where: {userId: user.id}});
        await this.prismaService.user.delete({where: {id: user.id}});
        return {message: "User deleted successfully", status: 200};
    }
    async updateUser(id: string, updateUser: UpdateUser){
        let user = await this.prismaService.user.findFirst({where: {id: Number(id)}});
        if(!user) throw new NotAcceptableException("User is not found !");
        let profile = await this.prismaService.profile.findFirst({where: {userId: user.id}})
        if(profile) await this.prismaService.profile.update({where: {userId: user.id}, data:{
            bio: updateUser.bio
        }});
        await this.prismaService.user.update({where:{id: (+id)}, data: {
            name: updateUser.name,
            email: updateUser.email
        }});
        return {message: "User updated successfully !", status: 200}
    }
}
