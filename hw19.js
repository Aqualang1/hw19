const post = document.getElementById('post');
const getPostBtn = document.getElementById('getPost');
getPostBtn.onclick = getPost;
let title = document.getElementById('title');
let body = document.getElementById('body');
const comments = document.getElementById('comments');
const getCommentsBtn = document.getElementById('getComments');
getCommentsBtn.addEventListener('click', getComments);


function getPost() {

    if (+post.value > 0 && +post.value <= 100) {
        fetch(`https://jsonplaceholder.typicode.com/posts/${+post.value}`)
            .then(response => response.json())
            .then(json => {
                title.innerHTML = json.title,
                    body.innerHTML = json.body,
                    comments.classList.remove('hidden'),
                    post.readOnly = true;
            })
            .catch((error) => alert('no response'));
    } else {
        alert('invalid post');
    }
}

function getComments() {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${+post.value}`)
        .then(response => response.json())
        .then(json => {
            json.forEach(comment => {
                const commentsContent = document.createElement('p')
                commentsContent.innerHTML = `
                postid: ${comment.postId},
                id: ${comment.id},
                name: ${comment.name},
                email: ${comment.email},
                body: ${comment.body}
                `;
                comments.appendChild(commentsContent);
                getCommentsBtn.removeEventListener('click', getComments);
            })
        })
        .catch((error) => alert('no response'));
}