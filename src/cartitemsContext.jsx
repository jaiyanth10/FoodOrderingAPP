import { createContext, useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { UserAuth } from "./AuthContext";
// Create the context object
const CartItemsContext = createContext({
  items: [],
  addItem: (x) => {},
  removeItem: (x) => {},
  countDecrease: (x) => {},
  countIncrease: (x) => {},
  setItems: (x) => {},
});

// Export the provider function
export function CartItemsContextProvider({ children }) {
  const [items, setItems] = useState([]);
  const { user } = UserAuth();
  //useEffect foe initializing state with firebase value only it it has values
  useEffect(() => {
    async function fetchCartData() {
      if (user) {
        //checking if user is login using auth form AuthContext.jsx
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          //this will only exist if the user added some items in previous login or it will exist but empty array will there
          const userData = docSnap.data();
          if (userData.cart) {
            setItems(userData.cart);
          }
        }
      }
    }
    fetchCartData();
  }, [user]);

  // useEffect to Update Firestore whenever the cart state changes, means for every below function(inc,dec,add,rem)
  useEffect(() => {
    const updateCartData = async () => {
      if (user) {
        const docRef = doc(db, "users", user.uid);

        try {
          await updateDoc(docRef, {
            cart: items,
          });
        } catch (error) {
          console.error("Error updating cart items: ", error);
        }
      }
    };

    if (user) {
      updateCartData();
    }
  }, [items, user]);

  //always update state like this insted of directly changing in state
  function countIncrease(x) {
    const updatedItems = items.map((item) => {
      if (item.item === x) {
        return {
          ...item,
          count: item.count + 1,
        };
      } else {
        return item;
      }
    });

    setItems(updatedItems);
  }

  function countDecrease(x) {
    const updatedItems = items.map((item) => {
      if (item.item === x && item.count > 0) {
        return {
          ...item,
          count: item.count - 1,
        };
      } else {
        return item;
      }
    });

    setItems(updatedItems);
  }

  function addItem(x, p) {
    let isItemInCart = false;
    const updatedItems = items.map((item) => {
      if (item.item === x) {
        isItemInCart = true;
        return { ...item, count: item.count + 1 }; // Increment the count
      }
      return item;
    });

    if (isItemInCart) {
      setItems(updatedItems);
    }

    // If the item is not in the cart, add it
    if (!isItemInCart) {
      setItems((prev) => [
        ...prev,
        {
          item: x,
          count: 1,
          price: p,
        },
      ]);
    }
  }

  function removeItem(x) {
    // Check if the item is already in the cart
    for (let i = 0; i < items.length; i++) {
      if (items[i].item === x) {
        if (items[i].count > 1) {
          items[i].count--;
        } else {
          setItems((prevItems) => prevItems.filter((item) => item.item !== x));
        }
        break;
      }
    }
  }

  return (
    <CartItemsContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        countDecrease,
        countIncrease,
        setItems,
      }}
    >
      {children}
      {/*wrapping children with {} becasue when we wrap the components with provider function
 whole component with both jsx and js code will be returned. */}
    </CartItemsContext.Provider>
  );
}

// Export the context object by default, just import like :import somename "../cartitemsContext"; and u can access this.
export default CartItemsContext;

//HI jai, I made this on my own. so I will give u some tips.
//1. use this context API to avoid prop-drilling.
//2. create all the functions and the state vale in the seperate jsx file like this using context and (useState or reducer).
//3. I used useSate here u can also use reduce,Trust me its also easy u can see example in doubt solver or udemy 270 and 271.
//4.here u need to intialize context objects with data and functions(but dummy) what u gonna return. u will over ride them using
//value={} in context.provider tag in the last lines of code with actual data and functions.
//5.U need to export both object and component function because u need object to access the functins u returned in the wrapped components and
// component function for wrapping.
//For accesing this provider values u will use useContext tag in wrapped components go see the App.js to know How I wrapped
//and meals.jsx and cart.jsx for usage of this returned functions.
