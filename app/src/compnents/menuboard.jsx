import { Link, useNavigate } from 'react-router-dom';

function MenuBoard() {
    const navigate = useNavigate();
    const onLogout = () => {
        sessionStorage.removeItem('token');
        navigate('/login')
    }
    return (
        <div>
            <Link className='me-3' to='/viewMyBlogs'>My blogs</Link><br />
            <Link className='me-3' to='/home'>All blogs</Link><br />
                    <Link className='me-3' to='/addCategory'>Add Category</Link><br />
                    <Link className='me-3' to='/showCategories'>Show Categories</Link><br />
                    <Link className='me-3' to='/createblog'>Add Blog</Link><br />
                    <Link className='me-3' to='/searchBlog'>Search Blogs</Link><br />
            <button className='btn btn-success' onClick={onLogout}>Logut</button><br />
            </div>
    )
}
export default MenuBoard;

