import Modal from "./Modal";
import CartItemsContext from "../cartitemsContext";
import {useContext} from "react";
import ModalContext from "../ModalStateContext";

export default function cart(){
    const contextObject = useContext(CartItemsContext); 
    const contextObject1 = useContext(ModalContext); 
    let totalPrice = 0;
    function increase(x){
      contextObject.countIncrease(x);
    }
    function decrease(x){
      contextObject.countDecrease(x);
    }
  return (
    <>
    {contextObject.items.length > 0  &&
     <Modal open={contextObject1.ModalOpen} childtype={"cart"}>
        
        <div className="cart">
          <h2>Your Cart</h2>
          <ul key={Math.random()}>
            {
              
            contextObject.items.map((i,id) => {
              totalPrice = (totalPrice + (i.count*i.price))
              return(
                <li key={id} className="cart-item">{`${i.item}-${i.count}×${i.price}`}
                
              <div className="cart-item-actions">
              <button onClick={()=>decrease(i.item)}>-</button>
              {i.count}
              <button onClick={()=>increase(i.item)}>+</button>
              </div>
              </li>
              );
            })}
          </ul>
          <p className="cart-total">${totalPrice}</p>
        </div> 
        
     </Modal>
     
    }
    </>
  );
}