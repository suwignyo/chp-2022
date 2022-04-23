import {
  useEffect,
  useState,
  useContext,
  createContext,
  FunctionComponent,
} from "react";
import { useRouter } from "next/router";
import "firebase/auth";
import { auth } from "./initFirebase";
import { removeTokenCookie, setTokenCookie } from "./tokenCookies";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";

// initialize firebase

interface IAuthContext {
  user: User | null;
  logout: () => void;
  authenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  logout: () => null,
  authenticated: false,
  loading: false,
});

export const AuthProvider: FunctionComponent = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const [unknown, setUnknown] = useState<boolean>(false);

  const router = useRouter();

  const logout = async () => {
    await signOut(auth)
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        console.log("error signing out", error);
      });
  };

  // set user token or unset depending if they're logged out or in
  useEffect(() => {
    const cancelAuthListener = getAuth().onIdTokenChanged(async (user) => {
      if (user) {
        // if theres a user set the user && token cookie
        const token = await user.getIdToken();
        setTokenCookie(token);
        setUser(user);
      } else {
        removeTokenCookie();
        setUser(null);
      }
    });

    // when components unmount, you can call a function
    return () => {
      cancelAuthListener();
    };
  }, []);

  useEffect(() => {
    const authListener = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setUnknown(false);
      } else {
        // console.log("here");
        setUser(null);
        setUnknown(false);
        if (router.pathname !== "/admin") {
          router.push("/");
        }
      }
    });
    return authListener();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, logout, authenticated: !!user, loading: unknown }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
