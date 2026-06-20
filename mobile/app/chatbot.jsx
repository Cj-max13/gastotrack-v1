import { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import api from '../services/api';
import ChatWindow from '../Components/chatbot/ChatWindow';
import ChatInput from '../Components/chatbot/ChatInput';

export default function ChatbotScreen() {
  const router = useRouter();
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: "Hi! I'm GastoTrack AI. Ask me anything about your spending!",
      isUser: false,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = {
      id: Date.now().toString(),
      text: input.trim(),
      isUser: true,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await api.post('/chatbot', { message: userMessage.text });
      
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        text: response.data.response,
        isUser: false,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        text: error.response?.status === 503
          ? 'AI Assistant is currently unavailable.'
          : "Sorry, I couldn't connect. Please try again.",
        isUser: false,
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.title}>GastoTrack AI</Text>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.chatContainer}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <ChatWindow messages={messages} loading={loading} />
        <ChatInput
          value={input}
          onChangeText={setInput}
          onSend={handleSend}
          disabled={loading}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 60,
    backgroundColor: colors.primary,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.white,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
