import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import { Picker } from "@react-native-picker/picker";
import s from "@/styles/styleValues";
import { View, Dimensions } from "react-native";
import mt from "@/styles/mtWind";
import React, { useState } from "react";
import { SearchGameQuery } from "@/types/api/games/getGameRequest";
import { Text } from "../ui/text";
import { Button } from "../ui/button";

const years = Array.from(
  { length: new Date().getFullYear() - 1975 + 1 },
  (_, i) => 1975 + i
);

interface SearchFilterSheetProps {
  payload: Omit<SearchGameQuery, "query">;
}

export function SearchFilterSheet({ payload }: SearchFilterSheetProps) {
  const { height } = Dimensions.get("window");
  const { year } = payload;
  const [selectedYear, setSelectedYear] = useState<number>(
    year ?? new Date().getFullYear()
  );
  return (
    <ActionSheet
      containerStyle={{
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderTopWidth: s.borderWidth[4],
      }}
    >
      <View
        style={[
          mt.pxh(height - 50),
          mt.flexCol,
          mt.justify("flex-start"),
          mt.items("center"),
          mt.w("full"),
          mt.p(4),
        ]}
      >
        <YearPicker
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
        />
        <Button
          onPress={() => {
            payload.year = selectedYear;
            SheetManager.hide("searchFilterSheet", { payload });
          }}
        >
          <Text>Apply</Text>
        </Button>
      </View>
    </ActionSheet>
  );
}

function YearPicker({
  selectedYear,
  setSelectedYear,
}: {
  selectedYear: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <View
      style={[
        mt.border(2),
        mt.w(32),
        mt.flexRow,
        mt.items("center"),
        mt.justify("center"),
      ]}
    >
      <Text style={[mt.flex1, mt.align("center"), mt.fontWeight("bold")]}>
        {selectedYear}
      </Text>
      <Picker
        placeholder="Year"
        style={[mt.w("third"), mt.rounded("md"), mt.border(2), mt.p(0)]}
        itemStyle={[mt.fontWeight("bold")]}
        selectedValue={selectedYear}
        onValueChange={(itemValue) => {
          setSelectedYear(itemValue);
        }}
        prompt="Year"
        dropdownIconColor={s.colors.black}
      >
        {years.map((year) => (
          <Picker.Item
            key={year}
            label={year.toString()}
            value={year}
            style={[mt.border(2)]}
          />
        ))}
      </Picker>
    </View>
  );
}
