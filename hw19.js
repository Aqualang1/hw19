const post = document.querySelector('#post');
const getPostBtn = document.querySelector('#getPost');
getPostBtn.onclick = getPost;
const postTitle = document.querySelector('#post-title');
const postBody = document.querySelector('#post-body');
const comments = document.querySelector('#comments');
const getCommentsBtn = document.querySelector('#getComments');
getCommentsBtn.addEventListener('click', getComments);


function getPost() {
    const value = +post.value;

    if (value > 0 && value <= 100) {
        
        fetch(`https://jsonplaceholder.typicode.com/posts/${+post.value}`)
            .then(response => response.json())
            .then(({title, body}) => {
                    postTitle.innerHTML = title;
                    postBody.innerHTML = body;
                    getCommentsBtn.classList.remove('hidden');
            })
            .catch((error) => alert('no response'));
    } else {
        alert('invalid post');
    }
}

function getComments() {
    
    comments.innerHTML = '';
    
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${+post.value}`)
        .then(response => response.json())
        .then(json => {
            json.forEach(({postId, id, name, email, body}) => {
                const commentsContent = document.createElement('p')
                commentsContent.innerHTML = `
                postid: ${postId},
                id: ${id},
                name: ${name},
                email: ${email},
                body: ${body}
                `;
                comments.appendChild(commentsContent);
            })
        })
        .catch((error) => alert(error));
}