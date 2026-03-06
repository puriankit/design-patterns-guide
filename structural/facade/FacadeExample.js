/**
 * Facade Pattern - React Native Component Example
 * Demonstrates how Facade pattern simplifies complex systems
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import VideoRecorderFacade, { Camera, Microphone, Storage, VideoEncoder, Display } from './VideoRecorderFacade';

const FacadeExample = () => {
  const [logs, setLogs] = useState([]);
  const [recorder] = useState(new VideoRecorderFacade());
  
  const addLogs = (messages) => {
    setLogs(prev => [...prev, ...messages]);
  };
  
  const demonstrateWithoutFacade = () => {
    const messages = ['\n🧪 WITHOUT FACADE (Complex)'];
    messages.push('━'.repeat(40));
    messages.push('Client must handle all subsystems:');
    messages.push('');
    
    // Show all the steps client must do
    const camera = new Camera();
    messages.push(camera.initialize());
    messages.push(camera.setResolution(1920, 1080));
    messages.push(camera.setFrameRate(30));
    
    const mic = new Microphone();
    messages.push(mic.initialize());
    messages.push(mic.setVolume(80));
    messages.push(mic.setSampleRate(44100));
    
    const storage = new Storage();
    messages.push(storage.initialize());
    messages.push(storage.checkAvailableSpace());
    messages.push(storage.createFile('video.mp4'));
    
    const encoder = new VideoEncoder();
    messages.push(encoder.initialize());
    messages.push(encoder.setCodec('H.264'));
    messages.push(encoder.setBitrate(5000));
    
    const display = new Display();
    messages.push(display.showPreview());
    
    messages.push('');
    messages.push('❌ Too many steps! Client needs to know everything!');
    
    addLogs(messages);
  };
  
  const demonstrateWithFacade = () => {
    const messages = ['\n🧪 WITH FACADE (Simple)'];
    messages.push('━'.repeat(40));
    messages.push('Client uses simple interface:');
    messages.push('');
    
    // Just one method call!
    const result = recorder.startRecording('my-video.mp4');
    messages.push(...result);
    
    addLogs(messages);
  };
  
  const startRecording = () => {
    const result = recorder.startRecording(`video-${Date.now()}.mp4`);
    addLogs(['\n', ...result]);
  };
  
  const stopRecording = () => {
    const result = recorder.stopRecording();
    addLogs(['\n', ...result]);
  };
  
  const takeSnapshot = () => {
    const result = recorder.takeSnapshot(`photo-${Date.now()}.jpg`);
    addLogs(['\n', ...result]);
  };
  
  const demonstrateBenefits = () => {
    const messages = ['\n🧪 FACADE PATTERN BENEFITS'];
    messages.push('━'.repeat(40));
    
    messages.push('💡 Why use Facade Pattern?');
    messages.push('  1. Simplifies complex subsystems');
    messages.push('  2. Reduces client dependencies');
    messages.push('  3. Easier to use and maintain');
    messages.push('  4. Provides high-level interface');
    messages.push('');
    messages.push('📝 Real-world use cases:');
    messages.push('  • Video/audio recording systems');
    messages.push('  • Home automation (one button for "movie mode")');
    messages.push('  • API wrappers (simplify complex APIs)');
    messages.push('  • Database access layers');
    messages.push('  • Payment processing');
    messages.push('');
    messages.push('✅ Hide complexity, expose simplicity!');
    
    addLogs(messages);
  };
  
  const demonstrateComparison = () => {
    const messages = ['\n🧪 COMPLEXITY COMPARISON'];
    messages.push('━'.repeat(40));
    
    messages.push('❌ Without Facade:');
    messages.push('  const camera = new Camera();');
    messages.push('  camera.initialize();');
    messages.push('  camera.setResolution(1920, 1080);');
    messages.push('  camera.setFrameRate(30);');
    messages.push('  const mic = new Microphone();');
    messages.push('  mic.initialize();');
    messages.push('  ... (20+ more lines)');
    messages.push('');
    messages.push('✅ With Facade:');
    messages.push('  const recorder = new VideoRecorderFacade();');
    messages.push('  recorder.startRecording("video.mp4");');
    messages.push('  // Done! Just 2 lines!');
    messages.push('');
    messages.push('💡 Facade reduces complexity by 90%!');
    
    addLogs(messages);
  };
  
  const clearLogs = () => {
    setLogs([]);
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏠 Facade Pattern Demo</Text>
      <Text style={styles.subtitle}>Video Recording System</Text>
      
      <View style={styles.statusBar}>
        <Text style={styles.statusText}>Status: {recorder.getStatus()}</Text>
      </View>
      
      <View style={styles.buttonGrid}>
        <TouchableOpacity style={styles.button} onPress={demonstrateWithoutFacade}>
          <Text style={styles.buttonText}>Without Facade</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={demonstrateWithFacade}>
          <Text style={styles.buttonText}>With Facade</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.button, styles.recordButton]} onPress={startRecording}>
          <Text style={styles.buttonText}>🔴 Start Recording</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.button, styles.stopButton]} onPress={stopRecording}>
          <Text style={styles.buttonText}>⏹️ Stop Recording</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={takeSnapshot}>
          <Text style={styles.buttonText}>📸 Snapshot</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={demonstrateComparison}>
          <Text style={styles.buttonText}>Compare</Text>
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
          Facade pattern provides a simple interface to complex subsystems.
          Like a universal remote, one button controls many components!
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
    backgroundColor: '#E8F5E9',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2E7D32',
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
  recordButton: {
    backgroundColor: '#FF3B30',
  },
  stopButton: {
    backgroundColor: '#8E8E93',
  },
  secondaryButton: {
    backgroundColor: '#34C759',
  },
  clearButton: {
    backgroundColor: '#FF9500',
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

export default FacadeExample;
