import { Image, StyleSheet, Platform, View } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useNetInfo } from '@react-native-community/netinfo';
import React, { useEffect, useState } from 'react';

export default function HomeScreen() {
  const netInfo = useNetInfo();
  const [lastUpdate, setLastUpdate] = useState('');

  useEffect(() => {
    setLastUpdate(new Date().toLocaleTimeString());
  }, [netInfo]);

  const renderNetworkStatus = () => {
    if (!netInfo) return null;

    let details: string[] = [];
    if (netInfo.type === 'wifi' && netInfo.details) {
      details = [
        `WiFi SSID: ${netInfo.details.ssid || 'N/A'}`,
        `Signal Strength: ${netInfo.details.strength || 'N/A'}`,
        `IP: ${netInfo.details.ipAddress || 'N/A'}`
      ];
    } else if (netInfo.type === 'cellular' && netInfo.details) {
      details = [
        `Carrier: ${netInfo.details.carrier || 'N/A'}`,
        `Network: ${netInfo.details.cellularGeneration || 'N/A'}`
      ];
    }

    return (
      <ThemedView style={styles.networkContainer}>
        <ThemedText type="subtitle">Network Status</ThemedText>
        <ThemedView style={styles.networkDetails}>
          <ThemedText style={[
            styles.connectionStatus,
            { color: netInfo.isConnected ? '#2ecc71' : '#e74c3c' }
          ]}>
            {netInfo.isConnected ? 'Connected' : 'Disconnected'}
          </ThemedText>
          <ThemedText>Type: {netInfo.type}</ThemedText>
          <ThemedText>Internet Available: {netInfo.isInternetReachable ? 'Yes' : 'No'}</ThemedText>
          {details.map((detail, index) => (
            <ThemedText key={index}>{detail}</ThemedText>
          ))}
          <ThemedText style={styles.timestamp}>Last updated: {lastUpdate}</ThemedText>
        </ThemedView>
      </ThemedView>
    );
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>

      {renderNetworkStatus()}

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({ ios: 'cmd + d', android: 'cmd + m' })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  networkContainer: {
    marginBottom: 16,
    gap: 8,
  },
  networkDetails: {
    gap: 4,
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
  },
  connectionStatus: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  timestamp: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: 4,
  }
});