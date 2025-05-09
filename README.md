
# 🧠 Morphological Box Builder

A flexible, interactive tool for scenario generation using morphological analysis. This application helps users explore complex problem spaces by breaking them down into variants and options, enabling structured creativity and systematic exploration.

## 🚀 Features

- **Variants & Options Management**  
  Define and manage variants (dimensions) and their corresponding options (values) to build a morphological field.

- **Scenario Generation**  
  Combine one option per variant to create and analyze real-world scenarios.

- **Statistics Dashboard**  
  Get insights like total variants, options, possible combinations, and scenario coverage.

- **Scenario Visualization**  
  Visual lines show scenario structures across the morphological box.

- **Undo & Redo**  
  Easily revert or reapply changes.

- **Export & Share**  
  Export your morphological box as a PDF or save/load work using JSON. Share links are also supported.

- **Auto-Save**  
  All changes are automatically stored in your browser.

## 📊 Example Use Case

Imagine modeling the properties of fruits and vegetables:

- Define variants like "Color", "Size", "Shape", "Texture", etc.
- Populate each with relevant options.
- Create combinations like "Apple" or "Zucchini" and compare characteristics.
- Export your model or share with others.

## 📈 Current App Stats (Example)

- **Variants**: 10  
- **Total Options**: 40 (avg. 4.0 per variant)  
- **Scenarios**: 3  
- **Total Combinations**: 720,000  
- **Scenario Coverage**: 0.000417%  
- **Most Used Options**:  
  - Category: Fruit (2)  
  - Shape: Round (2)  
  - Texture: Waxy (2)

## 🍎 Example Variants & Options

```
Category:            Fruit, Vegetable
Color:               Red, Green, Yellow, Orange, Purple
Size:                Small, Medium, Large
Shape:               Round, Oval, Elongated, Irregular
Texture:             Smooth, Rough, Waxy, Hairy
Taste:               Sweet, Sour, Bitter, Umami, Bland
Consumption Type:    Raw, Cooked, Juiced, Dried
Growth Environment:  Tree-grown, Bush-grown, Vine-grown, Root vegetable, Leaf vegetable
Seasonality:         Year-round, Spring, Summer, Autumn, Winter
Shelf Life:          Short (<1 week), Medium (1–2 weeks), Long (>2 weeks)
```

## 📦 Installation

This is a web-based tool — no installation required. To run it locally:

```bash
git clone https://github.com/YOUR_USERNAME/morphological-box-builder.git
cd morphological-box-builder
npm install
npm run dev
```

## 🧩 Technology Stack

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- PDF export via [`jspdf`](https://github.com/parallax/jsPDF)

## 🌍 Live Demo

Try the Morphological Box Builder now:  
👉 [https://morphbox.yel.li](https://morphbox.yel.li)

## 📄 License

This project is licensed under the GNU Affero General Public License v3.0 (AGPL-3.0).  
See the full license: [GNU AGPL v3.0](https://www.gnu.org/licenses/agpl-3.0.html)

## ✨ Credits

Created and maintained by [Yelle](https://yel.li)  
Inspired by the morphological analysis method of Fritz Zwicky.

---

Feel free to contribute or suggest improvements via Pull Requests or Issues.
