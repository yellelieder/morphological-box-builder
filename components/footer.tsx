"use client"

import { ExternalLink, Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="mt-12 py-6 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600">© {new Date().getFullYear()} morphbox</p>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/yellelieder/morphological-box-builder"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-gray-800 flex items-center"
            >
              <Github className="mr-1 h-4 w-4" />
              GitHub
            </a>
            <a
              href="https://morphbox.yel.li"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-gray-800 flex items-center"
            >
              morphbox.yel.li
              <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
