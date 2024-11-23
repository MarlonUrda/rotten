import { View } from 'react-native'
import { Text } from '@/components/ui/text'
import { Shadow } from 'react-native-shadow-2'
import mt from '@/styles/mtWind'
import RegisterForm from '../forms/RegisterForms/registerForm'
import { Logo } from './Logo'


export default function RegisterScreen(){
  return (
      <View style={[mt.flexCol, mt.items("center"), mt.gap(4), mt.backgroundColor("white"), mt.rounded("base"), mt.border(4), mt.p(5), mt.w("full")]}>
        <View style={[mt.flexCol, mt.gap(3), mt.items("center")]}>
          <Logo />
          <Text size="md" style={[mt.align("center"), mt.fontWeight("bold")]}>
            Create an account and start exploring your favorite games.
          </Text>
        </View>
        <RegisterForm />
      </View>
  )
}