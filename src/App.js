import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/Signup/SignUp';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import Shop from './pages/Shop/Shop';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Dashboard from './pages/Dashboard/Dashboard';
import UserLayout from './components/common/UserLayout/UserLayout';
import AuthProvider from './context/AuthProvider';
import RequireAuth from './components/common/PrivateRoute/PrivateRoute';
import DashboardHome from './pages/Dashboard/DashboardHome/DashboardHome';
import AddProduct from './pages/Dashboard/AddProduct/AddProduct';
import ManageProducts from './pages/Dashboard/ManageProducts/ManageProducts';
import CheckOut from './pages/Checkout/CheckOut';
import OrderSummery from './pages/Checkout/OrderSummery';
import ShippingDetails from './pages/Checkout/ShippingDetails';
import Payment from './pages/Checkout/Payment';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Page Route */}
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="shop/:id" element={<ProductDetails />} />

            {/* Authentication Route */}
            <Route path="sign-in" element={<SignIn />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="forgot-password" element={<ForgotPassword />} />

            {/* Checkout route */}
            <Route path="/checkout" element={
              <RequireAuth>
                <CheckOut />
              </RequireAuth>
            }>
              <Route index element={<OrderSummery />} />
              <Route path="shipping-details" element={<ShippingDetails />} />
              <Route path="payment" element={<Payment />} />
            </Route>
          </Route>

          {/* Dashboard */}
          <Route path="/dashboard" element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }>
            <Route index element={<DashboardHome />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="manage-products" element={< ManageProducts />} />
          </Route>


        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
