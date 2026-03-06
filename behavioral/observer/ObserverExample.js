/**
 * Observer Pattern - React Native Component Example
 * Demonstrates how Observer pattern enables pub/sub communication
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import NewsPublisher, {
  EmailSubscriber,
  SMSSubscriber,
  PushNotificationSubscriber,
  AppSubscriber,
  CategoryNewsPublisher
} from './NewsPublisher';

const ObserverExample = () => {
  const [logs, setLogs] = useState([]);
  const [publisher] = useState(new NewsPublisher('Tech News Daily'));
  
  const addLogs = (messages) => {
    setLogs(prev => [...prev, ...messages]);
  };
  
  const demonstrateBasicObserver = () => {
    const messages = ['\n🧪 BASIC OBSERVER PATTERN'];
    messages.push('━'.repeat(40));
    
    const newsPublisher = new NewsPublisher('Breaking News');
    
    // Create subscribers
    const emailSub = new EmailSubscriber('user@example.com');
    const smsSub = new SMSSubscriber('+1-555-0123');
    const pushSub = new PushNotificationSubscriber('device-123');
    
    // Subscribe
    messages.push(newsPublisher.subscribe(emailSub));
    messages.push(newsPublisher.subscribe(smsSub));
    messages.push(newsPublisher.subscribe(pushSub));
    
    // Publish news
    messages.push(...newsPublisher.publishNews(
      'React Native 0.73 Released!',
      'New features and improvements...',
      'Technology'
    ));
    
    messages.push('\n✅ All subscribers notified automatically!');
    addLogs(messages);
  };
  
  const demonstrateSubscribeUnsubscribe = () => {
    const messages = ['\n🧪 SUBSCRIBE/UNSUBSCRIBE'];
    messages.push('━'.repeat(40));
    
    const newsPublisher = new NewsPublisher('Daily News');
    const emailSub = new EmailSubscriber('john@example.com');
    const smsSub = new SMSSubscriber('+1-555-0199');
    
    messages.push('Adding subscribers...');
    messages.push(newsPublisher.subscribe(emailSub));
    messages.push(newsPublisher.subscribe(smsSub));
    messages.push(`Total subscribers: ${newsPublisher.getSubscriberCount()}`);
    
    messages.push(...newsPublisher.publishNews(
      'First Article',
      'Content here...'
    ));
    
    messages.push('\nUnsubscribing email...');
    messages.push(newsPublisher.unsubscribe(emailSub));
    messages.push(`Total subscribers: ${newsPublisher.getSubscriberCount()}`);
    
    messages.push(...newsPublisher.publishNews(
      'Second Article',
      'More content...'
    ));
    
    messages.push('\n✅ Unsubscribed users don\'t get notifications!');
    addLogs(messages);
  };
  
  const demonstrateCategorySubscription = () => {
    const messages = ['\n🧪 CATEGORY-BASED SUBSCRIPTION'];
    messages.push('━'.repeat(40));
    
    const publisher = new CategoryNewsPublisher('Multi-Topic News');
    
    const techSub = new EmailSubscriber('tech@example.com');
    const sportsSub = new SMSSubscriber('+1-555-0100');
    const allSub = new PushNotificationSubscriber('device-all');
    
    messages.push('Setting up subscriptions...');
    messages.push(publisher.subscribeToCategory(techSub, 'Technology'));
    messages.push(publisher.subscribeToCategory(sportsSub, 'Sports'));
    messages.push(publisher.subscribe(allSub)); // All categories
    
    messages.push(...publisher.publishNews(
      'New iPhone Announced',
      'Apple reveals...',
      'Technology'
    ));
    
    messages.push(...publisher.publishNews(
      'Championship Finals',
      'Team wins...',
      'Sports'
    ));
    
    messages.push('\n✅ Subscribers get only relevant news!');
    addLogs(messages);
  };
  
  const demonstrateMultiplePublishers = () => {
    const messages = ['\n🧪 MULTIPLE PUBLISHERS'];
    messages.push('━'.repeat(40));
    
    const techNews = new NewsPublisher('Tech News');
    const sportsNews = new NewsPublisher('Sports News');
    
    const subscriber = new AppSubscriber('user-123');
    
    messages.push('Subscribing to multiple publishers...');
    messages.push(techNews.subscribe(subscriber));
    messages.push(sportsNews.subscribe(subscriber));
    
    messages.push(...techNews.publishNews(
      'AI Breakthrough',
      'New model...',
      'Technology'
    ));
    
    messages.push(...sportsNews.publishNews(
      'Record Broken',
      'Athlete achieves...',
      'Sports'
    ));
    
    messages.push(`\n📬 User has ${subscriber.getNotifications().length} notifications`);
    messages.push('\n✅ One observer can watch multiple subjects!');
    addLogs(messages);
  };
  
  const demonstrateBenefits = () => {
    const messages = ['\n🧪 OBSERVER PATTERN BENEFITS'];
    messages.push('━'.repeat(40));
    
    messages.push('💡 Why use Observer Pattern?');
    messages.push('  1. Loose coupling between subject and observers');
    messages.push('  2. Dynamic subscription (add/remove at runtime)');
    messages.push('  3. Broadcast communication (one-to-many)');
    messages.push('  4. Supports event-driven architecture');
    
    messages.push('\n📝 Real-world use cases:');
    messages.push('  • Social media notifications');
    messages.push('  • Stock market alerts');
    messages.push('  • Email newsletters');
    messages.push('  • Event handling in UI frameworks');
    messages.push('  • State management (Redux, MobX)');
    messages.push('  • Real-time data updates');
    
    messages.push('\n⚠️  Remember to unsubscribe!');
    messages.push('  Prevent memory leaks by cleaning up observers');
    
    messages.push('\n✅ Perfect for event-driven systems!');
    addLogs(messages);
  };
  
  const clearLogs = () => {
    setLogs([]);
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>👀 Observer Pattern Demo</Text>
      <Text style={styles.subtitle}>News Publishing System</Text>
      
      <View style={styles.statsBar}>
        <Text style={styles.statsText}>
          Subscribers: {publisher.getSubscriberCount()} | 
          Articles: {publisher.getNewsCount()}
        </Text>
      </View>
      
      <View style={styles.buttonGrid}>
        <TouchableOpacity style={styles.button} onPress={demonstrateBasicObserver}>
          <Text style={styles.buttonText}>Basic Observer</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={demonstrateSubscribeUnsubscribe}>
          <Text style={styles.buttonText}>Subscribe/Unsub</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={demonstrateCategorySubscription}>
          <Text style={styles.buttonText}>Category Sub</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={demonstrateMultiplePublishers}>
          <Text style={styles.buttonText}>Multiple Pubs</Text>
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
          Observer pattern enables one-to-many communication. When subject changes,
          all observers are notified automatically. Like subscribing to a channel!
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
  statsBar: {
    backgroundColor: '#FFF3E0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  statsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E65100',
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

export default ObserverExample;
