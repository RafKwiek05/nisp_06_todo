document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    
    const input = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-task-btn');
    const list = document.getElementById('todo-list');
    const themeCheck = document.getElementById('theme-checkbox');

    // Data
    document.getElementById('date-text').innerText = new Date().toLocaleDateString('pl-PL', {
        weekday: 'long', day: 'numeric', month: 'long'
    });

    // Theme Logic
    const setTheme = (isDark) => {
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    };

    themeCheck.addEventListener('change', (e) => setTheme(e.target.checked));

    if(localStorage.getItem('theme') === 'dark') {
        themeCheck.checked = true;
        setTheme(true);
    }

    // Todo Logic
    let todos = JSON.parse(localStorage.getItem('my-tasks')) || [];

    const render = () => {
        list.innerHTML = '';
        todos.forEach((t, i) => {
            const li = document.createElement('li');
            if(t.done) li.classList.add('done');
            li.innerHTML = `
                <span class="todo-text">${t.text}</span>
                <button class="del-btn" onclick="remove(${i})"><i data-lucide="trash-2"></i></button>
            `;
            li.querySelector('.todo-text').onclick = () => toggle(i);
            list.appendChild(li);
        });
        lucide.createIcons();
        localStorage.setItem('my-tasks', JSON.stringify(todos));
    };

    window.toggle = (i) => { todos[i].done = !todos[i].done; render(); };
    window.remove = (i) => { todos.splice(i, 1); render(); };

    addBtn.onclick = () => {
        if(input.value.trim()) {
            todos.push({ text: input.value, done: false });
            input.value = '';
            render();
        }
    };

    input.onkeypress = (e) => { if(e.key === 'Enter') addBtn.onclick(); };

    render();
});