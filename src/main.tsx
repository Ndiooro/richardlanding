
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import logoImage from "./imports/logo.png";
  import "./styles/index.css";

  const favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]') ?? document.createElement("link");
  favicon.rel = "icon";
  favicon.type = "image/png";
  favicon.href = logoImage;
  document.head.appendChild(favicon);

  createRoot(document.getElementById("root")!).render(<App />);
  