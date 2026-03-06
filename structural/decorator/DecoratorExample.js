/**
 * Decorator Pattern - React Native Component Example
 * Demonstrates how Decorator pattern adds features dynamically
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import {
  TextComponent,
  BoldDecorator,
  ItalicDecorator,
  UnderlineDecorator,
  ColorDecorator,
  UppercaseDecorator,
  EmojiDecorator
} from './TextDecorator';

const DecoratorExample = () => {
  const [logs, setLogs] = useState([]);
  
  const addLog = (message) => {
    setLogs(prev => [...prev, message]);
  };
  
  const demonstrateBasicDecorator = () => {
    addLog('\n🧪 BASIC DECORATOR');
    addLog('━'.repeat(40));
    
    let text = new TextComponent('Hello World');
    addLog(`Original: ${text.render()}`);
    addLog(`Description: ${text.getDescription()}`);
    addLog(`Cost: ${text.getCost()}`);
    
    text = new BoldDecorator(text);
    addLog(`\nAfter Bold: ${text.render()}`);
    addLog(`Description: ${text.getDescription()}`);
    addLog(`Cost: ${text.getCost()}`);
    
    text = new ItalicDecorator(text);
    addLog(`\nAfter Italic: ${text.render()}`);
    addLog(`Description: ${text.getDescription()}`);
    addLog(`Cost: ${text.getCost()}`);
    
    addLog('\n✅ Each decorator adds new behavior!');
  };
  
  const demonstrateMultipleDecorators = () => {
    addLog('\n🧪 STACKING DECORATORS');
    addLog('━'.repeat(40));
    
    let text = new TextComponent('React Native');
    
    addLog('Building formatted text step by step:');
    addLog(`1. Start: ${text.render()}`);
    
    text = new BoldDecorator(text);
    addLog(`2. + Bold: ${text.render()}`);
    
    text = new ItalicDecorator(text);
    addLog(`3. + Italic: ${text.render()}`);
    
    text = new UnderlineDecorator(text);
    addLog(`4. + Underline: ${text.render()}`);
    
    text = new ColorDecorator(text, 'blue');
    addLog(`5. + Color: ${text.render()}`);
    
    text = new EmojiDecorator(text, '🚀');
    addLog(`6. + Emoji: ${text.render()}`);
    
    addLog(`\nFinal Description: ${text.getDescription()}`);
    addLog(`Total Cost: ${text.getCost()} units`);
    
    addLog('\n✅ Decorators stack like layers!');
  };
  
  const demonstrateFlexibility = () => {
    addLog('\n🧪 FLEXIBLE COMBINATIONS');
    addLog('━'.repeat(40));
    
    const baseText = 'Design Patterns';
    
    // Combination 1
    let text1 = new TextComponent(baseText);
    text1 = new BoldDecorator(text1);
    text1 = new UppercaseDecorator(text1);
    addLog(`Style 1: ${text1.render()}`);
    addLog(`Cost: ${text1.getCost()}`);
    
    // Combination 2
    let text2 = new TextComponent(baseText);
    text2 = new ItalicDecorator(text2);
    text2 = new ColorDecorator(text2, 'red');
    text2 = new EmojiDecorator(text2, '❤️');
    addLog(`\nStyle 2: ${text2.render()}`);
    addLog(`Cost: ${text2.getCost()}`);
    
    // Combination 3
    let text3 = new TextComponent(baseText);
    text3 = new UnderlineDecorator(text3);
    text3 = new BoldDecorator(text3);
    addLog(`\nStyle 3: ${text3.render()}`);
    addLog(`Cost: ${text3.getCost()}`);
    
    addLog('\n✅ Same base, different decorations!');
  };
  
  const demonstrateVsInheritance = () => {
    addLog('\n🧪 DECORATOR VS INHERITANCE');
    addLog('━'.repeat(40));
    
    addLog('❌ With Inheritance:');
    addLog('  - BoldText class');
    addLog('  - ItalicText class');
    addLog('  - BoldItalicText class');
    addLog('  - BoldItalicUnderlineText class');
    addLog('  - BoldItalicUnderlineColorText class');
    addLog('  ... (class explosion!)');
    
    addLog('\n✅ With Decorator:');
    addLog('  - TextComponent (base)');
    addLog('  - BoldDecorator');
    addLog('  - ItalicDecorator');
    addLog('  - UnderlineDecorator');
    addLog('  - ColorDecorator');
    addLog('  ... (mix and match!)');
    
    addLog('\n💡 Decorator is much more flexible!');
  };
  
  const demonstrateBenefits = () => {
    addLog('\n🧪 DECORATOR PATTERN BENEFITS');
    addLog('━'.repeat(40));
    
    addLog('💡 Why use Decorator Pattern?');
    addLog('  1. Add features at runtime');
    addLog('  2. Avoid class explosion');
    addLog('  3. Combine features flexibly');
    addLog('  4. Follow Open/Closed Principle');
    addLog('\n📝 Real-world use cases:');
    addLog('  • Text formatting (like this example)');
    addLog('  • Adding features to UI components');
    addLog('  • Middleware in web frameworks');
    addLog('  • Stream wrappers (compression, encryption)');
    addLog('  • Coffee shop ordering system');
    addLog('\n✅ Wrap and enhance, don\'t modify!');
  };
  
  const clearLogs = () => {
    setLogs([]);
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎨 Decorator Pattern Demo</Text>
      <Text style={styles.subtitle}>Text Formatting System</Text>
      
      <View style={styles.buttonGrid}>
        <TouchableOpacity style={styles.button} onPress={demonstrateBasicDecorator}>
          <Text style={styles.buttonText}>Basic Decorator</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={demonstrateMultipleDecorators}>
          <Text style={styles.buttonText}>Stack Decorators</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={demonstrateFlexibility}>
          <Text style={styles.buttonText}>Flexible Combos</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={demonstrateVsInheritance}>
          <Text style={styles.buttonText}>vs Inheritance</Text>
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
          Decorator pattern lets you add features to objects dynamically.
          Like adding toppings to pizza, stack decorators to build exactly what you need!
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
    marginBottom: 20,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    minWidth: '30%',
    flex: 1,
  },
  secondaryButton: {
    backgroundColor: '#34C759',
  },
  clearButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: 'white',
    fontSize: 13,
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

export default DecoratorExample;
