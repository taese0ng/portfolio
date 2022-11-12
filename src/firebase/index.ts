// Import the functions you need from the SDKs you need
// import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { child, get, getDatabase, onValue, ref, set } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
const db = getDatabase(app);

// 데이터 한 번 읽기
export const getData = async (path: string) => {
  const db = getDatabase();
  const dbRef = ref(db);

  try {
    const snapshot = await get(child(dbRef, path));

    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);

    return false;
  }
};

// 데이터 수신 대기
export const getDataWithRealTime = async (path: string, callback: (data: unknown) => void) => {
  const db = getDatabase();

  const starCountRef = ref(db, path);
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();

    callback(data);
  });
};

// 지정된 참조에 데이터 덮어 쓰기
export const setData = (path: string, object: Record<string, unknown>) => {
  const db = getDatabase();

  set(ref(db, path), object);
};

export default db;
