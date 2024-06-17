import React, {  useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const add = ({url}) => {


    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name:"",
        description:"",
        category:"Vegetables",
        price:""        
    })

    const onChangeHandler = (event) => {
        
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({...data,[name]:value}))
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        console.log(data);

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('category', data.category);
        formData.append('price',Number( data.price));
        formData.append('image', image);

        //should be updated (url and api end point)
        /*const responce = await axios.post(`${url}/api/food/add`, formData);
        if(responce.data.success) {
            setData({
                name:"",
                description:"",
                category:"Vegetables",
                price:""        
            })
            setImage(false);
            toast.success(responce.data.message);

        }else{
            toast.error(responce.data.message);
        }*/
    }


  return (
    <div className='add'>
        <form className="flex-col" onSubmit={onSubmitHandler}>
            <div className="add-img-upload flex-col">
                <p>Upload Image</p>
                <label htmlFor="image">
                    <img src={image?URL.createObjectURL(image):assets.upload} alt="" />
                </label>
                <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
            </div>
            <div className="add-product-name flex-col">
                <p>Product Name</p>
                <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' required/>
            </div>
            <div className="add-product-description flex-col">
                <p>Product Description</p>
                <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' required/>
            </div>
            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Product Category</p>
                    <select onChange={onChangeHandler}  name="category" >
                        <option value="Vegetables">Vegetables</option>
                        <option value="Fruits">Fruits</option>                        
                    </select>
                </div>
                <div className="add-price flex-col">
                    <p>Product Price</p>
                    <input onChange={onChangeHandler} value={data.price} type="number" name="price" placeholder="Price per 1kg"  required/>
                </div>
            </div>
            <button type="submit" className='add-btn'>ADD</button>
        </form>
        
    </div>
  )
}

export default add