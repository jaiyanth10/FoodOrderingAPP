import Cart from "./Components/cart";
import Meals from "./Components/Meals";
import Header from "./Components/header";
import Checkout from "./Components/checkout";
import {CartItemsContextProvider} from "./cartitemsContext";
import {ModalStateContext} from "./ModalStateContext";
import Success from "./Components/Success";
function App() {
  return (
    <ModalStateContext>
    <CartItemsContextProvider>
      <Header/>
      <Meals/>
      <Cart/>
      <Checkout/>
      <Success/>
    </CartItemsContextProvider> 
    </ModalStateContext>  
  );
}
export default App;