import ModalContext from "../ModalStateContext";
import CartItemsContext from "../cartitemsContext";
import { useContext } from "react";
export default function Header(){
  const contextObject = useContext(ModalContext);
  const contextObject1 = useContext(CartItemsContext);
  return(
  <div id="main-header">
  <div id="title">
     <img src="logo.jpg"></img>
    <h1>Hungry Hub</h1> 
  </div>
  
  <button onClick={()=>contextObject.updateModalOpen(true)}>Cart {contextObject1.items.length >0 &&`(${contextObject1.items.length})`}</button>
 </div>);

}