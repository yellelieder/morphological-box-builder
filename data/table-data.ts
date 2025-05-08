import type { TableData } from "@/types/table-data"

export const initialTableData: TableData = [
  {
    name: "Variant/Trigger",
    options: ["Forecast", "Customer Order"],
  },
  {
    name: "Variant Configuration",
    options: ["Without variant configuration (standard product)", "With variant configuration (configurable product)"],
  },
  {
    name: "BOM",
    options: ["Without Bill of Material", "With Bill of Material (structured component list)"],
  },
  {
    name: "Stock Type",
    options: ["Stock (held in inventory)", "Non-Stock (not stored, direct delivery)"],
  },
  {
    name: "Billing Type",
    options: ["Supplier billing (invoicing by supplier)", "Self billing"],
  },
  {
    name: "License Type",
    options: ["Perpetual License", "Term License", "Subscription License", "Royalty / Usage License"],
  },
  {
    name: "License Purpose",
    options: ["Evaluation License", "Development License", "Production License"],
  },
  {
    name: "License Scope",
    options: ["Group License", "Company License", "Partner License", "Named User License", "Concurrent License"],
  },
  {
    name: "License Validity Region",
    options: [
      "Local / Site-based License",
      "Country-specific License",
      "Regional License (e.g. EU)",
      "Global License",
      "Dual-Use / Restricted Region",
    ],
  },
  {
    name: "Pricing Model",
    options: [
      "Per unit pricing",
      "Subscription-based pricing",
      "Pay-per-use pricing",
      "Fixed price",
      "Fixed rate (e.g., hourly)",
      "Volume-based pricing",
      "Tiered usage pricing",
      "Stairstep usage pricing",
      "Variant-based pricing",
      "Mark-up pricing",
      "Upfront payment (once received)",
      "Retrospective payment (after resale)",
      "T&M",
    ],
  },
  {
    name: "Payment Frequency",
    options: ["Monthly payment", "Yearly payment", "Quarterly payment", "One-time payment"],
  },
  {
    name: "Contract Type",
    options: ["Single purchase order", "Frame contract (long-term agreement)"],
  },
  {
    name: "Usage Type",
    options: [
      "Reselling (pass-through to customer)",
      "Assembled into product or service",
      "OEM/White Labeling (brand replacement)",
    ],
  },
  {
    name: "Fulfillment Method",
    options: [
      "Download / Electronic Delivery",
      "Cloud-based Access / SaaS",
      "On-premise Installation",
      "Physical Shipment (e.g. device)",
    ],
  },
  {
    name: "Deployment Model",
    options: ["Cloud (public/private)", "On-premise", "Edge / Embedded", "Hybrid"],
  },
]
