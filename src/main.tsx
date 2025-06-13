import { createBrowserRouter, RouterProvider } from "react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { getObjectList, getObjectById } from "./lib/metmuseum";
import "./index.css";
import App from "./App.tsx";
import Home from "./Home.tsx";
import ObjectDetails from "./ObjectDetails.tsx";
import Gallery from "./Gallery.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        loader: async () => {
          const objectList = await getObjectList();
          const initialObjectId =
            objectList.objectIDs[Math.floor(Math.random() * objectList.total)];
          return getObjectById(initialObjectId);
        },
        element: <Home />,
      },
      {
        path: "/object",
        element: <ObjectDetails />,
      },
      {
        path: "/object/:id",
        loader: async ({ params }) => {
          const objectId = Number(params.id);
          if (isNaN(objectId) || objectId <= 0) {
            throw new Error("Invalid Object ID");
          }
          return getObjectById(objectId);
        },
        Component: ObjectDetails,
      },
      {
        path: "/gallery",
        element: <Gallery />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
