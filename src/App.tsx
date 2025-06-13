import { Link, Outlet } from "react-router";

function App() {
  return (
    <>
      <div className="Navbar bg-gray-800 text-white p-4">
        <nav className="flex justify-between items-center max-w-6xl mx-auto">
          <Link to="/" className="text-2xl font-bold">
            Meet The Met
          </Link>
          <div className="space-x-4">
            <Link to="/gallery" className="hover:underline">
              Gallery
            </Link>
            <Link to="/object" className="hover:underline">
              Object Details
            </Link>
            <Link
              to="https://www.metmuseum.org/"
              target="_blank"
              className="hover:underline"
            >
              Met Museum
            </Link>
          </div>
        </nav>
      </div>
      <div className="App max-w-6xl mx-auto p-4">
        <Outlet />
      </div>
    </>
  );
}

export default App;
