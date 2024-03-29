import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "../components/Layout";
import {
  Home,
  AllProducts,
  NewProduct,
  ProductDetail,
  MyCart,
  // NotFound,
  ProtectedRoute,
} from "../pages";

const router = (
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="products" element={<AllProducts />} />
    <Route path="products/:id" element={<ProductDetail />} />
    <Route
      path="products/new"
      element={
        <ProtectedRoute requireAdmin>
          <NewProduct />
        </ProtectedRoute>
      }
    ></Route>
    <Route
      path="carts"
      element={
        <ProtectedRoute>
          <MyCart />
        </ProtectedRoute>
      }
    />
  </Route>
);

const rootRouter = createBrowserRouter(createRoutesFromElements(router));
export default rootRouter;
