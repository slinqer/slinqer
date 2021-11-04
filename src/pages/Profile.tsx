import { getRedirectResult, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signInWithRedirect, signOut, User } from "firebase/auth";
import { IonIcon, IonPage } from "@ionic/react";
import { chevronForwardOutline, logoGoogle } from "ionicons/icons";
import BackButtonHeader from "../components/BackButtonHeader";
import FooterMenu from "../components/FooterMenu";
import { auth, loginProvider } from "../config/firebase";
import { useEffect, useState } from "react";


const ProfilePage: React.FC<{}> = props => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, [])
  const logout = () => {
    signOut(auth).then(() => {
      setUser(undefined);
    }).catch((error) => {
      // An error happened.
    });
  }
  const loginWithGoogle = async () => {
    signInWithPopup(auth, loginProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential) {
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
        }
      }).catch((error) => {
        alert(error);
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }
  return (
    <IonPage className="font-inter bg-gray">
      <BackButtonHeader/>
      {
        !user
        ?
        <div className="h-screen">
          <div className="h-3/5 bg-red-200">
          </div>
          <div className="mt-3 space-y-3  mx-auto w-11/12 lg:w-5/12">
            <span className="text-2xl font-bold text-gray-700">Ingresa</span>
            <button onClick={() => loginWithGoogle()}
              className="w-4/5 cursor-pointer flex mx-auto space-x-2 justify-center items-center p-4 bg-white rounded-xl text-gray-600 text-2xl shadow-xl font-semibold"
            >
              <img className="h-10" src="./assets/icons/logo-google.svg" alt="logo-google" />
              <p>Ingresar con Google</p>
            </button>
          </div>
        </div>
        :
        <div>
          <li>DIrecciones</li>
          <li>Metodo de pago preferido</li>
          <li><button onClick={() => {logout()}}>Cerrar sesion</button></li>
        </div>
      }
      <FooterMenu />
    </IonPage>
  );
};
export default ProfilePage;
