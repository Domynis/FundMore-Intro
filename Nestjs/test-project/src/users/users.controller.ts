import {Controller, Get, Post, Body, Param, NotFoundException, Put, Delete, Query} from '@nestjs/common';
import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import { User } from './models/user.model';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto) : Promise<User> {
        return this.usersService.create(createUserDto);
    }

    @Get()
    findAll() : Promise<User[]>{
        return this.usersService.findAll();
    }

    @Get('with-posts')
    async findAllWithPostsByTitleAndContent(
        @Query('title') title?: string,
        @Query('content') content?: string,
    ) : Promise<User[]> {
        return this.usersService.findAllWithPostsByTitleAndContent(title, content);
    }


    @Get(':id')
    async findOne(@Param('id') id: string) : Promise<User> {
        const user = await this.usersService.findOne(+id);
        if(!user) {
            throw new NotFoundException(`User #${id} not found`);
        }
        return user;
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateUserDto : UpdateUserDto) : Promise<User> {
        // check for user existence
        const user =  await this.usersService.update(+id, updateUserDto);
        if(!user) {
            throw new NotFoundException(`User #${id} not found`);
        }
        return user;
    }

    @Delete(':id')
    async remove(@Param('id') id: string) : Promise<void> {
        const user = await this.usersService.findOne(+id);
        if(!user) {
            throw new NotFoundException(`User #${id} not found`);
        }
        return this.usersService.remove(+id);
    }

    
}