import apiClient from "../../../api/apiClient"

/* ---------------- GET ALL USERS ---------------- */

export async function getAllUsers() {

  const response = await apiClient.get("/users");

return response.data;

}

/* ---------------- CREATE USER ---------------- */

export async function createUser(user) {
  try{
  const response = await apiClient.post("/users",user);
  return response.data;
  }
  catch(error){
throw error?.response?.data?.message ||"Failed to create user";
  }

 }


/* ---------------- UPDATE USER ---------------- */

export async function updateUser(id, user) {
  try{
  const response = await apiClient.put(`/users/${id}`,user)
   return response.data;
}
catch(error){
throw error?.response?.data?.message ||"Failed to update user";
}

}
/* ---------------- DELETE USER ---------------- */
export async function deleteUser(id) {
  try{
  const response = await apiClient.delete(`/users/${id}`);
  return response.data
  }
  catch(error){
  throw error?.response?.data?.message || "Failed to delete the user"
  }
  

}