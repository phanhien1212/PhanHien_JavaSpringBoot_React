import { BrowserRouter,Routes,Route} from 'react-router-dom';
import LayoutAdmin from './layouts/LayoutAdmin';
import routerApp from './router';
import LayoutSite from './layouts/LayoutSite';
import Home from './pages/frontend/Home';
import Product from './pages/frontend/Product';
import { Provider } from 'react-redux';
import store from './state/store';

function App() {  
  
  return (
    <Provider store={store}>
    <BrowserRouter >
      <Routes>
        <Route path="/admin" element={<LayoutAdmin />}>
          {routerApp.routerAdmin.map((route, index) => {
            const Page = route.component;
            return <Route path={route.path} element={<Page/>} key={index}/>
          })}
        </Route>
        <Route path="/" element={<LayoutSite />}>
          {routerApp.routerSite.map((route, index) => {
            const Page = route.component;
            return <Route path={route.path} element={<Page/>} key={index}/>
          })}
        </Route>
        
        
      </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
