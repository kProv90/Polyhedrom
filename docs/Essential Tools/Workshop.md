# Feature: Workshop

## Overview
### Purpose
The cornerstone of Polyhedrom, the Workshop lets players design and build their own data display forms to suit their needs. This can range from anything as large and complex as character sheets or something as simple as a form fill-able sheet to outline a settlement or going even smaller, a house. 
## Technical Implementation

### Supporting Node.js Packages
List the primary npm packages needed for this feature:
- `vue-draggable-next` - Drag and drop package to enable simple drag and drop editing
- `vue-grid-layout-v3` - Responsive grid layout for components.
- `uuid` - Generate unique IDs for each component and variable.
- `mathjs` - For safe expression evaluation at runtime
### Vue Components Required
- `Ribbon Component` - A place to store all of the `wrapped Vueify` components for dragging from and dropping into the `Drafting` area. This should look similar to the ribbon component used in Microsoft office components.
- `Drafting Component` - The working area for the user's selected `wrapped Vueify` components. Will primarily function off a single `JSON` object which will be synced to the cloud.
- `Property Component` - The property editor for individual components. Allows the component to be assigned a unique variable, be named, run predetermined functions or mathematical calculations, edit the component's style, etc. 
### Data Structure
Outline the data models/schemas needed:

```ts
type ExpressionToken = 
    | { type: 'variable'; id: string; name: string; key: string }
    | { type: 'text'; value: string };

type WorkshopVariable = 
    | { id: string; dataType: 'boolean'; value: boolean; defaultValue?: boolean }
    | { id: string; dataType: 'string'; value: string; defaultValue?: string }
    | { id: string; dataType: 'number'; value: number; defaultValue?: number };

interface WorkshopExpression {
    id: string;
    name?: string;  // Optional friendly name
    tokens: ExpressionToken[];
}

interface WorkshopComponent {
    id: string;
    name: string;
    componentType: string;  // e.g., 'v-text-field', 'v-sheet'
    
    // Value binding (optional - not all components need data)
    binding?: 
        | { type: 'variable'; variableId: string }
        | { type: 'expression'; expressionId: string }
        | { type: 'static'; value: any };
    
    // Styling and props
    style: { [key: string]: any };
    props?: { [key: string]: any };  // Vuetify component props
    
    // Hierarchy
    children: { [key: string]: WorkshopComponent };
}

interface WorkshopTemplate {
    id: string;
    name: string;
    description?: string;  // Helpful for template library
    gameSystem?: string;  // e.g., "D&D 5e", "Pathfinder 2e"
    version?: number;  // For template versioning
    
    variables: { [key: string]: WorkshopVariable };
    expressions: { [key: string]: WorkshopExpression };
    components: { [key: string]: WorkshopComponent };
    
    // Optional metadata
    createdAt?: string;
    updatedAt?: string;
}
```

### API Endpoints
| Method  | Endpoint               | Purpose                                              |
| ------- | ---------------------- | ---------------------------------------------------- |
| `GET`   | `/api/templates/:id`   | Get a saved template by ID (user resolved from auth token) |
| `POST`  | `/api/templates`       | Save a new template                                  |
| `PATCH` | `/api/templates/:id`   | Update an existing template                          |
| `DELETE`| `/api/templates/:id`   | Delete a template                                    |

### State Management
- No state management needed. This feature is scoped to a single component. Attempting to navigate away from that component should prompt a dialog asking if the user wants to save before they exit.

## User Experience

### User Stories
- "As a GM, I want to create a custom NPC stat block template so that I can quickly track recurring villain stats"
- "As a player, I want to design my own character sheet so that it matches my character's unique abilities"

### UI/UX Considerations
- Key interface elements
- User flow diagrams or descriptions
- Accessibility requirements

### Mockups/Wireframes
- N/A

## Dependencies & Integration

### Feature Dependencies
List other features this one depends on or integrates with:
- Depends on: None, this is a core feature.
- Integrates with: All other features

### Third-Party Services
- No 3rd party APIs needed

## Implementation Details

### Complexity Estimate
- [ ] Low (1-2 days)
- [ ] Medium (3-5 days)
- [ ] High (1-2 weeks)
- [x] Very High (2+ weeks)

### Priority Level
- [x] Critical (Core functionality)
- [ ] High (Important for MVP)
- [ ] Medium (Nice to have)
- [ ] Low (Future enhancement)

### Development Phase
- [x] Phase 1 (MVP)
- [ ] Phase 2 (Post-launch)
- [ ] Phase 3 (Future)

### Technical Risks/Challenges
Potential obstacles or complex technical challenges:
- Unfamiliar with NodeJS packages 
- Unfamiliar with drag-and-drop event handling

