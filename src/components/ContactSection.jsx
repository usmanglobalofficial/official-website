import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2, RotateCcw } from 'lucide-react';
import { useSiteContent } from '@/hooks/useSiteContent';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', message: '', website: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [lastInquiry, setLastInquiry] = useState(null);

  const { getContent } = useSiteContent();
  const heading = getContent('contact', 'heading', 'Submit Your Inquiry');
  const bodyText = getContent('contact', 'body_text', 'Ready to source quality second-hand apparel? Contact us today and our team will respond within 24 hours.');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    // Spam honeypot check
    if (form.website) return;

    setSubmitting(true);
    setSubmitError('');

    try {
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        company: form.company || 'Not Specified',
        message: form.message,
        _subject: `New Wholesale Inquiry: ${form.name} (${form.company || 'Website Lead'})`,
        _replyto: form.email,
        _template: 'table',
        _captcha: 'false',
      };

      const response = await fetch('https://formsubmit.co/ajax/info@usmanglobal.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => null);

      // FormSubmit returns success: true or activation message on first use
      if (response.ok || (data && (data.success === 'true' || data.success === true || (data.message && data.message.includes('Activate'))))) {
        setLastInquiry({ ...form });
        setSubmitted(true);
        setForm({ name: '', email: '', phone: '', company: '', message: '', website: '' });
      } else {
        throw new Error(data?.message || 'Unable to submit enquiry right now.');
      }
    } catch (error) {
      console.error('Inquiry submission error:', error);
      setSubmitError(
        'Unable to send enquiry automatically. Please click the button below to send your enquiry directly via WhatsApp.'
      );
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
          {/* Contact info cards */}
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

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              {submitted ? (
                /* Success State with Admin Email Confirmation and WhatsApp CTA */
                <div className="text-center py-6 space-y-5">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-sm">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold font-playfair text-slate-900 mb-2">
                      Inquiry Sent to Admin!
                    </h3>
                    <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                      Thank you{lastInquiry?.name ? `, ${lastInquiry.name}` : ''}! Your message has been dispatched to our sales &amp; export administration desk at{' '}
                      <span className="font-semibold text-slate-900">info@usmanglobal.com</span>.
                    </p>
                    <p className="text-slate-500 text-xs mt-2">
                      Our export desk will review your requested commodities and follow up with you shortly.
                    </p>
                  </div>

                  {/* Immediate WhatsApp Connect Button */}
                  <div className="pt-2">
                    <a
                      href={`https://wa.me/971549969994?text=${encodeURIComponent(
                        `Hello Usman Global, I just submitted an inquiry on your website:\nName: ${lastInquiry?.name || ''}\nCompany: ${lastInquiry?.company || 'N/A'}\nEmail: ${lastInquiry?.email || ''}\nMessage: ${lastInquiry?.message || ''}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-sm transition-all shadow-md shadow-emerald-950/20"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      <span>Need Urgent Reply? Chat on WhatsApp</span>
                    </a>
                  </div>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 font-semibold transition-colors pt-2"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Send Another Inquiry
                  </button>
                </div>
              ) : (
                /* Contact Form */
                <form onSubmit={handleSubmit}>
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

                    {submitError && (
                      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 space-y-3">
                        <p className="text-xs text-rose-700 leading-relaxed font-medium">{submitError}</p>
                        <a
                          href={`https://wa.me/971549969994?text=${encodeURIComponent(
                            `Hello Usman Global, I would like to inquire about wholesale used clothing:\nName: ${form.name || ''}\nCompany: ${form.company || 'N/A'}\nMessage: ${form.message || ''}`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-xs transition-all shadow-sm"
                        >
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                          </svg>
                          <span>Chat on WhatsApp: +971 54 996 9994</span>
                        </a>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] disabled:opacity-60 disabled:hover:scale-100 shadow-md"
                    >
                      {submitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Sending to Admin (info@usmanglobal.com)...</span>
                        </div>
                      ) : (
                        <>
                          <Send className="w-4 h-4" /> Send Inquiry
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}