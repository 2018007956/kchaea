import siteMetadata from '@/data/siteMetadata'
import ContactLink from '@/components/ContactLink'
import { PageSEO } from '@/components/SEO'
import PageTitle from '@/components/PageTitle'
import { FiMail } from 'react-icons/fi'
import { AiOutlineGithub } from 'react-icons/ai'
import { FaLinkedinIn } from 'react-icons/fa'

const Contact = () => {
  const contacts = [
    {
      href: `mailto:${siteMetadata.email}`,
      label: 'Email',
      value: siteMetadata.email,
      description: '가장 빠르게 확인하는 연락 수단입니다.',
      icon: FiMail,
    },
    {
      href: siteMetadata.github,
      label: 'GitHub',
      value: siteMetadata.github.replace('https://github.com/', '@'),
      description: '프로젝트/코드/실험 기록을 모아둡니다.',
      icon: AiOutlineGithub,
    },
    {
      href: siteMetadata.linkedin,
      label: 'LinkedIn',
      value: siteMetadata.linkedin
        .replace('https://www.linkedin.com/in/', '/in/')
        .replace(/\/$/, ''),
      description: '커리어/네트워킹 용도입니다.',
      icon: FaLinkedinIn,
    },
  ]

  return (
    <>
      <PageSEO title={`Contact - ${siteMetadata.author}`} description="All my contacts" />
      <div className="mx-auto max-w-3xl overflow-hidden">
        <div className="space-y-3 pb-6 pt-2">
          <PageTitle>Contact</PageTitle>
          <p className="text-md leading-7 text-gray-500 dark:text-gray-400">
            협업, 질문, 피드백 모두 환영합니다. 아래 채널 중 편한 곳으로 연락 주세요.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-gradient-to-b from-white/70 to-white/30 p-5 backdrop-blur dark:border-gray-700 dark:from-zinc-900/40 dark:to-zinc-900/20">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            메일로 연락 주실 때는{' '}
            <span className="font-semibold text-gray-900 dark:text-gray-100">주제</span>와{' '}
            <span className="font-semibold text-gray-900 dark:text-gray-100">간단한 배경</span>을{' '}
            함께 적어주시면 더 빠르게 답변드릴 수 있어요.
          </p>
        </div>

        <div className="pb-10 pt-8">
          <ul className="grid gap-4 sm:grid-cols-2">
            {contacts.map((c) => (
              <ContactLink
                key={c.href}
                href={c.href}
                label={c.label}
                value={c.value}
                description={c.description}
                icon={c.icon}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Contact
