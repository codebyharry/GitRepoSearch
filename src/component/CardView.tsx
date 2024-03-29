import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const CardView = ({
  title,
  description,
  image,
  onPress,
}: {
  title: string;
  description: string;
  image: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.flexRow}>
        <Image source={{uri: image}} style={styles.imageStyle} />
        <View style={styles.paddingBetween}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
  },
  paddingBetween: {
    paddingLeft: 10,
  },
  flexRow: {
    flexDirection: 'row',
  },
  imageStyle: {
    height: 50,
    width: 50,
  },
});

export default CardView;
