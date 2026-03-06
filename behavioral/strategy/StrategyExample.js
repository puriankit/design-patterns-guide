/**
 * Strategy Pattern - React Native Component Example
 * Demonstrates how Strategy pattern enables algorithm switching
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import PaymentProcessor, {
  CreditCardStrategy,
  PayPalStrategy,
  CryptoStrategy,
  ApplePayStrategy,
  BankTransferStrategy
} from './PaymentStrategy';

const StrategyExample = () => {
  const [logs, setLogs] = useState([]);
  const [processor] = useState(new PaymentProcessor());
  
  const addLog = (message) => {
    setLogs(prev => [...prev, message]);
  };
  
  const demonstrateBasicStrategy = () => {
    addLog('\n🧪 BASIC STRATEGY PATTERN');
    addLog('━'.repeat(40));
    
    const paymentProcessor = new PaymentProcessor();
    
    // Use Credit Card
    addLog('Setting payment method to Credit Card...');
    const creditCard = new CreditCardStrategy('1234567890123456', '123', '12/25');
    addLog(paymentProcessor.setStrategy(creditCard));
    addLog(paymentProcessor.processPayment(99.99));
    
    // Switch to PayPal
    addLog('\nSwitching to PayPal...');
    const paypal = new PayPalStrategy('user@example.com', 'password123');
    addLog(paymentProcessor.setStrategy(paypal));
    addLog(paymentProcessor.processPayment(149.99));
    
    // Switch to Crypto
    addLog('\nSwitching to Cryptocurrency...');
    const crypto = new CryptoStrategy('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa');
    addLog(paymentProcessor.setStrategy(crypto));
    addLog(paymentProcessor.processPayment(299.99));
    
    addLog('\n✅ Same processor, different strategies!');
  };
  
  const demonstrateAllStrategies = () => {
    addLog('\n🧪 ALL PAYMENT STRATEGIES');
    addLog('━'.repeat(40));
    
    const amount = 199.99;
    const paymentProcessor = new PaymentProcessor();
    
    const strategies = [
      new CreditCardStrategy('4532123456789012', '456', '03/26'),
      new PayPalStrategy('customer@email.com', 'secure123'),
      new CryptoStrategy('bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', 'Bitcoin'),
      new ApplePayStrategy('iPhone-12-Pro'),
      new BankTransferStrategy('9876543210', '123456789')
    ];
    
    strategies.forEach(strategy => {
      addLog(`\n💰 Paying $${amount} with ${strategy.name}:`);
      paymentProcessor.setStrategy(strategy);
      addLog(paymentProcessor.processPayment(amount));
    });
    
    addLog('\n✅ All strategies work with same interface!');
  };
  
  const demonstrateRuntimeSwitching = () => {
    addLog('\n🧪 RUNTIME STRATEGY SWITCHING');
    addLog('━'.repeat(40));
    
    const paymentProcessor = new PaymentProcessor();
    
    addLog('Customer starts checkout...');
    addLog('Cart total: $299.99');
    
    addLog('\n1️⃣ Customer tries Credit Card:');
    paymentProcessor.setStrategy(new CreditCardStrategy('1234', '12', '12/20')); // Invalid
    addLog(paymentProcessor.processPayment(299.99));
    
    addLog('\n2️⃣ Card declined! Switching to PayPal:');
    paymentProcessor.setStrategy(new PayPalStrategy('user@example.com', 'pass'));
    addLog(paymentProcessor.processPayment(299.99));
    
    addLog('\n✅ Strategy switched at runtime without changing code!');
  };
  
  const demonstrateTransactionHistory = () => {
    addLog('\n🧪 TRANSACTION HISTORY');
    addLog('━'.repeat(40));
    
    const paymentProcessor = new PaymentProcessor();
    
    // Make several transactions
    paymentProcessor.setStrategy(new CreditCardStrategy('1234567890123456', '123', '12/25'));
    paymentProcessor.processPayment(50.00);
    
    paymentProcessor.setStrategy(new PayPalStrategy('user@example.com', 'pass'));
    paymentProcessor.processPayment(75.50);
    
    paymentProcessor.setStrategy(new ApplePayStrategy('iPhone-13'));
    paymentProcessor.processPayment(120.00);
    
    addLog('Transaction History:');
    const history = paymentProcessor.getTransactionHistory();
    history.forEach((tx, index) => {
      addLog(`${index + 1}. $${tx.amount} via ${tx.method} at ${tx.timestamp}`);
    });
    
    addLog('\n✅ Each transaction used different strategy!');
  };
  
  const demonstrateVsConditionals = () => {
    addLog('\n🧪 STRATEGY VS CONDITIONALS');
    addLog('━'.repeat(40));
    
    addLog('❌ Without Strategy (if/else hell):');
    addLog('  if (method === "credit") {');
    addLog('    // Credit card logic');
    addLog('  } else if (method === "paypal") {');
    addLog('    // PayPal logic');
    addLog('  } else if (method === "crypto") {');
    addLog('    // Crypto logic');
    addLog('  } else if (method === "applepay") {');
    addLog('    // Apple Pay logic');
    addLog('  }');
    addLog('  // Adding new method? Modify this code!');
    
    addLog('\n✅ With Strategy:');
    addLog('  processor.setStrategy(new CreditCardStrategy());');
    addLog('  processor.pay(amount);');
    addLog('  // Adding new method? Just create new strategy!');
    addLog('  // No need to modify existing code!');
    
    addLog('\n💡 Strategy eliminates complex conditionals!');
  };
  
  const demonstrateBenefits = () => {
    addLog('\n🧪 STRATEGY PATTERN BENEFITS');
    addLog('━'.repeat(40));
    
    addLog('💡 Why use Strategy Pattern?');
    addLog('  1. Eliminates complex if/else chains');
    addLog('  2. Easy to add new algorithms');
    addLog('  3. Switch algorithms at runtime');
    addLog('  4. Each strategy is independently testable');
    addLog('  5. Follows Open/Closed Principle');
    
    addLog('\n📝 Real-world use cases:');
    addLog('  • Payment processing (like this example)');
    addLog('  • Sorting algorithms (quicksort, mergesort)');
    addLog('  • Compression (zip, gzip, bzip2)');
    addLog('  • Navigation routes (fastest, shortest, scenic)');
    addLog('  • Validation rules');
    addLog('  • Pricing strategies (regular, discount, premium)');
    
    addLog('\n✅ Different algorithms, same interface!');
  };
  
  const clearLogs = () => {
    setLogs([]);
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎯 Strategy Pattern Demo</Text>
      <Text style={styles.subtitle}>Payment Processing System</Text>
      
      <View style={styles.statusBar}>
        <Text style={styles.statusText}>
          Current Method: {processor.getCurrentMethod()}
        </Text>
      </View>
      
      <View style={styles.buttonGrid}>
        <TouchableOpacity style={styles.button} onPress={demonstrateBasicStrategy}>
          <Text style={styles.buttonText}>Basic Strategy</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={demonstrateAllStrategies}>
          <Text style={styles.buttonText}>All Strategies</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={demonstrateRuntimeSwitching}>
          <Text style={styles.buttonText}>Runtime Switch</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={demonstrateTransactionHistory}>
          <Text style={styles.buttonText}>History</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={demonstrateVsConditionals}>
          <Text style={styles.buttonText}>vs Conditionals</Text>
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
          Strategy pattern lets you switch algorithms at runtime.
          Like choosing different payment methods, same goal, different strategies!
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
    marginBottom: 10,
  },
  statusBar: {
    backgroundColor: '#E8EAF6',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#3F51B5',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A237E',
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

export default StrategyExample;
