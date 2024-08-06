import { useEffect, useState } from 'react';
import AllBlogItems from '../compnents/allBlogItems';
import MenuBoard from '../compnents/menuboard';
import { getAllBlogs } from '../services/blog';
import { toast } from 'react-toastify';
function Home() {
    const [allBlogs, setAllBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null)
        const fetchAllBlogs = async () => {
            try {
                const response = await getAllBlogs();
                setAllBlogs(response.data);
            } catch (err) {
                console.error('Error fetching blogs:', err);
                setError('Failed to fetch blogs.');
                toast.error('Failed to fetch blogs.');
            } finally {
                setLoading(false);
            }
        };
        fetchAllBlogs();
    }, [])

    return (
        <div>
            <h3 style={{ textAlign: 'center' }}>Blogging App</h3>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-4" style={{ textAlign: 'center' }}>
                        <MenuBoard />
                    </div>
                    <div className="col">
                        {loading ? (<h1>Loading...</h1>) : error ? (<div className='alert alert-danger'>{error}</div>) : allBlogs.length === 0 ? (<div className='alert alert-success'>No blog data found.</div>) : (<div className="table table-bordered">
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
                        </div>)}

                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home;

