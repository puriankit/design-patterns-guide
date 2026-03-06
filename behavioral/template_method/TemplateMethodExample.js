/**
 * Template Method Pattern - React Native Component Example
 * Demonstrates how Template Method defines algorithm skeleton
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import DataProcessor, {
  CSVProcessor,
  JSONProcessor,
  XMLProcessor,
  MarkdownProcessor
} from './DataProcessor';

const TemplateMethodExample = () => {
  const [logs, setLogs] = useState([]);
  
  const addLogs = (messages) => {
    setLogs(prev => [...prev, ...messages]);
  };
  
  const demonstrateBasicTemplate = () => {
    const messages = ['\n🧪 BASIC TEMPLATE METHOD'];
    messages.push('━'.repeat(40));
    
    const data = 'Hello World';
    
    messages.push('Processing same data with different processors:');
    messages.push(`Input: "${data}"`);
    
    const csvProcessor = new CSVProcessor();
    messages.push(...csvProcessor.process(data));
    
    addLogs(messages);
  };
  
  const demonstrateAllProcessors = () => {
    const messages = ['\n🧪 ALL PROCESSORS'];
    messages.push('━'.repeat(40));
    
    const data = 'Design Patterns';
    
    const processors = [
      new CSVProcessor(),
      new JSONProcessor(),
      new XMLProcessor(),
      new MarkdownProcessor()
    ];
    
    processors.forEach(processor => {
      messages.push(...processor.process(data));
    });
    
    messages.push('\n✅ Same algorithm, different implementations!');
    addLogs(messages);
  };
  
  const demonstrateSameStructure = () => {
    const messages = ['\n🧪 SAME STRUCTURE, DIFFERENT RESULTS'];
    messages.push('━'.repeat(40));
    
    messages.push('All processors follow the same steps:');
    messages.push('  1. Validate data');
    messages.push('  2. Transform data (customized)');
    messages.push('  3. Process data (customized)');
    messages.push('  4. Format output (customized)');
    messages.push('  5. Save results');
    
    messages.push('\n✅ Steps 1 & 5 are common (in base class)');
    messages.push('✅ Steps 2, 3 & 4 are customized (in subclasses)');
    
    addLogs(messages);
  };
  
  const demonstrateCodeReuse = () => {
    const messages = ['\n🧪 CODE REUSE DEMONSTRATION'];
    messages.push('━'.repeat(40));
    
    messages.push('❌ Without Template Method:');
    messages.push('  class CSVProcessor {');
    messages.push('    process() {');
    messages.push('      validate();  // Duplicated');
    messages.push('      transformCSV();');
    messages.push('      processCSV();');
    messages.push('      save();  // Duplicated');
    messages.push('    }');
    messages.push('  }');
    messages.push('  class JSONProcessor {');
    messages.push('    process() {');
    messages.push('      validate();  // Duplicated again!');
    messages.push('      transformJSON();');
    messages.push('      processJSON();');
    messages.push('      save();  // Duplicated again!');
    messages.push('    }');
    messages.push('  }');
    
    messages.push('\n✅ With Template Method:');
    messages.push('  class DataProcessor {');
    messages.push('    process() {  // Template method');
    messages.push('      validate();  // Common - defined once');
    messages.push('      transform();  // Subclass implements');
    messages.push('      processData();  // Subclass implements');
    messages.push('      save();  // Common - defined once');
    messages.push('    }');
    messages.push('  }');
    
    messages.push('\n💡 Common code in one place, no duplication!');
    addLogs(messages);
  };
  
  const demonstrateValidation = () => {
    const messages = ['\n🧪 VALIDATION IN TEMPLATE'];
    messages.push('━'.repeat(40));
    
    const processor = new CSVProcessor();
    
    messages.push('Testing with valid data:');
    messages.push(...processor.process('Valid Data'));
    
    messages.push('\nTesting with invalid data:');
    messages.push(...processor.process(''));
    
    messages.push('\n✅ Validation is enforced by template method!');
    addLogs(messages);
  };
  
  const demonstrateBenefits = () => {
    const messages = ['\n🧪 TEMPLATE METHOD BENEFITS'];
    messages.push('━'.repeat(40));
    
    messages.push('💡 Why use Template Method Pattern?');
    messages.push('  1. Eliminates code duplication');
    messages.push('  2. Enforces consistent algorithm structure');
    messages.push('  3. Common steps defined once in base class');
    messages.push('  4. Subclasses customize only specific steps');
    messages.push('  5. Inversion of control (Hollywood Principle)');
    
    messages.push('\n📝 Real-world use cases:');
    messages.push('  • Data processing pipelines');
    messages.push('  • Game AI (same logic, different behaviors)');
    messages.push('  • Document generators (same structure, different formats)');
    messages.push('  • Testing frameworks (setup, test, teardown)');
    messages.push('  • Build systems (compile, test, package)');
    messages.push('  • Web frameworks (request handling)');
    
    messages.push('\n⚠️  vs Strategy Pattern:');
    messages.push('  • Template Method: Uses inheritance');
    messages.push('  • Strategy: Uses composition');
    messages.push('  • Template Method: Fixed algorithm structure');
    messages.push('  • Strategy: Interchangeable algorithms');
    
    messages.push('\n✅ Perfect for algorithms with fixed steps!');
    addLogs(messages);
  };
  
  const clearLogs = () => {
    setLogs([]);
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 Template Method Demo</Text>
      <Text style={styles.subtitle}>Data Processing Pipeline</Text>
      
      <View style={styles.buttonGrid}>
        <TouchableOpacity style={styles.button} onPress={demonstrateBasicTemplate}>
          <Text style={styles.buttonText}>Basic Template</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={demonstrateAllProcessors}>
          <Text style={styles.buttonText}>All Processors</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={demonstrateSameStructure}>
          <Text style={styles.buttonText}>Same Structure</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={demonstrateCodeReuse}>
          <Text style={styles.buttonText}>Code Reuse</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={demonstrateValidation}>
          <Text style={styles.buttonText}>Validation</Text>
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
          Template Method defines algorithm skeleton in base class.
          Subclasses customize specific steps. Like a recipe with fixed steps!
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
    fontSize: 12,
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

export default TemplateMethodExample;
