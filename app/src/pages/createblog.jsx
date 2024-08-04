import { createBlog } from "../services/blog";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getCategories } from '../services/category'

function CreateBlog() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState([]); 
    
    const navigate = useNavigate();

    useEffect(() => {
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

        const storedUserId = sessionStorage.getItem('id');
        if (storedUserId) {
            console.log("session id:"+storedUserId);
            setUserId(storedUserId);
        }
        else {
            console.warn('User not found in session ID!');
        }
    }, []);

   
    const onCreate = async () => {
        const result = await createBlog(title, content, userId, categoryId);
        console.log("Create blong response:"+result)
        if (result['status'] === 'success') {
            toast.success('Blog created.');
            navigate('/home');
        } else {
          toast.error('Failed to create blog.')
        }
    }
    const handleCancel = () => {
        navigate('/viewMyBlogs');
    }
    return (
        <div>
            <h3>Create Blog</h3>
            <div className="container">
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col">
                        <div className="row">
                            <div className="col-3">
                                <label htmlFor="">Title:</label>
                            </div>
                            <div className="col">
                                <input type="text" className="form-control"
                                onChange={(e) => {
                                    setTitle(e.target.value)
                                    }}
                                maxLength={5000}/>
                            </div>
                        </div>
                        <div className="row">
                            <p>Content:</p>
                        </div>
                        <div className="row">
                            <textarea name="" id="" cols="30" rows="10" maxLength={1000000} className="form-control"
                            onChange={(e) => {
                                setContent(e.target.value)
                                }}></textarea>
                        </div>
                        <div className="row">
                            <div className="col-3">Category:</div>
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
                        </div>
                        <div className="row">
    <div className="col-2">
        <button className="btn btn-success" onClick={onCreate}>Create</button>
    </div>
    <div className="col-2">
        <button className="btn btn-danger" onClick={handleCancel}>Cancel</button>
    </div>
</div>
                    </div>
                    <div className="col-2"></div>
                </div>
            </div>
        </div>
    )
}
export default CreateBlog;

