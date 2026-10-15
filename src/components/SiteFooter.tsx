import { profile } from '../data/profile'

type SiteFooterProps = {
  role: string
}

export default function SiteFooter({ role }: SiteFooterProps) {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <strong>{profile.name}</strong>
          <span>{role}</span>
        </div>
        <div>
          <span>© {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}
