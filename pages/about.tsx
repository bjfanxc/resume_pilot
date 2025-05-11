import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>关于我们 - Resume Pilot</title>
      </Head>

      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">关于 Resume Pilot</h1>
        <div className="prose max-w-none">
          <p>Resume Pilot 是一个基于人工智能的简历生成工具，旨在帮助求职者快速创建专业的简历。</p>
          <p>我们使用最新的AI技术，结合专业的简历写作经验，为用户提供个性化的简历生成服务。</p>
        </div>
      </main>

      <Footer />
    </div>
  )
}