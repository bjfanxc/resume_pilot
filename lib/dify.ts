// Dify API 工具类
export interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface StreamCallbacks {
  onThinking?: (text: string) => void
  onMessage?: (text: string) => void
  onFinish?: (conversationId: string) => void
  onError?: (error: Error) => void
}

// 处理流式响应数据
async function* readStreamData(reader: ReadableStreamDefaultReader<Uint8Array>) {
  const decoder = new TextDecoder()
  let buffer = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop() || ''

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        try {
          const data = JSON.parse(line.slice(6))
          yield data
        } catch (e) {
          console.error('解析流数据失败:', e)
        }
      }
    }
  }
}

// 发送消息到 Dify API
export async function sendMessage(
  message: string, 
  callbacks: StreamCallbacks,
  conversationId?: string
): Promise<void> {
  const apiKey = process.env.DIFY_API_KEY
  const baseUrl = process.env.DIFY_API_BASE_URL
  const appId = process.env.DIFY_APP_ID

  if (!apiKey || !baseUrl || !appId) {
    throw new Error('Dify configuration is missing')
  }

  try {
    const response = await fetch(`${baseUrl}/v1/chat-messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        app_id: appId,
        inputs: {},
        query: message,
        user: 'user',
        response_mode: 'streaming',
        conversation_id: conversationId,
      }),
    })

    if (!response.ok) {
      throw new Error(`Dify API error: ${response.statusText}`)
    }

    if (!response.body) {
      throw new Error('Response body is null')
    }

    const reader = response.body.getReader()
    let currentConversationId = conversationId || ''
    let isInThinkingMode = false
    let thinkingContent = ''

    try {
      for await (const data of readStreamData(reader)) {
        if (data.event === 'message' && data.answer) {
          const text = data.answer
          
          // 处理思考标签
          if (text.includes('<think>')) {
            isInThinkingMode = true
            const content = text.replace('<think>', '')
            thinkingContent = content
            callbacks.onThinking?.(thinkingContent)
          } 
          else if (text.includes('</think>')) {
            isInThinkingMode = false
            // 分割并处理思考内容和普通内容
            const parts = text.split('</think>')
            if (parts[0]) {
              thinkingContent += parts[0]
              callbacks.onThinking?.(thinkingContent)
            }
            if (parts[1]) {
              callbacks.onMessage?.(parts[1])
            }
          }
          else {
            // 根据当前模式发送内容
            if (isInThinkingMode) {
              thinkingContent += text
              callbacks.onThinking?.(thinkingContent)
            } else {
              callbacks.onMessage?.(text)
            }
          }

          if (data.conversation_id) {
            currentConversationId = data.conversation_id
          }
        }
        else if (data.event === 'message_end') {
          if (currentConversationId) {
            callbacks.onFinish?.(currentConversationId)
          }
          return
        }
        else if (data.event === 'error') {
          callbacks.onError?.(new Error(data.error?.toString() || 'Unknown error'))
          return
        }
      }
    } finally {
      reader.releaseLock()
    }
  } catch (error) {
    console.error('Dify API 调用失败:', error)
    callbacks.onError?.(error instanceof Error ? error : new Error('Unknown error'))
    throw error
  }
} 