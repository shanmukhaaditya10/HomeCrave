import {create} from 'zustand';

const useGlobalStore = create<{
  globalLoading: boolean;
  setGlobalLoading: (bool: boolean) => void;
  publicKey: string;
  setPublicKey: (str: string) => void;
}>(set => ({
  globalLoading: false,
  setGlobalLoading: (bool: boolean) => set({globalLoading: bool}),
  publicKey: '',
  setPublicKey: (str: string) => set({publicKey: str}),
}));

export default useGlobalStore;
