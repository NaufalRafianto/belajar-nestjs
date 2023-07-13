import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import {v4 as uuid} from 'uuid'
import { GetFilterTaskDto } from './dto/get-filter-task.dto';
@Injectable()
export class TasksService {
    private tasks:Task[] = []


    getAllTask():Task[] {
        return this.tasks
    }

    getTasksWithFilters(filterDto: GetFilterTaskDto): Task[] {
        const { status, search } = filterDto;
        let tasks = this.getAllTask();
      
        if (status) {
          tasks = tasks.filter((task) => task.status === status);
        }
      
        if (search) {
          tasks = tasks.filter((task) =>
            task.title.toLowerCase().includes(search.toLowerCase()) ||
            task.description.toLowerCase().includes(search.toLowerCase())
          );
        }
      
        return tasks;
      }
      

    getTaskById(id:string){
        return this.tasks.find((item) => item.id === id)
    }

    createTask(createTaskDto:CreateTaskDto):Task {
        const {title, description} = createTaskDto
        const task:Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        }
        this.tasks.push(task)
        return task
    }

    deleteTaskById(id:string):void {
        this.tasks = this.tasks.filter((tasks)=> tasks.id !== id)
    }

    updateTaskStatus(id:string, status:TaskStatus):Task{
        const newTask =this.getTaskById(id)
        newTask.status = status
        return newTask
    }

}
