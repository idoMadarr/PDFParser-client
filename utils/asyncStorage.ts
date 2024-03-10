import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToStorage = async (key: string, payload: unknown) => {
  const data = JSON.stringify(payload);
  await AsyncStorage.setItem(key, data);
};

export const getFromStorage = async (key: string) => {
  const data: string | null = await AsyncStorage.getItem(key);
  if (data) return JSON.parse(data);
};

export const clearStorage = async (keys?: string[]) => {
  await AsyncStorage.clear();
  // await AsyncStorage.multiRemove(keys || []);
};

export const removeStorageKey = async (key: string) => {
  await AsyncStorage.removeItem(key);
};
