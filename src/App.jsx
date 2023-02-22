import { Routes, Route } from 'react-router-dom';
import Products from './components/products/Products';
import AddProduct from './components/add-product/AddProduct';
import './App.scss';
import Footer from './components/footer/Footer';

function App() {
  return (
    <div className="main-app">
       <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="*" element={<h1>404 Page Not Found</h1>} />
       </Routes>
       <Footer />
    </div>
  );
}

export default App;
