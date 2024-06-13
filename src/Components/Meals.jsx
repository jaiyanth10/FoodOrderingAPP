import { useState, useEffect, useContext, useRef } from "react";
import CartItemsContext from "../cartitemsContext";

const mealDescriptions = {
  corba: [
    "A warm, traditional soup enjoyed in Turkey.",
    [15, 16, 17, 18, 19, 20],
  ],
  sushi: [
    "A Japanese dish consisting of vinegar-seasoned rice and seafood.",
    [15, 16, 17, 18, 19, 20],
  ],
  burek: [
    "A baked or fried filled pastry popular in the Balkans.",
    [15, 16, 17, 18, 19, 20],
  ],
  bistek: [
    "A traditional Filipino beef steak marinated in soy sauce and calamansi.",
    [15, 16, 17, 18, 19, 20],
  ],
  tamiya: [
    "An Egyptian version of falafel made with fava beans.",
    [15, 16, 17, 18, 19, 20],
  ],
  kumpir: [
    "A Turkish street food made of baked potatoes with various fillings.",
    [15, 16, 17, 18, 19, 20],
  ],
  wontons: [
    "Chinese dumplings filled with meat or vegetables.",
    [15, 16, 17, 18, 19, 20],
  ],
  lasagne: [
    "An Italian pasta dish made with layers of pasta, sauce, and cheese.",
    [15, 16, 17, 18, 19, 20],
  ],
  kafteji: [
    "A Tunisian dish of fried vegetables mixed together.",
    [15, 16, 17, 18, 19, 20],
  ],
  bigmac: [
    "A famous double-decker hamburger from McDonald's.",
    [15, 16, 17, 18, 19, 20],
  ],
  poutine: [
    "A Canadian dish of fries topped with cheese curds and gravy.",
    [15, 16, 17, 18, 19, 20],
  ],
  koshari: [
    "A popular Egyptian street food made with rice, pasta, and lentils.",
    [15, 16, 17, 18, 19, 20],
  ],
  dalfry: [
    "An Indian dish made with lentils and spices.",
    [15, 16, 17, 18, 19, 20],
  ],
  timbits: [
    "Small doughnut holes from Tim Hortons, a Canadian chain.",
    [15, 16, 17, 18, 19, 20],
  ],
  pancakes: [
    "A flat, round breakfast dish made from a batter and cooked on a griddle.",
    [15, 16, 17, 18, 19, 20],
  ],
  kapsalon: [
    "A Dutch fast food dish consisting of fries topped with meat, cheese, and salad.",
    [15, 16, 17, 18, 19, 20],
  ],
  fishpie: [
    "Steamed fish and shrimp served with alfredo sauce and beans.",
    [15, 16, 17, 18, 19, 20],
  ],
  flamiche: [
    "A type of tart or pie from Northern France.",
    [15, 16, 17, 18, 19, 20],
  ],
  shawarma: [
    "Middle Eastern dish of meat cooked on a vertical rotisserie.",
    [15, 16, 17, 18, 19, 20],
  ],
  kedgeree: [
    "A British-Indian dish of flaked fish, rice, and eggs.",
    [15, 16, 17, 18, 19, 20],
  ],
  stamppot: [
    "A seafood boil often featuring shrimp, crab, and corn.",
    [15, 16, 17, 18, 19, 20],
  ],
  moussaka: [
    "A Greek dish made with layers of eggplant, ground meat, and béchamel sauce.",
    [15, 16, 17, 18, 19, 20],
  ],
  shakshuka: [
    "A North African and Middle Eastern dish of poached eggs in a spicy tomato sauce.",
    [15, 16, 17, 18, 19, 20],
  ],
  sugarpie: [
    "A traditional Canadian dessert made with a flaky crust and a sweet filling.",
    [15, 16, 17, 18, 19, 20],
  ],
  ribollita: [
    "A Tuscan soup made with bread and vegetables.",
    [15, 16, 17, 18, 19, 20],
  ],
};

export default function Meals() {
  const [loading, setLoading] = useState(true);
  const [realMealData, setRealMealData] = useState([]);
  const [mealData, setMealData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1); //for pagination effect
  const [itemsPerPage] = useState(6); // Number of items per page
  const contextObject = useContext(CartItemsContext);
  const ddRef = useRef(null);

  function addToCart(name, price) {
    contextObject.addItem(name, price);
    console.log("in meals", contextObject.items);
  }

  

  async function fetchMeals() {
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/search.php?s="
      );
      if (!response.ok) {
        throw new Error("Can't Fetch Data");
      } else {
        const resData = await response.json();
        setMealData(resData.meals || []);
        setRealMealData(resData.meals || []);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMeals();
  }, []);

  function ddHandler() {
    filterMeals(ddRef.current.value.toLowerCase().trim(), searchTerm);
  }

  function searchHandler(event) {
    setSearchTerm(event.target.value.toLowerCase());
    filterMeals(
      ddRef.current.value.toLowerCase().trim(),
      event.target.value.toLowerCase()
    );
  }

  function filterMeals(category, searchTerm) {
    let filteredMealData = realMealData;

    if (category !== "" && category !== "category") {
      filteredMealData = filteredMealData.filter(
        (meal) => meal.strCategory.toLowerCase().trim() === category
      );
    }

    if (searchTerm !== "") {
      filteredMealData = filteredMealData.filter((meal) =>
        meal.strMeal.toLowerCase().includes(searchTerm)
      );
    }

    setMealData(filteredMealData);
    setCurrentPage(1); // Reset to first page on new filter
  }
  //logic for pagination
  const indexOfLastMeal = currentPage * itemsPerPage;
  const indexOfFirstMeal = indexOfLastMeal - itemsPerPage;
  const currentMeals = mealData.slice(indexOfFirstMeal, indexOfLastMeal);

  const totalPages = Math.ceil(mealData.length / itemsPerPage);

  function nextPage() {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }

  function prevPage() {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }

  return (
    <>
      <input
        type="text"
        placeholder="Search for meals"
        className="search-bar"
        value={searchTerm}
        onChange={searchHandler}
      />
      <select ref={ddRef} onChange={ddHandler}>
        <option value="">Category</option>
        <option value="Vegetarian">Vegetarian</option>
        <option value="Chicken">Chicken</option>
        <option value="Seafood">Seafood</option>
      </select>

      {loading && <h3 id="loading">Loading...</h3>}
      <ul id="meals">
        {currentMeals.map((mObject, id) => {
          const priceIndex =
            id %
            mealDescriptions[
              mObject.strMeal.toLowerCase().split(" ").join("")
            ][1].length;
          const price =
            mealDescriptions[
              mObject.strMeal.toLowerCase().split(" ").join("")
            ][1][priceIndex];
          const description =
            mealDescriptions[
              mObject.strMeal.toLowerCase().split(" ").join("")
            ][0];
          return (
            <li className="meal-item" key={id}>
              <img src={mObject.strMealThumb} alt={mObject.strMeal} />
              <div>
                <h3>{mObject.strMeal}</h3>
                <p className="meal-item-price">${price}</p>
                <p className="meal-item-description">{description}</p>
                <button
                  className="button"
                  onClick={() => addToCart(mObject.strMeal, price)}
                >
                  Add To Cart
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </>
  );
}
