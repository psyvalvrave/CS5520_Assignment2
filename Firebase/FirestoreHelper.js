import { collection, setDoc, doc, deleteDoc, updateDoc  } from "firebase/firestore"; 
import { database } from "./FirebaseSetup";

export async function editActivity(collectionName, data) {
  try {
      // Ensure `id` is not included in the data object saved to Firestore
      const { id, ...dataWithoutId } = data;

      // Clean data to remove any undefined values
      const cleanData = Object.fromEntries(Object.entries(dataWithoutId).filter(([_, v]) => v !== undefined));

      let docRef;
      if (id) {
          docRef = doc(database, collectionName, id);
      } else {
          // If no ID is provided, let Firestore auto-generate one
          docRef = doc(collection(database, collectionName));
      }

      await setDoc(docRef, cleanData, { merge: true });
  } catch (err) {
      console.error("Error editing activity:", err);
  }
}
