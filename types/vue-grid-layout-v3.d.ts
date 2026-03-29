declare module 'vue-grid-layout-v3' {
  import { DefineComponent, ComponentPublicInstance } from 'vue'

  /** Layout item interface — matches the actual runtime shape */
  export interface LayoutItem {
    i: string | number
    x: number
    y: number
    w: number
    h: number
    minW?: number
    minH?: number
    maxW?: number
    maxH?: number
    static?: boolean
    isDraggable?: boolean
    isResizable?: boolean
    moved?: boolean
    [key: string]: any // Allow custom data (like your `component`, `props`, `variable`)
  }

  /** GridLayout component */
  export const GridLayout: DefineComponent<
    {
      /** Layout array */
      layout: LayoutItem[]

      /** Number of columns in the grid */
      colNum?: number

      /** Height of one row in pixels */
      rowHeight?: number

      /** Max rows (optional) */
      maxRows?: number

      /** Margin between grid items [horizontal, vertical] */
      margin?: [number, number]

      /** Whether items are draggable */
      isDraggable?: boolean

      /** Whether items are resizable */
      isResizable?: boolean

      /** Whether to use CSS transforms for positioning */
      useCssTransforms?: boolean

      /** Auto-compact vertically */
      verticalCompact?: boolean

      /** Responsive mode (requires breakpoints) */
      responsive?: boolean

      /** Breakpoints for responsive mode */
      breakpoints?: Record<string, number>

      /** Number of columns at each breakpoint */
      cols?: Record<string, number>

      /** Prevent collision between items */
      preventCollision?: boolean

      /** Restore layout on mount */
      restoreOnDrag?: boolean

      /** Custom class for the container */
      class?: string | string[] | Record<string, boolean>

      /** Custom style for the container */
      style?: Record<string, any>
    },
    {
      /** Emitted when layout changes (drag, resize, etc.) */
      'layout-updated': (layout: LayoutItem[]) => void

      /** Emitted before layout update */
      'layout-before-mount': (layout: LayoutItem[]) => void

      /** Emitted when a breakpoint changes */
      'breakpoint-changed': (newBreakpoint: string, newLayout: LayoutItem[]) => void

      /** Emitted when an item starts being dragged */
      'drag-start': (i: string | number, layout: LayoutItem[]) => void

      /** Emitted when an item is being dragged */
      drag: (i: string | number, layout: LayoutItem[]) => void

      /** Emitted when drag ends */
      'drag-end': (i: string | number, layout: LayoutItem[]) => void

      /** Emitted when resize starts */
      'resize-start': (i: string | number, layout: LayoutItem[]) => void

      /** Emitted during resize */
      resize: (i: string | number, layout: LayoutItem[]) => void

      /** Emitted when resize ends */
      'resize-end': (i: string | number, layout: LayoutItem[]) => void
    }
  >

  /** GridItem component */
  export const GridItem: DefineComponent<
    {
      /** X position (column) */
      x?: number

      /** Y position (row) */
      y?: number

      /** Width in grid units */
      w?: number

      /** Height in grid units */
      h?: number

      /** Unique identifier */
      i?: string | number

      /** Minimum width */
      minW?: number

      /** Minimum height */
      minH?: number

      /** Maximum width */
      maxW?: number

      /** Maximum height */
      maxH?: number

      /** Whether this item is static (not movable/resizable) */
      static?: boolean

      /** Override draggable */
      isDraggable?: boolean

      /** Override resizable */
      isResizable?: boolean
    },
    {},
    ComponentPublicInstance
  >
}
