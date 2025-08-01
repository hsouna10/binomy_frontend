import axios from "axios";

export async function uploadProfilePicture(file: File) {
  const formData = new FormData();
  formData.append("profile_picture", file);
  const response = await axios.post("http://localhost:5000/api/upload-profile-picture", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true
  });
  return response.data.imageUrl;
}
