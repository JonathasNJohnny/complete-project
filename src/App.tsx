import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Q1RemoveDups } from "./pages/Q1RemoveDups";
import { Q2CountFreqWords } from "./pages/Q2CountFreqWords";
import { Q3TreatDates } from "./pages/Q3TreatDates";
import { MainPage } from "./pages/MainPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage />,
    },
    {
      path: "/removeDups",
      element: <Q1RemoveDups />,
    },
    {
      path: "/countFreqWords",
      element: <Q2CountFreqWords />,
    },
    {
      path: "/treatDates",
      element: <Q3TreatDates />,
    },
  ]);

  return (
    <>
      <div>
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
