import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut
} from 'firebase/auth';
import { firebaseConfig } from '../services/firebase/FirebaseConfig';

initializeApp(firebaseConfig);
const auth = getAuth();

class AuthComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.setupListeners();


    }

    setupListeners() {
        this.shadowRoot?.querySelector('#registerForm')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = (this.shadowRoot!.querySelector('#registerEmail') as HTMLInputElement).value;
            const password = (this.shadowRoot!.querySelector('#registerPassword') as HTMLInputElement).value;

            if (password.length < 6) {
                alert('La contraseña debe tener al menos 6 caracteres.');
                return;
            }

            try {
                await createUserWithEmailAndPassword(auth, email, password);
            } catch (error: any) {
                alert(`Error al registrar: ${error.message}`);
                console.error(error);
            }
        });

        this.shadowRoot?.querySelector('#loginForm')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = (this.shadowRoot!.querySelector('#loginEmail') as HTMLInputElement).value;
            const password = (this.shadowRoot!.querySelector('#loginPassword') as HTMLInputElement).value;

            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);

                window.dispatchEvent(new CustomEvent('user-authenticated', {
                    detail: {
                        uid: userCredential.user.uid,
                        email: userCredential.user.email
                    }
                }));

                alert('Inicio de sesión exitoso');
            } catch (error: any) {
                if (error.code === 'auth/wrong-password') {
                    alert('Contraseña incorrecta');
                } else if (error.code === 'auth/user-not-found') {
                    alert('Usuario no registrado');
                } else {
                    alert(`Error al iniciar sesión: ${error.message}`);
                }
                console.error(error);
            }
        });

        this.shadowRoot?.querySelector('#logoutBtn')?.addEventListener('click', () => {
            signOut(auth);
        });
    }

    render() {
        this.shadowRoot!.innerHTML = `
            <div>
                <h3>Registro</h3>
                <form id="registerForm">
                    <input id="registerEmail" type="email" placeholder="Correo" required />
                    <input id="registerPassword" type="password" placeholder="Contraseña" required />
                    <button type="submit">Registrarse</button>
                </form>

                <h3>Iniciar Sesión</h3>
                <form id="loginForm">
                    <input id="loginEmail" type="email" placeholder="Correo" required />
                    <input id="loginPassword" type="password" placeholder="Contraseña" required />
                    <button type="submit">Iniciar Sesión</button>
                </form>

                <button id="logoutBtn">Cerrar Sesión</button>
            </div>
        `;
    }
}

export default AuthComponent;

