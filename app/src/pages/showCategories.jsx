import { useEffect, useState } from "react";
import MenuBoard from "../compnents/menuboard";
import { deleteCategory, getCategories } from "../services/category";
import { toast } from "react-toastify";
import CategoryList from "../compnents/categoryList";


function ShowCategories() {
    const [category, setCategory] = useState([]);
    // const [categoryId, setCategoryId] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const loadCategories = async () => {
          try
          {
            const response = await getCategories();
            if (response.status === 'success')
            {
              const result= response.data
              setCategory(result);
            }
            else
            {
              toast.error("Failed to fetch categories.");
            }
          }
          catch (error)
          {
            toast.error('Something went wrong!');
            setError(error);
          }
          finally {
            setLoading(false);
          }
        };
        loadCategories();
    }, []);

const onHandleDelete = async(categoryId) => {
    const response = await deleteCategory(categoryId);

    if (response.status === 'success') {
      setCategory(category.filter(c => c.category_id !== categoryId));
      toast.success("Category deleted successfully.");
  }
  else
  {
      toast.error("Category not deleted.")
  }
  }
    return (
        <div className="container-fluid">
            <h2 style={{textAlign:'center'} } className="mt-3">Category</h2>
    
          <div className="row mt-5">
            <div className="col-2"><MenuBoard/></div>
            <div className="col">
            {loading ? (<h1>Loading...</h1>): error ? (<div className="alert alert-danger">Error loading categories.</div>): category.length === 0 ? (<div className="alert alert-success">No category found.</div>):(<table className="table table-bordered table-striped table-info " style={{fontSize:"18px"}}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                        {category.map((c)=>{
                          return <CategoryList category={c} onDelete={onHandleDelete} />
                        })}
                </tbody>
              </table>)}
              
            </div>
            <div className="col-2"></div>
          </div>
        </div>
      );
}

export default ShowCategories;