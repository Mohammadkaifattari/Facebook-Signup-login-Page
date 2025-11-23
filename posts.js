// Get user from localStorage
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || { fullName: "Guest", post: [] };
document.getElementById("user-name").innerText = currentUser.fullName;

const postsContainer = document.getElementById("posts-container");

// Save posts to localStorage
function savePosts() {
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
}

// Create new post
function createPost() {
  const text = document.getElementById("post-text").value.trim();
  if (!text) return;

  const post = {
    id: Date.now(),
    content: text,
    likes: 0,
    comments: [],
    date: new Date(),
  };

  currentUser.post.unshift(post);
  savePosts();
  renderPosts();
  document.getElementById("post-text").value = "";
}

// Toggle Like
function toggleLike(postId) {
  const post = currentUser.post.find(p => p.id === postId);
  post.liked = !post.liked;
  post.likes += post.liked ? 1 : -1;
  savePosts();
  renderPosts();
}

// Add Comment
function addComment(postId) {
  const commentText = prompt("Enter your comment:");
  if (!commentText) return;
  const post = currentUser.post.find(p => p.id === postId);
  post.comments.push(commentText);
  savePosts();
  renderPosts();
}

// Delete Post (optional)
function deletePost(postId) {
  if (confirm("Delete this post?")) {
    currentUser.post = currentUser.post.filter(p => p.id !== postId);
    savePosts();
    renderPosts();
  }
}

// Render posts
function renderPosts() {
  const searchValue = document.getElementById("search").value.toLowerCase();
  const sortType = document.getElementById("sort").value;
  let posts = [...currentUser.post];

  // Filter
  if (searchValue) posts = posts.filter(p => p.content.toLowerCase().includes(searchValue));

  // Sort
  if (sortType === "latest") posts.sort((a,b) => b.date - a.date);
  if (sortType === "oldest") posts.sort((a,b) => a.date - b.date);
  if (sortType === "most-liked") posts.sort((a,b) => b.likes - a.likes);

  postsContainer.innerHTML = "";
  if (posts.length === 0) postsContainer.innerHTML = "<p>No posts found.</p>";

  posts.forEach(p => {
    const div = document.createElement("div");
    div.className = "post-card";
    div.innerHTML = `
      <p>${p.content}</p>
      <small>${new Date(p.date).toLocaleString()}</small>
      <div class="post-actions">
        <button onclick="toggleLike(${p.id})">
          <i data-lucide="heart"></i> ${p.likes}
        </button>
        <button onclick="addComment(${p.id})">
          <i data-lucide="message-circle"></i> ${p.comments.length}
        </button>
        <button onclick="deletePost(${p.id})">
          <i data-lucide="share-2"></i> Share
        </button>
      </div>
    `;
    postsContainer.appendChild(div);
  });

  lucide.createIcons();
}

// Logout
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}

renderPosts();
