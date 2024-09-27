import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV({
  id: 'gharKaKhanaStorage',
  encryptionKey: 'secureKey'
});

export const setUserPublicKey = (publicKey: string,userId:string | undefined ) => {

        try {
            storage.set(`publicKey-${userId}`, publicKey);
        } catch (error) {
            console.log(error);
        }
    
    
};
export const setUserSecretKey = (secretKey: string,userId:string | undefined ) => {

    try {
        storage.set(`secretKey-${userId}`, secretKey);
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
