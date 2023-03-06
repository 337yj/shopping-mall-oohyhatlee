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
  NotFound,
  ProtectedRoute
} from "../pages";


const router = (
  <Route path="/" element={<Layout />}>
    <Route path="/" element={<Home />} />
    <Route path="new" element={<ProtectedRoute requireAdmin/>}>
      {/* <Route element={<NewProduct />}/> */}
    </Route>
    <Route path="carts" element={<ProtectedRoute />}>
      <Route element={<MyCart />}/>
    </Route>
  </Route>
);

const rootRouter = createBrowserRouter(createRoutesFromElements(router));
export default rootRouter;