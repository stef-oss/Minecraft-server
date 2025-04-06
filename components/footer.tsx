import Link from "next/link"
import { Server } from "lucide-react"

const SOCIAL_ICONS = {
  facebook: (
    <path
      fillRule="evenodd"
      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89.975 0 1.844.18 2.508.52v3.01h-1.42c-1.4 0-1.837.868-1.837 1.763V12h3.125l-.5 3.25h-2.625v6.987C18.343 21.128 22 16.991 22 12z"
      clipRule="evenodd"
    />
  ),
  twitter: (
    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
  ),
  github: (
    <path
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      clipRule="evenodd"
    />
  ),
  dribbble: (
    <path
      fillRule="evenodd"
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
      clipRule="evenodd"
    />
  ),
}

const FooterLinkList = ({ title, links }) => (
  <div>
    <h3 className="text-white font-bold mb-4">{title}</h3>
    <ul className="space-y-2">
      {links.map((item) => (
        <li key={item}>
          <Link href="#" className="text-blue-300 hover:text-blue-400 transition-colors">
            {item}
          </Link>
        </li>
      ))}
    </ul>
  </div>
)

const SocialIcon = ({ name }) => (
  <Link
    href="#"
    className="text-blue-300 hover:text-blue-400 transition-colors"
    aria-label={`${name} link`}
  >
    <div className="h-8 w-8 flex items-center justify-center rounded-full border border-blue-800 hover:border-blue-500 transition-colors">
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        {SOCIAL_ICONS[name]}
      </svg>
    </div>
  </Link>
)

export function Footer() {
  const currentYear = new Date().getFullYear()
  
  const footerLinks = {
    products: ["Minecraft Hosting", "Modpack Servers", "Game Servers", "Web Hosting", "VPS Hosting"],
    resources: ["Documentation", "Blog", "Tutorials", "Status", "Support Center"],
    company: ["About Us", "Careers", "Contact", "Privacy Policy", "Terms of Service"],
    legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  }
  
  const socialPlatforms = ["facebook", "twitter", "github", "dribbble"]

  return (
    <footer className="bg-black/80 backdrop-blur-sm border-t border-blue-900/50 pt-12 pb-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-8">
          <div className="col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Server className="h-7 w-7 text-blue-500" />
              <span className="text-xl font-bold text-white">Nexonoia Host</span>
            </Link>
            <p className="text-blue-200 mb-4 max-w-xs">
              Premium Minecraft hosting with unbeatable performance, reliability, and support. Powered by Ryzen 9 7950X
              processors for maximum performance.
            </p>
            <div className="flex space-x-4">
              {socialPlatforms.map((social) => (
                <SocialIcon key={social} name={social} />
              ))}
            </div>
          </div>

          <FooterLinkList title="Products" links={footerLinks.products} />
          <FooterLinkList title="Resources" links={footerLinks.resources} />
          <FooterLinkList title="Company" links={footerLinks.company} />
        </div>

        <div className="border-t border-blue-900/50 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-blue-300 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Nexonoia Host. All rights reserved.
          </p>
          <div className="flex space-x-6">
            {footerLinks.legal.map((item) => (
              <Link key={item} href="#" className="text-blue-300 hover:text-blue-400 transition-colors text-sm">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
