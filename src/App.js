import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from "./screens/admin/AdminLogin";
import AdminDashboard from "./screens/admin/AdminDashboard";
// import Home from "./screens/userinterface/Home";
import ProductDetailsUI from './screens/userinterface/ProductDetailsUI';
import ProductCart from "./screens/userinterface/ProductCart";
import LogInScreen from './screens/userinterface/LoginScreen';
import FilterPage from './screens/userinterface/FilterPage';
import NotFound from './screens/userinterface/NotFound'; // Add a 404 component if necessary
function Home() {
  return <h1>Home Page</h1>;
}
function App() {
 return (
   <Router>
     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/adminlogin" element={<AdminLogin />} />
       <Route path="/admindashboard/*" element={<AdminDashboard />} />
       <Route path="/productdetailsui" element={<ProductDetailsUI />} />
       <Route path="/productcart" element={<ProductCart />} />
       <Route path="/loginscreen" element={<LogInScreen />} />
       <Route path="/filterpage" element={<FilterPage />} />
       <Route path="*" element={<NotFound />} /> //Wildcard route for 404 pages
     </Routes>
   </Router>
 );
}

export default App;
