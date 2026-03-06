/**
 * Proxy Pattern - React Native Component Example
 * Demonstrates how Proxy pattern controls access to objects
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import ImageProxy, { HighResImage, CachedImageProxy, ProtectedImageProxy } from './ImageProxy';

const ProxyExample = () => {
  const [logs, setLogs] = useState([]);
  
  const addLog = (message) => {
    setLogs(prev => [...prev, message]);
  };
  
  const demonstrateWithoutProxy = () => {
    addLog('\n🧪 WITHOUT PROXY (Eager Loading)');
    addLog('━'.repeat(40));
    
    addLog('Creating 3 high-res images...');
    const img1 = new HighResImage('photo1.jpg');
    const img2 = new HighResImage('photo2.jpg');
    const img3 = new HighResImage('photo3.jpg');
    
    addLog(img1.load());
    addLog(img2.load());
    addLog(img3.load());
    
    addLog('\n❌ All images loaded immediately!');
    addLog('   This is slow if user only views one image.');
  };
  
  const demonstrateLazyLoading = () => {
    addLog('\n🧪 WITH PROXY (Lazy Loading)');
    addLog('━'.repeat(40));
    
    addLog('Creating 3 image proxies...');
    const proxy1 = new ImageProxy('photo1.jpg');
    const proxy2 = new ImageProxy('photo2.jpg');
    const proxy3 = new ImageProxy('photo3.jpg');
    
    addLog('✅ Proxies created instantly (no loading yet)');
    
    addLog('\nUser views first image:');
    addLog(proxy1.display());
    
    addLog('\nUser views first image again:');
    addLog(proxy1.display());
    
    addLog('\n✅ Other images not loaded! Faster startup!');
    addLog(`Proxy 1 info: ${JSON.stringify(proxy1.getInfo())}`);
    addLog(`Proxy 2 info: ${JSON.stringify(proxy2.getInfo())}`);
  };
  
  const demonstrateCaching = () => {
    addLog('\n🧪 CACHING PROXY');
    addLog('━'.repeat(40));
    
    const cachedImage = new CachedImageProxy('cached-photo.jpg');
    
    addLog('First access (loads and caches):');
    addLog(cachedImage.display());
    
    addLog('\nSecond access (from cache):');
    addLog(cachedImage.display());
    
    addLog('\nThird access (from cache):');
    addLog(cachedImage.display());
    
    addLog('\nFourth access (from cache):');
    addLog(cachedImage.display());
    
    addLog(`\nCache info: ${JSON.stringify(cachedImage.getInfo())}`);
    
    addLog('\nClearing cache...');
    addLog(cachedImage.clearCache());
    
    addLog('\nAfter cache clear:');
    addLog(cachedImage.display());
    
    addLog('\n✅ Caching improves performance!');
  };
  
  const demonstrateAccessControl = () => {
    addLog('\n🧪 ACCESS CONTROL PROXY');
    addLog('━'.repeat(40));
    
    const publicImage = new ProtectedImageProxy('public.jpg', 'guest');
    const userImage = new ProtectedImageProxy('user-only.jpg', 'user');
    const adminImage = new ProtectedImageProxy('admin-only.jpg', 'admin');
    
    addLog('Guest trying to access images:');
    addLog(publicImage.display('guest'));
    addLog(userImage.display('guest'));
    addLog(adminImage.display('guest'));
    
    addLog('\nUser trying to access images:');
    addLog(publicImage.display('user'));
    addLog(userImage.display('user'));
    addLog(adminImage.display('user'));
    
    addLog('\nAdmin trying to access images:');
    addLog(publicImage.display('admin'));
    addLog(userImage.display('admin'));
    addLog(adminImage.display('admin'));
    
    addLog('\n✅ Proxy controls access based on roles!');
  };
  
  const demonstrateProxyTypes = () => {
    addLog('\n🧪 TYPES OF PROXIES');
    addLog('━'.repeat(40));
    
    addLog('1. Virtual Proxy (Lazy Loading)');
    addLog('   • Delays object creation until needed');
    addLog('   • Saves memory and startup time');
    addLog('   • Example: Image lazy loading');
    
    addLog('\n2. Protection Proxy (Access Control)');
    addLog('   • Controls access to objects');
    addLog('   • Checks permissions before allowing access');
    addLog('   • Example: User authentication');
    
    addLog('\n3. Caching Proxy');
    addLog('   • Caches expensive operations');
    addLog('   • Returns cached results when possible');
    addLog('   • Example: API response caching');
    
    addLog('\n4. Logging Proxy');
    addLog('   • Logs all operations');
    addLog('   • Useful for debugging and monitoring');
    addLog('   • Example: API call tracking');
    
    addLog('\n✅ Choose proxy type based on your needs!');
  };
  
  const demonstrateBenefits = () => {
    addLog('\n🧪 PROXY PATTERN BENEFITS');
    addLog('━'.repeat(40));
    
    addLog('💡 Why use Proxy Pattern?');
    addLog('  1. Lazy initialization (load only when needed)');
    addLog('  2. Access control (security)');
    addLog('  3. Caching (performance)');
    addLog('  4. Logging (monitoring)');
    addLog('  5. Remote proxy (network objects)');
    
    addLog('\n📝 Real-world use cases:');
    addLog('  • Image lazy loading in galleries');
    addLog('  • API rate limiting');
    addLog('  • Database connection pooling');
    addLog('  • Virtual DOM in React');
    addLog('  • ES6 Proxy for reactive data');
    
    addLog('\n✅ Control access and add features transparently!');
  };
  
  const clearLogs = () => {
    setLogs([]);
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚪 Proxy Pattern Demo</Text>
      <Text style={styles.subtitle}>Image Loading System</Text>
      
      <View style={styles.buttonGrid}>
        <TouchableOpacity style={styles.button} onPress={demonstrateWithoutProxy}>
          <Text style={styles.buttonText}>Without Proxy</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={demonstrateLazyLoading}>
          <Text style={styles.buttonText}>Lazy Loading</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={demonstrateCaching}>
          <Text style={styles.buttonText}>Caching Proxy</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={demonstrateAccessControl}>
          <Text style={styles.buttonText}>Access Control</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={demonstrateProxyTypes}>
          <Text style={styles.buttonText}>Proxy Types</Text>
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
          Proxy pattern controls access to objects and adds features like lazy loading,
          caching, and access control without changing the original object!
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

export default ProxyExample;
