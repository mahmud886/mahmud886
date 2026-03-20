import AboutSection from '@/components/sections/AboutSection';
import BlogSection from '@/components/sections/BlogSection';
import CertificationsSection from '@/components/sections/CertificationsSection';
import ContactSection from '@/components/sections/ContactSection';
import EducationSection from '@/components/sections/EducationSection';
import HeroSection from '@/components/sections/HeroSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import RunningProjectsSection from '@/components/sections/RunningProjectsSection';
import ServicesSection from '@/components/sections/ServicesSection';
import SkillsAdvantagesSection from '@/components/sections/SkillsAdvantagesSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import WorkExperienceSection from '@/components/sections/WorkExperienceSection';

export default function Home() {
  return (
    <div className='w-full flex flex-col gap-10'>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <SkillsAdvantagesSection />
      <WorkExperienceSection />
      <EducationSection />
      <CertificationsSection />
      <RunningProjectsSection />
      <ProjectsSection />
      <BlogSection />
      <TestimonialsSection />
      <ContactSection />
    </div>
  );
}
