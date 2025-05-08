"use client"

import { ExternalLink } from "lucide-react"

export function Footer() {
  return (
    <footer className="mt-12 py-6 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600">© {new Date().getFullYear()} Morphological Box Builder</p>
          </div>
          <div className="flex items-center">
            <p className="text-sm text-gray-600 mr-2">Created by</p>
            <a
              href="https://yel.li"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
            >
              yel.li
              <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
