import { registerSW } from "virtual:pwa-register";
import { render } from "preact";
import { App } from "./app";
import "./index.css";

registerSW({ immediate: true });

render(<App />, document.getElementById("app"));
