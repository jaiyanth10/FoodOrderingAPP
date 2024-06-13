import Cart from "./cart";
import Meals from "./Meals";
import Checkout from "./checkout";
import Success from "./Success";
import Header from "./header";
import UserOrders from "./UserOrders";
export default function Home() {
  return (
    <>
      <Header />
      <div>
        <Meals />
        <Cart />
        <Checkout />
        <Success />
        <UserOrders />
      </div>
    </>
  );
}
