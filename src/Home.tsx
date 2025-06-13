import { Link, useLoaderData } from "react-router";

const Home = () => {
  const sampleObject = useLoaderData();

  return (
    <>
      <h1 className="text-4xl text-center font-bold py-4">
        Met Museum Object Viewer
      </h1>
      <p className="max-w-4xl text-center mx-auto text-lg">
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
    </>
  );
};

export default Home;
