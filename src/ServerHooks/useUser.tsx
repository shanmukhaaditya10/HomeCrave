import {useQuery} from '@tanstack/react-query';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

interface User {
    name: string;
    email: string;
    userId: string;

}
const useUser = () => {
  const {
    data: userData,
    isError,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const userDocument = await firestore()
        .collection('UsersData')
        .doc(auth().currentUser?.uid)
        .get();

      return userDocument.data() as User || {} as User;
    },
  });
  return {userData, isError, isSuccess, isLoading};
};
export default useUser;
