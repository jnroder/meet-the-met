import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getObjectById, getObjectList } from "./lib/metmuseum";
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
      const objectList = await getObjectList(); // this will usually be cached in localStorage
      const promises = [];

      for (
        let i = startIndex;
        i < objectList.total && promises.length < pageSize; // ensure we don't exceed pageSize or the total number of objects from the API
        i++
      ) {
        const objectId = objectList.objectIDs[i - 1]; // object IDs from the API aren't exactly sequential, so we need to get them from its manifest (objectList) by index
        promises.push(getObjectById(objectId));
      }

      // wait for all promises to resolve
      const results = await Promise.all(promises);
      setObjects(results);
    };

    fetchData();
  }, [startIndex, pageSize]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl text-center font-bold py-4">Gallery View</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {objects.map((object) => (
          <div
            key={object.objectID}
            className="flex flex-col justify-between border rounded"
          >
            {object.primaryImage ? (
              <img
                src={object.primaryImage}
                alt={object.title}
                className="w-full h-auto mb-2"
              />
            ) : (
              <div className="bg-gray-200 h-48 flex items-center justify-center mb-2">
                <span className="text-gray-500">No Image Available</span>
              </div>
            )}
            <div className="p-4 flex flex-col flex-grow">
              <Link to={`/object/${object.objectID}`} className="mb-4">
                <h3 className="text-xl font-semibold">{object.title}</h3>
              </Link>
              <div>
                <p>Artist: {object.artistDisplayName || "unknown"}</p>
                <p>Department: {object.department}</p>
                <p>Date: {object.objectDate}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setStartIndex((prev) => Math.max(prev - pageSize, 1))}
          disabled={startIndex === 1}
        >
          Previous
        </button>
        <button onClick={() => setStartIndex((prev) => prev + pageSize)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Gallery;
