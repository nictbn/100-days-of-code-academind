const loadCommentsBtnElement = document.getElementById('load-comments-btn');

async function fetchCommentsForPost() {
    const postid = loadCommentsBtnElement.dataset.postid
    const response = await fetch(`/posts/${postid}/comments`);
    const responseData = await response.json();
    console.log(responseData)
}

loadCommentsBtnElement.addEventListener('click', fetchCommentsForPost);