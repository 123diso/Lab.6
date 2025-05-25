import { userType, PostType } from "../Utills/Types";
import { fetchUsers } from "../services/firebase/UserService";
import {addpost, getPostByuserId} from "../services/firebase/PostService";
import { globalStyles } from '../styles/globalStyles';

class FirebaseComponent extends HTMLElement {
    private users: userType[] = [];
    private Post: PostType[] = [];
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
    this.users = await fetchUsers();
    this.render();

    }

    async handleViewPost(userId:string){
        this.Post = await getPostByuserId(userId);
        this.render()
    }
    render (){
        if(!this.shadowRoot)return;
        this.shadowRoot.innerHTML = `
        <style>${globalStyles}</style>
        <div class="container">
        <h1>componente firebase1</h1>
        <p>Lista de usuarios</p>
        <ul>${this.users.map (user=>`
            <li>
            nombre de usuario: ${user.username}
            <button data-user-id="${user.id}">ver posts</button>
            ${
                this.Post.length > 0 && this.Post.some(Post => Post.userId === user.id)
                ? `
                    <ul>
                    ${this.Post.filter(Post => Post.userId === user.id).map(Post=>`
                        <li>${Post.content}(creado en ${Post.createdAt})</li>
                        `).join('')}
                    </ul>
                `
                : ''
            }
            </li>
            `).join('')}</ul>

            <h2>Formulario para Postear</h2>
            <form id="postForm">
                <label for="userSelect">selecciona el usuario</label>
                <select id="userSelect" name ="userSelect" requiered>
                    <option value="">Seleccione un usuario</option>
                    ${this.users.map(user => `
                        <option value="${user.id}">${user.username}</option>
                        
                        `).join('')}

                </select >

                <label for="content">Escribe contenido:</label>
                <input type="text" id="content" name="content" required></input>
                <button type="submit">Enviar</button>
            </form>

        </div>
        `
        this.shadowRoot.querySelectorAll('button[data-user-id]').forEach(button=>{
            button.addEventListener('click',(event)=>{
                const userId = (event.currentTarget as HTMLButtonElement).dataset.userId;
                console.log("Botón clicado, ID:", userId);
                if(userId){
                    this.handleViewPost(userId);
                }
            })
        })

        const postForm = this.shadowRoot.querySelector('#postForm') as HTMLFormElement;
        if(postForm){
            postForm.addEventListener('submit',async(event) =>{
                event.preventDefault();

                const formData = new FormData(postForm)
                const formObject: Record<string,string>={};

                formData.forEach((value, key) => {
                    formObject[key] = value.toString();
                })
                console.log(formObject);

                if(Object.keys(formObject).length > 0){
                    const postId = await addpost({
                        userId: formObject.userSelect,
                        content: formObject.content,
                    } as PostType);
                    postForm.reset();
                    if(postId){
                        console.log('Post añadido con identificador', postId)
                            this.Post = await getPostByuserId(formObject.userSelect); 
                            this.render();
                    }else{
                        console.error('error guardando el post');
                    }


                } else {
                    console.error('el formulario esta vacio')
                }
            })
        }
    }
}

export default FirebaseComponent;