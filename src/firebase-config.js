const config = {
  apiKey: "AIzaSyAE43ZeTws_H4AZsObhCJK1OZn7kVNvR0s",
  authDomain: "whereswaldo-9d066.firebaseapp.com",
  projectId: "whereswaldo-9d066",
  storageBucket: "whereswaldo-9d066.appspot.com",
  messagingSenderId: "136735507337",
  appId: "1:136735507337:web:5568dfe76489127cdad758",
};

export function getFirebaseConfig() {
  if (!config || !config.apiKey) {
    throw new Error(
      "No Firebase configuration object provided." +
        "\n" +
        "Add your web app's configuration object to firebase-config.js"
    );
  } else {
    return config;
  }
}
