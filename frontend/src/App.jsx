import { BrowserRouter } from "react-router-dom";
import Routes from "./routers";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* toàn bộ router sẽ được đẩy vào app */}
        <Routes />
      </div>
    </BrowserRouter>
  );
}

export default App;
