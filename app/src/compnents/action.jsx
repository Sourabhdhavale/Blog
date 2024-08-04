import { Link, useNavigate } from "react-router-dom";
function Action({blogId,onDelete}) {
    const navigate = useNavigate();
    
    return (
        <div>
            <Link to={`/editblog/${blogId}`}>Edit</Link>
            <button className="btn btn-danger" onClick={()=> onDelete(blogId)}></button>
        </div>
    )
}

export default Action;