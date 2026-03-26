import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native';
import { getGameDetails } from '../lib/metacritic';
import { useLocalSearchParams } from 'expo-router';
import { Screen } from '../components/Screen'
import { useEffect, useState } from 'react';
import { Stack } from 'expo-router'

export default function Detail() {
  const { id } = useLocalSearchParams();
  const [movieInfo, setMovieInfo] = useState(null);

  useEffect(() => {  
    if(id) {
      getGameDetails(id).then(setMovieInfo);
    }
  }, [id])
  
  return(
    <Screen>
      <Stack.Screen 
        options={{
          headerStyle: { backgroundColor: '#ffee00' },
          headerTintColor: 'black',
          headerLeft: () => {},
          headerTitle: `${movieInfo ? movieInfo.title : 'Sin titulo'}`,
          headerRight: () => {}
        }}
      />
      {
        movieInfo === null ? 
        <ActivityIndicator color={'#fff'} size={'large'} /> :
        (<ScrollView>
          <View className='justify-center items-center text-center'>
            <Image 
              className='mb-4 rounded-xl'
              source={{ uri: movieInfo.img }}
              style={{ width: 214, height: 294 }}
              />
  
            <Text className='text-white text-center font-bold text-2xl'>
              { movieInfo.title }
            </Text>

            <Text className='text-white/90 mt-4 text-left mb-8 text-lg'>
              { movieInfo.overview }
            </Text>

          </View>
        </ScrollView>)
      }
  
    
    </Screen>
  )
}