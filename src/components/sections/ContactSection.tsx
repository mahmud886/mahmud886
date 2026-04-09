'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle, Mail, MapPin, Phone, Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        infoRef.current?.children as unknown as HTMLElement[],
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        },
      );

      gsap.fromTo(
        formRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message.');
      }

      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });

      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to send message.';
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id='contact' ref={sectionRef} className='relative'>
      <div className='rounded-3xl border border-surface-hover bg-surface p-8 md:p-12 relative overflow-hidden'>
        <div className='absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl' />
        <div className='absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-secondary/10 blur-3xl' />

        <div className='text-center mb-12 relative z-10'>
          <h2 className='text-4xl md:text-5xl font-bold mb-4'>
            Get In <span className='text-secondary'>Touch</span>
          </h2>
          <p className='text-text-muted text-lg max-w-2xl mx-auto'>
            Have a project in mind or want to explore potential opportunities? I am always open to discussing new
            projects and creative ideas.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 relative z-10'>
          {/* Contact Info */}
          <div ref={infoRef} className='lg:col-span-2 space-y-8'>
            <div className='bg-surface border border-surface-hover rounded-2xl p-8 hover:border-primary/50 transition-colors group'>
              <div className='w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all'>
                <Mail size={24} />
              </div>
              <h3 className='text-xl font-bold mb-2'>Email</h3>
              <p className='text-text-muted mb-4'>Drop me a line anytime.</p>
              <a
                href='mailto:iqbal886mahmud@gmail.com'
                className='text-primary hover:text-secondary font-medium transition-colors'>
                iqbal886mahmud@gmail.com
              </a>
            </div>

            <div className='bg-surface border border-surface-hover rounded-2xl p-8 hover:border-secondary/50 transition-colors group'>
              <div className='w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary mb-6 group-hover:scale-110 group-hover:bg-secondary group-hover:text-white transition-all'>
                <MapPin size={24} />
              </div>
              <h3 className='text-xl font-bold mb-2'>Location</h3>
              <p className='text-text-muted'>Remote / Worldwide</p>
            </div>

            <div className='bg-surface border border-surface-hover rounded-2xl p-8 hover:border-primary/50 transition-colors group'>
              <div className='w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all'>
                <Phone size={24} />
              </div>
              <h3 className='text-xl font-bold mb-2'>Phone</h3>
              <p className='text-text-muted mb-4'>Available for urgent inquiries.</p>
              <a href='tel:+8801670161693' className='text-primary hover:text-secondary font-medium transition-colors'>
                +880 1670-161693
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className='lg:col-span-3 bg-surface border border-surface-hover rounded-3xl p-8 md:p-12'>
            <h3 className='text-2xl font-bold mb-8'>Send me a message</h3>

            <div className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-2'>
                  <label htmlFor='name' className='text-sm font-medium text-text-muted'>
                    Your Name
                  </label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className='w-full bg-background border border-surface-hover rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-text-main'
                    placeholder='John Doe'
                  />
                </div>
                <div className='space-y-2'>
                  <label htmlFor='email' className='text-sm font-medium text-text-muted'>
                    Your Email
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className='w-full bg-background border border-surface-hover rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-text-main'
                    placeholder='john@example.com'
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <label htmlFor='message' className='text-sm font-medium text-text-muted'>
                  Your Message
                </label>
                <textarea
                  id='message'
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className='w-full bg-background border border-surface-hover rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-text-main resize-none'
                  placeholder='Tell me about your project...'
                />
              </div>

              <button
                type='submit'
                disabled={isSubmitting || isSubmitted}
                className='w-full py-4 px-8 bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100'>
                {isSubmitting ? (
                  <div className='w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin' />
                ) : isSubmitted ? (
                  <>
                    <CheckCircle size={20} />
                    <span>Message Sent!</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              {submitError ? <p className='text-sm text-red-400'>{submitError}</p> : null}
            </div>
          </form>
        </div>

        <div className='mt-10 rounded-2xl overflow-hidden border border-surface-hover'>
          <iframe
            title='map'
            src='https://www.google.com/maps?q=Dhaka,Bangladesh&output=embed'
            className='w-full h-[320px] md:h-[420px] grayscale contrast-125 opacity-90'
            loading='lazy'
          />
        </div>
      </div>
    </section>
  );
}
