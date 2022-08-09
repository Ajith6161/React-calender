import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes
} from "react-router-dom";
import "./App.css";
import Calendar from "./Pages/calendarPage";
import LoginPage from "./Pages/loginPage";
import FileUpload from "./Pages/tableView";
import Toolbar from "./components/Navbar/Navbar"

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>  
       
 
    <Router>
      <Switch>
        <Route exact path="/">
          <LoginPage />
        </Route>
        <Route exact path="/calendar">
          <Calendar />
        </Route>
        <Route exact path="/tableView">
         <FileUpload/>
        </Route>
      </Switch>
    </Router>
    </>
  );
}

export default App;
