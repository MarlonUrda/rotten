import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import { Picker } from "@react-native-picker/picker";
import s from "@/styles/styleValues";
import { View, Dimensions } from "react-native";
import mt, { MTTypes } from "@/styles/mtWind";
import React, { useEffect, useRef, useState } from "react";
import { SearchGameQuery } from "@/types/api/games/getGameRequest";
import { Text } from "../ui/text";
import { Button, FlatButton } from "../ui/button";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Title } from "../ui/Title";
import { HorizontalTabs, Tab } from "../ui/tabs";
import { ScrollSelector } from "../ui/scrollSelector";
import { platforms } from "@/components/util/statics/platforms";
import { genres } from "../util/statics/genres";
import { GameRating, GameRatingProps } from "./gameRating";

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

  const [selectedYear, setSelectedYear] = useState<number | undefined>(
    payload.year
  );
  const [selectedMinYear, setSelectedMinYear] = useState<number | undefined>(
    payload.minYear
  );
  const [selectedMaxYear, setSelectedMaxYear] = useState<number | undefined>(
    payload.maxYear
  );
  const [selectedPlatforms, setSelectedPlatforms] = useState<
    (number | string)[]
  >(payload.platforms?.split(",").map((platform) => parseInt(platform)) ?? []);
  const [selectedGenres, setSelectedGenres] = useState<(number | string)[]>(
    payload.genres?.split(",").map((genre) => parseInt(genre)) ?? []
  );

  const [minRating, setMinRating] = useState<number | undefined>(
    payload.minRating
  );
  const [maxRating, setMaxRating] = useState<number | undefined>(
    payload.maxRating
  );
  const [minCriticsRating, setMinCriticsRating] = useState<number | undefined>(
    payload.minCriticsRating
  );
  const [maxCriticsRating, setMaxCriticsRating] = useState<number | undefined>(
    payload.maxCriticsRating
  );

  const [yearType, setYearType] = useState<"year" | "range">("year");

  const handleClose = () => {
    payload.year = yearType === "year" ? selectedYear : undefined;
    payload.minYear = yearType === "range" ? selectedMinYear : undefined;
    payload.maxYear = yearType === "range" ? selectedMaxYear : undefined;
    payload.platforms =
      selectedPlatforms.length > 0 ? selectedPlatforms.join(",") : undefined;
    payload.genres =
      selectedGenres.length > 0 ? selectedGenres.join(",") : undefined;
    payload.minRating = minRating;
    payload.maxRating = maxRating;
    payload.minCriticsRating = minCriticsRating;
    payload.maxCriticsRating = maxCriticsRating;

    SheetManager.hide("searchFilterSheet", {
      payload: {
        filters: payload,
        clear: false,
      },
    });
  };

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
          mt.pxh(height),
          mt.flexCol,
          mt.justify("flex-start"),
          mt.items("flex-start"),
          mt.w("full"),
          mt.p(4),
          mt.gap(4),
        ]}
      >
        <Title title="Manage Filters" color="white" size="xl" />
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
            <TitleWithClearButton
              clearValue={() => {
                setSelectedYear(undefined);
                setSelectedMinYear(undefined);
                setSelectedMaxYear(undefined);
              }}
              title="Year"
              color="purple"
            ></TitleWithClearButton>
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
            <TitleWithClearButton
              clearValue={() => setSelectedPlatforms([])}
              title="Platforms"
              color="red"
            ></TitleWithClearButton>
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
            <TitleWithClearButton
              clearValue={() => setSelectedGenres([])}
              title="Genres"
              color="blue"
            ></TitleWithClearButton>
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
          {/* rating filter */}
          <View
            style={[
              mt.flexCol,
              mt.justify("flex-start"),
              mt.items("flex-start"),
              mt.gap(2),
            ]}
          >
            <TitleWithClearButton
              clearValue={() => {
                setMinRating(undefined);
                setMaxRating(undefined);
              }}
              title="User Rating"
              color="green"
            ></TitleWithClearButton>
            <RatingSelector
              minRating={minRating}
              maxRating={maxRating}
              setMinRating={setMinRating}
              setMaxRating={setMaxRating}
            />
          </View>
          {/* critic rating filter */}
          <View
            style={[
              mt.flexCol,
              mt.justify("flex-start"),
              mt.items("flex-start"),
              mt.gap(2),
            ]}
          >
            <TitleWithClearButton
              clearValue={() => {
                setMinCriticsRating(undefined);
                setMaxCriticsRating(undefined);
              }}
              title="Critic Rating"
              color="yellow"
            ></TitleWithClearButton>
            <RatingSelector
              minRating={minCriticsRating}
              maxRating={maxCriticsRating}
              setMinRating={setMinCriticsRating}
              setMaxRating={setMaxCriticsRating}
            />
          </View>
        </View>
        <View
          style={[
            mt.w("full"),
            mt.flexRow,
            mt.items("flex-end"),
            mt.justify("flex-end"),
            mt.gap(2),
          ]}
        >
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
            <Text>Clear All</Text>
          </Button>
          <Button onPress={handleClose}>
            <Text>Apply</Text>
          </Button>
        </View>
      </View>
    </ActionSheet>
  );
}

function TitleWithClearButton({
  clearValue,
  title,
  color,
}: {
  clearValue: () => void;
  title: string;
  color: MTTypes["Color"];
}) {
  return (
    <View style={[mt.flexRow, mt.justify("space-between"), mt.w("full")]}>
      <Title title={title} color={color}></Title>
      <FlatButton onPress={clearValue} variant="error">
        <Text>Clear</Text>
      </FlatButton>
    </View>
  );
}

function RatingSelector({
  minRating,
  maxRating,
  setMinRating,
  setMaxRating,
}: {
  minRating: number | undefined;
  maxRating: number | undefined;
  setMinRating: React.Dispatch<React.SetStateAction<number | undefined>>;
  setMaxRating: React.Dispatch<React.SetStateAction<number | undefined>>;
}) {
  return (
    <View
      style={[
        mt.flexCol,
        mt.gap(2),
        mt.justify("flex-start"),
        mt.items("flex-start"),
      ]}
    >
      <View
        style={[
          mt.flexRow,
          mt.gap(2),
          mt.justify("center"),
          mt.items("center"),
          mt.w("full"),
        ]}
      >
        <GameRating
          rating={minRating ?? 0}
          onChange={(rating) => {
            if (maxRating === undefined) {
              setMinRating(rating);
              return;
            }
            if (rating > maxRating) {
              setMinRating(rating);
              setMaxRating(rating);
              return;
            }
            setMinRating(rating);
          }}
        />

        <Text>-</Text>
        <GameRating
          rating={maxRating ?? 0}
          onChange={(rating) => {
            if (minRating === undefined) {
              setMaxRating(rating);
              return;
            }
            if (rating < minRating) {
              setMinRating(rating);
              setMaxRating(rating);
              return;
            }
            setMaxRating(rating);
          }}
        />
      </View>
    </View>
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
