import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import MapView, { Geojson } from 'react-native-maps'
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
} from 'expo-location'
import { useEffect, useRef, useState } from 'react'
import LocationArrow from '@/components/Icon/LocationArrow'
import { SafeAreaView } from 'react-native-safe-area-context'
import { shadowM } from '@/assets/styles'
import germanyLevel4 from '@/assets/germany-osm-4.json'

export default function HomeScreen() {
  const [searchText, setSearchText] = useState<string>('')
  const [status, requestPermission] = useForegroundPermissions()

  const DUMMY_places = [
    {
      id: 1,
      name: 'Empire State Building',
      latitude: 40.74844205,
      longtitude: -73.98565890160751,
    },
    {
      id: 2,
      name: 'Golden Gate Bridge',
      latitude: 37.81990665,
      longtitude: -122.47858000733174,
    },
    {
      id: 3,
      name: 'Venice Beach',
      latitude: 33.97996005,
      longtitude: -118.4687710293081,
    },
    {
      id: 4,
      name: 'Grand Canyon',
      latitude: 36.307854750000004,
      longtitude: -112.29289603702432,
    },
    {
      id: 5,
      name: 'Statue of Liberty',
      latitude: 40.689253199999996,
      longtitude: -74.04454817144321,
    },
  ]

  const [searchResult, setSearchResult] = useState<
    {
      id: number
      name: string
      latitude: number
      longtitude: number
    }[]
  >(DUMMY_places)

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
    setSearchResult(DUMMY_places.filter((place) => place.name.includes(text)))
  }

  function goToPlace(placeId: number): void {
    const place = DUMMY_places.find((place) => place.id === placeId)

    if (!place) {
      // TODO handle error
      return
    }

    setSearchText('')

    mapRef.current?.animateToRegion({
      latitude: place.latitude,
      longitude: place.longtitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    })
  }

  useEffect(() => {
    const map = mapRef.current

    if (!map) return
  })

  function getLevel4(levelName: string): any {
    return {
      ...germanyLevel4,
      features: germanyLevel4.features.filter(
        (f) => f.properties.name !== levelName,
      ),
    }
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
                <Pressable onPress={() => goToPlace(item.id)}>
                  <Text style={styles.searchEntry}>{item.name}</Text>
                </Pressable>
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
          // provider={PROVIDER_GOOGLE}
        >
          <Geojson
            geojson={getLevel4('Hamburg')}
            strokeColor="transparent"
            fillColor="rgba(0,0,0,0.8)"
            zIndex={1}
            strokeWidth={2}
          />
        </MapView>

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
