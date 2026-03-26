import { Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Logo } from '../components/Logo'
import { Link, Stack } from 'expo-router'
import '../global.css'

export default function Layout() {
  return (
    <View className={'flex-1'}>
      <Stack 
        screenOptions={{
          headerStyle: { backgroundColor: 'black', },
          headerTintColor: "white",
          headerTitle: '',
          headerLeft: () => <Logo />,
          headerRight: () => (
            <Link asChild href={'/about'} className='mb-10'>
              <Pressable>
                <Ionicons name="information-circle-outline" size={24} color="white" />
              </Pressable>
            </Link>
          )
        }}
      />
    </View>
  )
}


{/* <View className="flex-row justify-between items-center mb-4 mx-2">
<View style={{ marginBottom: 30, justifyContent: 'flex-start', flexDirection: 'row' }}>
  <Logo />
</View>
</View> */}