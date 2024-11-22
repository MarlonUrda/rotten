import { View } from 'react-native'
import { Text } from '@/components/ui/text'
import { Shadow } from 'react-native-shadow-2'
import mt from '@/styles/mtWind'
import ChangePasswordForm from '../forms/changePassword/changePasswordForm'

export default function ChangeScreen() {
  return (
    <Shadow {...mt.shadow.md}>
      <View style={[mt.flexCol, mt.items("center"), mt.gap(4), mt.backgroundColor("white"), mt.rounded("base"), mt.border(4), mt.p(5), mt.w(96)]}>
        <View style={[mt.flexCol, mt.gap(3), mt.items("center")]}>
          <View style={[mt.border(4), mt.p(2), mt.rotate(-3)]}>
            <Text size="2xl" weight="black" style={[mt.align("center"), mt.fontWeight("black")]}>
              ROTTEN MINDS
            </Text>
          </View>
          <Text size="md" style={[mt.align("center"), mt.fontWeight("bold")]}>
            Follow the steps to complete the process and keep enjoying of Rotten Minds!
          </Text>
        </View>
        <ChangePasswordForm />
      </View>
    </Shadow>
  )
}