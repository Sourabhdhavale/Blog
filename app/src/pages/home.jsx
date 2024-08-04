import { useEffect, useState } from 'react';
import AllBlogItems from '../compnents/allBlogItems';
import MenuBoard from '../compnents/menuboard';
import { getAllBlogs } from '../services/blog';
function Home() {
    const [allBlogs, setAllBlogs] = useState([]);

    useEffect(() => {
        const fetchAllBlogs = async () => {
            const response = await getAllBlogs();
            console.log("fet all blogs:"+JSON.stringify(response.data,2,null));
            setAllBlogs(response['data']);
        };
        fetchAllBlogs();
    }, [])

    return (
        <div>
            <h3 style={{textAlign:'center'}}>Blogging App</h3>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-4" style={{textAlign:'center'}}>       
                        <MenuBoard/>
                    </div>
                    <div className="col"> 
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
                                <AllBlogItems allBlogs={allBlogs} />
                                </tbody>
                            </table>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
    )
}
export default Home;

