import React, {useEffect} from 'react';
import {Text} from 'react-native';
import 'react-native-gesture-handler';

import auth from '@react-native-firebase/auth';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {useDispatch, connect} from 'react-redux';

import AddPost from './screens/AddPost';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Home from './screens/Home';
import CustomHeader from './layout/CustomHeader';
import DoctorsInfo from './screens/DoctorsInfo';

import {SET_USER, IS_AUTHTHENTICATED} from './action/action.types';

import database from '@react-native-firebase/database';
import EmptyContainer from './componenets/EmptyContainer';
import {requestPermission} from './utils/AskPermission';

const Stack = createStackNavigator();

const App = ({authState}) => {
  const dispatch = useDispatch();

  const onAuthStateChanged = user => {
    if (user) {
      dispatch({
        type: IS_AUTHTHENTICATED,
        payload: true,
      });

      console.log(user._user.uid);

      database()
        .ref(`/users/${user._user.uid}`)
        .on('value', snapshot => {
          console.log('USER DETAILS', snapshot.val());
          dispatch({
            type: SET_USER,
            payload: snapshot.val(),
          });
        });
    } else {
      dispatch({
        type: IS_AUTHTHENTICATED,
        payload: false,
      });
    }
  };

  useEffect(() => {
    requestPermission();
    const susbcriber = auth().onAuthStateChanged(onAuthStateChanged);
    return susbcriber;
  }, []);

  if (authState.loading) {
    return <EmptyContainer />;
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerRight: props => <CustomHeader {...props} />,
          }}>
          {authState.isAuthenticated ? (
            <>
              <Stack.Screen
                name="Home"
                component={Home}
                options={{
                  headerStyle: {
                    backgroundColor: '#0f4c75',
                  },
                  title: 'My Doctor App',
                  headerTitleStyle: {
                    textAlign: 'center',
                    color: '#00b7c2',
                  },
                }}
              />
              <Stack.Screen
                name="DoctorsInfo"
                component={DoctorsInfo}
                options={{
                  headerStyle: {
                    backgroundColor: '#0f4c75',
                  },
                  title: 'Doctor info',
                  headerTitleStyle: {
                    textAlign: 'center',
                    color: '#F4FCFA',
                  },
                }}
              />
              <Stack.Screen
                name="AddPost"
                component={AddPost}
                options={{
                  headerStyle: {
                    backgroundColor: '#0f4c75',
                  },
                  title: 'My Doctor App',
                  headerTitleStyle: {
                    textAlign: 'center',
                    color: '#00b7c2',
                  },
                }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{
                  headerStyle: {
                    backgroundColor: '#0f4c75',
                  },
                  title: 'My Doctor App',
                  headerTitleStyle: {
                    textAlign: 'center',
                    color: '#00b7c2',
                  },
                }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{
                  headerStyle: {
                    backgroundColor: '#0f4c75',
                  },
                  title: 'My Doctor App',
                  headerTitleStyle: {
                    textAlign: 'center',
                    color: '#00b7c2',
                  },
                }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const mapStateToProps = state => ({
  authState: state.auth,
});

export default connect(mapStateToProps)(App);
