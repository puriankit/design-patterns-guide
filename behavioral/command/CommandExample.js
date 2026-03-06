/**
 * Command Pattern - React Native Component Example
 * Demonstrates how Command pattern enables undo/redo functionality
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import CommandManager, {
  TextEditor,
  WriteCommand,
  DeleteCommand,
  ClearCommand,
  ReplaceCommand,
  MacroCommand
} from './TextEditorCommands';

const CommandExample = () => {
  const [logs, setLogs] = useState([]);
  const [editor] = useState(new TextEditor());
  const [manager] = useState(new CommandManager());
  const [, forceUpdate] = useState(0);
  
  const addLog = (message) => {
    setLogs(prev => [...prev, message]);
  };
  
  const refresh = () => {
    forceUpdate(n => n + 1);
  };
  
  const demonstrateBasicCommands = () => {
    addLog('\n🧪 BASIC COMMAND PATTERN');
    addLog('━'.repeat(40));
    
    const textEditor = new TextEditor();
    const commandManager = new CommandManager();
    
    addLog('Executing commands:');
    addLog(commandManager.executeCommand(new WriteCommand(textEditor, 'Hello ')));
    addLog(`Content: "${textEditor.getContent()}"`);
    
    addLog(commandManager.executeCommand(new WriteCommand(textEditor, 'World!')));
    addLog(`Content: "${textEditor.getContent()}"`);
    
    addLog('\n✅ Commands executed and stored in history!');
  };
  
  const demonstrateUndoRedo = () => {
    addLog('\n🧪 UNDO/REDO FUNCTIONALITY');
    addLog('━'.repeat(40));
    
    const textEditor = new TextEditor();
    const commandManager = new CommandManager();
    
    addLog('Writing text:');
    commandManager.executeCommand(new WriteCommand(textEditor, 'React '));
    commandManager.executeCommand(new WriteCommand(textEditor, 'Native '));
    commandManager.executeCommand(new WriteCommand(textEditor, 'Rocks!'));
    addLog(`Content: "${textEditor.getContent()}"`);
    
    addLog('\nUndoing last command:');
    addLog(commandManager.undo());
    addLog(`Content: "${textEditor.getContent()}"`);
    
    addLog('\nUndoing again:');
    addLog(commandManager.undo());
    addLog(`Content: "${textEditor.getContent()}"`);
    
    addLog('\nRedoing:');
    addLog(commandManager.redo());
    addLog(`Content: "${textEditor.getContent()}"`);
    
    addLog('\n✅ Undo/Redo works perfectly!');
  };
  
  const demonstrateMacroCommand = () => {
    addLog('\n🧪 MACRO COMMAND (Multiple Commands)');
    addLog('━'.repeat(40));
    
    const textEditor = new TextEditor();
    const commandManager = new CommandManager();
    
    addLog('Creating macro command:');
    const macro = new MacroCommand([
      new WriteCommand(textEditor, 'Design '),
      new WriteCommand(textEditor, 'Patterns '),
      new WriteCommand(textEditor, 'Are '),
      new WriteCommand(textEditor, 'Awesome!')
    ]);
    
    addLog(commandManager.executeCommand(macro));
    addLog(`Content: "${textEditor.getContent()}"`);
    
    addLog('\nUndoing macro (undoes all commands):');
    addLog(commandManager.undo());
    addLog(`Content: "${textEditor.getContent()}"`);
    
    addLog('\n✅ Macro command groups multiple commands!');
  };
  
  const demonstrateInteractive = () => {
    addLog('\n🧪 INTERACTIVE EDITOR');
    addLog('━'.repeat(40));
    addLog('Use the buttons below to interact with the editor!');
    addLog(`Current content: "${editor.getContent()}"`);
  };
  
  const writeText = (text) => {
    const result = manager.executeCommand(new WriteCommand(editor, text));
    addLog(result);
    addLog(`Content: "${editor.getContent()}"`);
    refresh();
  };
  
  const deleteText = (length) => {
    const result = manager.executeCommand(new DeleteCommand(editor, length));
    addLog(result);
    addLog(`Content: "${editor.getContent()}"`);
    refresh();
  };
  
  const clearText = () => {
    const result = manager.executeCommand(new ClearCommand(editor));
    addLog(result);
    addLog(`Content: "${editor.getContent()}"`);
    refresh();
  };
  
  const replaceText = () => {
    const result = manager.executeCommand(new ReplaceCommand(editor, 'Hello', 'Hi'));
    addLog(result);
    addLog(`Content: "${editor.getContent()}"`);
    refresh();
  };
  
  const undoCommand = () => {
    const result = manager.undo();
    addLog(result);
    addLog(`Content: "${editor.getContent()}"`);
    refresh();
  };
  
  const redoCommand = () => {
    const result = manager.redo();
    addLog(result);
    addLog(`Content: "${editor.getContent()}"`);
    refresh();
  };
  
  const demonstrateBenefits = () => {
    addLog('\n🧪 COMMAND PATTERN BENEFITS');
    addLog('━'.repeat(40));
    
    addLog('💡 Why use Command Pattern?');
    addLog('  1. Decouples sender from receiver');
    addLog('  2. Easy undo/redo implementation');
    addLog('  3. Commands can be queued and scheduled');
    addLog('  4. Commands can be logged for auditing');
    addLog('  5. Supports macro commands (composite)');
    
    addLog('\n📝 Real-world use cases:');
    addLog('  • Text editors (undo/redo)');
    addLog('  • Graphics editors (Photoshop, Figma)');
    addLog('  • Database transactions');
    addLog('  • Task schedulers');
    addLog('  • Game action replay');
    addLog('  • Remote controls');
    
    addLog('\n✅ Turn requests into objects!');
  };
  
  const clearLogs = () => {
    setLogs([]);
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎮 Command Pattern Demo</Text>
      <Text style={styles.subtitle}>Text Editor with Undo/Redo</Text>
      
      <View style={styles.editorBox}>
        <Text style={styles.editorLabel}>Editor Content:</Text>
        <Text style={styles.editorContent}>{editor.getContent()}</Text>
      </View>
      
      <View style={styles.controlBar}>
        <TouchableOpacity 
          style={[styles.controlButton, !manager.canUndo() && styles.disabledButton]} 
          onPress={undoCommand}
          disabled={!manager.canUndo()}
        >
          <Text style={styles.controlButtonText}>↩️ Undo</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.controlButton, !manager.canRedo() && styles.disabledButton]} 
          onPress={redoCommand}
          disabled={!manager.canRedo()}
        >
          <Text style={styles.controlButtonText}>↪️ Redo</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.buttonGrid}>
        <TouchableOpacity style={styles.button} onPress={demonstrateBasicCommands}>
          <Text style={styles.buttonText}>Basic Commands</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={demonstrateUndoRedo}>
          <Text style={styles.buttonText}>Undo/Redo</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={demonstrateMacroCommand}>
          <Text style={styles.buttonText}>Macro Command</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={demonstrateInteractive}>
          <Text style={styles.buttonText}>Interactive</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.button, styles.writeButton]} onPress={() => writeText('Hello ')}>
          <Text style={styles.buttonText}>Write "Hello"</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.button, styles.writeButton]} onPress={() => writeText('World!')}>
          <Text style={styles.buttonText}>Write "World!"</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => deleteText(6)}>
          <Text style={styles.buttonText}>Delete 6 chars</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.button, styles.replaceButton]} onPress={replaceText}>
          <Text style={styles.buttonText}>Replace Text</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={clearText}>
          <Text style={styles.buttonText}>Clear All</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.secondaryButton]} 
          onPress={demonstrateBenefits}
        >
          <Text style={styles.buttonText}>Show Benefits</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.clearButton]} 
          onPress={clearLogs}
        >
          <Text style={styles.buttonText}>Clear Logs</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.logContainer}>
        <Text style={styles.logTitle}>📋 Console Logs:</Text>
        {logs.map((log, index) => (
          <Text key={index} style={styles.logText}>{log}</Text>
        ))}
      </ScrollView>
      
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>💡 Key Takeaway</Text>
        <Text style={styles.infoText}>
          Command pattern turns requests into objects, enabling undo/redo,
          queuing, and logging. Like a restaurant order slip!
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  editorBox: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#007AFF',
    minHeight: 60,
  },
  editorLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  editorContent: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  controlBar: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  controlButton: {
    flex: 1,
    backgroundColor: '#5856D6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#C7C7CC',
  },
  controlButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    minWidth: '30%',
    flex: 1,
  },
  writeButton: {
    backgroundColor: '#34C759',
  },
  deleteButton: {
    backgroundColor: '#FF9500',
  },
  replaceButton: {
    backgroundColor: '#5856D6',
  },
  clearButton: {
    backgroundColor: '#FF3B30',
  },
  secondaryButton: {
    backgroundColor: '#34C759',
  },
  buttonText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
  logContainer: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  logTitle: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  logText: {
    color: '#e0e0e0',
    fontSize: 11,
    fontFamily: 'monospace',
    marginBottom: 3,
  },
  infoBox: {
    backgroundColor: '#E3F2FD',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 14,
    color: '#424242',
    lineHeight: 20,
  },
});

export default CommandExample;
