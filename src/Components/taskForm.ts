import { TaskActions } from '../flux/Actions';
import { globalStyles } from '../styles/globalStyles';

class TaskForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        const form = this.shadowRoot!.querySelector('form')!;
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = (form.querySelector('#title') as HTMLInputElement).value.trim();
            const description = (form.querySelector('#description') as HTMLInputElement).value.trim();

            if (title) {
                TaskActions.addTask(title, description || '');
                form.reset();
            }
        });
    }

    render() {
        this.shadowRoot!.innerHTML = `
            <style>${globalStyles}</style>
        <div class="container">
            <form>
                <input type="text" id="title" placeholder="Título" required />
                <input type="text" id="description" placeholder="Descripción (opcional)" />
                <button type="submit">Agregar Tarea</button>
            </form>
            </div>
        `;
    }
}


export default TaskForm;

