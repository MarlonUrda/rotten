import { View } from 'react-native'
import { Text } from '@/components/ui/text'
import { Shadow } from 'react-native-shadow-2'
import mt from '@/styles/mtWind'
import LoginForm from '../forms/loginForm'
import { Logo } from './Logo'

export default function LoginView(){
  return (
    <View
      style={[
        mt.flexCol,
        mt.items("center"),
        mt.gap(4),
        mt.backgroundColor("white"),
        mt.rounded("base"),
        mt.border(4),
        mt.p(5),
        mt.w("full"),
      ]}
    >
      <View style={[mt.flexCol, mt.gap(3), mt.items("center")]}>
        <Logo />
        <Text size="xl" style={[mt.align("center"), mt.fontWeight("bold")]}>
          LET'S GET YOU BACK {''}
          <Text size='xl' style={[mt.fontWeight("black"), mt.color("red")]}>IN</Text>
        </Text>
      </View>
      <LoginForm />
    </View>
  );
}