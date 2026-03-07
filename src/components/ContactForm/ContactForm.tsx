'use client';

import { ContactFormData } from '@/types';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const INITIAL_FORM_STATE: ContactFormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const ContactForm = () => {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    defaultValues: INITIAL_FORM_STATE,
    mode: 'onBlur',
  });

  const handleFormSubmit = async () => {
    setSubmitStatus('idle');

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      reset(INITIAL_FORM_STATE);
    } catch {
      setSubmitStatus('error');
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
          onSubmit={handleSubmit(handleFormSubmit)}
          noValidate
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
              {...register('name', {
                required: 'El nombre es obligatorio.',
                minLength: {
                  value: 2,
                  message: 'El nombre debe tener al menos 2 caracteres.',
                },
                maxLength: {
                  value: 80,
                  message: 'El nombre no puede superar los 80 caracteres.',
                },
              })}
              placeholder="Tu nombre"
              className={inputBaseClasses}
              aria-required="true"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <p id="name-error" className="mt-2 text-sm text-red-300" role="alert">
                {errors.name.message}
              </p>
            )}
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
              {...register('email', {
                required: 'El email es obligatorio.',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Ingresa un email valido.',
                },
              })}
              placeholder="tu@email.com"
              className={inputBaseClasses}
              aria-required="true"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p id="email-error" className="mt-2 text-sm text-red-300" role="alert">
                {errors.email.message}
              </p>
            )}
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
              {...register('subject', {
                required: 'El asunto es obligatorio.',
                minLength: {
                  value: 4,
                  message: 'El asunto debe tener al menos 4 caracteres.',
                },
                maxLength: {
                  value: 120,
                  message: 'El asunto no puede superar los 120 caracteres.',
                },
              })}
              placeholder="Asunto del mensaje"
              className={inputBaseClasses}
              aria-required="true"
              aria-invalid={Boolean(errors.subject)}
              aria-describedby={errors.subject ? 'subject-error' : undefined}
            />
            {errors.subject && (
              <p id="subject-error" className="mt-2 text-sm text-red-300" role="alert">
                {errors.subject.message}
              </p>
            )}
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
              {...register('message', {
                required: 'El mensaje es obligatorio.',
                minLength: {
                  value: 10,
                  message: 'El mensaje debe tener al menos 10 caracteres.',
                },
                maxLength: {
                  value: 1200,
                  message: 'El mensaje no puede superar los 1200 caracteres.',
                },
              })}
              placeholder="Escribe tu mensaje aquí..."
              rows={5}
              className={`${inputBaseClasses} resize-none`}
              aria-required="true"
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'message-error' : undefined}
            />
            {errors.message && (
              <p id="message-error" className="mt-2 text-sm text-red-300" role="alert">
                {errors.message.message}
              </p>
            )}
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

