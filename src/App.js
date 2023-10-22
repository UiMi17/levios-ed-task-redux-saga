import { Route, Routes } from "react-router-dom";
import Products from "./views/Products";
import Product from "./views/Product";

function App() {
  return (
    <Routes>
      <Route index element={<Products />} />
      <Route path="/product/:asin" element={<Product />} />
      <Route path="*" element={<h1>Page not found</h1>} />
    </Routes>
  );
}

export default App;
