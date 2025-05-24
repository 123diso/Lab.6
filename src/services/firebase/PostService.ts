import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { PostType } from "../../Utills/Types";
import {db} from "./FirebaseConfig"

export async function getPostByuserId (userId:string): Promise<PostType[]> {
    const PostRef = collection(db,"posts");
    const q = query(PostRef, where("userId","==",userId))
    const snapshot = await getDocs (q);
    const posts: PostType[] = snapshot.docs.map(doc =>{
        const data = doc.data()
        return{
            ...data,
            id: doc.id,
            content: data.content || "no content",
            userId: data.userId || userId,
            createdAt:data.createdAt?.toDate().toISOString()|| "No date"
        }
    })
    return posts
}

export async function addpost (post:PostType):Promise<string|null>{
    try {
        const PostRef = collection(db,"posts");
        const docRef = await addDoc(PostRef,{
            userId: post.userId,
            content: post.content,
            createdAt: new Date()
        })
        return docRef.id
    } catch (error) {
        console.error('error en agregar post', error)
        return null
    }
    
}