import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getApi} from '../network/getApi';
import CardView from '../component/CardView';
import {Repository} from '../utils/Utils';
import NetInfo from '@react-native-community/netinfo';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const navigation: any = useNavigation();
  const [search, setSearch] = useState('');
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const [apiData, setApiData] = useState<any>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        getDataLocally();
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const getDataLocally = async () => {
    const offlineData = await AsyncStorage.getItem('data');
    if (offlineData) {
      setApiData(JSON.parse(offlineData?.slice(0, 15)));
    }
  };

  const handleNavigate = (item: Repository) => {
    navigation.navigate('RepoDetails', {item: item});
  };

  const renderItem = ({item}: {item: Repository}) => {
    return (
      <CardView
        description={item?.full_name}
        title={item?.name}
        image={item?.owner?.avatar_url}
        onPress={() => handleNavigate(item)}
      />
    );
  };

  const handleEndReach = async () => {
    setPage(page + 1);
    const pages = page + 1;
    const response = await getApi(search, pages);
    const newData = response.data?.items.filter((item: Repository) => {
      return !apiData.some((existingItem: any) => existingItem.id === item.id);
    });
    setApiData((prevData: any) => [...prevData, ...newData]);
  };

  const onChange = async (text: string) => {
    setSearch(text);
    if (timer) {
      clearTimeout(timer);
    }

    const newTimer = setTimeout(async () => {
      const response = await getApi(text, page);
      setApiData(response.data?.items);
      await AsyncStorage.setItem('data', JSON.stringify(response.data?.items));
    }, 500);

    setTimer(newTimer);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Home</Text>
      </View>
      <View style={styles.line} />
      <View style={styles.textInput}>
        <TextInput
          placeholder="Enter To search Repo"
          placeholderTextColor={'#fff'}
          style={styles.input}
          value={search}
          onChangeText={onChange}
        />
      </View>
      {apiData.length > 0 ? (
        <FlatList
          data={apiData}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          onEndReached={handleEndReach}
          onEndReachedThreshold={0.5}
        />
      ) : (
        <View style={styles.noData}>
          <Text style={styles.noDataText}>No Data To show</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  noData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgb(14,17,22)',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 32,
  },
  line: {
    borderColor: '#fff',
    borderBottomWidth: 1,
    padding: 5,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderBottomColor: 'grey',
    color: '#fff',
  },
  textInput: {
    paddingTop: 20,
  },
  noDataText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Home;
