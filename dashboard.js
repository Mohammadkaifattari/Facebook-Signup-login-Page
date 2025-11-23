// Load current user
var currentUser = JSON.parse(localStorage.getItem("currentUser")) || { FirstName: "Ali", SecondName: "Khan" };
document.getElementById("currentUserName").textContent = currentUser.FirstName + " " + currentUser.SecondName;

// Load posts from localStorage
var posts = JSON.parse(localStorage.getItem("posts")) || [];

function renderPosts() {
  const container = document.getElementById("posts-container");
  container.innerHTML = "";
  posts.forEach((post, index) => {
    const postDiv = document.createElement("div");
    postDiv.classList.add("post");

    // Generate comments HTML
    let commentsHTML = "";
    if (post.comments.length > 0) {
      commentsHTML = '<div class="post__comments">';
      post.comments.forEach((cmt) => {
        commentsHTML += `<div class="comment"><strong>${cmt.user}</strong>: ${cmt.text}</div>`;
      });
      commentsHTML += "</div>";
    }

    postDiv.innerHTML = `
  <div class="post__header header">
    <div class="header__left">
      <div class="user-avatar"></div>
      <div class="post__author author">
        <span class="author__name">${post.user}</span>
      </div>
      <span class="post__date">${post.date}</span>
    </div>
    <div class="header__right">
      <button onclick="editPost(${index})" class="post-btn edit-btn">✏️ Edit</button>
      <button onclick="deletePost(${index})" class="post-btn delete-btn">🗑️ Delete</button>
    </div>
  </div>
  <div class="post__content content">
    <p class="content__paragraph">${post.text}</p>
  </div>
  <div class="post__footer footer">
    <div class="footer__buttons buttons">
      <span onclick="likePost(${index})">❤️ Like (<span id="like-count-${index}">${post.likes}</span>)</span>
      <span onclick="commentPost(${index})">💬 Comment</span>
    </div>
  </div>
  ${commentsHTML}
`;
    container.appendChild(postDiv);
  });
}

function createPost() {
  const text = document.getElementById("post-input").value;
  if (!text) return alert("Write something first!");
  const newPost = {
    user: currentUser.FirstName + " " + currentUser.SecondName,
    text: text,
    date: new Date().toLocaleString(),
    likes: 0,
    comments: []
  };
  posts.unshift(newPost);
  localStorage.setItem("posts", JSON.stringify(posts));
  document.getElementById("post-input").value = "";
  renderPosts();
}

function likePost(index) {
  posts[index].likes += 1;
  localStorage.setItem("posts", JSON.stringify(posts));
  document.getElementById(`like-count-${index}`).textContent = posts[index].likes;
}

function commentPost(index) {
  const commentText = prompt("Add a comment:");
  if (commentText) {
    posts[index].comments.push({ user: currentUser.FirstName, text: commentText });
    localStorage.setItem("posts", JSON.stringify(posts));
    renderPosts(); // re-render to show new comment
  }
}

// Initial render
renderPosts();
