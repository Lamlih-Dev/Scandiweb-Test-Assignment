import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import "./AddProduct.scss"

function AddProduct() {
  const[product, setProduct] = useState({ProductInfo:null, typeDescription:""});
  const[sku, setSku] = useState(null);
  const[skuError, setSkuError] = useState("");
  const[name, setName] = useState(null);
  const[nameError, setNameError] = useState("");
  const[price, setPrice] = useState(null);
  const[priceError, setPriceError] = useState("");
  const[type, setType] = useState(null);
  const[typeError, setTypeError] = useState("");
  const[size, setSize] = useState(null);
  const[sizeError, setSizeError] = useState("");
  const[weight, setWeight] = useState(null);
  const[weightError, setWeightError] = useState("");
  const[height, setHeight] = useState(null);
  const[heightError, setHeightError] = useState("");
  const[width, setWidth] = useState(null);
  const[widthError, setWidthError] = useState("");
  const[length, setLength] = useState(null);
  const[lengthError, setLengthError] = useState("");
  const navigate = useNavigate();
  const regex=/^[0-9]+$/;

  const inputValidation = () =>{
    if(!sku){
      setSkuError("SKU Field is Required");
    } else{
      setSkuError("");
    }
    if(!name){
      setNameError("Name Field is Required");
    } else{
      setNameError("");
    }
    if(!price){
      setPriceError("Price Field is Required");
    } else{
      if(!String(price).match(regex)){
        setPriceError("Price Should Be a Number");
      } else{
        setPriceError("");
      }
    }
    if(!type){
      setTypeError("Pick One Type");
    }
    if(!size){
      setSizeError("Size Field is Required");
    } else{
      if(!String(size).match(regex)){
        setSizeError("Size Should Be a Number");
      } else{
        setSizeError("");
      }
    }
    if(!weight){
      setWeightError("Weight Field is Required");
    } else{
      if(!String(weight).match(regex)){
        setWeightError("Weight Should Be a Number");
      } else{
        setWeightError("");
      }
    }
    if(!height){
      setHeightError("Height Field is Required");
    } else{
      if(!String(height).match(regex)){
        setHeightError("Height Should Be a Number");
      } else{
        setHeightError("");
      }
    }
    if(!width){
      setWidthError("Width Field is Required");
    } else{
      if(!String(width).match(regex)){
        setWidthError("Width Should Be a Number");
      } else{
        setWidthError("");
      }
    }
    if(!length){
      setLengthError("Length Field is Required");
    } else{
      if(!String(length).match(regex)){
        setLengthError("Length Should Be a Number");
      } else{
        setLengthError("");
      }
    } 
  }
  
  const sendPostRequest = async(formData) =>{
    await axios({
      url: "https://scandiweb-lamlih-test.000webhostapp.com/add-product.php/",
      method: "POST",
      data: formData,
      config: {headers:{'Content-Type':'multipart/form-data'}}
    })
    .then(function (response) {
      if(response.data.status === "success"){
        navigate('/',{replace: true});
      }
      if(response.data.message){
        setSkuError(response.data.message);
      }
    });
  }

  const addProduct = () =>{
    inputValidation();
    let formData = new FormData();

    if(sku!=null && name!=null && price!=null && type!=null){
      formData.append("sku", sku);
      formData.append("name", name);
      formData.append("price", price);
      formData.append("type", type);
      
      if(type === 1 && size!=null){
        formData.append("size", size);
        sendPostRequest(formData);
      }
      if(type === 2 && weight!=null){
        formData.append("weight", weight);
        sendPostRequest(formData);
      }
      if(type === 3 && height!=null && width!=null && length!=null){
        formData.append("height", height);
        formData.append("width", width);
        formData.append("length", length);
        sendPostRequest(formData);
      }
    }

  }

  const handleSelectChange = (e) =>{
    setType(+(e.target.value));

    if(e.target.selectedIndex === 0){
      setTypeError("Pick One Type");
      setProduct({ProductInfo:null, typeDescription:""});
    }else if(e.target.selectedIndex === 1){
      setTypeError(null);
      setProduct({ProductInfo:1, typeDescription:"Please provide size in MB"});
    } else if(e.target.selectedIndex === 2){
      setTypeError(null);
      setProduct({ProductInfo:2, typeDescription:"Please provide weight in KG"});
    } else if(e.target.selectedIndex === 3){
      setTypeError(null);
      setProduct({ProductInfo:3, typeDescription:"Please provide dimensions in HxWxL format"});
    }
  }

  return (
    <div className='add-product'>
      <div className="container mt-5 mb-5">
        <div className="add-product-header d-flex justify-content-between">
          <h1>Product Add</h1>
          <div className="actions">
            <button id='' className='btn btn-primary' onClick={addProduct}>Save</button>
            <Link to ="/" className='btn btn-secondary'>Cancle</Link>
          </div>
        </div>
        <hr className='m-0'/>
        <form action="" id="product_form" className='mt-5'>
          <table>
            <tbody>
              <tr>
                <td>
                  <label htmlFor="sku" className="form-label">SKU</label>
                </td>
                <td>
                  <input type="text" className="form-control" id="sku" name='sku' onChange={(e)=>setSku(e.target.value)}/>
                  <p className='text-danger small text-validation mb-0'>{skuError}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="name" className="form-label">Name</label>
                </td>
                <td>
                  <input type="text" className="form-control" id="name" name='name' onChange={(e)=>setName(e.target.value)} />
                  <p className='text-danger small text-validation mb-0'>{nameError}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="price" className="form-label">Price ($)</label>
                </td>
                <td>
                  <input type="number" className="form-control" id="price" name='price' onChange={(e)=>setPrice(+(e.target.value))} />
                  <p className='text-danger small text-validation mb-0'>{priceError}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="productType" className="form-label">Type Switcher</label>
                </td>
                <td>
                  <select className="form-select" id='productType' name='productType' onChange={(e)=>handleSelectChange(e)}>
                    <option defaultValue>Please Select One Type</option>
                    <option value="1" id='DVD'>DVD</option>
                    <option value="2" id='Book'>Book</option>
                    <option value="3" id='Furniture'>Furniture</option>
                  </select>
                  <p className='text-danger small text-validation mb-0'>{typeError}</p>
                </td>
              </tr>
              
              {product.ProductInfo === 1 ? 
              <tr>
                <td>
                  <label htmlFor="size" className="form-label">Size (MB)</label>
                </td>
                <td>
                  <input type="number" className="form-control" id="size" name='size' onChange={(e)=>setSize(+(e.target.value))}/>
                  <p className='text-danger small text-validation mb-0'>{sizeError}</p>
                </td>
              </tr> : ""}

              {product.ProductInfo === 2 ? 
              <tr>
                <td>
                  <label htmlFor="weight" className="form-label">Weight (KG)</label>
                </td>
                <td>
                  <input type="number" className="form-control" id="weight" name='weight' onChange={(e)=>setWeight(+(e.target.value))}/>
                  <p className='text-danger small text-validation mb-0'>{weightError}</p>
                </td>
              </tr> : ""}

              {product.ProductInfo === 3 ? 
              <>  
                <tr>
                  <td>
                    <label htmlFor="height" className="form-label">Height (CM)</label>
                  </td>
                  <td>
                    <input type="number" className="form-control" id="height" name='height' onChange={(e)=>setHeight(+(e.target.value))}/>
                    <p className='text-danger small text-validation mb-0'>{heightError}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="width" className="form-label">Width (CM)</label>
                  </td>
                  <td>
                    <input type="number" className="form-control" id="width" name='width' onChange={(e)=>setWidth(+(e.target.value))}/>
                    <p className='text-danger small text-validation mb-0'>{widthError}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="length" className="form-label">Length (CM)</label>
                  </td>
                  <td>
                    <input type="number" className="form-control" id="length" name='length' onChange={(e)=>setLength(+(e.target.value))}/>
                    <p className='text-danger small text-validation mb-0'>{lengthError}</p>
                  </td>
                </tr>
              </> : ""} 

            </tbody>
          </table>
          <p>{product.typeDescription}</p>
        </form>
      </div>
    </div>
  )
}

export default AddProduct