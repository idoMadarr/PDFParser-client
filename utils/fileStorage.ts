import ReactNativeBlobUtil from 'react-native-blob-util';
import {getFromStorage, saveToStorage} from './asyncStorage';

const {fs} = ReactNativeBlobUtil;

export const handleFileStorage = async (path: string) => {
  const currentStorage: string[] = await getFromStorage('repo');

  if (currentStorage) {
    const existingFile = currentStorage.find(file => file === path);

    if (!existingFile) {
      const updateStorage = [...currentStorage, path];
      await saveToStorage('repo', updateStorage);
    }
    return;
  }

  const newStorage = [path];
  await saveToStorage('repo', newStorage);
};

export const writeFile = async (
  title: string,
  content: string,
  cb?: Function | null,
) => {
  const path = `${fs.dirs.DownloadDir}/${
    title || new Date(Date.now()).toISOString().toString()
  }.txt`;

  await fs
    .writeFile(path, content, 'utf8')
    .then(async () => {
      console.log('save', path);
      handleFileStorage(path);

      if (cb) {
        cb();
      }
    })
    .catch(err => console.log(err));
};
