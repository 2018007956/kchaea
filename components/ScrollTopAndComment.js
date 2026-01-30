import { useEffect, useState } from 'react'
import { ClapButton } from '@lyket/react'
import ScrollTop from '@/components/ScrollTop'

const ScrollTopAndComment = () => {
  const [show, setShow] = useState(false)
  // Check if Lyket API key is available (NEXT_PUBLIC_ vars are available in client components)
  const hasLyketApiKey = process.env.NEXT_PUBLIC_LYKET_API_KEY

  useEffect(() => {
    const handleWindowScroll = () => {
      if (window.scrollY > 50) setShow(true)
      else setShow(false)
    }

    window.addEventListener('scroll', handleWindowScroll)
    return () => window.removeEventListener('scroll', handleWindowScroll)
  }, [])

  return (
    <>
      {hasLyketApiKey && (
        <div
          className={`fixed bottom-9 right-8 hidden flex-col gap-6 ${
            show ? 'md:flex' : 'md:hidden'
          }`}
        >
          <button className="mb-16">
            <ClapButton id="diy-fish-holder" namespace="post" hideCounterIfLessThan={1} />
          </button>
        </div>
      )}
      <ScrollTop />
    </>
  )
}

export default ScrollTopAndComment
