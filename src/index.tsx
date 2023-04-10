import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { defineCustomElements } from "@ionic/pwa-elements/loader";

import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

/* React Query */
import queryClient from "./libs/react-query";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "./redux/store";
import persistStore from "redux-persist/es/persistStore";

let persistor = persistStore(store);
const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

defineCustomElements(window);
serviceWorkerRegistration.register();
reportWebVitals();