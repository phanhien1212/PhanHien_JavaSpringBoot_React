import CreateBrand from "../pages/backend/Brand/CreateBrand";
import ListBrand from "../pages/backend/Brand/ListBrand";
import ListProduct from "../pages/backend/Product/ListProduct";
import EditProduct from "../pages/backend/Product/EditProduct";
import CreateProduct from "../pages/backend/Product/CreateProduct";
const routerAdmin = [
  { path: '/admin/brand', component: ListBrand },
  { path: '/admin/brand/create', component: CreateBrand },
  { path: '/admin/product/', component: ListProduct },
  { path: '/admin/product/create', component: CreateProduct },
  { path: '/admin/product/edit/:id', component: EditProduct },
];

export default routerAdmin;
