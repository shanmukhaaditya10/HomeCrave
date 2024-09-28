import {useQuery} from '@tanstack/react-query';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

interface User {
    name: string;
    email: string;
    userId: string;

}
const usePosts = () => {
  const {
    data: postData,
    isError,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ['Posts'],
    queryFn: async () => {
      const posts = await firestore()
        .collection('Posts')
        .get();
        const data = posts.docs.map((doc) => {
            
            return {...doc.data(),postId:doc.id}
        
        }) as any

      return data || [];
    },
  });
  return {postData, isError, isSuccess, isLoading};
};
export default usePosts;
