import { Shadow } from 'react-native-shadow-2'
import mt from '@/styles/mtWind'
import SettingScreen from '@/components/app/settingsScreen'
import { View } from 'react-native'
import { SimpleNavbar } from '@/components/app/simpleNavbar'

export default function ProfileScreen() {
  
  return (
    <View style={[mt.flex1]}>
    <View style={[mt.position("absolute"), mt.top(0), mt.left(0), mt.z(10)]}>
      <SimpleNavbar />
    </View>
    <View style={[mt.flex1, mt.items("center"), mt.justify("center")]}>
      <SettingScreen />
    </View>
  </View>
  )
}