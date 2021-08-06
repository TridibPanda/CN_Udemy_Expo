import React,{useEffect,useState} from 'react';
import { View, FlatList, StyleSheet,Dimensions } from 'react-native';
import { useSelector } from 'react-redux';

import MealItem from './MealItem';
import DefaultText from './DefaultText';

const MealList = props => {
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
    Dimensions.get('window').height
  );
  const favoriteMeals = useSelector(state => state.meals.favoriteMeals);
  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceHeight(Dimensions.get('window').height);
    };

    Dimensions.addEventListener('change', updateLayout);

    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  },[])

  const renderMealItem = ({item}) => {
    const isFavorite = favoriteMeals.some(meal => meal.id === item.id);
    return (
      <MealItem
        title={item.title}
        image={item.imageUrl}
        duration={item.duration}
        complexity={item.complexity}
        affordability={item.affordability}
        onSelectMeal={() => {
          props.navigation.navigate({
            routeName: 'MealDetail',
            params: {
              mealId: item.id,
              mealTitle: item.title,
              isFav: isFavorite
            }
          });
        }}
      />
    );
  };
  const emptyComponent = () => {
    return (
      <View style={{marginTop: availableDeviceHeight < 500 ? availableDeviceHeight * 0.25 : availableDeviceHeight * 0.4,  alignItems: 'center'}}>
        <DefaultText>{props.screen === "FavoritesScreen" ? "No favorite meals found. Start adding some!" : "No meals found, maybe check your filters?"}</DefaultText>
      </View>
    );
  }

  return (
    <View style={styles.list}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={props.listData}
        keyExtractor={(item, index) => item.id}
        renderItem={renderMealItem}
        style={{ width: '100%' }}
        ListEmptyComponent={emptyComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15
  }
});

export default MealList;
