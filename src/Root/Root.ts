import AuthComponent from "../Components/AuthComponent"; // nuevo
import TaskForm from "../Components/taskForm"; 
import TaskList from "../Components/task-list";
import FirebaseComponent from "../Components/FirebaseComponent";

class Root extends HTMLElement {
    private userId: string | null = null;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.shadowRoot?.addEventListener('user-authenticated', (e: any) => {
            this.userId = e.detail.uid;
            this.render(); // Recargar vista con tareas del usuario
        });
    }

    render() {
        if (!this.shadowRoot) return;

        this.shadowRoot.innerHTML = `
            <auth-component></auth-component>
            ${this.userId ? `
                <task-form user-id="${this.userId}"></task-form>
                <task-list user-id="${this.userId}"></task-list>
                <firebase-component></firebase-component>
            ` : `<p>Inicia sesión para gestionar tus tareas.</p>`}
        `;
    }
}

export default Root;
