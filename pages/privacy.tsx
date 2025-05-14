import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Head>
        <title>隐私政策 - Resume Pilot</title>
      </Head>

      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-custom-blue">隐私政策</h1>
        <div className="prose max-w-none text-gray-700">
          <p>我们重视您的隐私，并承诺保护您的个人信息。</p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">信息收集</h2>
          <p>我们只收集生成简历所必需的信息。</p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">信息使用</h2>
          <p>您的信息仅用于生成简历，不会用于其他目的。</p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">信息保护</h2>
          <p>我们采用业界标准的安全措施保护您的信息。</p>
        </div>
      </main>

      <Footer />
    </div>
  )
}