import { getFirestore, addDoc, collection } from 'firebase/firestore';
import './firebase'

function App() {

  const db = getFirestore();

  const addDataToFirebase = async () => {
    try {
      const yourCollectionRef = collection(db, "Users");
      const dataToAdd = {
        key1: "ok",
        key2: "bois",
      };

      const docRed = await addDoc(yourCollectionRef, dataToAdd);
      console.log("Data Added Successfully ");
    } catch (error) {
      console.error("Error Adding the Data :", error.message);
    }
  };

  return (
    <div>
      <button onClick={addDataToFirebase}>Add Data to the Firestore</button>
    </div>
  );
}

export default App;
