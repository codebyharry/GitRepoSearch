import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import WebView from 'react-native-webview';
import {getContributors} from '../network/getApi';
import {Contributor, ParamList} from '../utils/Utils';

const RepoDetails = () => {
  const [contributor, setContributor] = useState<Contributor[]>([]);
  const [showWebView, setShowWebView] = useState(false);
  const [url, setUrl] = useState('');
  const navigation = useNavigation();
  const route = useRoute<RouteProp<ParamList, 'RepoDetails'>>();
  const items = route.params?.item;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getContributors(items?.contributors_url);
        setContributor(data);
      } catch (error) {
        console.error('Error fetching contributors:', error);
      }
    };

    const formattedUrl = items?.git_url.replace('git://', 'https://www.');
    setUrl(formattedUrl);

    fetchData();
    return () => {
      setContributor([]);
    };
  }, [items]);

  const renderContributorItem = ({item}: {item: Contributor}) => {
    return (
      <View style={styles.contributorItem}>
        <Image source={{uri: item.avatar_url}} style={styles.avatar} />
        <Text style={styles.contributorName}>{item.login}</Text>
      </View>
    );
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleProjectLinkPress = () => {
    setUrl(url);
    setShowWebView(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {!showWebView ? (
        <FlatList
          ListHeaderComponent={
            <>
              <TouchableOpacity onPress={handleBackPress}>
                <Icon
                  name="arrow-back"
                  size={24}
                  color="#fff"
                  style={styles.backArrow}
                />
              </TouchableOpacity>
              <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Details</Text>
              </View>
              <View style={styles.line} />
              <View style={[styles.headerContainer, {paddingTop: 20}]}>
                <Image
                  source={{uri: items?.owner?.avatar_url}}
                  style={styles.imageStyle}
                />
                <Text style={styles.heading}>Name:</Text>
                <Text style={styles.title}>{items?.name || 'N/A'}</Text>
                <Text style={styles.heading}>Project Link:</Text>
                <TouchableOpacity onPress={() => handleProjectLinkPress()}>
                  <Text style={[styles.title, styles.link]}>{url}</Text>
                </TouchableOpacity>
                <Text style={styles.heading}>Description:</Text>
                <Text style={styles.title}>{items?.description || 'N/A'}</Text>
                <Text style={styles.heading}>Contributors</Text>
              </View>
            </>
          }
          data={contributor}
          renderItem={renderContributorItem}
          keyExtractor={item => item.id.toString()}
        />
      ) : (
        <WebView
          source={{uri: url}}
          style={{flex: 1}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
      )}
      {showWebView && (
        <TouchableOpacity
          onPress={() => setShowWebView(false)}
          style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  backArrow: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 10,
    top: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 8,
    color: '#fff',
    paddingBottom: 10,
    textAlign: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#fff',
    paddingBottom: 10,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  contributorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  contributorName: {
    fontSize: 16,
    color: '#fff',
  },
  imageStyle: {
    height: 150,
    width: 150,
    borderRadius: 100,
  },
  link: {
    color: 'blue', // Change color to blue
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
  },
});

export default RepoDetails;
