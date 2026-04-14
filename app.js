document.addEventListener('DOMContentLoaded', () => {
    // Inicjalizacja ikon Lucide
    lucide.createIcons();

    const input = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');
    const dateDisplay = document.getElementById('date-display');

    // Wyświetlanie daty
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    dateDisplay.innerText = new Date().toLocaleDateString('pl-PL', options);

    // Ładowanie z LocalStorage
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    const saveTodos = () => {
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    const renderTodos = () => {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            if (todo.completed) li.classList.add('completed');

            li.innerHTML = `
                <span class="todo-text">${todo.text}</span>
                <button class="delete-btn" onclick="deleteTodo(${index})">
                    <i data-lucide="trash-2"></i>
                </button>
            `;

            // Event oznaczania jako ukończone
            li.querySelector('.todo-text').addEventListener('click', () => toggleTodo(index));
            
            todoList.appendChild(li);
        });
        lucide.createIcons(); // Odświeżenie ikon w nowych elementach
    };

    const addTodo = () => {
        const text = input.value.trim();
        if (text) {
            todos.push({ text, completed: false });
            input.value = '';
            saveTodos();
            renderTodos();
        }
    };

    window.toggleTodo = (index) => {
        todos[index].completed = !todos[index].completed;
        saveTodos();
        renderTodos();
    };

    window.deleteTodo = (index) => {
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
    };

    addBtn.addEventListener('click', addTodo);

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTodo();
    });

    renderTodos();
});