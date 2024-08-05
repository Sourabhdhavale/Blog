import { useEffect, useState } from "react";
import MenuBoard from "../compnents/menuboard";
import MyBlogItems from "../compnents/myBlogItems";
import { getAllBlogs, getBlogDetails, getSearchedBlog } from "../services/blog";
import AllBlogItems from "../compnents/allBlogItems";
import SearchBlogItems from "../compnents/searchBlogItem";

function SearchBlog() {
    const [blogTitle, setBlogTitle] = useState('');
    const [searchedBlogs, setSearchedBlogs] = useState([]);

        const fetchBlogByTitle = async () => {
            const response = await getSearchedBlog(blogTitle);
            console.log("fet searched blogs:"+JSON.stringify(response.data,2));
            setSearchedBlogs(response['data']);
        };


    const onSearch = () => {
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
                            <button className="btn btn-primary" onClick={onSearch}>Search</button></div>
                        </div>
                        <div className="row">
                        <div className="table table-bordered">
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
                            </table>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SearchBlog;


