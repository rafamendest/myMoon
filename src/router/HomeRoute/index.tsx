import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../../screens/HomeScreen';
import Report from '../../screens/Report';

const HomeRoute = () => {
  const Stack = createStackNavigator();

  return (
    <>
      <Stack.Navigator initialRouteName="Início">
        <Stack.Screen
          name="Início"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Denúncia"
          component={Report}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </>
  );
};

export default HomeRoute;
