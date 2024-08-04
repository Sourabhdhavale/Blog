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
            const response = await getBlogDetails(blogId);
            const blogData = response.data[0];
            setBlog(blogData);
        };
        const fetchCategories = async () => {
            try {
                const response = await getCategories();
                console.log("get category response:"+response)
                setCategories(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error);
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
        fetchBlogDetails();
    }, []);
    const location = useLocation();
    const currentUrl = window.location.href;
    console.log("current url: "+currentUrl);
    const currentPathname = location.pathname;
    console.log("current pathname:"+currentPathname );
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
                                    value={blogId}  readOnly
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
                                    value={blog.title} readOnly
                                />
                            </div>
                        </div>
                        {/* Third row
                        <div className="row mb-3">
                            <div className="col-2">
                                <label htmlFor="">Category:</label>
                            </div>
                            <div className="col">
                            <div class="dropdown">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                        {categoryId ? categories.find(cat => cat.category_id === categoryId)?.title : 'Select Category'}
                                        
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        {categories.map(category => (
                                            <li key={category.category_id}>
                                                <button className="dropdown-item" onClick={() => setCategoryId(category.category_id)}>
                                                    {category.title}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div> */}
                        {/* Fourth row */}
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

