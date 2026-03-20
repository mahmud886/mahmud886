'use client';

import { Download, ExternalLink, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';

export default function ResumePage() {
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!resumeRef.current) return;
    try {
      setIsDownloading(true);
      // Important: Use dynamic import and properly access the default export
      const html2pdfModule = await import('html2pdf.js');
      const html2pdf = html2pdfModule.default || html2pdfModule;
      const element = resumeRef.current;

      const opt = {
        margin: 10,
        filename: 'Iqbal_Mahmud_Resume.pdf',
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
          logging: true,
          backgroundColor: '#ffffff',
          onclone: (clonedDoc: Document) => {
            // Strip ALL tailwind color classes to prevent oklab parsing errors in html2canvas
            // Force a clean black-and-white print view
            const elements = clonedDoc.querySelectorAll('*');
            elements.forEach((el) => {
              const htmlEl = el as HTMLElement;

              // Ensure className is a string
              if (typeof htmlEl.className === 'string') {
                // Remove specific background/text color classes that use opacity/custom colors
                let newClass = htmlEl.className;
                const classesToRemove = [
                  'bg-surface', 'bg-background', 'bg-background/40', 'bg-background/50',
                  'bg-background/60', 'bg-background/80', 'bg-primary/70', 'bg-primary/10',
                  'bg-secondary/60', 'text-text-main', 'text-text-muted', 'text-text-muted/80',
                  'text-primary', 'border-surface-hover', 'border-primary/50',
                  'bg-gradient-to-tr', 'from-primary/70', 'to-secondary/60',
                  'shadow-xl', 'rounded-3xl', 'md:p-12', 'p-8' // Remove borders and huge padding
                ];

                classesToRemove.forEach(cls => {
                  // Replace global instances of the exact class string
                  newClass = newClass.split(' ').filter(c => c !== cls).join(' ');
                });

                htmlEl.className = newClass;
              }

              // Override inline styles to force black on white
              htmlEl.style.backgroundColor = 'transparent';
              htmlEl.style.backgroundImage = 'none';
              htmlEl.style.color = '#000000';
              htmlEl.style.borderColor = '#e5e7eb'; // Light gray for borders instead of dark
            });

            // Specifically target the main container to ensure white background and proper spacing
            const mainContainer = clonedDoc.getElementById('resume-content-container');
            if (mainContainer) {
              mainContainer.style.backgroundColor = '#ffffff';
              mainContainer.style.boxShadow = 'none';
              mainContainer.style.border = 'none';
              mainContainer.style.padding = '10mm 10mm 10mm 10mm'; // Use exact millimeter padding
              mainContainer.style.margin = '0';
              mainContainer.style.borderRadius = '0';
            }
          }
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const }
      };

      // We no longer need to manually toggle classes here since onclone handles it
      await html2pdf().set(opt).from(element).save();

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Check console for details.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className='max-w-4xl mx-auto text-sm'>
      <div className='mb-6 flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>Resume</h1>
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className='flex items-center gap-2 rounded-xl bg-primary text-black px-5 py-2.5 text-sm font-bold hover:bg-primary-dark transition-colors disabled:opacity-70 disabled:cursor-not-allowed'>
          {isDownloading ? (
            <div className='h-4 w-4 border-2 border-black/30 border-t-black rounded-full animate-spin' />
          ) : (
            <Download size={18} />
          )}
          {isDownloading ? 'Generating...' : 'Download PDF'}
        </button>
      </div>

      <div id="resume-content-container" ref={resumeRef} className='rounded-3xl border border-surface-hover bg-surface p-8 md:p-12 shadow-xl'>
        {/* Header */}
        <div className='border-b border-surface-hover pb-8 mb-8'>
          <div className='flex flex-col-reverse md:flex-row md:items-start justify-between gap-6'>
            <div>
              <h2 className='text-3xl font-extrabold text-text-main mb-2'>Iqbal Mahmud</h2>
              <div className='text-lg text-primary font-medium mb-4'>Software Enginner</div>

              <div className='flex flex-wrap gap-4 text-xs text-text-muted'>
                <div className='flex items-center gap-1.5'>
                  <MapPin size={14} /> Dhaka, Bangladesh
                </div>
                <div className='flex items-center gap-1.5'>
                  <Mail size={14} /> iqbal886mahmud@gmail.com
                </div>
                <a
                  href='https://github.com/mahmud886'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-1.5 hover:text-primary transition-colors'>
                  <Github size={14} /> github.com/mahmud886
                </a>
                <a
                  href='https://linkedin.com/in/mahmud886'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-1.5 hover:text-primary transition-colors'>
                  <Linkedin size={14} /> linkedin.com/in/mahmud886
                </a>
                <a
                  href='https://mahmud886.vercel.app'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-1.5 hover:text-primary transition-colors'>
                  <ExternalLink size={14} /> mahmud886.vercel.app
                </a>
              </div>
            </div>

            <div className='shrink-0'>
              <div className='h-[100px] w-[100px] rounded-full bg-gradient-to-tr from-primary/70 to-secondary/60 p-[2px] ml-auto'>
                <div className='relative h-full w-full rounded-full bg-background/80 overflow-hidden'>
                  <Image
                    src='/assets/images/profile-image.jpg'
                    alt='Iqbal Mahmud'
                    fill
                    className='object-cover'
                    sizes='100px'
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className='mb-8'>
          <h3 className='text-sm font-bold tracking-widest text-text-main mb-3 uppercase'>Summary</h3>
          <p className='text-text-muted leading-relaxed text-[13px]'>
            Software Engineer passionate about crafting high-performance web applications and seamless user experiences.
            Specializing in Next.js, React, and modern frontend ecosystems to build scalable, interactive, and
            beautifully animated interfaces. Experienced in taking complex concepts and turning them into elegant
            digital solutions.
          </p>
        </div>

        {/* Skills */}
        <div className='mb-8'>
          <h3 className='text-sm font-bold tracking-widest text-text-main mb-4 uppercase'>Core Stack</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <div className='text-xs font-semibold text-text-main mb-1.5'>Frontend</div>
              <div className='flex flex-wrap gap-1.5'>
                {['React', 'Next.js', 'TypeScript', 'Tailwind', 'GSAP', 'Three.js'].map((s) => (
                  <span
                    key={s}
                    className='bg-background/60 border border-surface-hover text-text-muted px-2 py-0.5 rounded text-[11px]'>
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className='text-xs font-semibold text-text-main mb-1.5'>Backend & API</div>
              <div className='flex flex-wrap gap-1.5'>
                {['Node.js', 'Express', 'PostgreSQL', 'Redis', 'REST', 'GraphQL'].map((s) => (
                  <span
                    key={s}
                    className='bg-background/60 border border-surface-hover text-text-muted px-2 py-0.5 rounded text-[11px]'>
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className='text-xs font-semibold text-text-main mb-1.5'>DevOps & Cloud</div>
              <div className='flex flex-wrap gap-1.5'>
                {['Docker', 'CI/CD', 'Vercel', 'AWS'].map((s) => (
                  <span
                    key={s}
                    className='bg-background/60 border border-surface-hover text-text-muted px-2 py-0.5 rounded text-[11px]'>
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className='text-xs font-semibold text-text-main mb-1.5'>Tools</div>
              <div className='flex flex-wrap gap-1.5'>
                {['Git', 'Storybook', 'Jest', 'Figma'].map((s) => (
                  <span
                    key={s}
                    className='bg-background/60 border border-surface-hover text-text-muted px-2 py-0.5 rounded text-[11px]'>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Experience */}
        <div className='mb-8'>
          <h3 className='text-sm font-bold tracking-widest text-text-main mb-4 uppercase'>Experience</h3>
          <div className='space-y-6'>
            <div>
              <div className='flex flex-wrap justify-between items-start mb-1'>
                <div>
                  <h4 className='text-base font-bold text-text-main'>Software Engineer</h4>
                  <div className='text-primary text-xs font-medium'>Adventure Dhaka Limited</div>
                </div>
                <div className='text-xs text-text-muted bg-background/50 px-2.5 py-0.5 rounded-full mt-1 md:mt-0'>
                  Nov 2024 — Present
                </div>
              </div>
              <ul className='list-disc list-outside ml-4 mt-2 space-y-1 text-text-muted text-[13px]'>
                <li>Develop and maintain scalable UIs with JavaScript (ES6+), React.js, Next.js and Storybook.</li>
                <li>Build reusable, consistent component architectures.</li>
                <li>Manage state with React Context and Redux Toolkit.</li>
                <li>Optimize performance with lazy loading, memoization and Next.js SSR.</li>
                <li>Ensure responsive theming using Tailwind CSS and Styled Components.</li>
                <li>Write unit/integration tests with Jest, React Testing Library and Cypress.</li>
                <li>Use Git and CI/CD pipelines for automated deployments.</li>
                <li>Participate in daily stand-ups, sprint planning, reviews and retrospectives.</li>
                <li>Conduct code reviews and enforce best practices.</li>
              </ul>
            </div>

            <div>
              <div className='flex flex-wrap justify-between items-start mb-1'>
                <div>
                  <h4 className='text-base font-bold text-text-main'>Software Developer</h4>
                  <div className='text-primary text-xs font-medium'>Nexdecade Technology Pvt. Ltd.</div>
                </div>
                <div className='text-xs text-text-muted bg-background/50 px-2.5 py-0.5 rounded-full mt-1 md:mt-0'>
                  Aug 2023 — Oct 2024
                </div>
              </div>
              <ul className='list-disc list-outside ml-4 mt-2 space-y-1 text-text-muted text-[13px]'>
                <li>
                  Managed a high-traffic app serving 2M+ daily users with cross-functional teams; improved system
                  efficiency and satisfaction.
                </li>
                <li>
                  Transformed UIs using React, Angular, Laravel and Inertia; reduced debugging time and improved
                  engagement.
                </li>
                <li>Implemented a secure six-step encryption–decryption REST API with 100% success rate.</li>
                <li>Optimized UI for a 25% performance boost and improved troubleshooting speed.</li>
                <li>Improved collaboration and workflow efficiency by 30% through adaptive strategies.</li>
                <li>Maintained coding standards and mentored junior engineers.</li>
                <li>Implemented Agile methodologies to increase flexibility and adaptability.</li>
                <li>Stayed current with frontend trends for seamless integration and innovation.</li>
              </ul>
            </div>

            <div>
              <div className='flex flex-wrap justify-between items-start mb-1'>
                <div>
                  <h4 className='text-base font-bold text-text-main'>Web Developer</h4>
                  <div className='text-primary text-xs font-medium'>Hogarth Dhaka</div>
                </div>
                <div className='text-xs text-text-muted bg-background/50 px-2.5 py-0.5 rounded-full mt-1 md:mt-0'>
                  Dec 2021 — Aug 2023
                </div>
              </div>
              <ul className='list-disc list-outside ml-4 mt-2 space-y-1 text-text-muted text-[13px]'>
                <li>
                  Produced 300+ HTML email templates and 100+ HTML5/JS animations for ads, websites and mobile apps with
                  90+ device compatibility.
                </li>
                <li>Built responsive hero designs and GSAP animations, improving engagement.</li>
                <li>
                  Created on‑brand creative assets including HTML5 banners and animated graphics, boosting brand
                  visibility.
                </li>
                <li>
                  Collaborated across teams to deliver responsive, brand‑aligned designs, improving design efficiency.
                </li>
                <li>Contributed to process tools that optimized workflows and team collaboration.</li>
                <li>Managed multiple projects, demonstrating strong teamwork in a fast‑paced environment.</li>
                <li>Worked with stakeholders to enhance functionality and client satisfaction.</li>
              </ul>
            </div>

            <div>
              <div className='flex flex-wrap justify-between items-start mb-1'>
                <div>
                  <h4 className='text-base font-bold text-text-main'>Web Developer</h4>
                  <div className='text-primary text-xs font-medium'>Kaizen IT Ltd</div>
                </div>
                <div className='text-xs text-text-muted bg-background/50 px-2.5 py-0.5 rounded-full mt-1 md:mt-0'>
                  Sep 2021 — Nov 2021
                </div>
              </div>
              <ul className='list-disc list-outside ml-4 mt-2 space-y-1 text-text-muted text-[13px]'>
                <li>Streamlined administrative processes and improved communication for education stakeholders.</li>
                <li>Delivered UI/UX solutions using wireframes, storyboards and prototypes with 100% success rate.</li>
                <li>
                  Developed full‑stack features with React, Node.js, Express and MongoDB, achieving 100% integration
                  rate.
                </li>
                <li>Designed UI elements that improved user interaction by 25%.</li>
                <li>Performed rigorous testing to ensure accuracy and seamless experiences.</li>
              </ul>
            </div>

            <div>
              <div className='flex flex-wrap justify-between items-start mb-1'>
                <div>
                  <h4 className='text-base font-bold text-text-main'>Web Developer</h4>
                  <div className='text-primary text-xs font-medium'>Oxdora I Tech</div>
                </div>
                <div className='text-xs text-text-muted bg-background/50 px-2.5 py-0.5 rounded-full mt-1 md:mt-0'>
                  Jan 2021 — Aug 2021
                </div>
              </div>
              <ul className='list-disc list-outside ml-4 mt-2 space-y-1 text-text-muted text-[13px]'>
                <li>Designed and developed the official website and portfolio with a 100% success rate.</li>
                <li>Built web applications that improved client satisfaction through better functionality and UX.</li>
                <li>Managed clients and conducted training sessions for marketing agents.</li>
                <li>Adopted latest frontend trends and best practices for seamless integration.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Projects */}
        <div className='mb-8'>
          <h3 className='text-sm font-bold tracking-widest text-text-main mb-4 uppercase'>Selected Projects</h3>
          <div className='space-y-6'>
            <div>
              <div className='flex items-center gap-2 mb-1'>
                <h4 className='text-base font-bold text-text-main'>Dev Visualize</h4>
                <a
                  href='https://dev-visualize.vercel.app/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-text-muted hover:text-primary transition-colors'>
                  <ExternalLink size={12} />
                </a>
              </div>
              <ul className='list-disc list-outside ml-4 space-y-1 text-text-muted text-[13px]'>
                <li>
                  Built an interactive developer learning platform that turns complex web development concepts into
                  animated, step-by-step visual explanations.
                </li>
                <li>Leveraged Framer Motion to create smooth, performant interactive animations.</li>
              </ul>
              <div className='mt-2 text-xs text-text-muted/80'>
                <span className='font-medium text-text-muted'>Stack:</span> Next.js 16, React 19, Framer Motion,
                TypeScript
              </div>
            </div>

            <div>
              <div className='flex items-center gap-2 mb-1'>
                <h4 className='text-base font-bold text-text-main'>Sporefall</h4>
                <a
                  href='https://www.sporefall.com/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-text-muted hover:text-primary transition-colors'>
                  <ExternalLink size={12} />
                </a>
              </div>
              <ul className='list-disc list-outside ml-4 space-y-1 text-text-muted text-[13px]'>
                <li>
                  Developed a sci-fi saga platform featuring rich narrative storytelling, community forums, and a
                  commerce storefront.
                </li>
                <li>
                  Integrated advanced edge analytics and custom moderation tooling to manage community engagement.
                </li>
              </ul>
              <div className='mt-2 text-xs text-text-muted/80'>
                <span className='font-medium text-text-muted'>Stack:</span> Next.js 18, React, Tailwind CSS
              </div>
            </div>

            <div>
              <div className='flex items-center gap-2 mb-1'>
                <h4 className='text-base font-bold text-text-main'>Loud Spectrum</h4>
                <a
                  href='https://loudspectrum.com/en'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-text-muted hover:text-primary transition-colors'>
                  <ExternalLink size={12} />
                </a>
              </div>
              <ul className='list-disc list-outside ml-4 space-y-1 text-text-muted text-[13px]'>
                <li>
                  Engineered a production e-commerce storefront for a terpene manufacturer, complete with account
                  management and dynamic pricing rules.
                </li>
                <li>Optimized rendering for sub-second Largest Contentful Paint (LCP) and robust order analytics.</li>
              </ul>
              <div className='mt-2 text-xs text-text-muted/80'>
                <span className='font-medium text-text-muted'>Stack:</span> React, Node.js, Express, PostgreSQL
              </div>
            </div>
          </div>
        </div>

        {/* Education & Certifications */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div>
            <h3 className='text-sm font-bold tracking-widest text-text-main mb-4 uppercase'>Education</h3>
            <div className='space-y-4'>
              <div>
                <h4 className='text-base font-bold text-text-main'>Computer Science</h4>
                <div className='text-primary text-xs font-medium'>Southeast University (BD)</div>
                <div className='text-xs text-text-muted mt-0.5'>2016 — 2020</div>
                <div className='text-xs text-text-muted mt-0.5'>Grade: 3.02</div>
              </div>
              <div>
                <h4 className='text-base font-bold text-text-main'>Higher Secondary School Certificate, Science</h4>
                <div className='text-primary text-xs font-medium'>Mymensingh Ideal College</div>
                <div className='text-xs text-text-muted mt-0.5'>Jul 2013 — Jul 2015</div>
              </div>
              <div>
                <h4 className='text-base font-bold text-text-main'>Secondary School Certificate, Science</h4>
                <div className='text-primary text-xs font-medium'>B.M High School</div>
                <div className='text-xs text-text-muted mt-0.5'>Jan 2007 — May 2013</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className='text-sm font-bold tracking-widest text-text-main mb-4 uppercase'>Certifications</h3>
            <div className='space-y-4'>
              <div>
                <h4 className='text-base font-bold text-text-main'>Reactive Accelerator - Batch 1 LWS</h4>
                <div className='text-primary text-xs font-medium'>Learn with Sumit (LWS)</div>
                <div className='text-xs text-text-muted mt-0.5'>Issued Jan 2024</div>
                <div className='text-xs text-text-muted mt-0.5'>Credential ID: LWSCTXN-UZELD7KP</div>
              </div>
              <div>
                <h4 className='text-base font-bold text-text-main'>Complete Web Development With Programming Hero</h4>
                <div className='text-primary text-xs font-medium'>Programming Hero</div>
                <div className='text-xs text-text-muted mt-0.5'>Issued Jan 2020</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
