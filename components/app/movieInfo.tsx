import mt from "@/styles/mtWind";
import { View } from "react-native";
import { Image } from "react-native-elements";
import { Text } from "../ui/text";

export function MovieInfo() {
  return (
    <>
      <View style={[mt.flexCol, mt.justify("center"), mt.gap(2), mt.pl(3), mt.pr(3)]}>
        <Text weight="bold">
          Estreno: <Text>10/11/2024</Text>
        </Text>
        <Text weight="bold">
          Estatus: <Text>Por estrenar</Text>
        </Text>
        <Text weight="bold">
          Produccion: <Text>MT Entertainment</Text>
        </Text>
        <Text weight="bold" >
          Generos: <Text>Accion, Comedia, Misterio</Text>
        </Text>
        <Text weight="bold" >
          Sinopsis: <Text>iuygdwbehcnsjiushwyegtcsbhuwsqihedycsgtwbhenciuhyegwtuhnjskewmhuyfdwjnuyducsjewuy4educsbjebfygrt4efhbdjseb</Text>
        </Text>
      </View>
    </>
  );
}
