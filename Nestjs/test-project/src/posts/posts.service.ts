import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Post} from './models/post.model';
import {CreatePostDto} from './dto/create-post.dto';
import {UpdatePostDto} from './dto/update-post.dto';

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Post)
        private postModel: typeof Post,
    ) {}

    async create(createPostDto: CreatePostDto) : Promise<Post> {
        return this.postModel.create({
            title: createPostDto.title,
            content: createPostDto.content,
            userId: createPostDto.userId,
        });
    }

    async findAll() : Promise<Post[]> {
        return this.postModel.findAll();
    }

    async findOne(id: number) : Promise<Post> {
        return this.postModel.findOne({
            where: {
                id,
            },
        });
    }

    async remove(id: number) : Promise<void> {
        const post = await this.findOne(id);
        await post.destroy();
    }

    async update(id: number, updatePostDto: UpdatePostDto) : Promise<Post> {
        const post = await this.findOne(id);
        if(post){
            await post.update(updatePostDto);
        }
        return post;
    }
}