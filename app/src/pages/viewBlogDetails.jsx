import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import MenuBoard from '../compnents/menuboard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getBlogDetails, updateBlogDetails } from '../services/blog';
import { toast } from 'react-toastify';
import { getCategories } from '../services/category';

function ViewBlogDetails() {
    const { blogId } = useParams();
    const [blog, setBlog] = useState({});
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState([]);
    // console.log("Bolg ID fro params:" + blogId);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogDetails = async () => {
            try {
                const response = await getBlogDetails(blogId);
                console.log("fetch blog detail response: " + JSON.stringify(response));
                const blogData = response.data[0];
                setBlog(blogData);
            }
            catch (error) {
                toast.error('Failed to fetch blog details.');
            }
        };
        const fetchCategories = async () => {
            try {
                const response = await getCategories();
                console.log("get category response:" + response)
                setCategories(response.data);
            } catch (error) {
                toast.error('Failed to fetch categories.');
            }
        };
        fetchCategories();
        fetchBlogDetails();
    }, []);

    const location = useLocation();
    const currentUrl = window.location.href;
    console.log("current url: " + currentUrl);
    const currentPathname = location.pathname;
    console.log("current pathname:" + currentPathname);
    const onBack = async () => {
        navigate('/home')
    }
    return (
        <div>
            <h3 style={{ textAlign: 'center' }}>View blog</h3>
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
                                    value={blogId || ''} readOnly
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
                                    value={blog.title || ''} readOnly
                                />
                            </div>
                        </div>

                        <div className="row">
                            <textarea value={blog.content || ''}
                                readOnly></textarea>
                        </div>
                        <div className="row">
                            <div className="col-2">
                                <button className="btn btn-success" onClick={onBack}>Back</button>
                            </div>

                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}
export default ViewBlogDetails;

