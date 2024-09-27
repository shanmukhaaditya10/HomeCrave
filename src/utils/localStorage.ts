import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV({
  id: 'gharKaKhanaStorage',
  encryptionKey: 'secureKey'
});

export const setUserPublicKey = async(publicKey: string,userId:string | undefined ) => {

        try {
            await storage.set(`publicKey-${userId}`, publicKey);
        } catch (error) {
            console.log(error);
        }
    
    
};
export const setUserSecretKey = async(secretKey: string,userId:string | undefined ) => {

    try {
       await storage.set(`secretKey-${userId}`, secretKey);
    } catch (error) {
        console.log(error);
    }


};

export const getUserPublicKey = (userId: string | undefined) => {
  return storage.getString(`publicKey-${userId}`);
};
export const getUserSecretKey = (userId: string | undefined) => {
  return storage.getString(`secretKey-${userId}`);
};

export const clearStorage = () => {
  storage.clearAll();
};
