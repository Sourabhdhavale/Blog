import { useState } from "react";
import MenuBoard from "../compnents/menuboard";
import { addCategory } from "../services/category";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddCategory() {
    const [title, setTitle] = useState('');
    const [details, setDetail] = useState('');
    const navigate = useNavigate();
    const onAddCategory = async () => {
        const response = await addCategory(title, details);
        console.log("add category:"+JSON.stringify(response,2));
        if (response.status === 'success') {
            toast.success("Category addded.");
            navigate('/showCategories');
        }
        else
        {
            toast.error("Category not added!")
        }
    }

    const onCancelCategory = () => {
        navigate('/showCategories')
    }
    return(
    <div className="container-fluid">
        <h2 style={{ textAlign: 'center' }} className="mt-3">Add Category</h2>
        <div className="row mt-5">
            <div className="col">
                <MenuBoard/>
            </div>
            <div className="col " style={{ fontSize: '18px' }}>

                    <div className="row">
                        <div className="mb-3" >
                    <label htmlFor="">Title</label>
                    <input type="text" className="form-control" onChange={(e) => {
                        setTitle(e.target.value)
                    }} />
                </div>
                </div>

                <div className="row"><div className="mb-3 " >
                    <label htmlFor="">Detail</label>
                    <input type="text" className="form-control" onChange={(e) => {
                        setDetail(e.target.value)
                    }} />
                </div></div>
                    <div className="row">
                        <div className="col-6">
                        <button className="btn btn-primary mt-3" onClick={onAddCategory}>ADD</button>
                        </div>
                        <div className="col-6">
                            <button className="btn btn-danger" onClick={onCancelCategory}>Cancel</button>
                        </div>
                    </div>
            </div>
            <div className="col"></div>
        </div>
    </div>
    )
}

export default AddCategory;