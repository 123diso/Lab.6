import { initializeApp } from 'firebase/app';
import { globalStyles } from '../styles/globalStyles';
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
    <style>
    ${globalStyles}
    .auth-wrapper {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 2rem;
        padding: 1rem 0;
    }

    .form-box {
        flex: 1 1 300px;
        max-width: 400px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        padding: 2rem;
    }

    h3 {
        margin-bottom: 1rem;
        text-align: center;
    }
    </style>

    <div class="auth-wrapper">
    <div class="form-box">
        <h3>Registro</h3>
        <form id="registerForm">
        <input id="registerEmail" type="email" placeholder="Correo" required />
        <input id="registerPassword" type="password" placeholder="Contraseña" required />
        <button type="submit">Registrarse</button>
        </form>
    </div>

    <div class="form-box">
        <h3>Iniciar Sesión</h3>
        <form id="loginForm">
        <input id="loginEmail" type="email" placeholder="Correo" required />
        <input id="loginPassword" type="password" placeholder="Contraseña" required />
        <button type="submit">Iniciar Sesión</button>
        </form>

        <div style="margin-top: 1rem; text-align: center;">
        <button id="logoutBtn">Cerrar Sesión</button>
        </div>
    </div>
    </div>
    <div class="arrow-container">
    <svg class="arrow-icon" xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 100 100">
    <path d="M40 20 L60 50 L40 80" stroke=" #3a91f5"; stroke-width="5" fill="none" />
    </svg>
    </div>

`;
}}

export default AuthComponent;

