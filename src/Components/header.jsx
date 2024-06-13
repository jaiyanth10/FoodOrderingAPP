import ModalContext from "../ModalStateContext";
import { FaShoppingCart } from "react-icons/fa";
import CartItemsContext from "../cartitemsContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../AuthContext";
import { IoLogOutOutline } from "react-icons/io5";

export default function Header() {
  const [count, setCount] = useState(0);
  const contextObject = useContext(ModalContext);
  const contextObject1 = useContext(CartItemsContext);
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  console.log("header", contextObject1.items);

  function itemLength() {
    let c = 0;
    for (let i = 0; i < contextObject1.items.length; i++) {
      c += contextObject1.items[i].count;
    }
    setCount(c);
  }

  useEffect(() => {
    itemLength();
  }, [contextObject1.items]);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div id="main-header">
      <div id="title">
        <img src="Hungry HUB.png" alt="Hungry HUB logo"></img>
        <h1>Hungry Hub</h1>
      </div>
      <div id="buttons">
        <button onClick={() => contextObject.updateordersOpen(true)}>
          Orders
        </button>{" "}
        <button onClick={() => contextObject.updateModalOpen(true)}>
          <FaShoppingCart style={{paddingTop:"3px"}}/>{`[${count}]`}
        </button>{" "}
        <button onClick={handleLogout}><IoLogOutOutline style={{width:28,height:28,marginTop:"6px"}}/></button>
      </div>
    </div>
  );
}
