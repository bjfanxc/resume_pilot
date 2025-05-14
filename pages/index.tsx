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
      
      <main className="flex-grow container mx-auto px-4 py-16 md:py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">欢迎使用 Resume Pilot</h1>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-10">使用AI技术，让简历制作变得简单高效</p>
          <Link 
            href="/generate" 
            className="bg-blue-600 text-white px-10 py-4 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold shadow-md hover:shadow-lg"
          >
            开始制作简历
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}