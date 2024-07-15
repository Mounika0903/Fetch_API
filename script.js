const App = (function() {
    const postsUrl = 'https://jsonplaceholder.typicode.com/posts';
    const todosUrl = 'https://jsonplaceholder.typicode.com/todos';
    async function fetchPosts() {
        try {
            const response = await fetch(postsUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const posts = await response.json();
            displayPosts(posts);
        } catch (error) {
            console.error('Error fetching posts:', error);
            displayError('Error fetching posts');
        }
    }
    function displayPosts(posts) {
        const contentDiv = document.getElementById('content');
        contentDiv.innerHTML = '';
        posts.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.className = 'post';
            postDiv.innerHTML = `<h2>${post.title}</h2><p>${post.body}</p>`;
            contentDiv.appendChild(postDiv);
        });
    }
    async function fetchTodos() {
        try {
            const response = await fetch(todosUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const todos = await response.json();
            displayTodos(todos);
        } catch (error) {
            console.error('Error fetching todos:', error);
            displayError('Error fetching todos');
        }
    }

    function displayTodos(todos) {
        const contentDiv = document.getElementById('content');
        contentDiv.innerHTML = '';
        const todosUl = document.createElement('ul');
        todos.forEach(todo => {
            const todoLi = document.createElement('li');
            todoLi.textContent = todo.title;
            if (todo.completed) {
                todoLi.style.textDecoration = 'line-through';
            }
            todosUl.appendChild(todoLi);
        });
        contentDiv.appendChild(todosUl);
    }
    function displayError(message) {
        const contentDiv = document.getElementById('content');
        contentDiv.innerHTML = `<div class="error">${message}</div>`;
    }
    return {
        init: function() {
            const showPostsBtn = document.getElementById('showPosts');
            const showTodosBtn = document.getElementById('showTodos');

            showPostsBtn.addEventListener('click', fetchPosts);
            showTodosBtn.addEventListener('click', fetchTodos);
        }
    };
})();
document.addEventListener('DOMContentLoaded', App.init);
