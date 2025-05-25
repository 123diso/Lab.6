import { getAuth, onAuthStateChanged } from "firebase/auth";

class Root extends HTMLElement {
    private userId: string | null = null;
    private loading: boolean = true;
    private authUnsubscribe: (() => void) | null = null;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const auth = getAuth();
        this.loading = true;
        this.render();

        this.authUnsubscribe = onAuthStateChanged(auth, (user) => {
            this.userId = user?.uid ?? null;
            this.loading = false;
            this.render();
        });
    }

    disconnectedCallback() {
        if (this.authUnsubscribe) this.authUnsubscribe();
    }

    render() {
        if (!this.shadowRoot) return;


        if (this.loading) {
            this.shadowRoot.innerHTML = `<p>Cargando...</p>`;
            return;
        }


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