/**
 * Adapter Pattern - React Native Component Example
 * Demonstrates how Adapter pattern makes incompatible interfaces work together
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import {
  LegacyPaymentSystem,
  StripePaymentSystem,
  ModernPaymentSystem,
  LegacyPaymentAdapter,
  StripePaymentAdapter
} from './PaymentAdapter';

const AdapterExample = () => {
  const [logs, setLogs] = useState([]);
  
  const addLog = (message) => {
    setLogs(prev => [...prev, message]);
  };
  
  const processPaymentWithSystem = (processor, systemName) => {
    addLog(`\n💳 Processing payment with ${systemName}...`);
    
    const paymentData = {
      amount: 99.99,
      currency: 'USD',
      cardNumber: '**** **** **** 1234'
    };
    
    const result = processor.processPayment(paymentData);
    addLog(`✅ ${result.message}`);
    addLog(`   Transaction ID: ${result.transactionId}`);
    addLog(`   Amount: $${result.amount} ${result.currency}`);
    
    return result.transactionId;
  };
  
  const demonstrateWithoutAdapter = () => {
    addLog('\n🧪 WITHOUT ADAPTER (Problem)');
    addLog('━'.repeat(40));
    
    addLog('Each system has different interface:');
    
    const legacy = new LegacyPaymentSystem();
    addLog('\n1. Legacy System:');
    addLog('   Method: makePayment(amount)');
    const legacyResult = legacy.makePayment(50);
    addLog(`   ${legacyResult.message}`);
    
    const stripe = new StripePaymentSystem();
    addLog('\n2. Stripe System:');
    addLog('   Method: charge(paymentData)');
    const stripeResult = stripe.charge({ amount: 50, currency: 'USD' });
    addLog(`   ${stripeResult.info}`);
    
    addLog('\n❌ Problem: Different interfaces, hard to use interchangeably!');
  };
  
  const demonstrateWithAdapter = () => {
    addLog('\n🧪 WITH ADAPTER (Solution)');
    addLog('━'.repeat(40));
    
    // Create payment systems
    const legacySystem = new LegacyPaymentSystem();
    const stripeSystem = new StripePaymentSystem();
    const modernSystem = new ModernPaymentSystem();
    
    // Wrap incompatible systems with adapters
    const legacyAdapter = new LegacyPaymentAdapter(legacySystem);
    const stripeAdapter = new StripePaymentAdapter(stripeSystem);
    
    // Now all systems use the same interface!
    const paymentSystems = [
      { processor: legacyAdapter, name: 'Legacy (Adapted)' },
      { processor: stripeAdapter, name: 'Stripe (Adapted)' },
      { processor: modernSystem, name: 'Modern (Native)' }
    ];
    
    addLog('All systems now use the same interface:');
    addLog('Method: processPayment(paymentData)\n');
    
    paymentSystems.forEach(({ processor, name }) => {
      processPaymentWithSystem(processor, name);
    });
    
    addLog('\n✅ All systems work the same way thanks to adapters!');
  };
  
  const demonstrateRefunds = () => {
    addLog('\n🧪 REFUND PROCESSING');
    addLog('━'.repeat(40));
    
    const legacySystem = new LegacyPaymentSystem();
    const legacyAdapter = new LegacyPaymentAdapter(legacySystem);
    
    addLog('Processing payment...');
    const txId = processPaymentWithSystem(legacyAdapter, 'Legacy System');
    
    addLog('\n💰 Processing refund...');
    const refundResult = legacyAdapter.processRefund(txId, { amount: 99.99 });
    addLog(`✅ ${refundResult.message}`);
    addLog(`   Refund ID: ${refundResult.refundId}`);
    
    addLog('\n✅ Adapter handles both payments and refunds!');
  };
  
  const demonstrateBenefits = () => {
    addLog('\n🧪 ADAPTER PATTERN BENEFITS');
    addLog('━'.repeat(40));
    
    addLog('💡 Why use Adapter Pattern?');
    addLog('  1. Reuse existing code without modification');
    addLog('  2. Make incompatible interfaces compatible');
    addLog('  3. Easy to switch between implementations');
    addLog('  4. Decouple client from specific implementations');
    addLog('\n📝 Real-world use cases:');
    addLog('  • Integrating third-party APIs');
    addLog('  • Working with legacy systems');
    addLog('  • Supporting multiple payment gateways');
    addLog('  • Database adapters (MySQL, PostgreSQL, etc.)');
    addLog('\n✅ Bridge the gap between incompatible interfaces!');
  };
  
  const clearLogs = () => {
    setLogs([]);
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔌 Adapter Pattern Demo</Text>
      <Text style={styles.subtitle}>Payment System Integration</Text>
      
      <View style={styles.buttonGrid}>
        <TouchableOpacity style={styles.button} onPress={demonstrateWithoutAdapter}>
          <Text style={styles.buttonText}>Without Adapter</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={demonstrateWithAdapter}>
          <Text style={styles.buttonText}>With Adapter</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={demonstrateRefunds}>
          <Text style={styles.buttonText}>Test Refunds</Text>
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
          Adapter pattern makes incompatible interfaces work together.
          Like a power adapter, it bridges the gap between different systems!
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

export default AdapterExample;
