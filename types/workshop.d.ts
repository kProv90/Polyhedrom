/**
 * Token in an expression string.
 * Can be a dynamic variable reference or static text.
 */
type ExpressionToken =
  | { type: 'variable'; id: string; name: string; key: string }
  | { type: 'text'; value: string }

/**
 * Variable used in a workshop template.
 * Supports boolean, string, or number data types.
 */
type WorkshopVariable =
  | { id: string; dataType: 'boolean'; value: boolean; defaultValue?: boolean }
  | { id: string; dataType: 'string'; value: string; defaultValue?: string }
  | { id: string; dataType: 'number'; value: number; defaultValue?: number }

/**
 * A computed expression composed of tokens.
 */
interface WorkshopExpression {
  /** Unique expression UUID */
  id: string
  /** Optional friendly display name */
  name?: string
  /** List of tokens (variables and text) forming the expression */
  tokens: ExpressionToken[]
}

/**
 * A UI control within the workshop designer.
 */
interface WorkshopControl {
  /** Unique control UUID */
  id: string
  /** Control internal name */
  name: string
  /** Vue component identifier (e.g., 'v-text-field', 'v-sheet') */
  componentType: string

  /** Grid column position (0-indexed) */
  x: number
  /** Grid row position (0-indexed) */
  y: number
  /** Width in grid cells */
  w: number
  /** Height in grid cells */
  h: number

  /**
   * Data binding configuration.
   * Connects the control value to a variable, expression, or static value.
   */
  binding?:
    | { type: 'variable'; variableId: string }
    | { type: 'expression'; expressionId: string }
    | { type: 'static'; value: any }

  /** CSS styles objects */
  style: { [key: string]: any }
  /** Control specific props (e.g. Vuetify props) */
  props?: { [key: string]: any }

  /** Child controls indexed by ID */
  children: { [key: string]: WorkshopControl }
}

/**
 * Full Workshop Template definition.
 * Contains the schema for a dynamic sheet/form.
 */
interface WorkshopTemplate {
  /** Unique template UUID */
  id: string
  /** Display name of the template */
  name: string
  /** Optional description for library listing */
  description?: string
  /** Associated game system (e.g., "D&D 5e") */
  gameSystem?: string
  /** Template version for tracking changes */
  version?: number

  /** Variables definition map */
  variables: { [key: string]: WorkshopVariable }
  /** Expressions definition map */
  expressions: { [key: string]: WorkshopExpression }
  /** Control tree root map */
  controls: { [key: string]: WorkshopControl }
  dimensions: 'a4' | 'letter' | 'notecard' | 'playingcard' | { width: number; height: number }
  /** Creation timestamp (ISO string) */
  createdAt?: string
  /** Last update timestamp (ISO string) */
  updatedAt?: string
}
