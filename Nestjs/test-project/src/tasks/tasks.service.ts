import { Injectable} from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
    private tasks : Task[] = [];
    findAll(): Task[] {
        return this.tasks;
    }

    findOne(id: number): Task {
        return this.tasks.find(task => task.id === id);
    }

    create(createTaskDto: CreateTaskDto) : Task {
        const task = {
            id: this.tasks.length + 1,
            ...createTaskDto,
        };
        this.tasks.push(task);
        return task;
    }

    update(id: number, updateTaskDto: UpdateTaskDto) : Task {
        const task = this.tasks.find(task => task.id === id);
        if(task) {
            Object.assign(task, updateTaskDto);
        }
        return task;
    }

    delete(id: number) : void {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }
}
