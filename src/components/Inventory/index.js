import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

//contants
import colors from '../../constants/colors';

const Inventory = ({title, description, price, stock, onPress, testId}) => {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress} testID={testId}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={styles.rightContent}>
        <Text style={styles.price}>{`NGN${price}`}</Text>
        <Text style={styles.stock}>
          {`${stock} ${stock > 1 ? 'pieces' : 'peice'}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.WHITE,
    borderRadius: 10,
    marginBottom: 16,
  },
  content: {
    paddingRight: 16,
    flex: 1,
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.SEMIDARKGRAY,
    lineHeight: 22,
  },
  description: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.MEDIUMGRAY,
    lineHeight: 20,
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.SEMIDARKGRAY,
    lineHeight: 20,
  },
  stock: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.MEDIUMGRAY,
    lineHeight: 20,
  },
});

export default Inventory;
