import Link from 'next/link';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface py-12 border-t border-surface-hover">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start">
          <Link href="/" className="text-2xl font-bold tracking-tighter text-primary mb-2">
            <span className="text-secondary">Iqbal</span> Mahmud.
          </Link>
          <p className="text-text-muted text-sm text-center md:text-left">
            Building digital experiences that matter.
          </p>
        </div>

        <div className="flex space-x-6">
          <a
            href="https://github.com/mahmud886"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-primary transition-colors duration-300"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href="https://linkedin.com/in/mahmud886"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-secondary transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="https://twitter.com/mahmud886"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-primary transition-colors duration-300"
            aria-label="Twitter"
          >
            <Twitter size={20} />
          </a>
          <a
            href="mailto:iqbal886mahmud@gmail.com"
            className="text-text-muted hover:text-secondary transition-colors duration-300"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
        </div>
      </div>
      <div className="container mx-auto px-6 md:px-12 mt-8 pt-8 border-t border-surface-hover/50 flex justify-center md:justify-between items-center text-sm text-text-muted">
        <p>© {currentYear} Iqbal Mahmud. All rights reserved.</p>
        <p className="hidden md:block">
          Designed with ❤️ & Built with Next.js
        </p>
      </div>
    </footer>
  );
}
