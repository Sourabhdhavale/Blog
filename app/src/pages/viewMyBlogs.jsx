import { Link, resolvePath, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MenuBoard from '../compnents/menuboard';
import { deleteBlog, getMyblogs } from '../services/blog';
import MyBlogItems from '../compnents/myBlogItems';
import { toast } from 'react-toastify';

function ViewBlogs() {
    const [myblogs, setMyblogs] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const userId = sessionStorage.getItem('id');

    useEffect(() => {
        const loadMyBlogs = async () => {
            try {
            const result = await getMyblogs(userId);
            if (result.status === 'success') {
                setMyblogs(result['data']);
            }
            else {
                setError('Failed to load blogs.');
                toast.error('Failed to load blogs!');
            }
            }
            catch (error) {
                setError('Failed to load blogs.');
                toast.error('Failed to load blogs.')
            }
            finally {
                setLoading(false);
            }
        };
        if (userId) {
            loadMyBlogs();
        }
        else {
            setLoading(false);
            setError('User not found.');
            toast.error('User not found.');
        }
    }, [])

    const onHandleDelete = async (blogId) => {
        try {
            const response = await deleteBlog(blogId);
        console.log("on delete:"+JSON.stringify(response,2,null));
        if (response.status === 'success') {
            setMyblogs(myblogs.filter(blog => blog.blog_id !== blogId));
        toast.success("Blog deleted successfully.");
        }
        else {
            toast.error("Failed to delete blog.")
        }
        }
        catch (error) {
            toast.error('Failed to delete blog.')
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
                        {loading ? (<h1>Loading...</h1>) : error ? (<div className="alert alert-danger">{error}.</div>):myblogs.length===0?(<div className="alert alert-success">No blog found.</div>):( <div className="table table-bordered">
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
                        </div>)}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ViewBlogs;


