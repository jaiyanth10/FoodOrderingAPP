import { useContext, useEffect, useState } from "react";
import { UserAuth } from "../AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import Modal from "./Modal";
import ModalContext from "../ModalStateContext";

export default function UserOrders() {
  const { user } = UserAuth();
  const [orders, setOrders] = useState([]);
  const contextObject1 = useContext(ModalContext);

  useEffect(() => {
    async function fetchOrderData() {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          if (userData.orders) {
            setOrders(userData.orders);
          }
          console.log('success');
        } else {
          console.log("No such document!");
        }
      }
    }
    
    if (contextObject1.ordersOpen) {
      fetchOrderData();
    }
  }, [contextObject1.ordersOpen, user]);

  const filteredOrders = orders.filter((order) => order.id === user?.email);
  console.log(filteredOrders);

  return (
    <>
      <style>
        {`
          .container {
            padding: 20px;
            max-height: 400px; /* Adjust the height as needed */
            overflow-y: auto; /* Enable vertical scrolling */
          }

          .heading {
            font-size: 24px;
            margin-bottom: 20px;
          }

          .orderCard {
            border: 1px solid #ccc;
            padding: 10px;
            margin-bottom: 10px;
          }

          .orderId {
            font-size: 20px;
          }

          .orderDate {
            font-size: 16px;
          }

          .itemsHeading {
            font-size: 18px;
            margin-top: 10px;
          }

          .itemsList {
            list-style-type: none;
            padding: 0;
          }

          .item {
            font-size: 16px;
            display: flex;
            justify-content: space-between;
          }

          .noOrders {
            font-size: 16px;
            color: red;
          }

          .totalPrice {
            font-size: 18px;
            font-weight: bold;
            margin-top: 10px;
            text-align: right;
          }
        `}
      </style>
      <Modal open={contextObject1.ordersOpen} childtype={"orders"}>
        <div className="container">
          <h1 className="heading">Orders</h1>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order, index) => {
              const totalPrice = order.items.reduce((total, item) => total + item.count * item.price, 0);
              return (
                <div key={index} className="orderCard">
                  <h2 className="orderId">Order No: {index + 1}</h2>
                  <p className="orderDate">Date: {order.date}</p>
                  <h3 className="itemsHeading">Items:</h3>
                  <ul className="itemsList">
                    {order.items.map((item, idx) => (
                      <li key={idx} className="item">
                        <span>{item.item}</span>
                        <span>{item.count} x ${item.price.toFixed(2)}</span>
                        <span>${(item.count * item.price).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="totalPrice">Total: ${totalPrice.toFixed(2)}</p>
                </div>
              );
            })
          ) : (
            <p className="noOrders">No orders found</p>
          )}
        </div>
      </Modal>
    </>
  );
}
