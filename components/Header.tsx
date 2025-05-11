import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Header() {
  const router = useRouter()
  
  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            Resume Pilot
          </Link>
          
          <div className="space-x-6">
            <Link 
              href="/generate"
              className={`${router.pathname === '/generate' ? 'text-blue-600' : 'text-gray-600'} hover:text-blue-800`}
            >
              生成简历
            </Link>
            <Link 
              href="/about"
              className={`${router.pathname === '/about' ? 'text-blue-600' : 'text-gray-600'} hover:text-blue-800`}
            >
              关于我们
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}