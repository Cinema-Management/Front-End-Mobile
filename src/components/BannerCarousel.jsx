import React, { memo, useCallback, useRef, useState } from 'react';
import { View, Image, Dimensions, StyleSheet, Animated } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const { width, height } = Dimensions.get('window');

const BannerCarousel = memo(({ banners }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    const renderItem = useCallback(
        ({ item }) => {
            // const scale = new Animated.Value(0);
            // const opacity = new Animated.Value(0);
            // const translateX = useRef(new Animated.Value(0)).current;
            // Animate the scale and opacity when the item is rendered
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            }).start();

            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            }).start();

            return (
                <Animated.View
                    style={[
                        styles.bannerContainer,
                        {
                            opacity: opacityAnim,
                            transform: [{ scale: scaleAnim }],
                        },
                    ]}
                >
                    <Animated.Image source={{ uri: item.img }} style={styles.bannerImage} resizeMode="stretch" />
                </Animated.View>
            );
        },
        [scaleAnim, opacityAnim],
    );

    return (
        <View style={styles.carouselContainer}>
            <Carousel
                width={width}
                height={height * 0.25}
                data={banners}
                renderItem={renderItem}
                scrollAnimationDuration={10}
                autoPlayInterval={5000}
                autoPlayReverse
                autoPlay
                onSnapToItem={(index) => setCurrentIndex(index)}
            />
            <View style={styles.dotsContainer}>
                {banners.map((_, index) => (
                    <Animated.View
                        key={index}
                        style={[
                            styles.dot,
                            currentIndex === index ? styles.activeDot : null,
                            {
                                // Tạo hiệu ứng mở rộng khi active
                                transform: [
                                    {
                                        scale: scaleAnim, // Sử dụng giá trị scale hợp lệ từ Animated.Value
                                    },
                                ],
                            },
                        ]}
                    />
                ))}
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    carouselContainer: {
        alignItems: 'center',
        flex: 1,
    },
    bannerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bannerImage: {
        width: '90%',
        height: '85%',
        resizeMode: 'cover',
        borderRadius: 10,
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',

        position: 'absolute',
        bottom: 5,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: 'white',
        width: 10,
        height: 10,
        borderRadius: 5,
    },
});

export default BannerCarousel;
