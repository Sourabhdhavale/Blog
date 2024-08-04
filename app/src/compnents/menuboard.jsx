import { Link, useNavigate } from 'react-router-dom';

function MenuBoard() {
    return (
        <div>
            <Link className='me-3' to='/viewMyBlogs'>My blogs</Link><br />
            <Link className='me-3' to='/home'>All blogs</Link><br />
                    <Link className='me-3' to='/addCategory'>Add Category</Link><br />
                    <Link className='me-3' to='/showCategories'>Show Categories</Link><br />
                    <Link className='me-3' to='/createblog'>Add Blog</Link><br />
                    <Link className='me-3'>Search Blogs blog</Link><br />
            <Link className='me-3' to='/login'>Log out</Link><br />
            </div>
    )
}
export default MenuBoard;

