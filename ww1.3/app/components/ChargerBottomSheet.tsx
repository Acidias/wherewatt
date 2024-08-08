import React from "react";
import { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import tw from "twrnc"; // Optional for Tailwind CSS styles
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import chargerBg from "../assets/chargerBg.png";

type ChargerBottomSheetProps = {
  charger: any;
  onClose: () => void;

};

const ChargerBottomSheet = React.forwardRef<BottomSheet, ChargerBottomSheetProps>(({ charger, onClose }, ref) => {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };


  const renderBackdrop = React.useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        onPress={onClose}
      />
    ),
    [onClose]
  );
  return (
    <BottomSheet
      ref={ref}
      index={0}
      snapPoints={["55%"]}
      onClose={onClose}
      backdropComponent={renderBackdrop}
      style={styles.sheet}
    >
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
        <View style={styles.priceBadgeContainer}>
          <Text style={styles.priceBadgeText}>💰 {charger?.UsageCost || "$??"} / kWh</Text>
        </View>
          <Image
            source={charger?.imageUri ? { uri: charger.imageUri } : chargerBg}
            style={styles.image}
            resizeMode="cover"
          />
          <TouchableOpacity style={styles.heartIconContainer} onPress={toggleLike}>
            <MaterialCommunityIcons
              name={isLiked ? "heart" : "heart-outline"} 
              size={30}
              color={isLiked ? "#0CF09E" : "#0DBE34"}
              />
          </TouchableOpacity>
        </View>
        <View style={styles.detailsContainer}>
          {/* <Text style={styles.priceText}>{charger?.UsageCost || "Price not available"} / kWh</Text> */}
          <Text style={styles.titleText}>{charger?.AddressInfo?.Title}</Text>
          <Text style={styles.addressText}>{charger?.AddressInfo?.AddressLine1}</Text>

          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>{charger?.Distance?.toFixed(1)} km away</Text>
            {/* <Text style={styles.infoText}>Free wifi</Text> */}
            {/* <Text style={styles.infoText}>Free parking</Text> */}
            <Text style={styles.infoText}>{charger?.AddressInfo?.AccessComments || "Working hours not available"}</Text>
          </View>

          <TouchableOpacity style={styles.bookButton} onPress={() => {}}>
            <Text style={styles.bookButtonText}>Book a slot</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
});

export default ChargerBottomSheet;

const styles = StyleSheet.create({
  sheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    paddingTop: 0, // Ensure no padding on the top
  },
  contentContainer: {
    padding: 0, // Remove padding to align image to the top
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  imageContainer: {
    position: 'relative',
  },
  heartIconContainer: {
    position: 'absolute',
    top: 10, // Adjust as needed
    right: 10, // Adjust as needed
  },
  heartIcon: {
    width: 24, // Adjust size as needed
    height: 24, // Adjust size as needed
    tintColor: 'green', // Optional: Adjust the color of the icon
  },
  image: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 0, // Ensure no margin on the top
  },
  detailsContainer: {
    padding: 16,
  },
  priceBadgeContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'black',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    zIndex: 1,
  },
  priceBadgeText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  addressText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  infoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  infoText: {
    fontSize: 12,
    color: '#333',
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#f1f1f1',
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  bookButton: {
    backgroundColor: '#34c759',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  bookButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});
