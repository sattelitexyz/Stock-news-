import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

export async function addStock(userId, stock) {
  return addDoc(collection(db, "users", userId, "watchlist"), stock);
}

export async function getWatchlist(userId) {
  const snapshot = await getDocs(collection(db, "users", userId, "watchlist"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function deleteStock(userId, id) {
  return deleteDoc(doc(db, "users", userId, "watchlist", id));
}