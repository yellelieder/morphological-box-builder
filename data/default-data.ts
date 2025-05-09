import type { TableData } from "@/types/table-data"
import type { Scenario } from "@/types/scenario"

export const defaultData = {
  tableData: [
    {
      name: "Category",
      options: ["Fruit", "Vegetable"],
    },
    {
      name: "Color",
      options: ["Red", "Green", "Yellow", "Orange", "Purple"],
    },
    {
      name: "Size",
      options: ["Small", "Medium", "Large"],
    },
    {
      name: "Shape",
      options: ["Round", "Oval", "Elongated", "Irregular"],
    },
    {
      name: "Texture",
      options: ["Smooth", "Rough", "Waxy", "Hairy"],
    },
    {
      name: "Taste",
      options: ["Sweet", "Sour", "Bitter", "Umami", "Bland"],
    },
    {
      name: "Consumption Type",
      options: ["Raw", "Cooked", "Juiced", "Dried"],
    },
    {
      name: "Growth Environment",
      options: ["Tree-grown", "Bush-grown", "Vine-grown", "Root vegetable", "Leaf vegetable"],
    },
    {
      name: "Seasonality",
      options: ["Year-round", "Spring", "Summer", "Autumn", "Winter"],
    },
    {
      name: "Shelf Life",
      options: ["Short (<1 week)", "Medium (1–2 weeks)", "Long (>2 weeks)"],
    },
  ],
  scenarios: [
    {
      id: "1746773123559",
      name: "Apple",
      color: "#f53b51",
      selections: {
        Category: "Fruit",
        Color: "Red",
        Size: "Medium",
        Shape: "Round",
        Texture: "Waxy",
        Taste: "Sour",
        "Consumption Type": "Raw",
        "Growth Environment": "Tree-grown",
        Seasonality: "Autumn",
        "Shelf Life": "Long (>2 weeks)",
      },
    },
    {
      id: "1746773724933",
      name: "Zucchini",
      color: "#00c956",
      selections: {
        Category: "Vegetable",
        Color: "Green",
        Size: "Large",
        Shape: "Elongated",
        Texture: "Waxy",
        Taste: "Bitter",
        "Consumption Type": "Cooked",
        "Growth Environment": "Bush-grown",
        Seasonality: "Summer",
        "Shelf Life": "Short (<1 week)",
      },
    },
    {
      id: "1746773774305",
      name: "Mandarin",
      color: "#f5a53b",
      selections: {
        Category: "Fruit",
        Color: "Orange",
        Size: "Small",
        Shape: "Round",
        Texture: "Rough",
        Taste: "Sour",
        "Consumption Type": "Juiced",
        "Growth Environment": "Tree-grown",
        Seasonality: "Summer",
        "Shelf Life": "Medium (1–2 weeks)",
      },
    },
  ],
  title: "Morphological Box: Fruits & Vegetables",
} as {
  tableData: TableData
  scenarios: Scenario[]
  title: string
}
