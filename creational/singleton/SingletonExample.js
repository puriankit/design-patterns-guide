/**
 * Singleton Pattern - React Native Component Example
 * Demonstrates how Singleton ensures only one instance exists
 */

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import ApiService from './ApiService';

const SingletonExample = () => {
  const [logs, setLogs] = useState([]);
  
  const addLog = (message) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };
  
  useEffect(() => {
    addLog('Component mounted');
  }, []);
  
  const testSingleton = () => {
    addLog('\n🧪 TESTING SINGLETON PATTERN');
    addLog('━'.repeat(40));
    
    // Create first instance
    addLog('Creating first API service instance...');
    const api1 = new ApiService();
    const id1 = api1.getInstanceId();
    addLog(`✅ API Service 1 created - ID: ${id1}`);
    
    // Try to create second instance
    addLog('\nCreating second API service instance...');
    const api2 = new ApiService();
    const id2 = api2.getInstanceId();
    addLog(`✅ API Service 2 created - ID: ${id2}`);
    
    // Try to create third instance
    addLog('\nCreating third API service instance...');
    const api3 = ApiService.getInstance();
    const id3 = api3.getInstanceId();
    addLog(`✅ API Service 3 created - ID: ${id3}`);
    
    // Proof they're the same
    addLog('\n🔍 VERIFICATION:');
    addLog(`api1 === api2: ${api1 === api2}`);
    addLog(`api2 === api3: ${api2 === api3}`);
    addLog(`api1 === api3: ${api1 === api3}`);
    addLog('\n✅ All three are the SAME instance!');
  };
  
  const testSharedState = async () => {
    addLog('\n🧪 TESTING SHARED STATE');
    addLog('━'.repeat(40));
    
    // Get instance in component A
    addLog('Component A gets API service...');
    const apiA = ApiService.getInstance();
    apiA.setAuthToken('token-123-abc');
    await apiA.get('/users');
    addLog(`Component A - Request count: ${apiA.getRequestCount()}`);
    
    // Get instance in component B
    addLog('\nComponent B gets API service...');
    const apiB = ApiService.getInstance();
    await apiB.post('/posts', { title: 'Hello' });
    addLog(`Component B - Request count: ${apiB.getRequestCount()}`);
    
    // Get instance in component C
    addLog('\nComponent C gets API service...');
    const apiC = ApiService.getInstance();
    await apiC.get('/comments');
    addLog(`Component C - Request count: ${apiC.getRequestCount()}`);
    
    addLog('\n✅ All components share the same state!');
    addLog(`Total requests across all "instances": ${apiC.getRequestCount()}`);
  };
  
  const clearLogs = () => {
    setLogs([]);
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔐 Singleton Pattern Demo</Text>
      <Text style={styles.subtitle}>API Service Example</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={testSingleton}>
          <Text style={styles.buttonText}>Test Singleton</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={testSharedState}>
          <Text style={styles.buttonText}>Test Shared State</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={clearLogs}>
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
          No matter how many times you create an ApiService, you always get the SAME instance.
          This ensures consistent state and saves memory!
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

export default SingletonExample;
