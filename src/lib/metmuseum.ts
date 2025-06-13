const API_BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1";
import type { MetMuseumObject } from "../types/metObjectTypes";

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

export { getObjectById, getObjectFromStorage, addObjectToStorage };
