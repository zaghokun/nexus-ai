const API_BASE_URL = "http://localhost:8000/api";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatSession{
  id: string;
  title: string;
  created_at: string;
}


export const chatService = {
  sendMessageStream: async (
    sessionId: string,
    content: string,
    onChunk: (chunk: string) => void,
    onComplete: () => void          
  ) => {
    try {
      const response = await fetch(`${API_BASE_URL}/chat/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session_id: sessionId,
          message: content,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) return;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value, { stream: true });
        onChunk(text);
      }

      onComplete();
    } catch (error) {
      console.error("Error sending message:", error);
      onChunk("\n[Error: Gagal terhubung ke server]");
      onComplete();
    }
  },

  getSessions: async (): Promise<ChatSession[]> => {
    try{
      const response = await fetch(`${API_BASE_URL}/chat/sessions`);
      if (!response.ok) throw new Error("Gagal mengambl history");
      return await response.json();
    }catch(error){
      console.error(error);
      return [];
    }
  },

  getMessages: async (sessionId: string): Promise<ChatMessage[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/chat/${sessionId}/messages`);
      if (!response.ok) throw new Error("Gagal mengambil pesan");
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  },
};

