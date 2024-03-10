import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import TextElement from '../components/TextElement';
import Colors from '../assets/colors.json';
import {clearStorage, getFromStorage} from '../utils/asyncStorage';

interface RepositoryScreenPropsType {}

const {fs} = ReactNativeBlobUtil;

const RepositoryScreen: React.FC<RepositoryScreenPropsType> = () => {
  const [repository, setRepository] = useState<string[]>([]);
  console.log(repository);

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
    fs.readFile(path, 'utf8').then(data => {
      console.log(data);
    });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <TextElement fontSize={'xl'}>Your Repository:</TextElement>
      <FlatList
        data={repository}
        keyExtractor={itemDate => itemDate}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.repoItem}
            onPress={onFile.bind(this, item)}>
            <TextElement fontSize={'sm'}>
              {item.split('Download/')[1].replace('.txt', '')}
            </TextElement>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  repoItem: {
    width: '85%',
    height: 40,
    backgroundColor: 'red',
    margin: 2,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: '4%',
  },
});

export default RepositoryScreen;
