import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import AdminLogin from "./screens/admin/AdminLogin";
import AdminDashboard from "./screens/admin/AdminDashboard"
import Home from "./screens/userinterface/Home";
import ProductDetailsUI from './screens/userinterface/ProductDetailsUI';
import ProductCart from "./screens/userinterface/ProductCart"
import LogInScreen from './screens/userinterface/LoginScreen';
import FilterPage from './screens/userinterface/FilterPage';


function App() {
 return (
   <div>
    <Router>
     <Routes>
        
       <Route  element={<AdminLogin/>} path={'/adminlogin'}/>
       <Route  element={<AdminDashboard/>} path={'/admindashboard/*'}/>
       <Route  element={<Home />} path={'/home'}/>
       <Route  element={<ProductDetailsUI />} path={'/productdetailsui'}/>
       <Route  element={<ProductCart />} path={'/productcart'}/>
       <Route element={<LogInScreen/>} path={'/loginscreen'} />
       <Route element={<FilterPage/>} path={'/filterpage'} />




     </Routes>
    </Router>
   </div>
 );
}

export default App;
