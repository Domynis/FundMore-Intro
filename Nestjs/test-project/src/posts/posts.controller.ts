import { Controller, Get, Post, Body, Param, NotFoundException, Put, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as PostModel } from './models/post.model';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}
    
    @Post()
    create(@Body() createPostDto: CreatePostDto) : Promise<PostModel> {
        return this.postsService.create(createPostDto);
    }

    @Get()
    findAll() : Promise<PostModel[]> {
        return this.postsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) : Promise<PostModel> {
        const post = await this.postsService.findOne(+id);
        if(!post) {
            throw new NotFoundException(`Post #${id} not found`);
        }
        return post;
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updatePostDto : UpdatePostDto) : Promise<PostModel> {
        const post = await this.postsService.update(+id, updatePostDto);
        if(!post) {
            throw new NotFoundException(`Post #${id} not found`);
        }
        return post;
    }

    @Delete(':id')
    async remove(@Param('id') id: string) : Promise<void> {
        const post = await this.postsService.findOne(+id);
        if(!post) {
            throw new NotFoundException(`Post #${id} not found`);
        }
        return this.postsService.remove(+id);
    }
}