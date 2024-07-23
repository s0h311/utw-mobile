import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
} from 'expo-location'
import { useEffect, useRef, useState } from 'react'
import LocationArrow from '@/components/Icon/LocationArrow'
import { SafeAreaView } from 'react-native-safe-area-context'
import { shadowM } from '@/assets/styles'

export default function HomeScreen() {
  const [searchText, setSearchText] = useState<string>('')
  const [status, requestPermission] = useForegroundPermissions()

  const DUMMY_places = [
    'Empire State Building',
    'Golden Gate Bridge',
    'Venice Beach',
    'Grand Canyon',
    'Statue of Liberty',
  ]

  const [searchResult, setSearchResult] = useState<string[]>(DUMMY_places)

  useEffect(() => {
    if (!status?.granted) {
      requestPermission()
    }
  }, [])

  const mapRef = useRef<MapView>(null)

  async function centerMap(): Promise<void> {
    const {
      coords: { latitude, longitude },
    } = await getCurrentPositionAsync()

    mapRef.current?.animateToRegion({
      latitude,
      longitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    })
  }

  function updateSearchResult(text: string): void {
    setSearchText(text)
    setSearchResult(DUMMY_places.filter((place) => place.includes(text)))
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={searchText}
          onChangeText={updateSearchResult}
        />

        {searchText && (
          <View style={styles.searchResult}>
            <FlatList
              data={searchResult}
              renderItem={({ item }) => (
                <Text style={styles.searchEntry}>{item}</Text>
              )}
            />
          </View>
        )}
      </View>

      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          showsUserLocation={true}
          zoomEnabled={true}
          provider={PROVIDER_GOOGLE}
        />

        <Pressable style={styles.centerMapButton} onPress={centerMap}>
          <LocationArrow fill="#333" />
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  searchContainer: {
    width: '80%',
    marginHorizontal: 'auto',
  },
  searchInput: {
    backgroundColor: 'white',
    height: 50,
    width: '100%',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    ...shadowM,
  },
  searchResult: {
    position: 'absolute',
    top: 55,
    backgroundColor: 'white',
    minHeight: 100,
    maxHeight: 200,
    zIndex: 10,
    width: '100%',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    ...shadowM,
  },
  searchEntry: {
    fontSize: 16,
    marginBottom: 5,
  },
  mapContainer: {
    position: 'relative',
    zIndex: -1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  centerMapButton: {
    position: 'absolute',
    right: '7%',
    bottom: '15%',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    zIndex: 10,
  },
})
