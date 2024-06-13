import { CartItemsContextProvider } from "./cartitemsContext";
import { ModalStateContext } from "./ModalStateContext";
import { AuthContextProvider } from "./AuthContext";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import ProtectedRoute from "./Components/protectedRoute";

function App() {
  return (
    <AuthContextProvider>
      <ModalStateContext>
        <CartItemsContextProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
          </Routes>
        </CartItemsContextProvider>
      </ModalStateContext>
    </AuthContextProvider>
  );
}

export default App;
