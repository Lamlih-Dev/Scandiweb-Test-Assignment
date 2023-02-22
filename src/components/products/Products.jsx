import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import "./Products.scss"

function Product({product, productsToDelete, setProductsToDelete}){
  let productInfo;

  if(product["type-id"] === 1){
    productInfo = <p>Size: {product.Size}</p>;
  } else if(product["type-id"] === 2){
    productInfo = <p>Weight: {product.Weight}KG</p>;
  } else{
    productInfo = <p>Dimension: {product.Height}x{product.Width}x{product.Length}</p>;
  }

  const handleCheckbox = (e) =>{
    const {value, checked} = e.target;
    if(checked){
      setProductsToDelete([...productsToDelete, value]);
    } else{
      setProductsToDelete(productsToDelete.filter((e) => e!== value));
    }
  }

  return(
    <div className="product mt-3">
      <p>{product.sku}</p>
      <p>{product.name}</p>
      <p>{parseFloat(product.price).toFixed(2)} $</p>
      {productInfo}
      <input type="checkbox" className='delete-checkbox' value={product.id} onChange={(e)=>handleCheckbox(e)}/>
    </div>
  )
}

function Products() {
  const[products, setProducts] = useState([]);
  const[productsToDelete, setProductsToDelete] = useState([]);

  const getAllProducts = async() =>{
    await axios.get("https://scandiweb-lamlih-test.000webhostapp.com/").then(response => {
      setProducts(response.data);
   });
  }

  useEffect(()=>{
    getAllProducts();
  },[])

  const deleteProducts = async() =>{
    let formData = new FormData();
    formData.append("productsToDelete", productsToDelete);
    await axios({
      url: "https://scandiweb-lamlih-test.000webhostapp.com/delete-product.php/",
      method: "POST",
      data: formData,
      config: {headers:{'Content-Type':'multipart/form-data'}}
    }).then(response => {
      console.log(response.data);
    });
    let checkboxes = document.querySelectorAll(".delete-checkbox");
    checkboxes.forEach((checkbox)=>checkbox.checked = false);
    getAllProducts();
  }

  return (
    <div className="products">
      <div className="container mt-5 mb-5">
        <div className="products-header d-flex justify-content-between">
          <h1>Product List</h1>
          <div className="actions">
            <Link to ="/add-product" className='btn btn-secondary'>ADD</Link>
            <button id='delete-product-btn' className='btn btn-danger' onClick={deleteProducts}>MASS DELETE</button>
          </div>
        </div>
        <hr className='m-0'/>
        <div className="product-list mt-2">
          <div className="row">
            {products.map((product, index)=>(
              <div className="col-lg-3" key={index}>
                <Product 
                  product={product} 
                  productsToDelete={productsToDelete}
                  setProductsToDelete={setProductsToDelete}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products