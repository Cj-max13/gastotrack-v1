import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Switch, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useAdmin } from '../../hooks/useAdmin';

export default function AdminSettings() {
  const { getSettings, updateSettings, loading } = useAdmin();
  const [settings, setSettings] = useState({
    app_name: '',
    registration_enabled: 'true',
    ai_enabled: 'true',
    max_budget_categories: '10',
  });
  const [saving, setSaving] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const response = await getSettings();
      if (response.settings) {
        setSettings({
          app_name: response.settings.app_name || 'GastoTrack',
          registration_enabled: response.settings.registration_enabled || 'true',
          ai_enabled: response.settings.ai_enabled || 'true',
          max_budget_categories: response.settings.max_budget_categories || '10',
        });
      }
      setInitialLoad(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to load settings');
      setInitialLoad(false);
    }
  };

  const handleSave = async () => {
    // Validate max_budget_categories
    const maxCategories = parseInt(settings.max_budget_categories);
    if (isNaN(maxCategories) || maxCategories < 1 || maxCategories > 20) {
      Alert.alert('Error', 'Max budget categories must be between 1 and 20');
      return;
    }

    setSaving(true);
    try {
      await updateSettings(settings);
      Alert.alert('Success', 'Settings updated successfully');
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  if (initialLoad) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Loading settings...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General Settings</Text>

          <View style={styles.settingItem}>
            <Text style={styles.label}>App Name</Text>
            <TextInput
              style={styles.input}
              value={settings.app_name}
              onChangeText={(text) => setSettings({ ...settings, app_name: text })}
              placeholder="Enter app name"
            />
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.label}>Max Budget Categories</Text>
            <TextInput
              style={styles.input}
              value={settings.max_budget_categories}
              onChangeText={(text) => setSettings({ ...settings, max_budget_categories: text })}
              placeholder="1-20"
              keyboardType="number-pad"
            />
            <Text style={styles.hint}>Maximum number of categories a user can set budgets for (1-20)</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Feature Toggles</Text>

          <View style={styles.switchItem}>
            <View style={styles.switchLabel}>
              <Text style={styles.label}>Registration Enabled</Text>
              <Text style={styles.hint}>Allow new users to register</Text>
            </View>
            <Switch
              value={settings.registration_enabled === 'true'}
              onValueChange={(value) => 
                setSettings({ ...settings, registration_enabled: value ? 'true' : 'false' })
              }
              trackColor={{ false: '#ccc', true: '#3498db' }}
              thumbColor={settings.registration_enabled === 'true' ? '#fff' : '#f4f3f4'}
            />
          </View>

          <View style={styles.switchItem}>
            <View style={styles.switchLabel}>
              <Text style={styles.label}>AI Chatbot Enabled</Text>
              <Text style={styles.hint}>Enable Gemini AI chatbot for all users</Text>
            </View>
            <Switch
              value={settings.ai_enabled === 'true'}
              onValueChange={(value) => 
                setSettings({ ...settings, ai_enabled: value ? 'true' : 'false' })
              }
              trackColor={{ false: '#ccc', true: '#3498db' }}
              thumbColor={settings.ai_enabled === 'true' ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Values</Text>
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>App Name: {settings.app_name}</Text>
            <Text style={styles.infoText}>
              Registration: {settings.registration_enabled === 'true' ? 'Enabled' : 'Disabled'}
            </Text>
            <Text style={styles.infoText}>
              AI Chatbot: {settings.ai_enabled === 'true' ? 'Enabled' : 'Disabled'}
            </Text>
            <Text style={styles.infoText}>
              Max Budget Categories: {settings.max_budget_categories}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.saveButton, saving && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={saving || loading}
        >
          {saving ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>💾 Save Settings</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#7f8c8d',
    fontSize: 16,
  },
  content: {
    padding: 15,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  settingItem: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  hint: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 5,
  },
  switchItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
    marginBottom: 15,
  },
  switchLabel: {
    flex: 1,
    marginRight: 15,
  },
  infoBox: {
    backgroundColor: '#ecf0f1',
    padding: 15,
    borderRadius: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#2c3e50',
    marginBottom: 8,
  },
  saveButton: {
    backgroundColor: '#3498db',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  saveButtonDisabled: {
    backgroundColor: '#95a5a6',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
