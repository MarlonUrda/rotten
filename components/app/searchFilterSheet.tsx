import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import { Picker } from "@react-native-picker/picker";
import s from "@/styles/styleValues";
import { View, Dimensions } from "react-native";
import mt from "@/styles/mtWind";
import React, { useEffect, useRef, useState } from "react";
import { SearchGameQuery } from "@/types/api/games/getGameRequest";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Title } from "../ui/Title";
import { HorizontalTabs, Tab } from "../ui/tabs";
import { ScrollSelector } from "../ui/scrollSelector";
import { platforms } from "@/components/util/statics/platforms";
import { genres } from "../util/statics/genres";

const years = Array.from(
  { length: new Date().getFullYear() - 1975 + 1 },
  (_, i) => 1975 + i
);

const yearsAndUndefined = [undefined, ...years];

interface SearchFilterSheetProps {
  payload: Omit<SearchGameQuery, "query">;
}

export function SearchFilterSheet({ payload }: SearchFilterSheetProps) {
  const { height } = Dimensions.get("window");
  const { year, minYear, maxYear } = payload;
  const [selectedYear, setSelectedYear] = useState<number | undefined>(year);
  const [selectedMinYear, setSelectedMinYear] = useState<number | undefined>(
    minYear
  );
  const [selectedMaxYear, setSelectedMaxYear] = useState<number | undefined>(
    maxYear
  );
  const [selectedPlatforms, setSelectedPlatforms] = useState<(number | string)[]>(
    payload.platforms?.split(",").map((platform) => parseInt(platform)) ?? []
  );
  const [selectedGenres, setSelectedGenres] = useState<(number | string)[]>(
    payload.genres?.split(",").map((genre) => parseInt(genre)) ?? []
  );

  const [yearType, setYearType] = useState<"year" | "range">("year");
  return (
    <ActionSheet
      containerStyle={{
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderTopWidth: s.borderWidth[4],
      }}
      indicatorStyle={{ backgroundColor: s.colors.black, borderRadius: 0 }}
    >
      <View
        style={[
          mt.pxh(height - 50),
          mt.flexCol,
          mt.justify("flex-start"),
          mt.items("flex-start"),
          mt.w("full"),
          mt.p(4),
          mt.gap(4),
        ]}
      >
        <Title title="Manage Filters" color="white" size="2xl" />
        <View
          style={[
            mt.flex1,
            mt.flexCol,
            mt.justify("flex-start"),
            mt.items("flex-start"),
            mt.gap(4),
          ]}
        >
          <View
            style={[
              mt.flexCol,
              mt.justify("flex-start"),
              mt.items("flex-start"),
              mt.gap(2),
            ]}
          >
            <Title title="Release year" color="purple"></Title>
            <HorizontalTabs tabHeight={24}>
              <Tab
                name="Year"
                onSelected={() => {
                  setYearType("year");
                }}
              >
                <View style={[mt.flexCol, mt.gap(2), mt.justify("center")]}>
                  <MTPicker
                    selectedValue={selectedYear}
                    setSelectedValue={setSelectedYear}
                    allowedValues={yearsAndUndefined}
                    prompt="Select a year"
                  />
                </View>
              </Tab>
              {/* multiple years */}
              <Tab
                name="Range"
                onSelected={() => {
                  setYearType("range");
                }}
              >
                <View style={[mt.flexRow, mt.gap(2), mt.items("center")]}>
                  <MTPicker
                    selectedValue={selectedMinYear}
                    setSelectedValue={setSelectedMinYear}
                    allowedValues={
                      selectedMaxYear
                        ? yearsAndUndefined.filter(
                            (year) => year && year <= selectedMaxYear
                          )
                        : yearsAndUndefined
                    }
                    prompt="Select a year"
                  />
                  <Text>-</Text>
                  <MTPicker
                    selectedValue={selectedMaxYear}
                    setSelectedValue={setSelectedMaxYear}
                    allowedValues={
                      selectedMinYear
                        ? yearsAndUndefined.filter(
                            (year) => year && year >= selectedMinYear
                          )
                        : yearsAndUndefined
                    }
                    prompt="Select a year"
                  />
                </View>
              </Tab>
            </HorizontalTabs>
          </View>
          {/* platform filter */}
          <View
            style={[
              mt.flexCol,
              mt.justify("flex-start"),
              mt.items("flex-start"),
              mt.gap(2),
            ]}
          >
            <Title title="Platforms" color="red"></Title>
            <View
              style={[
                mt.flexRow,
                mt.gap(2),
                mt.justify("center"),
                mt.items("center"),
              ]}
            >
              <ScrollSelector
                allItems={[...platforms]}
                selectedItems={selectedPlatforms}
                setSelectedItems={setSelectedPlatforms}
              />
            </View>
          </View>
          {/* genre filter */}
          <View
            style={[
              mt.flexCol,
              mt.justify("flex-start"),
              mt.items("flex-start"),
              mt.gap(2),
            ]}
        >
            <Title title="Genres" color="blue"></Title>
            <View
              style={[
                mt.flexRow,
                mt.gap(2),
                mt.justify("center"),
                mt.items("center"),
              ]}
            >
              <ScrollSelector
                allItems={[...genres]}
                selectedItems={selectedGenres}
                setSelectedItems={setSelectedGenres}
              />
            </View>
          </View>
        </View>
        <View style={[mt.w("full"), mt.flexCol, mt.gap(2)]}>
          <Button
            onPress={() => {
              payload.year = yearType === "year" ? selectedYear : undefined;
              payload.minYear =
                yearType === "range" ? selectedMinYear : undefined;
              payload.maxYear =
                yearType === "range" ? selectedMaxYear : undefined;
              payload.platforms =
                selectedPlatforms.length > 0
                  ? selectedPlatforms.join(",")
                  : undefined;
              payload.genres =
                selectedGenres.length > 0 ? selectedGenres.join(",") : undefined;


              SheetManager.hide("searchFilterSheet", {
                payload: {
                  filters: payload,
                  clear: false,
                },
              });
            }}
          >
            <Text>Apply</Text>
          </Button>

          <Button
            variant="error"
            onPress={() => {
              SheetManager.hide("searchFilterSheet", {
                payload: {
                  filters: payload,
                  clear: true,
                },
              });
            }}
          >
            <Text>Clear Filters</Text>
          </Button>
        </View>
      </View>
    </ActionSheet>
  );
}

