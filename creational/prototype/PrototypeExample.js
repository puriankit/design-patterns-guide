/**
 * Prototype Pattern - React Native Component Example
 * Demonstrates how Prototype pattern enables object cloning
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Document, { InvoiceDocument } from './DocumentPrototype';

const PrototypeExample = () => {
  const [logs, setLogs] = useState([]);
  
  const addLog = (message) => {
    setLogs(prev => [...prev, message]);
  };
  
  const demonstrateBasicCloning = () => {
    addLog('\n🧪 BASIC DOCUMENT CLONING');
    addLog('━'.repeat(40));
    
    // Create original document
    addLog('Creating original document...');
    const original = new Document(
      'Project Proposal',
      'This is a detailed project proposal for our new mobile app...',
      {
        author: 'John Doe',
        tags: ['proposal', 'mobile', 'important'],
        category: 'Business'
      }
    );
    
    addLog('✅ Original created:');
    addLog(JSON.stringify(original.getInfo(), null, 2));
    
    // Clone the document
    addLog('\n📋 Cloning document...');
    const clone = original.clone();
    clone.setTitle('Project Proposal - Copy');
    clone.setAuthor('Jane Smith');
    
    addLog('✅ Clone created and modified:');
    addLog(JSON.stringify(clone.getInfo(), null, 2));
    
    addLog('\n🔍 Verification:');
    addLog(`Original title: ${original.title}`);
    addLog(`Clone title: ${clone.title}`);
    addLog(`Original author: ${original.metadata.author}`);
    addLog(`Clone author: ${clone.metadata.author}`);
    addLog('\n✅ Clone is independent from original!');
  };
  
  const demonstrateDeepCloning = () => {
    addLog('\n🧪 DEEP CLONING TEST');
    addLog('━'.repeat(40));
    
    const doc1 = new Document(
      'Template',
      'Content here',
      {
        author: 'Admin',
        tags: ['template', 'reusable']
      }
    );
    
    addLog('Original tags: ' + JSON.stringify(doc1.metadata.tags));
    
    const doc2 = doc1.clone();
    doc2.addTag('cloned');
    
    addLog('After adding tag to clone:');
    addLog(`Original tags: ${JSON.stringify(doc1.metadata.tags)}`);
    addLog(`Clone tags: ${JSON.stringify(doc2.metadata.tags)}`);
    addLog('\n✅ Deep cloning works! Tags are independent.');
  };
  
  const demonstrateInvoiceCloning = () => {
    addLog('\n🧪 INVOICE CLONING');
    addLog('━'.repeat(40));
    
    // Create invoice template
    addLog('Creating invoice template...');
    const template = new InvoiceDocument(
      'Invoice Template',
      'Standard invoice format',
      {
        author: 'Accounting Dept',
        category: 'Finance'
      },
      {
        invoiceNumber: 'INV-TEMPLATE',
        amount: 0,
        items: []
      }
    );
    
    template.setFormatting({
      fontSize: 12,
      fontFamily: 'Helvetica',
      color: '#333333'
    });
    
    addLog('✅ Template created');
    
    // Clone for customer 1
    addLog('\n📋 Creating invoice for Customer 1...');
    const invoice1 = template.clone();
    invoice1
      .setTitle('Invoice - Customer 1')
      .setInvoiceNumber('INV-001')
      .setAmount(1500)
      .addItem({ name: 'Service A', price: 1000 })
      .addItem({ name: 'Service B', price: 500 });
    
    addLog('✅ Invoice 1:');
    addLog(JSON.stringify(invoice1.getInfo(), null, 2));
    
    // Clone for customer 2
    addLog('\n📋 Creating invoice for Customer 2...');
    const invoice2 = template.clone();
    invoice2
      .setTitle('Invoice - Customer 2')
      .setInvoiceNumber('INV-002')
      .setAmount(2500)
      .addItem({ name: 'Service C', price: 2500 });
    
    addLog('✅ Invoice 2:');
    addLog(JSON.stringify(invoice2.getInfo(), null, 2));
    
    addLog('\n✅ Both invoices created from same template!');
  };
  
  const demonstrateBenefits = () => {
    addLog('\n🧪 PROTOTYPE PATTERN BENEFITS');
    addLog('━'.repeat(40));
    
    addLog('💡 Why use Prototype Pattern?');
    addLog('  1. Avoid expensive initialization');
    addLog('  2. Create objects without knowing their class');
    addLog('  3. Add/remove objects at runtime');
    addLog('  4. Reduce subclassing');
    addLog('\n📝 Real-world use cases:');
    addLog('  • Document templates');
    addLog('  • Game character cloning');
    addLog('  • Configuration presets');
    addLog('  • Form templates');
    addLog('\n✅ Clone and customize instead of rebuild!');
  };
  
  const clearLogs = () => {
    setLogs([]);
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧬 Prototype Pattern Demo</Text>
      <Text style={styles.subtitle}>Document Cloning System</Text>
      
      <View style={styles.buttonGrid}>
        <TouchableOpacity style={styles.button} onPress={demonstrateBasicCloning}>
          <Text style={styles.buttonText}>Basic Cloning</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={demonstrateDeepCloning}>
          <Text style={styles.buttonText}>Deep Clone Test</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={demonstrateInvoiceCloning}>
          <Text style={styles.buttonText}>Invoice Cloning</Text>
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
          Prototype pattern lets you clone objects instead of recreating them.
          Like using a template, you copy and customize instead of building from scratch!
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

export default PrototypeExample;
