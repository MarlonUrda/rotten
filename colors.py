colors = {
  50: "#FFFDF6",
  100: "#FFFCED",
  200: "#FFF7D1",
  300: "#FEF3B5",
  400: "#FEE97E",
  500: "#FDE047",
  600: "#E4CA40",
  700: "#98862B",
  800: "#726520",
  900: "#4C4315",
}

# change to rgb
def hex_to_rgb(value):
    value = value.lstrip('#')
    lv = len(value)
    return tuple(int(value[i:i + lv // 3], 16) for i in range(0, lv, lv // 3))
  
for key, value in colors.items():
    print(f"{key}: \"rgba{hex_to_rgb(value)}\",")