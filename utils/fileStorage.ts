import {getFromStorage, saveToStorage} from './asyncStorage';

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
