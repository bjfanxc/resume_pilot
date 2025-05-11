import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            © {new Date().getFullYear()} Resume Pilot. All rights reserved.
          </div>
          <div className="space-x-4">
            <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-800">
              隐私政策
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}