import { create } from 'zustand'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import useGlobalStore from './useGlobalStore';
import { getUserPublicKey } from '../utils/localStorage';


interface UserState {
    user: FirebaseAuthTypes.User | null
    setUser: (user: FirebaseAuthTypes.User) => void
    initializing: boolean
    setInitializing: (value: boolean) => void

  }

  const useUserStore = create<UserState>(set => ({
    user: null,
    initializing: true,
    setUser: (user: FirebaseAuthTypes.User | null) => set({ user }),
    setInitializing: (value: boolean) => set({ initializing: value }),
  }));
  
  export const initializeUserState = () => {
    const unsubscribe = auth().onAuthStateChanged((user:any)=> {
      getUserPublicKey(user?.uid);
      useUserStore.getState().setUser(user);
     
      useUserStore.getState().setInitializing(false);
    });
  
    return unsubscribe;
  };
  
export default useUserStore