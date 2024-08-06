import { Link, useNavigate, useParams } from 'react-router-dom';
import MenuBoard from '../compnents/menuboard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getBlogDetails, updateBlogDetails } from '../services/blog';
import { toast } from 'react-toastify';
import { getCategories } from '../services/category';

function EditBlog() {
    const { blogId } = useParams();
    const [blog, setBlog] = useState({});
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogDetails = async () => {
            try {
                const response = await getBlogDetails(blogId);
                console.log('get blog details: ' + JSON.stringify(response, 2))
                const blogData = response.data[0];
                setBlog(blogData);
                setCategoryId(blogData.category_id)
            }
            catch (error) {
                console.log("Error fetching BLog details:", error)
            }
        };
        const fetchCategories = async () => {
            try {
                const response = await getCategories();
                setCategories(response.data);
                console.log("Fetch category: " + JSON.stringify(response.data, 2));
            } catch (error) {
                console.log(error);
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
        fetchBlogDetails();
    }, [blogId]);

    const onUpdate = async () => {
        setLoading(true);
        try {
            const updateResponse = await updateBlogDetails(blogId, blog, categoryId)
            if (updateResponse.data.affectedRows > 0) {
                toast.success("Blog updated.");
                navigate('/viewMyBlogs')
            }
            else {
                toast.error('Blog not updated!');
            }
        }
        catch (error) {
            toast.error('Error updating blog.');
        }
        finally {
            setLoading(false)
        }

    }

    const onCancel = () => {
        navigate('/viewMyBlogs');
    }
    return (
        <div>
            <h3 style={{ textAlign: 'center' }}>Edit blog</h3>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-4">
                        <MenuBoard />
                    </div>

                    <div className="col">
                        {/* First row */}
                        <div className="row mb-3">
                            <div className="col-2">
                                <label htmlFor="">Blog Id:</label>
                            </div>
                            <div className="col">
                                <input type="text"
                                    value={blogId} readOnly
                                    disabled={loading}
                                />
                            </div>
                        </div>
                        {/* Second row */}
                        <div className="row mb-3">
                            <div className="col-2">
                                <label htmlFor="">Blog Title:</label>
                            </div>
                            <div className="col">
                                <input type="text"
                                    value={blog.title}
                                    onChange={(e) => {
                                        setBlog({ ...blog, title: e.target.value });
                                    }}
                                    disabled ={loading}
                                />
                            </div>
                        </div>
                        {/* Third row */}
                        <div className="row mb-3">
                            <div className="col-2">
                                <label htmlFor="">Category:</label>
                            </div>
                            <div className="col">
                                <div class="dropdown">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false" disabled={loading}>
                                        {categoryId ? categories.find(cat => cat.category_id === categoryId)?.title : 'Select Category'}

                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        {categories.map((category) => (
                                            <li key={category.category_id}>
                                                <button className="dropdown-item" onClick={() => setCategoryId(category.category_id)} disabled={loading}>
                                                    {category.title}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* Fourth row */}
                        <div className="row">
                            <textarea value={blog.content || ''}
                                onChange={(e) => setBlog({ ...blog, content: e.target.value })} style={{ width: '', height: '320px' }}></textarea>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-2">
                            <button className="btn btn-success" onClick={onUpdate} disabled={loading}>{loading ? 'Updating...' : 'Update'}</button>
                        </div>
                        <div className="col-2">
                            <button className="btn btn-danger" onClick={onCancel} disabled={loading}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default EditBlog;

