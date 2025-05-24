import TaskForm from "./Components/taskForm"; 
import TaskList from "./Components/task-list";
import Root from "./Root/Root";
import FirebaseComponent from "./Components/FirebaseComponent";
import AuthComponent from "./Components/AuthComponent";


customElements.define('task-form', TaskForm);
customElements.define('task-list', TaskList);
customElements .define('root-element',Root);
customElements.define('firebase-component', FirebaseComponent);
customElements.define('auth-component', AuthComponent);


