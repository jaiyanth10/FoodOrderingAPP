import Modal from "./Modal";
import { useContext,useState } from "react";
import ModalContext from "../ModalStateContext";
import CartItemsContext from "../cartitemsContext";
export default function Checkout() {
    const contextObject = useContext(ModalContext);
    const contextObject1 = useContext(CartItemsContext);
    //const [Corder,setCorder]= useState({ items: "", customer: ""});
    async function sendOrder(data) {
        try {
          const response = await fetch("http://localhost:3000/orders", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            // merging both cart and customer details
            body: JSON.stringify({ order:{ items: contextObject1.items, customer: data}  })
          });
      
          if (!response.ok) {
            throw new Error("Failed to create order.");
          }
      
          const resData = await response.json();
          return resData.message;
        } catch (error) {
          console.error("Error sending order:", error);
          throw error;
        }
      }
      

    function handleForm(event){//onSubmit 
        event.preventDefault();
        // Browser provided functions and methods FormData,Object,getAll,get,fromEntries,entires
        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries());
        sendOrder(data);
        contextObject.updatesuccessOpen(true);
    }
    return (
        <Modal open={contextObject.checkoutOpen} childtype={"checkout"}>
            <form className="control" onSubmit={handleForm}>
                <h2>Checkout</h2>
                <label htmlFor="FN">Full Name</label>
                <input type="text" placeholder="Monkey D. Luffy" id="FN" required name="name"/>{/*Remember input elements should be selfclosing */}
                <label htmlFor="EA">E-Mail Address</label>
                <input type="email" placeholder="luffy@mugiwara.onepiece" id="EA" required name="email"/>
                <label htmlFor="STREET">Street</label>
                <input type="text" placeholder="LaughTale, LI." id="STREET" required name="street"/>
                <br/>
                <div className="control-row">
                    <div>
                        <label htmlFor="PC">Postal code</label>
                        <input type="number" placeholder="1071" id="PC" required name="postal-code"/>
                    </div>
                    <div>
                        <label htmlFor="CITY">City</label>
                        <input type="text" placeholder="eggHead" id="CITY" required name="city"/>
                    </div>
                </div>
                <button type="submit" className='button'>Submit Order</button>
            </form>
        </Modal>
    );
}
