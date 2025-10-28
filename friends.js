export function AllData() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  let users = JSON.parse(localStorage.getItem("users")) || [];

  const Count = document.getElementById("count");
  Count.innerHTML = users.length - 1;

  const maybe = document.getElementById("maybeknow");
  maybe.innerHTML = "";

  users.forEach((user) => {
    if (user.email === currentUser.email) return;

    const requestSent =
      user.friendRequests && user.friendRequests.includes(currentUser.email);
    const isFriend = user.friends && user.friends.includes(currentUser.email);

    let mainBtnHTML = "";
    let cancelBtnHTML = "";

    if (isFriend) {
      // Already friends
      mainBtnHTML = `<button id="btn-${user.email}" onclick="removeFriend('${user.email}')" 
        style="
          background-color: #f02849;
          color: white;
          border: none;
          padding: 5px 10px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: bold;
          margin-top: 5px;
        ">Remove Friend</button>`;
    } else if (requestSent) {
      // Request already sent
      mainBtnHTML = `<button id="btn-${user.email}" 
        style="
          background-color: #42b72a;
          color: white;
          border: none;
          padding: 5px 10px;
          border-radius: 6px;
          font-weight: bold;  
          margin-right: 5px;
          margin-top: 5px;
        " disabled>Request Sent</button>`;

      cancelBtnHTML = `<button id="cancel-${user.email}" onclick="cancelRequest('${user.email}')"
        style="
          background-color: #f02849;
          color: white;
          border: none;
          padding: 5px 10px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: bold;
          margin-top: 5px;
        ">Cancel Request</button>`;
    } else {
      // Can send request
      mainBtnHTML = `<button id="btn-${user.email}" onclick="sendRequest('${user.email}')"
        style="
          background-color: #1877f2;
          color: white;
          border: none;
          padding: 5px 10px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: bold;
          margin-top: 5px;
        ">Add Friend</button>`;
    }

    maybe.innerHTML += `
      <div class="contact-item" style="margin-bottom:15px;">
        <div class="contact-avatar" aria-hidden="true">
          ${user.FirstName[0]}${user.SecondName[0]}
        </div>
        <span>${user.FirstName} ${user.SecondName}</span><br>
        ${mainBtnHTML}
        ${cancelBtnHTML}
      </div>
    `;
  });

  showFriendRequests();
  showFriendsList();
}

// ✅ Send Friend Request
window.sendRequest = function (email) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  users = users.map((user) => {
    if (user.email === email) {
      if (!user.friendRequests) user.friendRequests = [];
      if (!user.friendRequests.includes(currentUser.email)) {
        user.friendRequests.push(currentUser.email);
      }
    }
    return user;
  });

  localStorage.setItem("users", JSON.stringify(users));
  
  AllData();
};

// ✅ Cancel Friend Request
window.cancelRequest = function (email) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  users = users.map((user) => {
    if (user.email === email && user.friendRequests) {
      user.friendRequests = user.friendRequests.filter(
        (req) => req !== currentUser.email
      );
    }
    return user;
  });

  localStorage.setItem("users", JSON.stringify(users));
  
  AllData();
};

// ✅ Show Incoming Friend Requests
function showFriendRequests() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const reqDiv = document.getElementById("friendRequests");
  if (!reqDiv) return;

  const me = users.find((u) => u.email === currentUser.email);
  const requests = me.friendRequests || [];

  reqDiv.innerHTML = "<h3>Friend Requests</h3>";

  if (requests.length === 0) {
    reqDiv.innerHTML += "<p>No new friend requests.</p>";
    return;
  }

  requests.forEach((reqEmail) => {
    const sender = users.find((u) => u.email === reqEmail);
    if (!sender) return;

    reqDiv.innerHTML += `
      <div style="margin-bottom:10px;">
        <span>${sender.FirstName} ${sender.SecondName}</span><br>
        <button onclick="acceptRequest('${reqEmail}')"
          style="
            background-color: #42b72a;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
            margin-right: 5px;
          ">Accept</button>
        <button onclick="rejectRequest('${reqEmail}')"
          style="
            background-color: #f02849;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
          ">Reject</button>
      </div>
    `;
  });
}

// Accept Friend Request
window.acceptRequest = function (email) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  users = users.map((user) => {
    if (user.email === currentUser.email) {
      user.friendRequests = (user.friendRequests || []).filter(
        (req) => req !== email
      );
      if (!user.friends) user.friends = [];
      if (!user.friends.includes(email)) user.friends.push(email);
    }
    if (user.email === email) {
      if (!user.friends) user.friends = [];
      if (!user.friends.includes(currentUser.email))
        user.friends.push(currentUser.email);
    }
    return user;
  });

  localStorage.setItem("users", JSON.stringify(users));

  AllData(); // refresh UI
};

// Reject Friend Request
window.rejectRequest = function (email) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  users = users.map((user) => {
    if (
      user.email === currentUser.email &&
      Array.isArray(user.friendRequests)
    ) {
      user.friendRequests = user.friendRequests.filter((req) => req !== email);
    }
    return user;
  });

  localStorage.setItem("users", JSON.stringify(users));
 
  AllData(); // refresh UI
};

// ✅ Show Friends List
function showFriendsList() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const friendDiv = document.getElementById("friendsList");
  if (!friendDiv) return;

  const me = users.find((u) => u.email === currentUser.email);
  const myFriends = me.friends || [];

  friendDiv.innerHTML = "<h3>My Friends</h3>";

  if (myFriends.length === 0) {
    friendDiv.innerHTML += "<p>You have no friends yet.</p>";
    return;
  }

  myFriends.forEach((fEmail) => {
    const fUser = users.find((u) => u.email === fEmail);
    if (!fUser) return;

    friendDiv.innerHTML += `
      <div style="margin-bottom:10px;">
        <span>${fUser.FirstName} ${fUser.SecondName}</span><br>
        <button onclick="removeFriend('${fEmail}')"
          style="
            background-color: #f02849;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
            margin-top: 5px;
          ">Remove Friend</button>
      </div>
    `;
  });
}

// ✅ Remove Friend
window.removeFriend = function (email) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  users = users.map((user) => {
    if (user.email === currentUser.email && user.friends) {
      user.friends = user.friends.filter((f) => f !== email);
    }
    if (user.email === email && user.friends) {
      user.friends = user.friends.filter((f) => f !== currentUser.email);
    }
    return user;
  });

  localStorage.setItem("users", JSON.stringify(users));
 
  AllData();
};