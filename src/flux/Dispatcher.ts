export interface Action {
    type: string;
    payload?: any;
}

type Listener = (action: Action) => void;

export class Dispatcher {
    private listeners: Listener[] = [];

    register(listener: Listener) {
        this.listeners.push(listener);
    }

    dispatch(action: Action) {
        for (const listener of this.listeners) {
            listener(action);
        }
    }
}

export const TaskDispatcher = new Dispatcher();

