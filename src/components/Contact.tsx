import './contact.scss';
import { useState, type FormEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';

// Replace this with the real business email before publishing.
const CONTACT_EMAIL = 'hello@aketi.in';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') || '');
    const business = String(form.get('business') || '');
    const problem = String(form.get('problem') || '');
    const email = String(form.get('email') || '');
    const subject = encodeURIComponent(`AKETI project enquiry — ${business || name}`);
    const body = encodeURIComponent(`Name: ${name}\nBusiness: ${business}\nEmail: ${email}\n\nWhat needs solving:\n${problem}`);

    // This opens the visitor's email app; this starter does not store form data.
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  return (
        <section className="contact section-shell" id="contact">
          <div className="contact-heading">
            <p className="eyebrow">04 — YOUR MOVE</p>
            <h2>What’s not<br/>working <em>right?</em></h2>
            <p>Tell us what’s slowing your business down. We’ll figure out what needs building — together.</p>
            <div className="contact-links">
              <a href="https://wa.me/?text=Hi%20AKETI%2C%20I%27d%20like%20to%20discuss%20a%20business%20problem." target="_blank" rel="noreferrer">WhatsApp us <ArrowUpRight size={17}/></a>
              <a href="mailto:hello@aketi.in">hello@aketi.in <ArrowUpRight size={17}/></a>
            </div>
            <small className="contact-note">No pressure. No pitch deck required. Just tell us what’s up.</small>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>Your name<input required name="name" placeholder="What should we call you?"/></label>
            <label>Business name <span>OPTIONAL</span><input name="business" placeholder="The business behind the problem"/></label>
            <label>Email address<input required type="email" name="email" placeholder="you@yourbusiness.com"/></label>
            <label>What needs solving?<textarea required name="problem" rows={4} placeholder="The messy process, the repeated task, the thing that should be easier..."/></label>
            <button className="button button-red form-submit" type="submit">Let’s figure it out <ArrowUpRight size={18}/></button>
            {submitted && <p className="form-feedback" role="status">Your email app should open with your enquiry ready to send.</p>}
            <small>Submitting opens your email app. Nothing is stored on a server in this starter version.</small>
          </form>
        </section>
  );
}
