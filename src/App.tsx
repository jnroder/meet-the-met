import { useEffect, useState } from "react";
import { getObjectById } from "./lib/metmuseum";
import type { MetMuseumObject } from "./types/metObjectTypes";

function App() {
  const [objectId, setObjectId] = useState<number | null>(null);
  const [object, setObject] = useState<MetMuseumObject | null>(null);

  useEffect(() => {
    if (objectId) {
      getObjectById(objectId).then((data) => {
        setObject(data);
      });
    }
  }, [objectId]);

  return (
    <div className="App max-w-4xl mx-auto p-4">
      <h1 className="text-4xl text-center font-bold py-4">
        Met Museum Object Viewer
      </h1>

      <hr className="my-4" />

      {/* ------------------- Object filters ------------------- */}
      <label
        htmlFor="objectId"
        className="block text-md font-medium text-gray-100"
      >
        Object ID
      </label>
      <input
        id="objectId"
        type="number"
        placeholder="Enter Object ID"
        value={objectId || ""}
        onChange={(e) => setObjectId(Number(e.target.value))}
        className="border p-2 rounded mb-4"
        min="1"
      />

      <hr className="my-4" />

      {/* ------------------- Object details ------------------- */}
      {object ? (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl">{object.title}</h2>
              <p>
                Artist:{" "}
                <span className="italic">
                  {object.artistDisplayName || "unknown"}
                </span>
              </p>
            </div>
            <div>
              <p>Department: {object.department}</p>
              <p>{object.objectDate}</p>
            </div>
          </div>
          <img className="p-6" src={object.primaryImage} alt={object.title} />
        </div>
      ) : (
        <p>No object found.</p>
      )}
    </div>
  );
}

export default App;
