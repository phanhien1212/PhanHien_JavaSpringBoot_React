import Home from "../pages/frontend/Home";
import Product from "../pages/frontend/Product";
import SearchProduct from "../pages/frontend/Product/SearchProduct";
import ProductDetail from "../pages/frontend/ProductDetail";
import Login from "../pages/frontend/Home/Login";
import Register from "../pages/frontend/Home/Register";
import Cart from "../pages/frontend/Home/Cart";
const routerSite = [
    { path: '/', component: Home },
    { path: '/product', component: Product },
    { path: '/product/search', component: SearchProduct },
    { path: '/product-detail/:id', component:ProductDetail},
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/cart', component: Cart },
];

export default routerSite;
