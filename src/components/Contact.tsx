import './contact.scss';
import { useState, type FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import {
  ArrowUpRight,
  AlertTriangle,
  Check,
  LoaderCircle,
  MessageCircle,
  X,
  Mail
} from 'lucide-react';

const CONTACT_EMAIL = 'saikrishnaaketi1@gmail.com';
const WHATSAPP_NUMBER = '919100710460';

type Field =
  | 'name'
  | 'business'
  | 'email'
  | 'telephone'
  | 'address'
  | 'problem';

type Values = Record<Field, string>;
type Errors = Partial<Record<Field, string>>;

const INITIAL: Values = {
  name: '',
  business: '',
  email: '',
  telephone: '',
  address: '',
  problem: '',
};

const LABELS: Record<Field, string> = {
  name: 'Your name',
  business: 'Business name',
  email: 'Email address',
  telephone: 'Telephone',
  address: 'Address',
  problem: 'What needs solving?',
};

const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  'Hi AKETI, I would like to discuss a business problem.',
)}`;

function validate(values: Values): Errors {
  const errors: Errors = {};

  (Object.keys(values) as Field[]).forEach((field) => {
    if (!values[field].trim()) {
      errors[field] = `${LABELS[field]} is required.`;
    }
  });

  if (
    values.email.trim() &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())
  ) {
    errors.email = 'Enter a valid email address.';
  }

  if (
    values.telephone.trim() &&
    !/^\+?[\d\s()-]{8,18}$/.test(values.telephone.trim())
  ) {
    errors.telephone = 'Enter a valid phone number.';
  }

  return errors;
}

export default function Contact() {
  const [values, setValues] = useState<Values>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [liveValidation, setLiveValidation] = useState(false);
  const [sending, setSending] = useState(false);
  const [modal, setModal] = useState<'success' | 'error' | null>(null);
  const [feedback, setFeedback] = useState('');

  function updateField(field: Field, value: string) {
    const updated = { ...values, [field]: value };
    setValues(updated);

    if (liveValidation) {
      const nextErrors = validate(updated);
      setErrors(nextErrors);

      setFeedback(
        Object.keys(nextErrors).length
          ? 'Please check the highlighted fields.'
          : '',
      );
    } else {
      setErrors((current) => ({
        ...current,
        [field]: undefined,
      }));
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (sending) return;

    const nextErrors = validate(values);

    setErrors(nextErrors);
    setLiveValidation(true);

    if (Object.keys(nextErrors).length > 0) {
      setFeedback('A few details need your attention.');
      return;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setFeedback(
        'Email delivery is not configured. Please add your EmailJS credentials.',
      );
      return;
    }

    setSending(true);
    setFeedback('');

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          to_email: CONTACT_EMAIL,
          contact_reason: 'Business enquiry',
          from_name: values.name,
          name: values.name,
          business: values.business,
          organization: values.business,
          reply_to: values.email,
          email: values.email,
          telephone: values.telephone,
          address: values.address,
          message: values.problem,
          problem: values.problem,
        },
        { publicKey },
      );

      // Show success only after EmailJS accepts the request.
      setModal('success');
      setValues(INITIAL);
      setErrors({});
      setLiveValidation(false);
      setFeedback('');
    } catch (error) {
      console.error('EmailJS submission failed:', error);

      setFeedback(
        'We could not send your enquiry. Please try again or contact us on WhatsApp.',
      );

      setModal('error');
    } finally {
      setSending(false);
    }
  }

  function renderInput(
    field: Exclude<Field, 'problem'>,
    placeholder: string,
    type = 'text',
  ) {
    return (
      <label className="contact-field" key={field}>
        {LABELS[field]}

        <input
          name={field}
          type={type}
          value={values[field]}
          placeholder={placeholder}
          onChange={(event) =>
            updateField(field, event.target.value)
          }
          aria-invalid={Boolean(errors[field])}
          aria-describedby={
            errors[field] ? `${field}-error` : undefined
          }
          autoComplete={
            field === 'name'
              ? 'name'
              : field === 'email'
                ? 'email'
                : field === 'telephone'
                  ? 'tel'
                  : field === 'business'
                    ? 'organization'
                    : 'street-address'
          }
        />

        {errors[field] && (
          <small
            className="field-error"
            id={`${field}-error`}
          >
            <AlertTriangle size={12} />
            {errors[field]}
          </small>
        )}
      </label>
    );
  }

  return (
    <>
      <section className="contact section-shell" id="contact">

        {/* Left side — Contact information */}
        <div className="contact-heading">
          <p className="eyebrow">04 — YOUR MOVE</p>

          <h2>
            What’s not
            <br />
            working <em>right?</em>
          </h2>

          <p>
            Tell us what’s slowing your business down.
            We’ll figure out what needs building — together.
          </p>

          <div className="contact-links">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp us <ArrowUpRight size={17} />
            </a>

            <a href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL} <ArrowUpRight size={17} />
            </a>
          </div>

          <small className="contact-note">
            No pressure. No pitch deck required.
            Just tell us what’s up.
          </small>
        </div>

        {/* Right side — Contact form */}
        <form
          className="contact-form"
          onSubmit={handleSubmit}
          noValidate
        >
          {renderInput(
            'name',
            'What should we call you?',
          )}

          {renderInput(
            'business',
            'The business behind the problem',
          )}

          {renderInput(
            'email',
            'you@yourbusiness.com',
            'email',
          )}

          {renderInput(
            'telephone',
            '+91 00000 00000',
            'tel',
          )}

          {renderInput(
            'address',
            'City, country',
          )}

          <label className="contact-field">
            {LABELS.problem}

            <textarea
              name="problem"
              rows={4}
              value={values.problem}
              placeholder="The messy process, the repeated task, the thing that should be easier..."
              onChange={(event) =>
                updateField('problem', event.target.value)
              }
              aria-invalid={Boolean(errors.problem)}
              aria-describedby={
                errors.problem ? 'problem-error' : undefined
              }
            />

            {errors.problem && (
              <small
                className="field-error"
                id="problem-error"
              >
                <AlertTriangle size={12} />
                {errors.problem}
              </small>
            )}
          </label>

          {feedback && (
            <p className="form-feedback" role="status">
              {feedback}
            </p>
          )}

        {/* Submit form */}
        <button
          className="contact-whatsapp"
          type="submit"
          disabled={sending}
        >
          {sending ? (
            <>
              Sending
              <LoaderCircle className="contact-spin" size={17} />
            </>
          ) : (
            <>
              Submit Here
              <ArrowUpRight size={18} />
            </>
          )}
        </button>

        {/* Email button */}
        {/* <a
          className="contact-whatsapp"
          href={`mailto:${CONTACT_EMAIL}`}
        >
          <Mail size={20} />
          Prefer Email? Click Here
          <ArrowUpRight size={18} />
        </a> */}

        {/* WhatsApp button */}
        {/* <a
          className="contact-whatsapp"
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
        >
          <MessageCircle size={20} />
          Prefer WhatsApp? Click Here
          <ArrowUpRight size={18} />
        </a> */}

        </form>
      </section>

      {/* Success / Error popup */}
      {modal && (
        <div
          className="contact-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setModal(null);
            }
          }}
        >
          <section
            className="contact-result-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
          >
            <button
              className="contact-modal-close"
              type="button"
              aria-label="Close message"
              onClick={() => setModal(null)}
            >
              <X size={18} />
            </button>

            <span className={`contact-modal-icon ${modal}`}>
              {modal === 'success' ? (
                <Check size={26} />
              ) : (
                <AlertTriangle size={24} />
              )}
            </span>

            <h3 id="contact-modal-title">
              {modal === 'success'
                ? 'Message sent successfully!'
                : 'We couldn’t send your message.'}
            </h3>

            <p>
              {modal === 'success'
                ? 'Thank you for reaching out to AKETI. We’ll get back to you soon.'
                : 'Please try again, or contact us directly on WhatsApp.'}
            </p>

            {modal === 'error' ? (
              <a
                className="button button-red"
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
              >
                Message on WhatsApp
                <ArrowUpRight size={17} />
              </a>
            ) : (
              <button
                className="button button-red"
                type="button"
                onClick={() => setModal(null)}
              >
                Continue
                <ArrowUpRight size={17} />
              </button>
            )}
          </section>
        </div>
      )}
    </>
  );
}
