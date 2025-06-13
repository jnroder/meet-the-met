import { useLoaderData, Link } from "react-router";

function App() {
  const sampleObject = useLoaderData();

  return (
    <div className="App">
      <h1 className="text-4xl text-center font-bold py-4">
        Met Museum Object Viewer
      </h1>
      <p className="text-center text-lg">
        Explore the vast collection of the{" "}
        <Link to="https://www.metmuseum.org/" target="_blank">
          Metropolitan Museum of Art
        </Link>{" "}
        by visiting the <Link to="/gallery">Gallery</Link> or by searching for
        specific works like the{" "}
        <Link to={`/object/${sampleObject.objectID}`}>
          {sampleObject.title}
        </Link>
        .
      </p>
    </div>
  );
}

export default App;
