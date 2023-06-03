import { Todo } from "../todos/models/todo.model";

const Filters = {
    All: 'all',
    Completed : 'Completed',
    Pendig: 'Pending'
}

const state = {
    todos: [
        new Todo( 'Piedra del alma'),
        new Todo( 'Piedra del infinito'),
        new Todo( 'Piedra del tiempo'),  
        new Todo( 'Piedra del poder'), 
        new Todo( 'Piedra del amor'), 
    ],
    filter: Filters.All,
}

const initStore = () => {
    console.log(state);
    console.log('InitStore :))');
}

const laodStore = () => {
    if( !localStorage.getItem('state') ) return;

    const { todos = [], filter = Filters.All } = JSON.parse( localStorage.getItem('state') ); //desestructuracion del obj
    state.todos = todos;
    state.filter = filter;
}

const saveStateToLocalStorage = () =>{
    localStorage.setItem('state', JSON.stringify(state) );
}

/**
 * 
 * @param {Filters} filter 
 * @returns Case 1: Returns an new array with all todos
 * @returns Case 2: Returns an array with the completed
 * @returns Case 3: Returns an array with the Pendings
 */
const getTodos = ( filter = Filters.All ) => {
    switch( filter ){
        case Filters.All:
            return [...state.todos]; 
        case Filters.Completed:
            return state.todos.filter( todo => todo.done );
        case Filters.Pendig:
            return state.todos.filter( todo => !todo.done );
        default:
            throw new Error('Option is not valid');
    }
}

/**
 * Add todo 
 * @requires description
 * @param {String} description 
 */
const addTodo = ( description ) => {
    if ( !description ) throw new Error('Description is required');
    state.todos.push(new Todo( description ));

    saveStateToLocalStorage();
}

/**
 * Change Status
 * @param {String} todoId Todo identifier
 * @returns todo
 */
const toggleTodo = ( todoId ) => {
    state.todos = state.todos.map( todo => {
        if ( todo.id === todoId ){
            todo.done = !todo.done;
        }
        return todo;

    });

    saveStateToLocalStorage();
}

/**
 * Delete Todo
 * @param {String} todoId Todo identifier
 * Returns all but the id to be removed
 */
const deleteTodo = ( todoId ) => {
    state.todos = state.todos.filter( todo => todo.id !== todoId );
    saveStateToLocalStorage();
}

const deleteCompleted = () => {
    state.todos = state.todos.filter( todo => !todo.done );
    saveStateToLocalStorage();
}

/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = ( newFilter = Filters.All ) => {
    state.filter = newFilter;
    saveStateToLocalStorage();
}

/**
 * 
 * @returns Returns todos of the filter
 */
const getCurrentFilter = ( ) => {
    return state.filter;
}

export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    laodStore,
    setFilter,
    toggleTodo,
}