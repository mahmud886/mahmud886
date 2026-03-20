'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, GitFork, ExternalLink, Github as GithubIcon, Eye } from 'lucide-react';
import ProjectModal from '../ui/ProjectModal';

gsap.registerPlugin(ScrollTrigger);

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
}

export default function ProjectsSection() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch('/api/github/repos?per_page=6');
        const data = await res.json();
        setRepos(data.repositories || []);
      } catch (error) {
        console.error('Error fetching repos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  useEffect(() => {
    if (loading || repos.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.project-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [loading, repos]);

  return (
    <section id="projects" ref={sectionRef} className="relative overflow-hidden">
      <div className="rounded-3xl border border-surface-hover bg-surface p-8 md:p-12">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured <span className="text-secondary">Projects</span>
            </h2>
            <p className="text-text-muted text-lg max-w-2xl">
              A selection of my recent open-source work and personal projects fetched directly from GitHub.
            </p>
          </div>
          <a
            href="https://github.com/mahmud886"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 border border-surface-hover rounded-full hover:bg-surface transition-colors w-fit"
          >
            <GithubIcon size={20} />
            <span>View All on GitHub</span>
          </a>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-80 bg-surface rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {repos.map((repo) => (
              <div
                key={repo.id}
                className="project-card group bg-background/60 border border-surface-hover rounded-2xl p-6 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10 flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-background rounded-xl">
                    <GithubIcon className="text-primary" size={24} />
                  </div>
                  <div className="flex gap-3 text-text-muted items-center">
                    <button
                      onClick={() => setSelectedRepo(repo)}
                      className="hover:text-secondary transition-colors"
                      aria-label="Quick View"
                      title="Quick View"
                    >
                      <Eye size={20} />
                    </button>
                    {repo.homepage && (
                      <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors" title="Live Demo">
                        <ExternalLink size={20} />
                      </a>
                    )}
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" title="Repository">
                      <GithubIcon size={20} />
                    </a>
                  </div>
                </div>

                {/* Changed to open modal instead of internal detail page directly */}
                <button 
                  onClick={() => setSelectedRepo(repo)} 
                  className="mb-3 inline-block text-left"
                >
                  <h3 className="text-2xl font-bold group-hover:text-secondary transition-colors">
                    {repo.name}
                  </h3>
                </button>

                <p className="text-text-muted mb-6 flex-grow line-clamp-3">
                  {repo.description || 'No description available for this repository.'}
                </p>

                <div className="mt-auto pt-6 border-t border-surface-hover/50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4 text-sm text-text-muted">
                      {repo.language && (
                        <div className="flex items-center gap-1.5">
                          <span className="w-3 h-3 rounded-full bg-secondary" />
                          <span>{repo.language}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Star size={14} />
                        <span>{repo.stargazers_count}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork size={14} />
                        <span>{repo.forks_count}</span>
                      </div>
                    </div>
                  </div>
                  
                  {repo.topics && repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {repo.topics.slice(0, 3).map((topic) => (
                        <span key={topic} className="px-3 py-1 bg-background text-xs rounded-full text-text-muted">
                          {topic}
                        </span>
                      ))}
                      {repo.topics.length > 3 && (
                        <span className="px-3 py-1 bg-background text-xs rounded-full text-text-muted">
                          +{repo.topics.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedRepo && (
          <ProjectModal
            repo={selectedRepo}
            isOpen={!!selectedRepo}
            onClose={() => setSelectedRepo(null)}
          />
        )}
      </div>
    </section>
  );
}
