const TodosApp = {
    data() {
        return {
            newTodo: 'Learn Vue.js',
            enteredTodoText: 'New Todo...'
        };
    },

    methods: {
        saveTodo(event) {
            event.preventDefault();
            this.newTodo = this.enteredTodoText;
            this.enteredTodoText = '';
        }
    }
};

Vue.createApp(TodosApp).mount('#todos-app');