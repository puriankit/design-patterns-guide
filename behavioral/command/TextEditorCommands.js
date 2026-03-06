/**
 * Command Pattern - Real World Example
 * Text editor with undo/redo functionality
 * 
 * Use Case: Implementing undo/redo in a text editor
 */

// Receiver - The object that performs the actual work
class TextEditor {
  constructor() {
    this.content = '';
  }
  
  write(text) {
    this.content += text;
  }
  
  delete(length) {
    this.content = this.content.slice(0, -length);
  }
  
  getContent() {
    return this.content || '(empty)';
  }
  
  setContent(content) {
    this.content = content;
  }
}

// Command Interface
class Command {
  execute() {
    throw new Error('execute() must be implemented');
  }
  
  undo() {
    throw new Error('undo() must be implemented');
  }
}

// Concrete Commands
class WriteCommand extends Command {
  constructor(editor, text) {
    super();
    this.editor = editor;
    this.text = text;
    this.previousContent = '';
  }
  
  execute() {
    this.previousContent = this.editor.getContent();
    this.editor.write(this.text);
    return `✍️  Wrote: "${this.text}"`;
  }
  
  undo() {
    this.editor.setContent(this.previousContent);
    return `↩️  Undid write: "${this.text}"`;
  }
}

class DeleteCommand extends Command {
  constructor(editor, length) {
    super();
    this.editor = editor;
    this.length = length;
    this.deletedText = '';
    this.previousContent = '';
  }
  
  execute() {
    this.previousContent = this.editor.getContent();
    const content = this.editor.getContent();
    this.deletedText = content.slice(-this.length);
    this.editor.delete(this.length);
    return `🗑️  Deleted: "${this.deletedText}"`;
  }
  
  undo() {
    this.editor.setContent(this.previousContent);
    return `↩️  Undid delete: "${this.deletedText}"`;
  }
}

class ClearCommand extends Command {
  constructor(editor) {
    super();
    this.editor = editor;
    this.previousContent = '';
  }
  
  execute() {
    this.previousContent = this.editor.getContent();
    this.editor.setContent('');
    return `🗑️  Cleared all content`;
  }
  
  undo() {
    this.editor.setContent(this.previousContent);
    return `↩️  Restored content`;
  }
}

class ReplaceCommand extends Command {
  constructor(editor, oldText, newText) {
    super();
    this.editor = editor;
    this.oldText = oldText;
    this.newText = newText;
    this.previousContent = '';
  }
  
  execute() {
    this.previousContent = this.editor.getContent();
    const content = this.editor.getContent();
    const newContent = content.replace(this.oldText, this.newText);
    this.editor.setContent(newContent);
    return `🔄 Replaced "${this.oldText}" with "${this.newText}"`;
  }
  
  undo() {
    this.editor.setContent(this.previousContent);
    return `↩️  Undid replace`;
  }
}

// Macro Command - Combines multiple commands
class MacroCommand extends Command {
  constructor(commands) {
    super();
    this.commands = commands;
  }
  
  execute() {
    const results = ['🎬 Executing macro command:'];
    this.commands.forEach(command => {
      results.push(`  ${command.execute()}`);
    });
    return results.join('\n');
  }
  
  undo() {
    const results = ['↩️  Undoing macro command:'];
    // Undo in reverse order
    for (let i = this.commands.length - 1; i >= 0; i--) {
      results.push(`  ${this.commands[i].undo()}`);
    }
    return results.join('\n');
  }
}

// Invoker - Manages command execution and history
class CommandManager {
  constructor() {
    this.history = [];
    this.currentIndex = -1;
  }
  
  executeCommand(command) {
    // Remove any commands after current index (for redo)
    this.history = this.history.slice(0, this.currentIndex + 1);
    
    const result = command.execute();
    this.history.push(command);
    this.currentIndex++;
    
    return result;
  }
  
  undo() {
    if (this.currentIndex < 0) {
      return '⚠️  Nothing to undo';
    }
    
    const command = this.history[this.currentIndex];
    const result = command.undo();
    this.currentIndex--;
    
    return result;
  }
  
  redo() {
    if (this.currentIndex >= this.history.length - 1) {
      return '⚠️  Nothing to redo';
    }
    
    this.currentIndex++;
    const command = this.history[this.currentIndex];
    const result = command.execute();
    
    return result;
  }
  
  canUndo() {
    return this.currentIndex >= 0;
  }
  
  canRedo() {
    return this.currentIndex < this.history.length - 1;
  }
  
  getHistory() {
    return this.history.map((cmd, index) => ({
      index,
      type: cmd.constructor.name,
      isCurrent: index === this.currentIndex
    }));
  }
  
  clearHistory() {
    this.history = [];
    this.currentIndex = -1;
  }
}

export default CommandManager;
export {
  TextEditor,
  WriteCommand,
  DeleteCommand,
  ClearCommand,
  ReplaceCommand,
  MacroCommand
};
