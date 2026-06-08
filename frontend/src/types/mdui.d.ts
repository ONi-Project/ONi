// MDUI v2 Web Components TypeScript declarations for React JSX

import "react"

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      // Navigation
      "mdui-navigation-drawer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & { open?: boolean }
      "mdui-navigation-rail": any
      "mdui-navigation-rail-item": any
      "mdui-list-item": any

      // Buttons & Chips
      "mdui-button": any
      "mdui-button-icon": any
      "mdui-fab": any
      "mdui-chip": any
      "mdui-segmented-button": any
      "mdui-segmented-button-group": any

      // Cards
      "mdui-card": any

      // Icons
      "mdui-icon": any

      // Dialogs
      "mdui-dialog": any

      // Text fields
      "mdui-text-field": any

      // Progress
      "mdui-circular-progress": any
      "mdui-linear-progress": any

      // Snackbar
      "mdui-snackbar": any

      // Tabs
      "mdui-tabs": any
      "mdui-tab": any
      "mdui-tab-panel": any
      "mdui-tab-bar": any

      // Other
      "mdui-dropdown": any
      "mdui-menu": any
      "mdui-menu-item": any
      "mdui-select": any
      "mdui-select-option": any
      "mdui-slider": any
      "mdui-switch": any
      "mdui-checkbox": any
      "mdui-radio": any
      "mdui-avatar": any
      "mdui-badge": any
      "mdui-tooltip": any
      "mdui-divider": any
      "mdui-list": any
      "mdui-collapse": any
      "mdui-collapse-item": any
      "mdui-ripple": any
      "mdui-top-app-bar": any
      "mdui-top-app-bar-title": any

      // Table
      "mdui-table": any
      "mdui-table-column": any
      "mdui-table-row": any
      "mdui-table-cell": any
    }
  }
}
