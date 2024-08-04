import axios from 'axios'
import config from '../config'

export async function createBlog(title, content, userId, categoryId ) {
  const body = {
      title,
      content,
      userId,
      categoryId, 
  }

  const response = await axios.post(`${config.url}/blog/createBlog`, body)
  console.log("Under axios blog service:"+response)
  return response.data;
} 

export async function editBlog(blogId, title , content) {
  const body = {
    blogId, title , content,
  }
  const response = await axios.post(`${config.url}/blog/login`, body)

  return response.data
}

export async function getMyblogs(userId)
{
  const response = await axios.get(`${config.url}/blog/getMyBlogs`, { params: { userId } });
  // console.log("Under get mybblog service");
  return response.data;
}

export async function getBlogDetails(blogId) {
  const response = await axios.get(`${config.url}/blog/getBlogDetails`, { params: { blogId } });
  console.log("blog ID:"+blogId);

  return response.data;
}

export async function updateBlogDetails(blogId,{title, content },categoryId) {
  const body = {
    blogId,
    title,
    content,
    categoryId, 
  };
  const response = await axios.put(`${config.url}/blog/editBlog`, body);
  console.log("In update blog response: "+JSON.stringify(response,2))
  return response.data;
}
export async function getAllBlogs() {
  const response = await axios.get(`${config.url}/blog/getAllBlogs`);
  console.log("Get alll blogs in service:"+ response.data);
  return response.data;
}

export async function deleteBlog(blogId) {
  const response = await axios.delete(`${config.url}/blog/deleteBlog`, { params:{blogId}});
  console.log("Get delete blogs in service:"+ response);
  return response.data;
}