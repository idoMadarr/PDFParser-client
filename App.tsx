import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  Share,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker, {types} from 'react-native-document-picker';
import axios from 'axios';
import TextElement from './components/TextElement';
import * as Colors from './assets/colors.json';
import ModalSubtitles from './components/ModalSubtitles';
import {requestStoragePermission} from './utils/permission';
import Config from 'react-native-config';

const {fs} = ReactNativeBlobUtil;

const pickerOptions = {
  freeStyleCropEnabled: true,
  cropping: true,
  // includeBase64: true,
  cropperChooseText: 'approve',
  loadingLabelText: 'Loading...',
  cropperCancelText: 'cancel',
};

const defaultState = {
  title: '',
  content: '',
};

const App = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [fileContent, setFileContent] = useState(defaultState);

  useEffect(() => {
    if (fileContent.content.length) {
      changeModalHeight(1);
      setIsLoading(false);
    }
  }, [fileContent.content]);

  useEffect(() => {
    // requestStoragePermission();
  }, []);

  const changeModalHeight = (index: number) => {
    bottomSheetRef.current?.snapToIndex(index);
  };

  const shareDocument = async () => {
    const result = await Share.share({
      title: fileContent.title,
      message: fileContent.content,
    });
    console.log(result);
  };

  const saveDocument = async () => {
    await fs
      .writeFile(
        `${fs.dirs.DocumentDir}/${fileContent.title}.txt`,
        fileContent.content,
        'utf8',
      )
      .then(() => changeModalHeight(0))
      .catch(err => console.log(err));
  };

  const selectImage = () => {
    ImagePicker.openPicker(pickerOptions)
      .then(async image => {
        const formData = new FormData();
        formData.append('file', {
          uri: image.path,
          type: image.mime,
          name: image.modificationDate,
        });

        const test = await axios.post(
          'https://pdfparser-server.onrender.com/store_image',
          // 'http://192.168.2.77:8080/store_image',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );

        console.log(test.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const selectPdf = async () => {
    try {
      const pickerResult = await DocumentPicker.pick({
        type: types.pdf,
      });

      const formData = new FormData();
      formData.append('file', {
        uri: pickerResult[0].uri,
        type: pickerResult[0].type,
        name: pickerResult[0].name,
      });

      setIsLoading(true);
      const response = await axios.post(
        'https://pdfparser-server.onrender.com/parser_pdf',
        // 'http://192.168.2.77:8080/parser_pdf',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log(response.data);

      setIsLoading(false);
      setFileContent({
        title: response.data.info.Title,
        content: response.data.text,
      });
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        // onPress={() => dispatch(setModal(null))}
        {...props}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );

  const snapPoints = useMemo(() => ['25%', '70%', '100%'], []);

  const overlaySpinner = (
    <View style={styles.loadingContainer}>
      <TextElement cStyle={styles.white} fontSize={'lg'}>
        Parsing your file
      </TextElement>
      <TextElement cStyle={styles.white} fontSize={'m'}>
        This proccess can take few moments
      </TextElement>
      <ActivityIndicator size={'large'} color={'white'} />
    </View>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
      {isLoading && overlaySpinner}
      <View style={styles.titleContainer}>
        <TextElement fontWeight={'bold'} cStyle={styles.title} fontSize={'xl'}>
          {'PDF to TXT\nConvertor'}
        </TextElement>
        <TextElement cStyle={{lineHeight: 26}} fontSize={'m'}>
          PDF conversion tool will swiftly transforms PDFs into editable text
          (.TXT) files, enhancing productivity for academic, professional, or
          personal use.
        </TextElement>
      </View>
      {/* <TouchableOpacity onPress={selectImage} style={styles.button}>
          <Text style={styles.text}>Upload Image</Text>
        </TouchableOpacity> */}
      <TouchableOpacity
        onPress={selectPdf}
        style={styles.button}
        activeOpacity={0.8}>
        <TextElement fontWeight={'bold'} cStyle={styles.white} fontSize={'lg'}>
          Upload PDF
        </TextElement>
      </TouchableOpacity>
      <View style={{height: '20%'}} />
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enableHandlePanningGesture={false}
        enableContentPanningGesture={false}
        enablePanDownToClose={false}
        handleIndicatorStyle={{backgroundColor: Colors.black}}
        backdropComponent={renderBackdrop}
        /* onClose={() => dispatch(setModal(null))} */
      >
        <ModalSubtitles
          title={fileContent.title}
          content={fileContent.content}
          saveDocument={saveDocument}
          shareDocument={shareDocument}
        />
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: '8%',
    backgroundColor: Colors.white,
  },
  title: {
    color: Colors.secondary,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width * 0.55,
    height: Dimensions.get('window').width * 0.55,
    borderRadius: 200,
    backgroundColor: Colors.secondary,
    elevation: 16,
  },
  titleContainer: {
    justifyContent: 'space-around',
    marginHorizontal: '5%',
    height: '28%',
  },
  loadingContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000b6',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100,
  },
  white: {
    color: Colors.white,
  },
});

export default App;
