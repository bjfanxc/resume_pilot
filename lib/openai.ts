import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

interface ResumeData {
  name: string
  education: string
  experience: string
  skills: string
}

export async function generateResume(data: ResumeData): Promise<string> {
  try {
    const prompt = `请根据以下信息生成一份专业的简历：
姓名：${data.name}
教育经历：${data.education}
工作经验：${data.experience}
技能特长：${data.skills}

请生成一份结构清晰、专业的简历，突出关键成就和技能。`

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 1000,
      temperature: 0.7,
    })

    return response.data.choices[0].text || '生成失败，请重试'
  } catch (error) {
    console.error('OpenAI API 调用失败:', error)
    throw new Error('生成简历失败')
  }
}