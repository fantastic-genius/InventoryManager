import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

//constants
import colors from '../../constants/colors';

//components
import Inventory from '../../components/Inventory';

//crud
import {getInventories} from '../../crud';

const Home = ({navigation}) => {
  const [inventories, setInventories] = useState([]);

  const handleGetInvetories = async () => {
    const allInvetories = await getInventories();
    setInventories(allInvetories);
  };

  const renderInventory = ({item}) => (
    <Inventory 
      title={item.name}
      description={item.description}
      price={item.price}
      stock={item.stock}
      key={item.uuid}
      onPress={() => navigation.navigate('EditInventory', {inventory: item})}
      testId={item.uuid}
    />
  );

  useEffect(() => {
    handleGetInvetories();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={item => item.uuid}
        data={inventories}
        renderItem={renderInventory}
        style={styles.listCon}
      />
      <TouchableOpacity
        style={styles.plusCon}
        onPress={() => navigation.navigate('CreateInventory')}
      >
        <Entypo name="plus" size={30} color={colors.WHITE} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
  },
  listCon: {
    flexGrow: 1,
    padding: 16,
  },
  plusCon: {
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 40,
    right: 20,
    backgroundColor: colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
});

export default Home;
