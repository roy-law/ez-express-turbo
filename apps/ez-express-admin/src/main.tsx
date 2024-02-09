import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";
import { SplitFactoryProvider } from "@splitsoftware/splitio-react";

const config: SplitIO.IBrowserSettings = {
  core: {
    authorizationKey: "348ifaostgaqc9esq6gkd4bkbkc492n9co3e",
    key: "ez-admin@ca",
  },
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <SplitFactoryProvider config={config} updateOnSdkTimedout>
    <App />
  </SplitFactoryProvider>,
);
