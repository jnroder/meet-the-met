import { createBrowserRouter, RouterProvider } from "react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Gallery from "./Gallery.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/object/:id",
    element: <App />,
    loader: async ({ params }) => {
      const objectId = params.id ? parseInt(params.id, 10) : null;
      if (objectId) {
        const { getObjectById } = await import("./lib/metmuseum");
        return getObjectById(objectId);
      }
    },
  },
  {
    path: "/gallery",
    element: <Gallery />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
