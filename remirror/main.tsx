import { createRoot } from "react-dom/client";
import "./global.css";

// Related Remirror Versions
import App from "./MarkdownStyled/RemirrorEditor";

createRoot(document.getElementById("root")!).render(<App />);
