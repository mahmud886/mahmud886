import { notFound } from 'next/navigation';
import { Github, ExternalLink, Star, GitFork, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import parse from 'html-react-parser';

// Setup DOMPurify for Node.js environment
const window = new JSDOM('').window;
const purify = DOMPurify(window as any);

async function getProjectData(slug: string) {
  try {
    const res = await fetch(`https://api.github.com/repos/mahmud886/${slug}`, {
      next: { revalidate: 3600 },
      headers: {
        Accept: 'application/vnd.github.v3+json',
        ...(process.env.GITHUB_TOKEN && {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        }),
      },
    });

    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error('Failed to fetch project');
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

async function getReadme(slug: string, defaultBranch: string) {
  try {
    const res = await fetch(`https://raw.githubusercontent.com/mahmud886/${slug}/${defaultBranch}/README.md`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;
    return res.text();
  } catch (error) {
    console.error('Error fetching readme:', error);
    return null;
  }
}

export default async function ProjectDetails({ params }: { params: { slug: string } }) {
  // Await the params object according to Next.js 15 requirements
  const resolvedParams = await params;
  const project = await getProjectData(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  const readme = await getReadme(resolvedParams.slug, project.default_branch || 'main');
  let htmlContent = '<p class="text-text-muted">No README available for this project.</p>';
  
  if (readme) {
    const rawHtml = await marked(readme);
    htmlContent = purify.sanitize(rawHtml);
  }

  return (
    <div className="rounded-3xl border border-surface-hover bg-surface overflow-hidden">
      <div className="border-b border-surface-hover py-10 md:py-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="px-6 md:px-10 relative z-10">
          <Link href="/#projects" className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-8">
            <ArrowLeft size={20} />
            <span>Back to Projects</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{project.name}</h1>
              <p className="text-xl text-text-muted max-w-2xl">
                {project.description}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <a
                href={project.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-surface border border-surface-hover rounded-full hover:border-primary transition-colors"
              >
                <Github size={20} />
                <span>Repository</span>
              </a>
              {project.homepage && (
                <a
                  href={project.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors"
                >
                  <ExternalLink size={20} />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 mt-10 pt-8 border-t border-surface-hover/50 text-text-muted">
            {project.language && (
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-secondary" />
                <span className="font-medium text-text-main">{project.language}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Star size={18} />
              <span>{project.stargazers_count} stars</span>
            </div>
            <div className="flex items-center gap-2">
              <GitFork size={18} />
              <span>{project.forks_count} forks</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-10 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content (README) */}
          <div className="lg:col-span-2 prose prose-invert prose-lg max-w-none">
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-surface-hover">Overview</h2>
            <div className="readme-content bg-surface p-8 rounded-2xl border border-surface-hover">
              {parse(htmlContent)}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-surface border border-surface-hover rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Topics</h3>
              {project.topics && project.topics.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {project.topics.map((topic: string) => (
                    <span key={topic} className="px-3 py-1 bg-background text-sm rounded-full text-text-muted border border-surface-hover">
                      {topic}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-text-muted text-sm">No topics provided.</p>
              )}
            </div>

            <div className="bg-surface border border-surface-hover rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Details</h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between pb-2 border-b border-surface-hover/50">
                  <span className="text-text-muted">Created</span>
                  <span className="font-medium">{new Date(project.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-surface-hover/50">
                  <span className="text-text-muted">Last Updated</span>
                  <span className="font-medium">{new Date(project.updated_at).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-surface-hover/50">
                  <span className="text-text-muted">Default Branch</span>
                  <span className="font-medium">{project.default_branch}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Open Issues</span>
                  <span className="font-medium">{project.open_issues_count}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
