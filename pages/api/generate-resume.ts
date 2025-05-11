import { NextApiRequest, NextApiResponse } from 'next'
import { generateResume } from '../../lib/openai'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: '只支持 POST 请求' })
  }

  try {
    const resumeData = req.body
    const generatedResume = await generateResume(resumeData)
    res.status(200).json({ resume: generatedResume })
  } catch (error) {
    console.error('简历生成错误:', error)
    res.status(500).json({ message: '生成简历时发生错误' })
  }
}