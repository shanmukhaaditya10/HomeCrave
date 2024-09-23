import { create } from 'zustand'

const useGlobalStore = create<{globalLoading: boolean, setGlobalLoading: (bool:boolean) => void}>(set => ({
    globalLoading: false,
    setGlobalLoading: (bool: boolean) => set({ globalLoading: bool }),
  }));

  export default useGlobalStore
