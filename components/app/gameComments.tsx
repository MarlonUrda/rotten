import React from 'react';
import { View, FlatList } from 'react-native';
import mt from "@/styles/mtWind";
import { Comment } from "./comment";
import { Shadow } from "react-native-shadow-2";
import s from "@/styles/styleValues";
import { Comments } from '@/types/Comment';

// const comments = [
//   { writer: "User123", date: "12/12/12", content: "Este juego es muy bueno y entretenido" },
//   { writer: "User456", date: "13/12/12", content: "Me encanta la jugabilidad y los gráficos" },
//   { writer: "User789", date: "14/12/12", content: "La historia es muy interesante y atrapante" },
//   { writer: "User101", date: "15/12/12", content: "Tiene algunos bugs pero en general es excelente" },
//   { writer: "User102", date: "16/12/12", content: "El modo multijugador es muy divertido" },
//   { writer: "User103", date: "17/12/12", content: "Las misiones secundarias son muy variadas" },
//   { writer: "User104", date: "18/12/12", content: "El diseño de los personajes es impresionante" },
//   { writer: "User105", date: "19/12/12", content: "La música y los efectos de sonido son geniales" },
//   { writer: "User106", date: "20/12/12", content: "Es un juego muy adictivo, no puedo dejar de jugar" },
//   { writer: "User107", date: "21/12/12", content: "El sistema de combate es muy fluido y dinámico" },
//   { writer: "User108", date: "22/12/12", content: "Los gráficos son de última generación" },
//   { writer: "User109", date: "23/12/12", content: "Es uno de los mejores juegos que he jugado" }
// ];

interface ListProps {
  comments: Comments[] | []; 
}

export default function CommentList({ comments }: ListProps) {
  return (
    <FlatList
      data={comments}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={[mt.p(4), mt.rounded("base")]}>
          <Shadow {...s.shadow.md}>
            <Comment writer={item.userId} date={item.createdAt} content={item.content} />
          </Shadow>
        </View>
      )}
      contentContainerStyle={[mt.backgroundColor("blueOpacity", 200, 0.3), mt.gap(4), mt.p(5)]}
    />
  );
}