import {Text, TouchableOpacity, View} from 'react-native';
import Home from '../Assets/Home.svg';
import Settings from '../Assets/Profile.svg';
import Post from '../Assets/Post.svg';
import {moderateScale} from 'react-native-size-matters';
import AntIcon from 'react-native-vector-icons/AntDesign';

function TabBar({state, descriptors, navigation}: any) {
  return (
    <View
      style={{
        flexDirection: 'row',
        height: 50,
        position: 'absolute',
        width: '80%',
        alignSelf: 'center',
        bottom: 20,
        backgroundColor: 'rgb(249, 249, 249)',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: moderateScale(30),
        borderRadius: moderateScale(30),
        elevation: 10,
        shadowColor: '#cecece',
      }}>
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}>
            {index === 0 && <AntIcon name="home" size={moderateScale(30)}
            color={isFocused ? 'black' : '#adadad'}
            />}
            {index === 1 && (
              <AntIcon name="pluscircle" size={moderateScale(30)} color={isFocused ? 'black' : '#adadad'} />
            )}
            {index === 2 && <AntIcon name="user" size={moderateScale(30)}
            color={isFocused ? 'black' : '#adadad'}
            />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default TabBar;
