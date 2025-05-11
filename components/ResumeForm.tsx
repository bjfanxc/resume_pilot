import { useState } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface ResumeFormProps {
  onGenerate: (resume: string) => void
}

export default function ResumeForm({ onGenerate }: ResumeFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '你好！我是你的简历助手。让我们开始创建你的简历吧！首先，请告诉我你的姓名。'
    }
  ])
  const [currentInput, setCurrentInput] = useState('')
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    education: '',
    experience: '',
    skills: ''
  })

  const steps = [
    { field: 'name', question: '请告诉我你的姓名。' },
    { field: 'education', question: '请分享你的教育经历，包括学校、专业和时间段。' },
    { field: 'experience', question: '请描述你的工作经验，包括公司名称、职位和主要职责。' },
    { field: 'skills', question: '最后，请列出你的技能特长。' }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (currentInput.trim() === '') return

    setIsLoading(true)
    const newMessages = [
      ...messages,
      { role: 'user', content: currentInput }
    ]

    // 更新表单数据
    const updatedFormData = {
      ...formData,
      [steps[currentStep].field]: currentInput
    }
    setFormData(updatedFormData)

    // 如果不是最后一步，继续下一步
    if (currentStep < steps.length - 1) {
      setMessages([
        ...newMessages,
        { role: 'assistant', content: steps[currentStep + 1].question }
      ])
      setCurrentStep(currentStep + 1)
    } else {
      // 最后一步，生成简历
      try {
        const response = await fetch('/api/generate-resume', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedFormData),
        })

        const data = await response.json()
        onGenerate(data.resume)
      } catch (error) {
        console.error('生成简历失败:', error)
        setMessages([
          ...newMessages,
          { role: 'assistant', content: '抱歉，生成简历时发生错误，请重试。' }
        ])
      }
    }

    setCurrentInput('')
    setIsLoading(false)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow p-6 mb-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === 'assistant' ? 'justify-start' : 'justify-end'
            }`}
          >
            <div
              className={`rounded-lg px-4 py-2 max-w-[80%] ${
                message.role === 'assistant'
                  ? 'bg-gray-100 text-gray-800'
                  : 'bg-blue-600 text-white'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="请输入..."
          disabled={isLoading}
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isLoading ? '处理中...' : '发送'}
        </button>
      </form>
    </div>
  )
}