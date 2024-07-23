import { Pressable, StyleSheet, View } from 'react-native'
import MapView from 'react-native-maps'
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
} from 'expo-location'
import { useEffect, useRef } from 'react'
import LocationArrow from '@/components/Icon/LocationArrow'

export default function HomeScreen() {
  const [status, requestPermission] = useForegroundPermissions()

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

    mapRef.current?.animateCamera({
      center: {
        latitude,
        longitude,
      },
    })
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        showsUserLocation={true}
        zoomEnabled={true}
      />

      <Pressable style={styles.centerMapButton} onPress={centerMap}>
        <LocationArrow fill="#333" />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  centerMapButton: {
    position: 'absolute',
    right: '5%',
    bottom: '5%',
    backgroundColor: 'white',
    padding: 7,
    borderRadius: 5,
    zIndex: 10,
  },
})
