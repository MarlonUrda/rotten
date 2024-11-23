import { ScrollView, View } from "react-native";
import { CPushButton } from "./button";
import { FlashList } from "@shopify/flash-list";
import React, { useMemo } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Text } from "./text";
import s from "@/styles/styleValues";
import mt from "@/styles/mtWind";
import { Pressable } from "react-native";

interface Item {
  id: string | number;
  name: string;
  icon?: string;
}

interface ScrollSelectorProps {
  allItems: Item[];
  selectedItems: (string | number)[];
  setSelectedItems: React.Dispatch<React.SetStateAction<(string | number)[]>>;
}

export function ScrollSelector({
  allItems,
  selectedItems,
  setSelectedItems,
}: ScrollSelectorProps) {
  const [viewAll, setViewAll] = React.useState(false);
  const allSelected = useMemo(() => {
    const selectedString = selectedItems.map((item) => 
      allItems.find((i) => i.id === item)?.name
    ).join(", ");

    return viewAll ? selectedString : selectedString.length > 20 ? selectedString.slice(0, 20) + "..." : selectedString;
  }, [allItems, viewAll]);
  const canViewMore = useMemo(() => {
    return allSelected.length > 20;
  }, [allSelected]);

  return (
    <View>
      <FlashList
        horizontal
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={100}
        data={allItems}
        contentContainerStyle={
          {
            paddingBottom: s.pixels[2],
          }
        }
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const isSelected = selectedItems.includes(item.id);
          return (
            <View style={[mt.px(2)]}>
              <CPushButton
                isPushed={isSelected}
                key={item.id}
                variant={isSelected ? "primary" : "secondary"}
                onPress={() => {
                  if (isSelected) {
                    setSelectedItems(
                      selectedItems.filter((id) => id !== item.id)
                    );
                  } else {
                    setSelectedItems([...selectedItems, item.id]);
                  }
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  {item.icon && (
                    // @ts-ignore
                    <MaterialCommunityIcons name={item.icon} size={24} />
                  )}

                  <Text>{item.name}</Text>
                </View>
              </CPushButton>
            </View>
          );
        }}
      />
      <View
      //flexcol
      style={[mt.flexCol, mt.justify("flex-start"), mt.items("flex-start")]}
      >
        <View
          style={[mt.flexRow, mt.justify("flex-start"), mt.flexWrap, mt.items("flex-end"), mt.gap(1)]}
        >

        <Text style={[mt.mt(2), mt.maxW("full")]}>
          Selected:{" "}
          <Text
            style={[mt.fontWeight("bold")]}
          >

          {allSelected}

          </Text>
        </Text>
          {canViewMore && (
            <Pressable onPress={() => setViewAll(!viewAll)}
              style={[mt.flexRow, mt.justify("center"), mt.items("center")]}
            >
              <Text style={[mt.fontWeight("bold"), mt.color("blue", 600)]}>
                {viewAll ? "View less" : "View all"}
              </Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}
