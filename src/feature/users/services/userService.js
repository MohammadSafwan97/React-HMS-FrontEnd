const API_BASE = "http://localhost:8080/api/users";

/* ---------------- GET ALL USERS ---------------- */

export async function getAllUsers() {

  const response = await fetch(API_BASE);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();

}

/* ---------------- CREATE USER ---------------- */

export async function createUser(user) {

  const response = await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  return response.json();

}

/* ---------------- UPDATE USER ---------------- */

export async function updateUser(id, user) {

  const response = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Failed to update user");
  }

  return response.json();

}

/* ---------------- DELETE USER ---------------- */

export async function deleteUser(id) {

  const response = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete user");
  }

}