import { atomWithStorage, createJSONStorage } from "jotai/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "@/types/User";

const storage = createJSONStorage<{
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
} | null>(() => AsyncStorage);

const isLocal = process.env.NODE_ENV === "development";

const localUser: User = {
  _id: "672d2f92d4d345bd19553688",
  email: "tomasymarlon@tm.com",
  firstName: "Tomas",
  lastName: "Marlon",
};



export const userAtom = atomWithStorage<User | null>("user", isLocal ? localUser : null, storage, {
  getOnInit: true,
});
