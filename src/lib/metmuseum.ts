const API_BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1";
import type {
  MetMuseumObjectsList,
  MetMuseumObject,
} from "../types/metObjectTypes";

function getObjectList(): Promise<MetMuseumObjectsList> {
  if (localStorage.getItem("metObjectsList")) {
    return Promise.resolve(
      JSON.parse(localStorage.getItem("metObjectsList") || "{}")
    );
  }

  return fetch(`${API_BASE_URL}/objects`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error fetching objects: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data: MetMuseumObjectsList) => {
      localStorage.setItem("metObjectsList", JSON.stringify(data));
      return data;
    });
}

function getObjectFromStorage(objId: number): MetMuseumObject | undefined {
  const storedObjects = JSON.parse(localStorage.getItem("metObjects") || "[]");
  return storedObjects.find((obj: MetMuseumObject) => obj.objectID === objId);
}

function addObjectToStorage(object: MetMuseumObject): void {
  const storedObjects = JSON.parse(localStorage.getItem("metObjects") || "[]");
  if (
    !storedObjects.some(
      (obj: MetMuseumObject) => obj.objectID === object.objectID
    )
  ) {
    storedObjects.push(object);
    localStorage.setItem("metObjects", JSON.stringify(storedObjects));
  }
}

function getObjectById(objId: number): Promise<MetMuseumObject> {
  let object = getObjectFromStorage(objId);
  if (object) {
    return Promise.resolve(object);
  }

  return fetch(`${API_BASE_URL}/objects/${objId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Error fetching object with ID ${objId}: ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((data: MetMuseumObject) => {
      addObjectToStorage(data);
      return data;
    });
}

function getObjectByTitle(objTitle: string): Promise<MetMuseumObject> {
  const storedObjects = JSON.parse(localStorage.getItem("metObjects") || "[]");
  const object = storedObjects.find(
    (obj: MetMuseumObject) => obj.title === objTitle
  );
  if (object) {
    return Promise.resolve(object);
  }

  return fetch(
    `${API_BASE_URL}/search?q=${encodeURIComponent(objTitle)}&title=1`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Error fetching object with title "${objTitle}": ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((data: { objectIDs: number[] }) => {
      if (data.objectIDs?.length === 0) {
        throw new Error(`No objects found with title "${objTitle}"`);
      }
      return getObjectById(data.objectIDs[0]);
    });
}

export {
  getObjectList,
  getObjectById,
  getObjectByTitle,
  getObjectFromStorage,
  addObjectToStorage,
};
