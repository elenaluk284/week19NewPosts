// Функция для создания HTML-разметки поста
function createPostHTML(post) {
    return `
        <div class="post">
            <div class="post-title">${post.title}</div>
            <div class="post-body">${post.body}</div>
        </div>
    `;
}

// Функция для добавления поста в контейнер
function addPostToContainer(post) {
    const container = document.getElementById('postsContainer');
    const postHTML = createPostHTML(post);
    container.innerHTML += postHTML; // Добавляем новый HTML в контейнер
}

// Функция для создания поста
function createPost(title, body) {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: title,
            body: body,
            userId: 1
        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Ошибка сети');
        }
        return response.json();
    })
    .then(post => {
        addPostToContainer(post); // Добавляем созданный пост в контейнер
    })
    .catch(error => {
        console.error('Ошибка:', error);
    });
}

// Обработчик события для формы
document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы
    const title = document.getElementById('postTitle').value;
    const body = document.getElementById('postBody').value;
    createPost(title, body); // Создаем пост
    this.reset(); // Очищаем форму
});
