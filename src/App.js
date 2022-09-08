import "./App.css";
import MapsMath from "./components/MapsMath";
function App() {

  const degrees_to_radians = (degrees) => {
    var pi = Math.PI;
    return degrees * (pi / 180);
  };
  const radians_to_degrees = (radians) => {
    var pi = Math.PI;
    return radians * (180 / pi);
  };
  
  return (
    <div className="App">
      <MapsMath degToRad={degrees_to_radians} radToDeg={radians_to_degrees} />
    </div>
  );
}

export default App;
