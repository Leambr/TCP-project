import ReactDOM from "react-dom/client";
import App from "./App";
import "./design-system/styles/variables/typography.css";
import "./design-system/styles/variables/colors.css";
import "./design-system/styles/variables/spaces.css";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <Router>
        <App />
    </Router>
);
