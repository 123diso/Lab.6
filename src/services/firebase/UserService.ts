import { collection, getDocs } from "firebase/firestore";
import { userType } from "../../Utills/Types";
import { db } from "./FirebaseConfig";

export async function fetchUsers():Promise<userType[]> {
    const userRef = collection(db, "users");
    const snapshot = await getDocs(userRef);
    const users: userType[] = snapshot.docs.map(doc=>{
        const data = doc.data();
        return{
            ...data,
            id: doc.id,
            username: data.username || "unknown"
        }
    })

    return users;
}