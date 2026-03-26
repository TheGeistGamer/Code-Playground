import { Animated, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { Link } from 'expo-router';

export const GamerCard = ({ game }) => {
  return (
    <Link href={`/${game.id}`} asChild>
      <Pressable>
        <View
          className={'flex-row bg-slate-500/10 px-2 rounded-xl gap-4 mb-5'}
          style={styles.card}
        >
          <Image source={{ uri: game.image }} style={styles.image} />

          <View className="flex-shrink">
            <Text className={'mb-1'} style={styles.title}>{game.title}</Text>
            <Text className={'mt-2'} style={styles.score}>{game.popularity}</Text>
            <Text className={'mt-2 flex-shrink'} style={styles.description}>
              {game.overview.slice(0, 100)}
            </Text>
          </View>
        </View>
      </Pressable>
    </Link>
  )
}

export function AnimatedGameCard({ game, index }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      delay: index * 250,
      useNativeDriver: true
    }).start();

  }, [opacity, index])

  return (
    <Animated.View style={{ opacity }}>
      <GamerCard game={game} />
    </Animated.View>
  )

}

const styles = StyleSheet.create({
  card: {
    marginBottom: 50
  },

  image: {
    width: 107,
    height: 147,
    borderRadius: 10,
    objectFit: 'cover'
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    color: '#fff',
  },

  description: {
    fontSize: 16,
    color: '#eee'
  },

  score: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
    marginTop: 10
  }
});
