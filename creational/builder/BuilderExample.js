/**
 * Builder Pattern - React Native Component Example
 * Demonstrates how Builder pattern simplifies complex object creation
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import UserProfileBuilder from './UserProfileBuilder';

const BuilderExample = () => {
  const [logs, setLogs] = useState([]);
  
  const addLog = (message) => {
    setLogs(prev => [...prev, message]);
  };
  
  const createBasicProfile = () => {
    addLog('\n🧪 CREATING BASIC PROFILE');
    addLog('━'.repeat(40));
    
    try {
      const user = new UserProfileBuilder()
        .setFirstName('John')
        .setLastName('Doe')
        .setEmail('john@example.com')
        .build();
      
      addLog('✅ Basic profile created successfully!');
      addLog(JSON.stringify(user.getInfo(), null, 2));
    } catch (error) {
      addLog(`❌ Error: ${error.message}`);
    }
  };
  
  const createDetailedProfile = () => {
    addLog('\n🧪 CREATING DETAILED PROFILE');
    addLog('━'.repeat(40));
    
    try {
      const user = new UserProfileBuilder()
        .setFirstName('Jane')
        .setLastName('Smith')
        .setEmail('jane@example.com')
        .setAge(28)
        .setPhone('+1-555-0199')
        .setAddress('123 Main St, New York, NY')
        .setBio('Software engineer passionate about React Native')
        .setAvatar('👩‍💻')
        .setPreferences({
          theme: 'dark',
          notifications: true,
          language: 'en'
        })
        .setSocialLinks({
          twitter: '@janesmith',
          github: 'janesmith',
          linkedin: 'jane-smith'
        })
        .setVerified(true)
        .setAccountType('premium')
        .build();
      
      addLog('✅ Detailed profile created successfully!');
      addLog(JSON.stringify(user.getInfo(), null, 2));
    } catch (error) {
      addLog(`❌ Error: ${error.message}`);
    }
  };
  
  const createCustomProfile = () => {
    addLog('\n🧪 CREATING CUSTOM PROFILE');
    addLog('━'.repeat(40));
    
    try {
      const user = new UserProfileBuilder()
        .setFirstName('Alex')
        .setLastName('Johnson')
        .setEmail('alex@example.com')
        .setAge(35)
        .setAvatar('🧑‍🎨')
        .setBio('Designer & Developer')
        .setAccountType('pro')
        .build();
      
      addLog('✅ Custom profile created successfully!');
      addLog(JSON.stringify(user.getInfo(), null, 2));
    } catch (error) {
      addLog(`❌ Error: ${error.message}`);
    }
  };
  
  const demonstrateValidation = () => {
    addLog('\n🧪 TESTING VALIDATION');
    addLog('━'.repeat(40));
    
    try {
      addLog('Attempting to create profile without required fields...');
      const user = new UserProfileBuilder()
        .setFirstName('Bob')
        .build();
      
      addLog('✅ Profile created (this should not happen!)');
    } catch (error) {
      addLog(`✅ Validation works! Error: ${error.message}`);
    }
  };
  
  const demonstrateFlexibility = () => {
    addLog('\n🧪 DEMONSTRATING FLEXIBILITY');
    addLog('━'.repeat(40));
    
    addLog('💡 Builder pattern allows:');
    addLog('  • Step-by-step construction');
    addLog('  • Optional parameters');
    addLog('  • Clear, readable code');
    addLog('  • Method chaining');
    addLog('  • Validation before building');
    addLog('\n✅ Much better than constructor with 10+ parameters!');
  };
  
  const clearLogs = () => {
    setLogs([]);
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏗️ Builder Pattern Demo</Text>
      <Text style={styles.subtitle}>User Profile Builder</Text>
      
      <View style={styles.buttonGrid}>
        <TouchableOpacity style={styles.button} onPress={createBasicProfile}>
          <Text style={styles.buttonText}>Basic Profile</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={createDetailedProfile}>
          <Text style={styles.buttonText}>Detailed Profile</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={createCustomProfile}>
          <Text style={styles.buttonText}>Custom Profile</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={demonstrateValidation}>
          <Text style={styles.buttonText}>Test Validation</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.secondaryButton]} 
          onPress={demonstrateFlexibility}
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
          Builder pattern makes creating complex objects easy and readable.
          Build step-by-step with clear method names instead of confusing constructors!
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

export default BuilderExample;
