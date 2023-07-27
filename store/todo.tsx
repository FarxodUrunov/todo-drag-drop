
import { makeAutoObservable } from "mobx";
import { nanoid } from 'nanoid';
import { SyntheticEvent } from "react";

interface newTaskType {
    id: string;
    title: string;
    order: number;
    status: string;
    createdAt: string;
}

class Todo {
    tasks: newTaskType[] = []
    taskInput = ''
    draggedTaskOrder = 0
    draggedTaskId = ''
    orderNum = 1


    constructor() {
        makeAutoObservable(this)
    }

    handleChange = (val: string) => {
        this.taskInput = val
    }

    addTask = () => {
        const newTask = { id: nanoid(), title: this.taskInput, order: this.orderNum, status: 'todo', createdAt: new Date().toLocaleString() }
        this.tasks.push(newTask)
        this.taskInput = ''
        this.orderNum = this.orderNum + 1
    }
    deleteTask = (id: string) => {
        this.tasks = this.tasks.filter(item => item.id !== id)
    }
    handlePointerDown = (id: string, order: number) => {
        this.draggedTaskId = id
        this.draggedTaskOrder = order
    };

    handlePointerOver = (e: SyntheticEvent<EventTarget>) => {
        if (this.draggedTaskId !== '') {
            e.preventDefault();
        }
    };
    
    handlePointerEnter = (status: string) => {
        if (this.draggedTaskId !== '') {
            this.tasks = this.tasks.map(item => item.id === this.draggedTaskId ? { ...item, status } : item)
            this.draggedTaskId = ''
        }
    }
    
    handlePointerEnterGroup = (order: number, id: string) => {
            if (this.draggedTaskOrder !== 0) {
                    this.tasks = this.tasks.map(item => item.order === this.draggedTaskOrder ? { ...item, order } : item)
            this.tasks = this.tasks.map(item => item.id === id ? { ...item, order: this.draggedTaskOrder } : item)
            this.draggedTaskOrder = 0
            this.draggedTaskId = ''
        }
    }

    handlePointerMove = (e: SyntheticEvent<EventTarget>) => {
        if (this.draggedTaskId !== '') {
            e.preventDefault();
        }
    };

}

export default new Todo()