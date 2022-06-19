import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  View,
  SafeAreaView,
  FlatList,
} from 'react-native';
import DoctorDisplayAvatar from '../DoctorDisplayAvatar';

// redux
import {getPosts} from '../action/post';
import {connect} from 'react-redux';
import propTypes from 'prop-types';

// to render empty container
import EmptyContainer from '../componenets/EmptyContainer';
import Post from '../componenets/Post';

const Home = ({getPosts, postState, userDetails, route}) => {
  // getting post on component mount

  useEffect(() => {
    console.log('HOME COMP', postState.posts);
    getPosts();
  }, []);

  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchDetails = async () => {
    try {
      const response = await axios.get(
        'http://250a-14-97-167-154.ngrok.io/v1/accounts/list/DOCTOR',
      );
      setDoctors(response.data.data);
      console.log('response.data', response.data);
      setIsLoading(false);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setIsError(true);
        console.log('C1');
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        setIsError(true);
        console.log('C2');
      } else {
        // Something happened in setting up the request that triggered an Error
        setIsError(true);
        console.log('C3');
      }
      setIsError(true);
      console.log('C4');
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  console.log('doctors', doctors);

  return (
    <View style={styles.mainContainer}>
      <View>
        <Text style={styles.heading}>Doctors</Text>
      </View>

      <FlatList
        data={doctors}
        renderItem={({item}) => (
          <DoctorDisplayAvatar
            name={item.full_name}
            account_id={item.account_id}
          />
        )}
        keyExtractor={item => item.account_id}
        // ItemSeparatorComponent={Separator}
        horizontal={true}
      />
    </View>
  );
};

// if post is fetching from DB then rendering empty component
//   if (postState.loading) {
//     return <EmptyContainer />;
//   }
//   return (
//     <SafeAreaView style={styles.container}>
//       <FlatList
//         data={postState.posts}
//         keyExtractor={item => item.id}
//         renderItem={({item, index, separators}) => (
//           <Post item={item} userDetails={userDetails} key={item.id} />
//         )}
//         ListEmptyComponent={() => (
//           <View style={styles.emptyContainer}>
//             <Text>No Doctor found</Text>
//           </View>
//         )}
//       />
//     </SafeAreaView>
//   );
// };

const mapStateToProps = state => ({
  postState: state.post,
  userDetails: state.auth.user,
});

const mapDispatchToProps = {
  getPosts,
};

Home.propTypes = {
  getPosts: propTypes.func.isRequired,
  postState: propTypes.object.isRequired,
  userDetails: propTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ccc',
    justifyContent: 'flex-start',
    padding: 4,
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'flex-start',
  },
  heading: {
    textAlign: 'left',
    color: '#00b7c2',
    marginHorizontal: 24,
    marginVertical: 24,
  },
  doctorsContainer: {
    height: 100,
    backgroundColor: '#FFF',
    paddingHorizontal: 24,
  },
});
