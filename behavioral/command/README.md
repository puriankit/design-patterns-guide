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

Use Command when you need to turn requests into objects that can be stored, queued, or undone.

### Perfect Use Cases:

**1. Undo/Redo Functionality**
- Why: Users need to undo/redo actions (text editors, drawing apps)
- Benefit: Store command history, execute in reverse

**2. Task Scheduling**
- Why: Operations need to be queued and executed later
- Benefit: Commands can be scheduled, prioritized, delayed

**3. Transaction Systems**
- Why: Operations must be atomic and reversible
- Benefit: Rollback on failure, commit on success

**4. Macro Recording**
- Why: Record sequence of actions and replay them
- Benefit: Combine multiple commands into one macro

**5. Remote Execution**
- Why: Send operations over network
- Benefit: Serialize commands, execute remotely

### When NOT to Use:
- ❌ Simple direct method calls are sufficient
- ❌ No need for undo/redo or queuing
- ❌ Adds unnecessary complexity

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

### 1. **Decouples Sender from Receiver**
Invoker doesn't need to know about the receiver.

**Real-World Impact:**
- Flexible architecture
- Easy to change receivers
- Better testability
- Loose coupling

**Example:** Button executes command. Command controls light. Button knows nothing about light. Swap light for fan? Just change command. Button unchanged!

### 2. **Undo/Redo Support**
Easily implement undo/redo by storing command history.

**Real-World Impact:**
- Better user experience
- Mistake recovery
- Experimentation friendly
- Professional applications

**Example:** Text editor with undo/redo. Each edit is a command. Undo = execute reverse. Redo = execute forward. Simple and powerful!

### 3. **Command Queuing**
Queue commands for later execution.

**Real-World Impact:**
- Background processing
- Scheduled tasks
- Priority queues
- Batch operations

**Example:** Email app queues send commands. No internet? Commands wait in queue. Connection restored? Execute all queued commands!

### 4. **Logging and Auditing**
Track all operations for debugging and compliance.

**Real-World Impact:**
- Audit trail
- Debugging history
- Compliance requirements
- Replay scenarios

**Example:** Banking app logs every transaction as command. Audit trail shows who did what when. Replay commands to reproduce bugs!

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
