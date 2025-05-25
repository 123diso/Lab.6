import { taskStore, Task } from '../flux/Store';
import { TaskActions } from '../flux/Actions';
import { globalStyles } from '../styles/globalStyles';

class TaskList extends HTMLElement {
    private tasks: Task[] = [];

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        taskStore.subscribe(this.updateTasks.bind(this));
    }

    disconnectedCallback() {
        taskStore.unsubscribe(this.updateTasks.bind(this));
    }

    updateTasks(tasks: Task[]) {
        this.tasks = tasks;
        this.render();
    }

    render() {
        const pending = this.tasks.filter(t => !t.completed);
        const completed = this.tasks.filter(t => t.completed);

        this.shadowRoot!.innerHTML = `
        <style>${globalStyles}</style>
        <div class="container">
            <section>
                <h3>Pendientes</h3>
                <ul>
                    ${pending.map(t => `
                        <li>
                            <strong>${t.title}</strong>: ${t.description || ''}
                            <button data-id="${t.id}" data-action="complete">✅</button>
                            <button data-id="${t.id}" data-action="delete">🗑️</button>
                        </li>
                    `).join('')}
                </ul>
            </section>
            <section>
                <h3>Realizadas</h3>
                <ul>
                    ${completed.map(t => `<li><strong>${t.title}</strong>: ${t.description || ''}</li>`).join('')}
                </ul>
            </section>
            </div>
        `;

        this.shadowRoot!.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = Number(btn.getAttribute('data-id'));
                const action = btn.getAttribute('data-action');
                if (action === 'complete') {
                    TaskActions.toggleTask(id);
                } else if (action === 'delete') {
                    TaskActions.deleteTask(id);
                }
            });
        });
    }
}


export default TaskList;


