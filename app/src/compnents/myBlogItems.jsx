import { Link } from "react-router-dom";
import Action from "./action";

function MyBlogItems({ myblogs,onDelete }) {
    return (
        <>
        {
            myblogs.map((blog) => (
                <tr>
                    <td>{blog.blog_id}</td>
                    <td><Link to={`/viewBlogDetails/${blog.blog_id}`}>{blog.blog_title}</Link></td>
                    <td>{blog.category_title}</td>
                    <td><Action blogId={blog.blog_id} onDelete={onDelete} /></td>
                </tr>
            ))
            }
        </>
    )
}

export default MyBlogItems;