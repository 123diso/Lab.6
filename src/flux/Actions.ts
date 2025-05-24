import { TaskDispatcher } from './Dispatcher';

export const TaskActionTypes = {
    ADD_TASK: 'ADD_TASK',
    TOGGLE_TASK: 'TOGGLE_TASK',
    DELETE_TASK: 'DELETE_TASK'
};

export const TaskActions = {
    addTask: (title: string, description?: string) => {
        TaskDispatcher.dispatch({
            type: TaskActionTypes.ADD_TASK,
            payload: { title, description }
        });
    },
    toggleTask: (id: number) => {
        TaskDispatcher.dispatch({
            type: TaskActionTypes.TOGGLE_TASK,
            payload: { id }
        });
    },
    deleteTask: (id: number) => {
        TaskDispatcher.dispatch({
            type: TaskActionTypes.DELETE_TASK,
            payload: { id }
        });
    }
};


