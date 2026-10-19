import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { useSiteContent } from '@/hooks/useSiteContent';
import { base44 } from '@/api/base44Client';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', message: '', website: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const { getContent } = useSiteContent();
  const heading = getContent('contact', 'heading', 'Submit Your Inquiry');
  const bodyText = getContent('contact', 'body_text', 'Ready to source quality second-hand apparel? Contact us today and our team will respond within 24 hours.');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setSubmitError('');
    try {
      const response = await base44.functions.invoke('submit-customer-inquiry', form);
      const result = response?.data || response;
      if (!result?.success) throw new Error(result?.error || 'Unable to submit enquiry. Please try again.');
      setSubmitted(true);
      setForm({ name: '', email: '', phone: '', company: '', message: '', website: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      setSubmitError(error?.message || 'Unable to submit enquiry. Please contact us on WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-primary/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">Get In Touch</div>
          <h2 className="text-4xl font-bold text-white font-playfair mb-4">{heading}</h2>
          <p className="text-white/60 max-w-xl mx-auto">
            {bodyText}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-white font-playfair mb-6">Contact Information</h3>
            </div>
            {[
              { icon: Mail, label: 'Email Us', value: 'info@usmanglobal.com', href: 'mailto:info@usmanglobal.com', multiline: false },
              { icon: Phone, label: 'Call Us', value: '+971 54 996 9994', href: 'tel:+971549969994', multiline: false },
              { icon: MapPin, label: 'Visit Us', value: 'USMAN GLOBAL FZC\nPLOT # 4D 01C-13\nHAMRIYAH FREE ZONE PHASE II\nSHARJAH UNITED ARAB EMIRATES', href: '#', multiline: true },
              { icon: MessageSquare, label: 'WhatsApp', value: '+971 54 996 9994', href: 'https://wa.me/971549969994', multiline: false },
            ].map(({ icon: Icon, label, value, href, multiline }) => (
              <a
                key={label}
                href={href}
                className="flex items-center gap-5 p-5 bg-white/10 backdrop-blur rounded-2xl border border-white/10 hover:bg-white/15 transition-all group"
              >
                <div className="w-12 h-12 bg-primary/30 rounded-xl flex items-center justify-center group-hover:bg-primary/50 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-white/50 text-xs">{label}</div>
                  <div className="text-white font-semibold whitespace-pre-line">{value}</div>
                </div>
              </a>
            ))}

            <div className="bg-primary/20 border border-primary/30 rounded-2xl p-6">
              <h4 className="text-white font-bold mb-2 font-playfair">Business Hours</h4>
              <div className="space-y-1.5 text-sm text-white/70">
                <div className="flex justify-between"><span>Monday</span><span className="text-white">8 AM – 6 PM</span></div>
                <div className="flex justify-between"><span>Tuesday</span><span className="text-white">8 AM – 6 PM</span></div>
                <div className="flex justify-between"><span>Wednesday</span><span className="text-white">8 AM – 6 PM</span></div>
                <div className="flex justify-between"><span>Thursday</span><span className="text-white">8 AM – 6 PM</span></div>
                <div className="flex justify-between"><span>Friday</span><span className="text-white">8 AM – 6 PM</span></div>
                <div className="flex justify-between"><span>Saturday</span><span className="text-white">8 AM – 6 PM</span></div>
                <div className="flex justify-between"><span>Sunday</span><span className="text-white/40">Closed</span></div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-2xl">
              <h3 className="text-xl font-bold text-foreground mb-6 font-playfair">Send Us a Message</h3>
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="Your full name"
                      className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Email *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    placeholder="e.g. +971 50 123 4567"
                    className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                  <div className="text-xs text-muted-foreground mt-1">Include country code so our team can reply on WhatsApp.</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Company Name</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={e => setForm({ ...form, company: e.target.value })}
                    placeholder="Your company (optional)"
                    className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </div>
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={e => setForm({ ...form, website: e.target.value })}
                  className="hidden"
                  aria-hidden="true"
                />
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your requirements — products, quantities, destination..."
                    className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                  />
                </div>
                {submitError ? (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{submitError}</div>
                ) : null}
                {submitted ? (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-center text-sm font-semibold text-emerald-700">✓ Inquiry sent successfully. Our team will follow up with you.</div>
                ) : null}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
                >
                  {submitting ? (
                    'Sending...'
                  ) : (
                    <><Send className="w-4 h-4" /> Send Inquiry</>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}