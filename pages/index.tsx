import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Resume Pilot - AI驱动的简历生成器</title>
        <meta name="description" content="使用AI技术，轻松生成专业简历" />
      </Head>

      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">欢迎使用 Resume Pilot</h1>
          <p className="text-xl mb-8">使用AI技术，让简历制作变得简单高效</p>
          <Link 
            href="/generate" 
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            开始制作简历
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}