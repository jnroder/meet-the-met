import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getObjectById } from "./lib/metmuseum";
import type { MetMuseumObject } from "./types/metObjectTypes";

interface GalleryProps {
  pageSize?: number;
  initialStartIndex?: number;
}

const Gallery = ({ pageSize = 12, initialStartIndex = 1 }: GalleryProps) => {
  const [objects, setObjects] = useState<MetMuseumObject[]>([]);
  const [startIndex, setStartIndex] = useState(initialStartIndex);

  useEffect(() => {
    const fetchData = async () => {
      const promises = [];

      // create promises for all object IDs in the range
      for (let i = startIndex; i < startIndex + pageSize; i++) {
        promises.push(getObjectById(i));
      }

      // wait for all promises to resolve
      const results = await Promise.all(promises);
      setObjects(results);
    };

    fetchData();
  }, [startIndex, pageSize]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-4xl text-center font-bold py-4">
        Met Museum Object Gallery
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {objects.map((object) => (
          <div key={object.objectID} className="border p-4 rounded">
            <Link to={`/object/${object.objectID}`}>
              <h3 className="text-xl font-semibold">{object.title}</h3>
              <p>Artist: {object.artistDisplayName || "unknown"}</p>
              <p>Department: {object.department}</p>
              <p>Date: {object.objectDate}</p>
            </Link>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setStartIndex((prev) => Math.max(prev - pageSize, 1))}
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={startIndex === 1}
        >
          Previous
        </button>
        <button
          onClick={() => setStartIndex((prev) => prev + pageSize)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Gallery;
