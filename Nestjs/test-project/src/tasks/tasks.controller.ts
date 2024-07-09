import { Controller, Get, Query, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    findAll() {
        return this.tasksService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        const task = this.tasksService.findOne(+id);
        if(!task) {
            throw new NotFoundException(`Task #${id} not found`);
        }
        return task;
    }
    
    @Post()
    create(@Body() createTaskDto: CreateTaskDto) {
        return this.tasksService.create(createTaskDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateTaskDto : UpdateTaskDto) {
        const task = this.tasksService.update(+id, updateTaskDto);
        if(!task) {
            throw new NotFoundException(`Task #${id} not found`);
        }
        return task;
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        const task = this.tasksService.findOne(+id);
        if(!task) {
            throw new NotFoundException(`Task #${id} not found`);
        }

        this.tasksService.delete(+id);
        return {message: 'Task deleted successfully!'};
    }
}