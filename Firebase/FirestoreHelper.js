import { collection, setDoc, doc, deleteDoc, updateDoc  } from "firebase/firestore"; 
import { database } from "./FirebaseSetup";

export async function editActivity(collectionName, data) {
  try {
      let docRef;
      if (data.id) {
          // If an ID is provided, use it to construct the document reference
          docRef = doc(database, collectionName, data.id);
      } else {
          // If no ID is provided, let Firestore auto-generate one
          docRef = doc(collection(database, collectionName)); // Firestore auto-generates an ID
      }

      await setDoc(docRef, data, { merge: true });
  } catch (err) {
      console.error("Error editing activity:", err);
  }
}

export async function deleteActivity(collectionName, data) {
  try {
      if (id) {
          const docRef = doc(database, collectionName, data.id);
          await deleteDoc(docRef);  
      } else {
          console.error("No ID provided, cannot delete the document.");
      }
  } catch (err) {
      console.error("Error deleting activity:", err);
  }
}
