/**
 * Factory Pattern - React Native Component Example
 * Demonstrates how Factory pattern simplifies object creation
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import NotificationFactory from './NotificationFactory';

const FactoryExample = () => {
  const [logs, setLogs] = useState([]);
  
  const addLog = (message) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };
  
  const sendNotification = (type, data) => {
    try {
      addLog(`\n🏭 Creating ${type.toUpperCase()} notification...`);
      
      // Factory creates the right notification type for us!
      const notification = NotificationFactory.create(type, data);
      
      addLog(`✅ ${notification.send()}`);
      
      const info = notification.getInfo();
      addLog(`📋 Details: ${JSON.stringify(info, null, 2)}`);
      
    } catch (error) {
      addLog(`❌ Error: ${error.message}`);
    }
  };
  
  const demonstrateFactory = () => {
    addLog('\n🧪 FACTORY PATTERN DEMONSTRATION');
    addLog('━'.repeat(40));
    
    // Send different types of notifications
    // Notice: We don't need to know which class to instantiate!
    
    sendNotification('push', {
      title: 'New Message',
      message: 'You have a new message!',
      deviceToken: 'device-abc-123'
    });
    
    sendNotification('email', {
      title: 'Welcome!',
      message: 'Thanks for signing up',
      email: 'user@example.com'
    });
    
    sendNotification('sms', {
      title: 'Verification Code',
      message: 'Your code is 123456',
      phoneNumber: '+1-555-0123'
    });
    
    sendNotification('inapp', {
      title: 'Achievement Unlocked',
      message: 'You earned a badge!',
      userId: 'user-789'
    });
    
    addLog('\n✅ Factory handled all the complexity!');
    addLog('We just specified the type, factory did the rest.');
  };
  
  const demonstrateExtensibility = () => {
    addLog('\n🧪 DEMONSTRATING EXTENSIBILITY');
    addLog('━'.repeat(40));
    addLog('Available notification types:');
    
    const types = NotificationFactory.getAvailableTypes();
    types.forEach(type => addLog(`  • ${type}`));
    
    addLog('\n💡 To add a new notification type:');
    addLog('1. Create new class (e.g., SlackNotification)');
    addLog('2. Add case to factory');
    addLog('3. Client code stays the same!');
    addLog('\n✅ Easy to extend without breaking existing code');
  };
  
  const clearLogs = () => {
    setLogs([]);
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏭 Factory Pattern Demo</Text>
      <Text style={styles.subtitle}>Notification System</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={demonstrateFactory}>
          <Text style={styles.buttonText}>Send Notifications</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.secondaryButton]} 
          onPress={demonstrateExtensibility}
        >
          <Text style={styles.buttonText}>Show Extensibility</Text>
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
          Factory pattern lets you create objects without specifying their exact class.
          Just tell the factory what you need, and it handles the details!
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
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    minWidth: 100,
  },
  secondaryButton: {
    backgroundColor: '#34C759',
  },
  clearButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
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
    fontSize: 12,
    fontFamily: 'monospace',
    marginBottom: 4,
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

export default FactoryExample;
