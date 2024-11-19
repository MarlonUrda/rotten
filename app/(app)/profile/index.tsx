import { Shadow } from 'react-native-shadow-2'
import mt from '@/styles/mtWind'
import SettingScreen from '@/components/app/settingsScreen'
import { View } from 'react-native'

export default function ProfileScreen() {
  
  return (
      <View style={[mt.flex1, mt.items("center"), mt.justify("center")]}>
        <SettingScreen />
      </View>
  )
}