import { Link, resolvePath, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MenuBoard from '../compnents/menuboard';
import { deleteBlog, getMyblogs } from '../services/blog';
import MyBlogItems from '../compnents/myBlogItems';
import { toast } from 'react-toastify';

function ViewBlogs() {
    const [myblogs, setMyblogs] = useState([]);

    const userId = sessionStorage.getItem('id');

    useEffect(() => {
        const loadMyBlogs = async () => {
            const result = await getMyblogs(userId);
            setMyblogs(result['data']);
            console.log("getMyBlog:" + JSON.stringify(result['data'],2,null));
        };
        loadMyBlogs();
    }, [])

    const onHandleDelete = async (blogId) => {
        const response = await deleteBlog(blogId);
        console.log("on delete:"+JSON.stringify(response,2,null));
        if (response.status === 'success') {
            setMyblogs(myblogs.filter(blog => blog.blog_id !== blogId));
        toast.success("Blog deleted successfully.");
        }
        else {
            toast.error("Blog not deleted.")
        }
    }
    return (
        <div>
            <h3 style={{ textAlign: 'center' }}>My blogs</h3>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-4">
                        <MenuBoard />
                    </div>

                    <div className="col">
                        <div className="table table-bordered">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Title</th>
                                        <th>Category</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <MyBlogItems myblogs={myblogs} onDelete={onHandleDelete} />
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ViewBlogs;


