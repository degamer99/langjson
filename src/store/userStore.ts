// src/store/useUserStore.ts
"use client"

import { create } from "zustand"
import {
  initializeApp,
  getApps,
} from "firebase/app"
import {
  getAuth,
  onAuthStateChanged,
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as fbSignOut,
} from "firebase/auth"
import {
  getFirestore,
  setDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore"

// ——— 1) Firebase initialization ———
const firebaseConfig = {
  apiKey:   process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId:  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID! 
}

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)
const auth = getAuth(app)
export const db = getFirestore(app)

// ——— 2) Zustand store ———
interface UserState {
  user: User | null
  admin: boolean
  loading: boolean

  signUp: (email: string, pw: string) => Promise<UserCredential>
  signIn: (email: string, pw: string) => Promise<UserCredential>
  signInWithGoogle: () => Promise<UserCredential>
  signOut: () => Promise<void>
}

export const useUserStore = create<UserState>((set) => {
  // a) Listen to auth changes (only in the browser)
  if (typeof window !== "undefined") {
    onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        const token = await fbUser.getIdTokenResult(true)
        set({
          user: fbUser,
          admin: !!token.claims.admin,
          loading: false,
        })
      } else {
        set({ user: null, admin: false, loading: false })
      }
    })
  }

  // b) Return initial state + actions
  return {
    user: null,
    admin: false,
    loading: true,

    // 1️⃣ Email/password sign-up
    signUp: (email, pw) =>
      createUserWithEmailAndPassword(auth, email, pw).then(async (cred) => {
        await setDoc(doc(db, "profiles", cred.user.uid), {
          email,
          createdAt: serverTimestamp(),
        })
        return cred
      }),

    // 2️⃣ Email/password sign-in
    signIn: (email, pw) =>
      signInWithEmailAndPassword(auth, email, pw),

    // 3️⃣ Google popup sign-in
    signInWithGoogle: () => {
      const provider = new GoogleAuthProvider()
      return signInWithPopup(auth, provider)
    },

    // 4️⃣ Sign-out
    signOut: () => fbSignOut(auth),
  }
})