function MTPicker<T extends number | undefined>({
  selectedValue,
  setSelectedValue,
  allowedValues,
  prompt,
}: {
  selectedValue: T;
  setSelectedValue: React.Dispatch<React.SetStateAction<T>>;
  allowedValues: T[];
  prompt?: string;
}) {
  const pickerRef = useRef<Picker<T>>(null);
  return (
    <View style={[mt.flexCol]}>
      <Button
        onPress={() => {
          pickerRef.current?.focus();
        }}
        variant="white"
      >
        <View style={[mt.flexRow, mt.gap(2)]}>
          <Text>{selectedValue ?? "Select"}</Text>
          <MaterialCommunityIcons
            name="chevron-down"
            size={24}
            color={s.colors.black}
          />
        </View>
      </Button>
      <View style={[mt.hidden, mt.opacity(0)]}>
        <Picker
          ref={pickerRef}
          placeholder={prompt ?? "Select"}
          selectedValue={selectedValue}
          onValueChange={(itemValue) => {
            setSelectedValue(itemValue);
          }}
          prompt={prompt ?? "Select a value"}
        >
          {allowedValues.map((value, index) => (
            <Picker.Item
              key={index}
              label={value === undefined ? "Select a year" : value.toString()}
              value={value}
              style={[mt.border(2)]}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
}
