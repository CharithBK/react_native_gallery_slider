import {
  Dimensions,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getDataList} from '../services/services';
const {width, height} = Dimensions.get('screen');
const Home = () => {
  const topRef = React.useRef<any>();
  const bottomRef = React.useRef<any>();
  const [listData, setListData] = useState<any>([]);
  const [activeIndex, setActiveIndex] = useState<any>(0);
  const IMAGE_SIZE = 80;
  const SPACING = 10;
  const getData = async () => {
    return await getDataList();
  };
  const scrollToActiveIndex = (index: any) => {
    setActiveIndex(index);
    topRef?.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    });
    if (
      index * (IMAGE_SIZE + SPACING) - IMAGE_SIZE / 2 >
      Math.floor(width / 2)
    ) {
      bottomRef?.current?.scrollToOffset({
        offset:
          index * (IMAGE_SIZE + SPACING) -
          Math.floor(width / 2) +
          IMAGE_SIZE / 2,
        animated: true,
      });
    } else {
      bottomRef?.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }
  };
  useEffect(() => {
    getData().then((data: any) => {
      setListData(data.data.photos);
    });
  }, []);
  console.log('width===>', width);
  //console.log('height===>', height);
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar hidden />
      <FlatList
        ref={topRef}
        data={listData}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={event => {
          scrollToActiveIndex(
            Math.floor(event.nativeEvent.contentOffset.x / Math.floor(width)),
          );
        }}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => {
          return (
            <View style={{width, height}}>
              <Image
                source={{uri: item.src.portrait}}
                style={[StyleSheet.absoluteFillObject]}
              />
            </View>
          );
        }}
      />
      <FlatList
        ref={bottomRef}
        data={listData}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{position: 'absolute', bottom: IMAGE_SIZE}}
        contentContainerStyle={{paddingHorizontal: SPACING}}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                scrollToActiveIndex(index);
              }}>
              <Image
                source={{uri: item.src.portrait}}
                style={{
                  width: IMAGE_SIZE,
                  height: IMAGE_SIZE,
                  borderRadius: 12,
                  marginRight: SPACING,
                  borderWidth: 2,
                  borderColor: activeIndex === index ? '#fff' : 'transparent',
                }}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Home;
