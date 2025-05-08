# 🧠 Morphological Box Builder

A flexible, interactive tool for scenario generation using morphological analysis. This application helps users explore complex problem spaces by breaking them down into variants and options, enabling structured creativity and systematic exploration.

## 🚀 Features

- **Variants & Options Management**  
  Create and manage multiple variants and their corresponding options to build a morphological field.

- **Scenario Generation**  
  Combine options into scenarios to simulate real-world cases — like default, edge, or average scenarios.

- **Visualization**  
  Visual interface to navigate and edit variant-option relationships and scenario configurations.

- **Data Persistence**  
  Auto-saves data in local storage, with support for import/export in JSON format.

- **Export Capabilities**  
  Download your morphological analysis as a PDF for documentation or presentation.

- **Undo & Redo**  
  Easy mistake recovery with undo functionality.

## 📊 Example Use Case

You're designing a complex B2B software licensing model. Using the Morphological Box Builder, you can:

- Define variants like "License Type", "Billing Type", "Fulfillment Method", etc.
- Add all possible options per variant.
- Build and compare different licensing scenarios.
- Export findings for stakeholders or implementation.

## 📦 Installation

This is a web-based tool — no installation required. However, if you want to run it locally:

```bash
git clone https://github.com/YOUR_USERNAME/morphological-box-builder.git
cd morphological-box-builder
npm install
npm run dev
```

## 📁 File Structure

```
.
├── public/             # Static assets
├── src/
│   ├── components/     # UI components
│   ├── data/           # Default configurations
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   └── pages/          # App pages and routing
├── assets/             # Screenshots and media (optional)
├── README.md
├── package.json
└── vite.config.js
```

## 🧩 Technology Stack

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- PDF export via [`jspdf`](https://github.com/parallax/jsPDF)

## 🌍 Live Demo

Try the Morphological Box Builder now:  
👉 [https://morphological-box.vercel.app/](https://morphological-box.vercel.app/)

## 🛠️ Development Notes

- Scenarios are calculated as the Cartesian product of all variant options.
- The app currently supports:
  - 15 variants
  - 57 total options
  - 47,923,200 theoretical combinations

## 📄 License

This project is licensed under the GNU Affero General Public License v3.0 (AGPL-3.0).

You may copy, distribute, and modify the software as long as you disclose your source code and include the same license. This license is especially suited for SaaS and web-based applications, ensuring that improvements and derivatives remain open when deployed over a network.

For more details, see the full license text: [GNU AGPL v3.0](https://www.gnu.org/licenses/agpl-3.0.html)

## ✨ Credits

Created and maintained by [Yelle](https://yel.li)  
Inspired by the morphological analysis method of Fritz Zwicky.

---

Feel free to contribute or suggest improvements via Pull Requests or Issues.
