import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import TextElement from '../components/TextElement';
import Colors from '../assets/colors.json';
import EmptyIcon from '../assets/vectors/empty.svg';
import ArrowIcon from '../assets/vectors/arrowright.svg';
import {clearStorage, getFromStorage} from '../utils/asyncStorage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {
  navigation: never;
  route: never;
};

type RepositoryScreenType = NativeStackScreenProps<RootStackParamList>;

const {fs} = ReactNativeBlobUtil;

const RepositoryScreen: React.FC<RepositoryScreenType> = ({navigation}) => {
  const [repository, setRepository] = useState<string[]>([]);

  useEffect(() => {
    // clearStorage();
    initRepo();
  }, []);

  const initRepo = async () => {
    const savedFiles = await getFromStorage('repo');

    if (savedFiles) {
      setRepository(savedFiles);
    }
  };

  const onFile = (path: string) => {
    fs.readFile(path, 'utf8').then(async data => {
      const title = path.split('Download/')[1].replace('.txt', '');
      // @ts-ignore:
      navigation.navigate('viewer', {content: data, title});
    });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <TextElement
          fontSize={'xl'}
          fontWeight={'bold'}
          cStyle={{color: Colors.secondary}}>
          Your Repository
        </TextElement>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.arrowContainer}>
          <ArrowIcon />
        </TouchableOpacity>
      </View>
      {repository.length ? (
        <FlatList
          data={repository}
          keyExtractor={itemDate => itemDate}
          contentContainerStyle={styles.repoContianer}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={styles.repoItem}
              onPress={onFile.bind(this, item)}>
              <TextElement
                cStyle={{color: Colors.white}}
                fontWeight={'bold'}
                fontSize={'sm'}>
                {`${index + 1}. ${item
                  .split('Download/')[1]
                  .replace('.txt', '')}`}
              </TextElement>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <TextElement fontSize={'lg'} fontWeight={'bold'}>
            - Empty list -
          </TextElement>
          <TextElement fontSize={'m'} cStyle={styles.underline}>
            Upload some pdf to see some content
          </TextElement>
          <EmptyIcon />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    paddingTop: '8%',
  },
  header: {
    width: Dimensions.get('window').width * 0.85,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  repoContianer: {
    width: Dimensions.get('window').width * 0.85,
    alignSelf: 'center',
  },
  repoItem: {
    height: Dimensions.get('window').height * 0.06,
    backgroundColor: Colors.secondary,
    marginVertical: '2%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: '4%',
    elevation: 3,
  },
  emptyContainer: {
    position: 'absolute',
    top: '40%',
    alignItems: 'center',
  },
  underline: {
    marginVertical: '4%',
    textDecorationLine: 'underline',
  },
  arrowContainer: {
    padding: '4%',
  },
});

export default RepositoryScreen;
