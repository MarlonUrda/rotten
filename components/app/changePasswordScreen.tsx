import { View } from 'react-native'
import { Text } from '@/components/ui/text'
import { Shadow } from 'react-native-shadow-2'
import mt from '@/styles/mtWind'
import ChangePasswordForm from '../forms/changePassword/changePasswordForm'
import { Logo } from './Logo'

export default function ChangeScreen() {
  return (
    <Shadow {...mt.shadow.md}>
      <View style={[mt.flexCol, mt.items("center"), mt.gap(4), mt.backgroundColor("white"), mt.rounded("base"), mt.border(4), mt.p(5), mt.w("full")]}>
        <View style={[mt.flexCol, mt.gap(3), mt.items("center")]}>
          <Logo />
          <Text size="md" style={[mt.align("center"), mt.fontWeight("bold")]}>
            Follow the steps to complete the process and keep enjoying of Rotten Minds!
          </Text>
        </View>
        <ChangePasswordForm />
      </View>
    </Shadow>
  )
}