import {useState, useEffect } from "react";
import { useContext } from "react";
import CartItemsContext from "../cartitemsContext";// will retuen default value without namely import.
export default function Meals() {
    const [loading,setLoading] = useState(true);
    //context
    const contextObject = useContext(CartItemsContext);
    //this will return an object with 2 functions and state value to const contextObject.
    function addToCart(x,p){
      contextObject.addItem(x,p);//additem function is in cartitemsContext.jsx 
      console.log("in meals",contextObject.items);
    }

    const [mealData,setMealdata] = useState([]);
    useEffect(() => {
        async function fetchMeals() {
            try {
                const response = await fetch("http://localhost:3000/meals");
                if (!response.ok) {
                    throw new Error("Can't Fetch Data");
                } else {
                    const resData = await response.json();
                    // store the resdata  in the state other wise it wont be diplyed on interface.
                    //Asd u know when u want to make change in interface u need state.
                    {resData && setLoading(false);}
                    setMealdata(resData);
                }
            } catch (error) {
                console.error(error);
            }
        }

        // Call the fetchMeals function
        fetchMeals();
    }, []);

   //get the meals data from state and use map on it!
    return( 
        <>
        {loading && (
  <h1 id="loading">
    LOADING...
</h1>
)}
    <ul id="meals" >
        {
        mealData.map((mObject) => (
            
           
            <li className="meal-item" key={mObject.id}>
               {/* we are local host thing because, we are accesing images from from backend public\images folder. */}
                <img  src={`http://localhost:3000/${mObject.image}`} alt={mObject.name} />
                  <div >
                   <h3>{mObject.name}</h3>
                    <p className="meal-item-price">{mObject.price}</p>
                    <p className="meal-item-description">
                    {mObject.description}  
                    </p>
                    </div>
                    <button className="button" onClick={()=>addToCart(mObject.name,mObject.price)}>Add To Cart</button>
                    <br/>       
            </li> ))
        }
    </ul>
    </>
    );
    }