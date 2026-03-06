# Command Pattern 🎮

## What is it?

The Command pattern turns a request into a stand-alone object that contains all information about the request. This lets you parameterize methods with different requests, delay or queue a request's execution, and support undoable operations.

## Real-World Analogy 🌍

Think of a **restaurant order**:
- Waiter writes down your order (command object)
- Order goes to kitchen (queued)
- Chef executes order (execute command)
- You can cancel order (undo)
- Order slip contains all info needed

Another example: **TV remote control** - each button is a command that can be executed, undone, or replayed.

## When to Use It? 🤔

Use Command when:
- You want to **parameterize objects** with operations
- You need to **queue operations** or schedule them
- You want to implement **undo/redo** functionality
- You need to **log operations** for auditing
- Examples: Text editors (undo/redo), task schedulers, transaction systems

## Problem it Solves ❌

Without Command:
```javascript
// Direct coupling
button.onClick = () => {
  light.turnOn();
  // Hard to undo, log, or queue
};
```

With Command:
```javascript
// Encapsulated as command
const command = new TurnOnLightCommand(light);
button.setCommand(command);
button.press(); // Executes command
command.undo(); // Can undo!
```

## Key Benefits ✅

- **Decouples sender from receiver**: Button doesn't know about light
- **Undo/Redo support**: Easy to implement
- **Queueing**: Commands can be queued and executed later
- **Logging**: Track all operations
- **Macro commands**: Combine multiple commands

## Code Example

See the following files for complete working examples:
- `TextEditorCommands.js` - Command pattern for text editing
- `CommandExample.js` - React Native component demonstrating usage

## Common Pitfalls ⚠️

- **Too many command classes**: Can be verbose
- **Memory overhead**: Storing command history
- **Complexity**: Adds extra layer of abstraction

## Remember This! 💡

**"Turn actions into objects"** - Like a restaurant order slip, commands encapsulate all information needed to perform an action!
