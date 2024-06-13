import React, { useContext, useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import Modal from "./Modal";
import ModalContext from "../ModalStateContext";
import CartItemsContext from "../cartitemsContext";
import { UserAuth } from "../AuthContext";
import { db } from "../firebase"; // Ensure you have this import to use Firestore

export default function Checkout() {
  const { user } = UserAuth();
  const contextObject = useContext(ModalContext);
  const contextObject1 = useContext(CartItemsContext);
  const [orderDetails, setOrderDetails] = useState([]);
  const now = new Date();
  const localeDate = now.toLocaleString();

  useEffect(() => {
    const updateOrderData = async () => {
      if (user) {
        const docRef = doc(db, "users", user.uid);

        try {
          await updateDoc(docRef, {
            orders: orderDetails,
          });
        } catch (error) {
          console.error("Error updating order details: ", error);
        }
      }
    };

    if (user) {
      updateOrderData();
    }
  }, [orderDetails, user]);

  function handleForm(event) {
    //onSubmit
    event.preventDefault();
    // Browser provided functions and methods FormData,Object,getAll,get,fromEntries,entires
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries()); //As of now not using the form data of checkout
    setOrderDetails([
      ...orderDetails,
      {
        items: contextObject1.items,
        date: localeDate,
        id: user.email.toString(),
      },
    ]);
    contextObject.updatesuccessOpen(true);
  }

  return (
    <Modal open={contextObject.checkoutOpen} childtype={"checkout"}>
      <form className="control" onSubmit={handleForm}>
        <h2>Checkout</h2>
        <label htmlFor="FN">Full Name</label>
        <input
          type="text"
          placeholder="Monkey D. Luffy"
          id="FN"
          required
          name="name"
        />
        {/*Remember input elements should be self-closing */}
        <label htmlFor="EA">E-Mail Address</label>
        <input
          type="email"
          placeholder="luffy@mugiwara.onepiece"
          id="EA"
          required
          name="email"
        />
        <label htmlFor="STREET">Street</label>
        <input
          type="text"
          placeholder="LaughTale, LI."
          id="STREET"
          required
          name="street"
        />
        <br />
        <div className="control-row">
          <div>
            <label htmlFor="PC">Postal code</label>
            <input
              type="number"
              placeholder="1071"
              id="PC"
              required
              name="postal-code"
            />
          </div>
          <div>
            <label htmlFor="CITY">City</label>
            <input
              type="text"
              placeholder="eggHead"
              id="CITY"
              required
              name="city"
            />
          </div>
        </div>
        <button type="submit" className="button">
          Submit Order
        </button>
      </form>
    </Modal>
  );
}
