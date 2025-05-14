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
          
          <div className="space-x-4 md:space-x-6">
            <Link
              href="/generate"
              className={`px-4 py-2 rounded-md transition-colors font-medium
                ${router.pathname === '/generate' 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'text-blue-600 border border-blue-500 hover:bg-blue-500 hover:text-white'
                }
              `}
            >
              生成简历
            </Link>
            <Link
              href="/about"
              className={`px-4 py-2 rounded-md transition-colors font-medium
                ${router.pathname === '/about' 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'text-blue-600 border border-blue-500 hover:bg-blue-500 hover:text-white'
                }
              `}
            >
              关于我们
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}