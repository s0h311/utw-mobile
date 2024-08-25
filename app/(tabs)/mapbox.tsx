import { Pressable, SafeAreaView, StyleSheet } from 'react-native'
import LocationArrow from '@/components/Icon/LocationArrow'

// Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_PK!)

export default function MapboxTest() {
  /* const mapRef = useRef<MapView>(null)
  const cameraRef = useRef<Camera>(null)

  useEffect(() => {
    Mapbox.setTelemetryEnabled(false)
  }, [])

  async function centerMap(): Promise<void> {
    const {
      coords: { latitude, longitude },
    } = await getCurrentPositionAsync()

    cameraRef.current?.setCamera({
      centerCoordinate: [longitude, latitude],
      zoomLevel: 15,
      animationMode: 'easeTo',
    })
  } */

  return (
    <SafeAreaView>
      {/*  <MapView ref={mapRef} style={styles.map}>
        <ImageSource
          id="something"
          url="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Alabama.svg/2560px-Flag_of_Alabama.svg.png"
          coordinates={[
            [-119.898945, 41.923756],
            [-114.049402, 41.979243],
            [-114.526916, 35.122676],
            [-120.078012, 39.068656],
          ]}
        />
      </MapView> */}

      <Pressable
        style={styles.centerMapButton}
        onPress={
          // centerMap
          () => {}
        }
      >
        <LocationArrow fill="#333" />
      </Pressable>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
  centerMapButton: {
    position: 'absolute',
    right: '7%',
    bottom: '5%',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    zIndex: 10,
  },
})
