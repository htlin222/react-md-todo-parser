![GitHub stars](https://img.shields.io/github/stars/htlin222/react-md-todo-parser?style=flat-square)
![Last commit](https://img.shields.io/github/last-commit/htlin222/react-md-todo-parser?style=flat-square)
![License](https://img.shields.io/github/license/htlin222/react-md-todo-parser?style=flat-square)

# TodoFinder Component

A React component that parses and manages todo items in markdown format with a modern, interactive interface. The component provides real-time statistics, urgent task management, and code section highlighting.

## Features

- Markdown-based todo list management
- Real-time todo parsing and updating
- Progress tracking with color-coded indicators
- Urgent task management with toggleable badges
- Code section highlighting (text between checkbox and colon)
- Responsive statistics dashboard
- TypeScript support

## Installation

This component uses shadcn/ui components. Make sure you have the following components installed:

```bash
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add button
npx shadcn-ui@latest add textarea
npx shadcn-ui@latest add checkbox
npx shadcn-ui@latest add label
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add card
npx shadcn-ui@latest add progress
```

## Usage

### Basic Implementation

```tsx
import TodoFinder from './TodoFinder';

function App() {
  return (
    <div>
      <TodoFinder />
    </div>
  );
}
```

### Markdown Syntax

The component recognizes the following markdown patterns:

- Regular todo: `- [ ] Task description`
- Completed todo: `- [x] Completed task`
- Urgent todo: `- [ ] Urgent task!`
- Code section: `- [ ] code: description`

## Features in Detail

### 1. Todo Management

- Parse markdown-formatted todos
- Toggle completion status with checkboxes
- Real-time updates as you type
- Preserves line breaks and formatting

### 2. Progress Tracking

Color-coded progress bar based on completion percentage:

- Red: <25%
- Yellow: 25-49%
- Blue: 50-74%
- Emerald: 75-99%
- Green: 100%

### 3. Statistics Dashboard

Shows:

- Total number of todos
- Completed tasks
- Pending tasks
- Urgent tasks
- Overall completion percentage

### 4. Urgent Tasks

- Mark/unmark tasks as urgent by clicking the badge
- Urgent tasks are marked with '!' in markdown
- Visual indicator with red badge and alert icon

### 5. Code Section Highlighting

- Text between checkbox and colon is highlighted as code
- Useful for categorizing tasks (e.g., `fix:`, `feat:`, `docs:`)

## TypeScript Interfaces

### Todo Interface

```typescript
interface Todo {
  id: number;
  done: boolean;
  text: string;
  displayText: string;
  isUrgent: boolean;
  fullMatch: string;
  start: number;
  end: number;
}
```

### Stats Interface

```typescript
interface Stats {
  total: number;
  completed: number;
  pending: number;
  urgent: number;
  percentComplete: number;
}
```

## Example

```markdown
- [ ] feat: implement new feature
- [x] fix: resolve bug in layout
- [ ] urgent task!
- [ ] regular task
- [x] docs: update readme
```

## Component Structure

The component is organized into several main sections:

1. State Management
   - Text content
   - Todo items
   - Statistics
   - Dialog visibility

2. Core Functions
   - `findTodos`: Parses markdown and updates state
   - `toggleTodo`: Handles todo completion
   - `toggleUrgent`: Manages urgent status
   - `updateStats`: Calculates statistics
   - `getProgressColor`: Determines progress bar color

3. UI Components
   - Textarea for markdown input
   - Dialog for todo list and statistics
   - Progress indicators
   - Interactive todo items

## Dependencies

- React 18+
- TypeScript 4.5+
- shadcn/ui components
- Lucide React for icons
- Tailwind CSS for styling

## Styling

The component uses Tailwind CSS for styling with shadcn/ui theming. Key styling features:

- Responsive layout
- Color-coded status indicators
- Smooth transitions
- Hover effects on interactive elements
- Consistent spacing and typography

## Browser Support

Works in all modern browsers that support:

- CSS Grid
- CSS Flexbox
- CSS Transitions
- Modern JavaScript features
