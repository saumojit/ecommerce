import { Container } from 'react-bootstrap'
import { HashRouter as Router , Routes , Route} from 'react-router-dom' // using HashRouter instead of BrowserRouter

import {Header} from './components/Header'
import {Footer} from './components/Footer'
import { HomeScreen } from './screens/HomeScreen'
import { ProductScreen } from './screens/ProductScreen'
import { CartScreen } from './screens/CartScreen'
import { LoginScreen } from './screens/LoginScreen'
import { RegisterScreen } from './screens/RegisterScreen'
import { ProfileScreen } from './screens/ProfileScreen'
import { ShippingScreen } from './screens/ShippingScreen'
import { PaymentScreen } from './screens/PaymentScreen'
import { PlaceOrderScreen } from './screens/PlaceOrderScreen'
import { OrderScreen } from './screens/OrderScreen'
import { OrdersScreen } from './screens/OrdersScreen'
import { UserListScreen } from './screens/UserListScreen'
import { ProductListScreen } from './screens/ProductListScreen'
import { OrderListScreen } from './screens/OrderListScreen'
import { AccountScreen } from './screens/AccountScreen'
import { AddressListScreen } from './screens/AddressListScreen'
import { PaymentPrefListScreen } from './screens/PaymentPrefListScreen'
import { SupportScreen } from './screens/SupportScreen'
import { UserSecurityScreen } from './screens/UserSecurityScreen'
import { WishListScreen } from './screens/WishListScreen'
import { AddressListFormScreen } from './screens/AddressListFormScreen'

function App() {
  return (
    <Router>
      <Header/>
        <main className='py-3'>
          <Container>
            <Routes>
              <Route path="/" element={<HomeScreen />}/>
              <Route path="/product/:id" element={<ProductScreen />}/>
              <Route path="/cart/:id?" element={<CartScreen />}/>
              <Route path="/shipping/" element={<ShippingScreen />}/>
              <Route path="/payment/" element={<PaymentScreen />}/>
              <Route path="/placeorder/" element={<PlaceOrderScreen />}/>
              <Route path="/orders/:id" element={<OrderScreen />}/>
              <Route path="/orders" element={<OrdersScreen />}/>
              <Route path="/wishlist" element={<WishListScreen />}/>
              <Route path="/account" element={<AccountScreen />}/>
              <Route path="/addresslist" element={<AddressListScreen />}/>
              <Route path="/paymentlist" element={<PaymentPrefListScreen />}/>
              <Route path="/addresslist/add" element={<AddressListFormScreen />}/>
              <Route path="/support" element={<SupportScreen />}/>
              <Route path="/security" element={<UserSecurityScreen />}/>
              <Route path="/login" element={<LoginScreen />}/>
              <Route path="/register" element={<RegisterScreen />}/>
              <Route path="/profile" element={<ProfileScreen />}/>
              <Route path="/account" element={<AccountScreen />}/>
              <Route path="/admin/userlist" element={<UserListScreen />}/>
              <Route path="/admin/productlist" element={<ProductListScreen />}/>
              <Route path="/admin/orderlist" element={<OrderListScreen />}/>

            </Routes>
          </Container>
        </main>
      <Footer/>
    </Router>
  );
}

export default App;
