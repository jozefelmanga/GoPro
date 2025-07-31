import "./App.css";
import ProtectedGest from "./guard/ProtectedGest";
import ProtectedAdmin from "./guard/ProtectedAdmin";
import ProtectedUser from "./guard/ProtectedUser";
import Gestionnaire from "./views/Gestionnaire";
import Login from "./views/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NotFound from "./views/NotFound";
import Admin from "./views/Admin";
import User from "./views/User";

function App() {
 
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/welcome" element={<Login />} />
          <Route
            path="/manager"
            element={
              <ProtectedGest>
                <Gestionnaire />
              </ProtectedGest>
            }
          />
           <Route
            path="/admin"
            element={
              <ProtectedAdmin>
                <Admin />
              </ProtectedAdmin>
            }
          />
           <Route
            path="/GoPro"
            element={
              <ProtectedUser>
                <User />
              </ProtectedUser>
            }
          />
          <Route path="/NotFound" element={<NotFound />} />
          <Route path="/*" element={<Navigate to="/NotFound" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
