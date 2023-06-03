import todoStore from '../store/todo.store';
import  html  from './app.html?raw';
import { renderTodos } from './use-cases/render-todos';

const ElementIDs = {
    ClearCompletedButton: '.clear-completed',
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
}
/**
 * 
 * @param {String} elementId 
 */
export const App = ( elementId ) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter());
        renderTodos( ElementIDs.TodoList, todos );
    }

    //cuando la funcion app se llama
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append( app );
        displayTodos();
    })();

    //Referencias HTML 
    const newDescriptionInput = document.querySelector( ElementIDs.NewTodoInput );
    const todoListUL = document.querySelector( ElementIDs.TodoList );
    const clearCompletedButton = document.querySelector( ElementIDs.ClearCompletedButton );

     // Listeners
    newDescriptionInput.addEventListener('keyup', (event) => {
        if ( event.keyCode !== 13 ) return;
        if ( event.target.value.trim().length === 0 ) return;

        todoStore.addTodo( event.target.value );
        displayTodos();
        event.target.value = '';
    })

    todoListUL.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]');
        todoStore.toggleTodo( element.getAttribute('data-id') );
        displayTodos();
    });

    todoListUL.addEventListener('click', (event) => {
        const isDestroyElement = event.target.className === 'destroy'; //ref a la x
        const element = event.target.closest('[data-id]');
        console.log(isDestroyElement);
        if ( !element || !isDestroyElement ) return;

        todoStore.deleteTodo( element.getAttribute('data-id') );
        displayTodos();
    });

    clearCompletedButton.addEventListener( 'click', () => {
        todoStore.deleteCompleted();
        displayTodos();
    });

}