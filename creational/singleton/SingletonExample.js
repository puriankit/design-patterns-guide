/**
 * ============================================================================
 * SINGLETON PATTERN - Interactive Demo Component
 * ============================================================================
 * 
 * This React Native component demonstrates the Singleton pattern in action.
 * 
 * WHAT YOU'LL SEE:
 * 1. Creating multiple "instances" that are actually the same object
 * 2. Shared state across all "instances"
 * 3. Proof that only ONE instance exists
 * 
 * HOW TO USE:
 * - Press buttons to see different demonstrations
 * - Watch the console logs to understand what's happening
 * - Notice how all "instances" share the same data
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import ApiService from './ApiService';

const SingletonExample = () => {
  const [logs, setLogs] = useState([]);
  
  // Helper function to add timestamped logs
  const addLog = (message) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };
  
  useEffect(() => {
    addLog('Component mounted');
  }, []);
  
  /**
   * DEMONSTRATION 1: Proving Only One Instance Exists
   * 
   * What this does:
   * - Creates 3 "different" ApiService objects
   * - Checks if they're actually the same object
   * - Compares their unique IDs
   * 
   * Expected Result:
   * All three variables (api1, api2, api3) point to the SAME object!
   * This is the magic of Singleton pattern.
   */
  const testSingleton = () => {
    addLog('\n🧪 TESTING SINGLETON PATTERN');
    addLog('━'.repeat(40));
    addLog('We will try to create 3 separate instances...');
    
    // Attempt 1: Create first instance using 'new'
    addLog('\n1️⃣ Creating first API service instance...');
    const api1 = new ApiService();
    const id1 = api1.getInstanceId();
    addLog(`✅ API Service 1 created - ID: ${id1}`);
    addLog('   (This is the FIRST time, so a new instance is created)');
    
    // Attempt 2: Try to create second instance using 'new'
    addLog('\n2️⃣ Creating second API service instance...');
    const api2 = new ApiService();
    const id2 = api2.getInstanceId();
    addLog(`✅ API Service 2 created - ID: ${id2}`);
    addLog('   (Singleton returns the EXISTING instance, not a new one!)');
    
    // Attempt 3: Try to create third instance using getInstance()
    addLog('\n3️⃣ Creating third API service instance...');
    const api3 = ApiService.getInstance();
    const id3 = api3.getInstanceId();
    addLog(`✅ API Service 3 created - ID: ${id3}`);
    addLog('   (Again, returns the SAME instance)');
    
    // Proof: Compare the instances
    addLog('\n🔍 VERIFICATION - Are they the same object?');
    addLog(`api1 === api2: ${api1 === api2} (true means same object)`);
    addLog(`api2 === api3: ${api2 === api3} (true means same object)`);
    addLog(`api1 === api3: ${api1 === api3} (true means same object)`);
    addLog(`\nAll IDs are: ${id1} (identical!)`);
    addLog('\n✅ CONCLUSION: All three variables point to the SAME instance!');
    addLog('   This saves memory and ensures consistent state.');
  };
  
  /**
   * DEMONSTRATION 2: Shared State Across Components
   * 
   * What this does:
   * - Simulates 3 different components (A, B, C) getting the API service
   * - Each component makes API calls
   * - Shows that the request count is shared across all components
   * 
   * Expected Result:
   * The request count keeps incrementing across all components because
   * they're all using the SAME ApiService instance!
   * 
   * Real-World Benefit:
   * - Set auth token once, available everywhere
   * - Track total API calls across entire app
   * - Consistent configuration everywhere
   */
  const testSharedState = async () => {
    addLog('\n🧪 TESTING SHARED STATE');
    addLog('━'.repeat(40));
    addLog('Simulating 3 different components using the API service...');
    
    // Simulate Component A
    addLog('\n📱 Component A (User Profile Screen):');
    addLog('   Getting API service instance...');
    const apiA = ApiService.getInstance();
    apiA.setAuthToken('token-123-abc');
    addLog('   Setting auth token: token-123-abc');
    await apiA.get('/users');
    addLog(`   Made GET request to /users`);
    addLog(`   ✅ Request count: ${apiA.getRequestCount()}`);
    
    // Simulate Component B
    addLog('\n📱 Component B (Create Post Screen):');
    addLog('   Getting API service instance...');
    const apiB = ApiService.getInstance();
    addLog('   (Notice: No need to set token again, it\'s already set!)');
    await apiB.post('/posts', { title: 'Hello' });
    addLog(`   Made POST request to /posts`);
    addLog(`   ✅ Request count: ${apiB.getRequestCount()}`);
    addLog('   (Count increased! Shared state works!)');
    
    // Simulate Component C
    addLog('\n📱 Component C (Comments Screen):');
    addLog('   Getting API service instance...');
    const apiC = ApiService.getInstance();
    await apiC.get('/comments');
    addLog(`   Made GET request to /comments`);
    addLog(`   ✅ Request count: ${apiC.getRequestCount()}`);
    
    addLog('\n🎯 KEY INSIGHT:');
    addLog('   All components share the same state!');
    addLog(`   Total requests across entire app: ${apiC.getRequestCount()}`);
    addLog('   Auth token set once, available everywhere!');
    addLog('\n✅ This is the power of Singleton - shared state and configuration!');
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