## Testing & Quality

### Test Cases
Key scenarios that must be tested:
1. Test scenario description
2. Test scenario description

### Performance Considerations
- Expected load/usage patterns
- Performance targets (response time, etc.)
- Optimization strategies

## Documentation Needs

### User Documentation
- [x] Help text/tooltips needed
- [x] Tutorial/guide needed
- [ ] Video walkthrough needed

### Developer Documentation
- [ ] API documentation
- [x] Component documentation
- [ ] Architecture notes

## Future Enhancements

### Phase 1: Pre-Launch
- [ ] `v-sheet`
- [ ] `v-card`
- [ ] `v-text-field`
- [ ] `v-textarea`
- [ ] `v-btn`
- [ ] `v-progress-linear`
- [ ] `v-chip`
- [ ] `v-chip-group`
- [ ] `v-table`
- [ ] `v-checkbox`
- [ ] `v-combobox`
- [ ] `v-number-input`
- [ ] `v-select`
- [ ] `v-slider`
- [ ] `v-switch`
- [ ] `v-bottom-navigation` *Note: Not something the user can select. Standard for mobile views that mirror tabs for data consistency across devices.*
- [ ] `v-list`
- [ ] `v-tabs`
- [ ] `v-confirm-edit`
- [ ] `v-infinite-scroll`
- [ ] `v-stepper`
- [ ] `v-alert`
- [ ]  `v-dialog` *Note: Custom dialogs may be time consuming as they require a special way to edit them.*
- [ ] `v-avatar`
- [ ] `v-icon`
- [ ] `v-img`
### Phase 2: Post-Launch
- [ ] `v-divider`
- [ ] `v-expansion-panel`
- [ ] `v-toolbar`
- [ ] `v-tooltip`
- [ ] `v-fab`
- [ ] `v-speed-dial`
- [ ] `v-pagination`
- [ ] `v-data-iterator`
- [ ] `v-virtual-scroll`
- [ ] `v-item-group`
- [ ] `v-btn-toggle`
- [ ] `v-slide-group`
- [ ] `v-badge`
- [ ] `v-hover`
- [ ] `v-progress-circular`
- [ ] `v-rating`
- [ ] `v-skeleton-loader` *Note: Not something the users can use but will be used by all components to show they are loading.*
- [ ] `v-color-picker`
### Phase 3: Future
- [ ] `Custom components`*Note: This will require a `component builder` sub-component*
- [ ] `v-app-bar` *Note: Mobile-only*
- [ ] `v-menu`
- [ ] `v-overlay`
- [ ] `v-breadcrumbs`
- [ ] `v-footer`
- [ ] `v-navigation-drawer`
- [ ] `v-autocomplete`
- [ ] `v-file-input`
- [ ] `v-treeview`
- [ ] `v-carousel`
- [ ] `v-banner`
- [ ] `v-empty-state`
- [ ] `v-snackbar` and `v-snackbar-queue`

---

## Status Tracking

**Status:** 
- [x] Researched
- [x] Planned
- [ ] In Progress
- [ ] Testing
- [ ] Completed
- [ ] On Hold

**Assigned To:** K. Provo (Me)

**Started:** 11-09-2025

**Completed:** TBD

**Related Issues/Tasks:**
- Link to GitHub issues, Trello cards, etc.

---

## Notes
**How will users bind variables to components?**
- `Variable` will be a property the user will have access to in a component's property editor. It will bind to the same variable in the `DraftingTemplate` which will be reactive at runtime.
**How will formulas/calculations work?**
- My implement a `Function Builder` which would be similar to a calculator but also have the ability to utilize variables.
**Component nesting - how deep can it go? Need recursion limits?**
- Maximum depth should be no more than 5 excluding the parent `v-sheet` that will work to house all of the components. 

```vue
<v-sheet elevation="4">
	<v-tabs color="primary">
		<v-tab value="one">Item One</v-tab>
		<v-tab value="two">Item Two</v-tab>
		<v-tab value="three">Item Three</v-tab>
	</v-tabs>
	<v-divider> </v-divider>
	<v-tabs-window v-model="tab">
		<v-tabs-window-item value="one">
			<v-sheet class="pa-5" color="purple">One</v-sheet>
		</v-tabs-window-item>
		<v-tabs-window-item value="two">
			<v-sheet class="pa-5" color="orange">Two</v-sheet>
		</v-tabs-window-item>
		<v-tabs-window-item value="three">
			<v-sheet class="pa-5" color="brown">Three</v-sheet>
		</v-tabs-window-item>
	</v-tabs-window>
</v-sheet>
```
