import { TaskDispatcher, Action } from './Dispatcher';
import { TaskActionTypes } from './Actions';

export type Task = {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
};

type Listener = (tasks: Task[]) => void;

const STORAGE_KEY = 'task-app:tasks';

class TaskStore {
    private tasks: Task[] = [];
    private listeners: Listener[] = [];
    private idCounter = 1;

    constructor() {
        this.load();
        TaskDispatcher.register(this.handleAction.bind(this));
    }

    private handleAction(action: Action) {
        switch (action.type) {
            case TaskActionTypes.ADD_TASK:
                this.tasks.push({
                    id: this.idCounter++,
                    title: action.payload.title,
                    description: action.payload.description,
                    completed: false
                });
                break;

            case TaskActionTypes.TOGGLE_TASK:
                this.tasks = this.tasks.map(task =>
                    task.id === action.payload.id
                        ? { ...task, completed: !task.completed }
                        : task
                );
                break;

            case TaskActionTypes.DELETE_TASK:
                this.tasks = this.tasks.filter(task => task.id !== action.payload.id);
                break;
        }

        this.persist();
        this.emitChange();
    }

    subscribe(listener: Listener) {
        this.listeners.push(listener);
        listener(this.tasks); // Emitir estado inicial
    }

    unsubscribe(listener: Listener) {
        this.listeners = this.listeners.filter(l => l !== listener);
    }

    private emitChange() {
        for (const listener of this.listeners) {
            listener(this.tasks);
        }
    }

    private persist() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            tasks: this.tasks,
            idCounter: this.idCounter
        }));
    }

    private load() {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) {
            const parsed = JSON.parse(data);
            this.tasks = parsed.tasks || [];
            this.idCounter = parsed.idCounter || (this.tasks.length + 1);
        }
    }
}

export const taskStore = new TaskStore();


