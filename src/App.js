import Header from "./Components/Header/header";
import Box from "./Components/Posts/box";
import "./App.scss";
import Footer from "./Components/Footer/Footer";
import PrayerTable from "./Components/PrayerTable";
import Background from "./Background";
import Compass from "./Components/Compass/Compass";

function App() {
  return (
    <div className="compass-comp">
      <Compass />
      <Background />
    </div>
  );
}

export default App;
