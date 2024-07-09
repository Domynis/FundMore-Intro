import {Injectable} from '@nestjs/common';
import { User } from './models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Post } from 'src/posts/models/post.model';
import { Op } from 'sequelize';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        return this.userModel.create({
            username: createUserDto.username,
            email: createUserDto.email,
        });
    }

    async findOne(id: number): Promise<User> {
        return this.userModel.findOne({
            where: {
                id,
            },
        });
    }

    async findAll(): Promise<User[]> {
        return this.userModel.findAll();
    }

    async remove(id: number): Promise<void> {
        const user = await this.findOne(id);
        await user.destroy();
    }

    async update(id: number, updateUserDto: UpdateUserDto) : Promise<User> {
        const user = await this.findOne(id);
        if(user){
            await user.update(updateUserDto);
        }
        return user;
    }

    async findAllWithPostsByTitleAndContent(title?: string, content?: string): Promise<User[]> {
        const whereClause = {};
        if(title) {
            whereClause['title'] = {[Op.iLike]: `%${title}%`};
        }
        if(content) {
            whereClause['content'] = {[Op.iLike]: `%${content}%`};
        }

        return this.userModel.findAll({
            include:[{
                model: Post,
                required: true,
                where: whereClause,
            }],
        });
    }
}