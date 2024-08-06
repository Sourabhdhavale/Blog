import { useEffect, useState } from "react";
import MenuBoard from "../compnents/menuboard";
import MyBlogItems from "../compnents/myBlogItems";
import { getAllBlogs, getBlogDetails, getSearchedBlog } from "../services/blog";
import AllBlogItems from "../compnents/allBlogItems";
import SearchBlogItems from "../compnents/searchBlogItem";
import { toast } from "react-toastify";

function SearchBlog() {
    const [blogTitle, setBlogTitle] = useState('');
    const [searchedBlogs, setSearchedBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchBlogByTitle = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getSearchedBlog(blogTitle);
            setSearchedBlogs(response['data']); 
        }
        catch (err) {
            toast.error('Failed to fetch blogs.');
            setError(err);
        }
        finally {
            setLoading(false);
        }
        };

    const onSearch = () => {
        if (blogTitle.trim() === '') {
            toast.error('Please enter a search term!');
            return;
        }
        fetchBlogByTitle();
    }
    return (
        <div>
            <h3 style={{ textAlign: 'center' }}>Search blogs</h3>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-4">
                        <MenuBoard/>
                    </div>

                    <div className="col">
                        <div className="row mb-5">
                        <div className="col-2">
                                <label htmlFor="">Search blog:</label>
                            </div>
                            <div className="col-3">
                                <input type="text"
                                    value={blogTitle}
                                    onChange={(e)=>{setBlogTitle(e.target.value)}}
                                />
                            </div>
                            <div className="col">
                            <button className="btn btn-primary" onClick={onSearch}>{loading ? 'searching...':'search'}</button></div>
                        </div>
                        <div className="row">
                        <div className="table table-bordered">
                                {error ? (<div className="alert alert-danger">Error fetching search results.</div>) : searchedBlogs.length === 0 ? (<div className="alert alert-primary">No blog found.</div>) : (
                                <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Title</th>
                                        <th>Category</th>
                                    </tr>
                                </thead>
                                    <tbody>
                                        <SearchBlogItems searchedBlogs={searchedBlogs} />
                                </tbody>
                            </table>)}
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SearchBlog;


