import { useState } from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ResumeForm from '../components/ResumeForm'
import ResumeResult from '../components/ResumeResult'

export default function Generate() {
  const [generatedResume, setGeneratedResume] = useState<string>('')

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>生成简历 - Resume Pilot</title>
      </Head>

      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {!generatedResume ? (
          <ResumeForm onGenerate={setGeneratedResume} />
        ) : (
          <ResumeResult resume={generatedResume} />
        )}
      </main>

      <Footer />
    </div>
  )
}