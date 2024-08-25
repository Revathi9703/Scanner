// Carousel.tsx
import React, { useRef, useState, useEffect } from 'react';
import { View, Text, FlatList, Dimensions, StyleSheet, Image, TouchableOpacity, ListRenderItem } from 'react-native';

// Define the type for the data item
interface CarouselItem {
  id: string;
  image: string;
  text: string;
}

// Define the props for the Carousel component
interface CarouselProps {
  data: CarouselItem[];
}

const { width } = Dimensions.get('window');

const Carousel: React.FC<CarouselProps> = ({ data,navigation }:any) => {
  const flatListRef = useRef<FlatList<CarouselItem>>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [autoScroll, setAutoScroll] = useState<boolean>(true);

  const handleScrollBeginDrag = () => {
    setAutoScroll(false);
  };
  
  const handleScrollEndDrag = () => {
    setAutoScroll(true);
  };

  // Automatically scroll every 3 seconds
  useEffect(() => {
    if (autoScroll) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % data.length;
          flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
          return nextIndex;
        });
      }, 3000);
  
      return () => clearInterval(interval);
    }
  }, [autoScroll, data.length]);

  const onViewRef = useRef(({ viewableItems }: { viewableItems: { index: number }[] }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });


  const renderItem: ListRenderItem<CarouselItem> = ({ item, index }) => (
    <View
    style={[
      styles.itemContainer,
      {
        backgroundColor: index === 0 ? '#f0e8d5' : index === 1 ? '#D9D9D9' : 'orange'
      }
    ]}
  >
    <View style={styles.contentContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.textslider}>Every day Fresh and Clean with your Products</Text>
        <TouchableOpacity style={styles.shopNowButton} onPress={navigation}>
          <Text style={styles.shopNowText} >Shop Now</Text>
        </TouchableOpacity>
      </View>
      <Image source={{ uri: item.image }} style={styles.image} />
    </View>
  </View>
  );

  return (
    <View>
 <FlatList
  data={data}
  renderItem={renderItem}
  keyExtractor={(item) => item.id}
  horizontal
  pagingEnabled
  showsHorizontalScrollIndicator={false}
  onViewableItemsChanged={onViewRef.current}
  viewabilityConfig={viewConfigRef.current}
  ref={flatListRef}
  onScrollBeginDrag={handleScrollBeginDrag}
  onScrollEndDrag={handleScrollEndDrag}
/>
      <View style={styles.pagination}>
        {data.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.dot, { backgroundColor: index === currentIndex ? 'black' : 'gray' }]}
            onPress={() => flatListRef.current?.scrollToIndex({ index })}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  text: {
    position: 'absolute',
    bottom: 10,
    color: 'white',
    fontSize: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
  },
  textslider: {
    color: 'black',
    fontSize: 16,
    marginBottom: 10,
    flexShrink: 1, // Allows text to shrink if necessary
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 5,
    margin: 5,
  },
  itemContainer: {
    flex: 1,
    height:120,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 8,
    marginVertical: 10
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 10,
    width:170
  },

  shopNowButton: {
    height: 40,
    backgroundColor: '#05A845',
    width: '60%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shopNowText: {
    color: 'white',
    fontSize: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginLeft: 10, // Adjust this value to control space between text and image
  }
});

export default Carousel;
