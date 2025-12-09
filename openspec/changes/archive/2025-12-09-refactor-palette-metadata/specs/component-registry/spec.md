# Spec: Component Registry System

## ADDED Requirements

### Requirement: Component Definition Schema
The system MUST support defining palette components via a serializable data structure.

#### Scenario: Defining a basic shape
Given a JSON configuration for a "Rectangle"
When the system processes this configuration
Then it should identify it as a 'shapes' category item
And it should map the 'lucide' icon name 'Square' to a visual icon
And it should associate the 'createShape' action with the default props `{ type: 'rectangle', width: 80 }`

#### Scenario: Defining a custom SVG component
Given a configuration for a "Custom Motor" with an SVG icon type
And the content is `<path d='...' />`
When the component is rendered in the palette
Then it should display the SVG path within a standard 24x24 container

### Requirement: Palette Rendering
The Component Palette MUST render items dynamically based on the provided registry list.

#### Scenario: Categorization
Given a list containing both 'shapes' and 'machine' category items
When the Palette renders
Then it should group items visually under "Basic Shapes" and "Machine Components" headers respectively

### Requirement: Interaction Mapping
The system MUST map abstract data actions to concrete application handlers.

#### Scenario: Adding a shape
Given a 'Rectangle' item in the palette with `actionType: 'createShape'`
When the user clicks the item
Then the system should invoke the `onAddShape` handler
And pass the `defaultProps` defined in the item's metadata
