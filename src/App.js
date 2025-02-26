import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CircleAnimation from "./CircleAnimation";
import CanvasAnimation from "./DiamonAnimation";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/circle" element={<CircleAnimation />} />
                <Route path="/diamon" element={<CanvasAnimation />} />
            </Routes>
        </Router>
    );
}

export default App;
