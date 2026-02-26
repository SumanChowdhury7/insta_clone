import axios from 'axios';
const api = axios.create({
  baseURL: "http://localhost:3000/api/posts",
  withCredentials: true,
});

export const getPost = async ()=>{
    try{
    const response = await api.get('/feed')
    return response.data
    } catch(err){
        throw err
    }
}

export const createPost = async (imageFile, caption)=>{
try{
const formData = new FormData()

formData.append("image", imageFile)
formData.append("caption", caption)

    const response = await api.post('/', formData)
    return response.data
}catch(err){

}
}

export const likePost = async (postID)=>{
const response = await api.post("/like/" + postID)

return response.data
}

export const unLikePost = async (postID)=>{
const response = await api.post("/unLike/" + postID)

return response.data
}