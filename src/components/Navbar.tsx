import { motion } from 'framer-motion'
import { Link } from 'gatsby'
import React, { useRef, useEffect } from 'react'
import { Close, Humburger } from '@components/Icons'
import NavA from '@components/NavA'
import useDebouncedFunction from '@hooks/useDebouncedFunction'
import { LinkType } from 'selectors/selectors'

const contactsVariants = {
  hidden: {
    y: '-150vh',
  },
  visible: {
    y: 0,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

function useResizeNavLinks(
  linksRef: React.RefObject<HTMLDivElement>,
  setIsHumburgerOpen: React.Dispatch<React.SetStateAction<boolean>>
) {
  const resizeHandler = useDebouncedFunction(
    function resizeHandler(_) {
      if (linksRef?.current) {
        const isHidden =
          window
            .getComputedStyle(linksRef.current)
            .getPropertyValue('display') === 'none'
        setIsHumburgerOpen(!isHidden)
      }
    },
    300,
    true
  )

  useEffect(() => {
    window.addEventListener('resize', resizeHandler)
    return () => {
      window.removeEventListener('resize', resizeHandler)
    }
  }, [resizeHandler])

  useEffect(() => {
    resizeHandler()
  }, [resizeHandler])
}

export default function Navbar({
  setIsHumburgerOpen,
  isHumburgerOpen,
  links,
}: {
  setIsHumburgerOpen: React.Dispatch<React.SetStateAction<boolean>>
  isHumburgerOpen: boolean
  links: LinkType[]
}) {
  const linksRef = useRef<HTMLDivElement>(null)
  useResizeNavLinks(linksRef, setIsHumburgerOpen)

  return (
    <motion.nav className='flex-none md:flex mt-5'>
      <div className='flex flex-1'>
        <Link to='/' className='inline-flex'>
          <Close layoutId='header' />
        </Link>
        <Humburger
          className='ml-3 md:hidden'
          onClick={() => setIsHumburgerOpen(o => !o)}
        />
      </div>
      <motion.div
        ref={linksRef}
        className={`navAs md:flex auto-cols-fr ${isHumburgerOpen ? '' : 'hidden'}`}
        initial='hidden'
        animate={isHumburgerOpen ? 'visible' : 'hidden'}
        variants={contactsVariants}
      >
        {links.map((link, i) => {
          return (
            <NavA key={i} link={link}/>
          )
        })}
      </motion.div>
    </motion.nav>
  )
}
