'use client';

import { ContactFormData } from '@/types';
import { useState } from 'react';

const INITIAL_FORM_STATE: ContactFormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const ContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData(INITIAL_FORM_STATE);
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBaseClasses =
    'w-full rounded-xl border border-indigo-300/20 bg-slate-900/70 px-4 py-3 text-white placeholder:text-slate-400 focus:border-cyan-300/55 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300';

  return (
    <section id="contact" className="px-4 py-20 sm:px-6 lg:px-8" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-3xl">
        <h2
          id="contact-heading"
          className="text-center text-3xl font-bold text-white sm:text-4xl"
        >
          Conectemos
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-center text-slate-300">
          Si tienes una vacante o un proyecto digital, conversemos. Te responderé en breve.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6 rounded-3xl border border-indigo-300/20 bg-slate-950/70 p-7 shadow-[0_20px_50px_rgba(2,6,23,0.6)] backdrop-blur-md sm:p-10"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Tu nombre"
              className={inputBaseClasses}
              aria-required="true"
            />
          </div>

            <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="tu@email.com"
              className={inputBaseClasses}
              aria-required="true"
            />
          </div>
          </div>

          <div>
            <label
              htmlFor="subject"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Asunto
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder="Asunto del mensaje"
              className={inputBaseClasses}
              aria-required="true"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Escribe tu mensaje aquí..."
              rows={5}
              className={`${inputBaseClasses} resize-none`}
              aria-required="true"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl border border-cyan-200/50 bg-gradient-to-r from-cyan-500/80 to-indigo-500/80 px-6 py-4 font-semibold text-white shadow-[0_0_30px_rgba(34,211,238,0.32)] transition-all duration-300 hover:from-cyan-400 hover:to-indigo-400 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label={isSubmitting ? 'Enviando mensaje...' : 'Enviar mensaje'}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Enviando...
              </span>
            ) : (
              'Enviar Mensaje'
            )}
          </button>

          {submitStatus === 'success' && (
            <div
              className="rounded-xl border border-emerald-400/35 bg-emerald-500/15 p-4 text-center text-emerald-300"
              role="alert"
            >
              ¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.
            </div>
          )}

          {submitStatus === 'error' && (
            <div
              className="rounded-xl border border-red-400/35 bg-red-500/15 p-4 text-center text-red-300"
              role="alert"
            >
              Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactForm;

