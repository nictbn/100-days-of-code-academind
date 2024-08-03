const loadCommentsBtnElement = document.getElementById('load-comments-btn');
const commentsSectionElement = document.getElementById('comments');

function createCommentsList(comments) {
    const commentListElement = document.createElement('ol');
    for (const comment of comments) {
        const commentElement = document.createElement('li');
        commentElement.innerHTML = `
        <article class="comment-item">
          <h2>${comment.title}</h2>
          <p>${comment.text}</p>
        </article>
        `;
        commentListElement.appendChild(commentElement);
    }
    return commentListElement;
}

async function fetchCommentsForPost() {
    const postid = loadCommentsBtnElement.dataset.postid
    const response = await fetch(`/posts/${postid}/comments`);
    const responseData = await response.json();
    const commentsListElement = createCommentsList(responseData);
    console.log(commentsListElement);
    commentsSectionElement.innerHTML = '';
    commentsSectionElement.appendChild(commentsListElement);
}

loadCommentsBtnElement.addEventListener('click', fetchCommentsForPost);