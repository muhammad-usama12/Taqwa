import Header from "./Components/Header/header";
import Box from "./Components/Posts/box";
import "./App.scss";
import Footer from "./Components/Footer/Footer";
import PrayerTable from "./Components/PrayerTable";

function App() {
  return (
    <>
      <Header />
      <br></br>
      <div className="components">
        <PrayerTable />
        <br></br>
        <Box />
      </div>
      <Footer />
    </>
  );
}

export default App;
