// TEMPLATE — Replace all placeholders with real business details before going live.

import { Link } from "react-router-dom";
import PolicyShell, { PH } from "../components/PolicyShell";

const ContactCard = ({ label, children }) => (
  <div className="contact-card">
    <h3>{label}</h3>
    <p>{children}</p>
  </div>
);

const ContactUs = () => (
  <PolicyShell
    title="Contact Us"
    subtitle="We're here to help. Reach out to our support team and we'll get back to you as soon as possible."
    lastUpdated="June 2025"
  >
    <section className="policy-section">
      <h2>Get in Touch</h2>
      <p>
        Whether you have a question about your profile, a payment issue, a
        safety concern, or anything else — our team is happy to assist.
      </p>

      <div className="contact-grid">
        <ContactCard label="Email Support">
          <a href="mailto:support@premsetu.in">
            <PH>support@premsetu.in</PH>
          </a>
          <br />
          We aim to respond within <strong>24–48 hours</strong> on business
          days.
        </ContactCard>

        <ContactCard label="Phone">
          <PH>[CONTACT PHONE NUMBER]</PH>
          <br />
          Available Mon–Sat, <PH>[9:00 AM – 6:00 PM IST]</PH>
        </ContactCard>

        <ContactCard label="Registered Address">
          <PH>[LEGAL ENTITY NAME]</PH>
          <br />
          <PH>[FULL REGISTERED ADDRESS]</PH>
          <br />
          <PH>[CITY, STATE – PIN CODE]</PH>
          <br />
          India
        </ContactCard>

        <ContactCard label="Payment & Refund Queries">
          <a href="mailto:support@premsetu.in">
            <PH>support@premsetu.in</PH>
          </a>
          <br />
          Include your Razorpay payment ID and registered email in your
          message.
        </ContactCard>
      </div>
    </section>

    <section className="policy-section">
      <h2>Grievance Officer</h2>
      <p>
        In accordance with the Information Technology (Intermediary Guidelines
        and Digital Media Ethics Code) Rules, 2021, any complaints or concerns
        regarding content or privacy may be directed to our designated
        Grievance Officer:
      </p>
      <p>
        <strong>Name:</strong> <PH>[GRIEVANCE OFFICER FULL NAME]</PH>
        <br />
        <strong>Designation:</strong> <PH>[DESIGNATION]</PH>
        <br />
        <strong>Email:</strong>{" "}
        <a href="mailto:grievance@premsetu.in">
          <PH>grievance@premsetu.in</PH>
        </a>
        <br />
        <strong>Phone:</strong> <PH>[GRIEVANCE OFFICER PHONE]</PH>
        <br />
        <strong>Address:</strong> <PH>[REGISTERED ADDRESS]</PH>
      </p>
      <p>
        We will acknowledge your complaint within <strong>24 hours</strong> and
        aim to resolve it within <strong>30 days</strong>.
      </p>
    </section>

    <section className="policy-section">
      <h2>Useful Links</h2>
      <ul>
        <li>
          <Link to="/privacy">Privacy Policy</Link> — how we collect and
          protect your data
        </li>
        <li>
          <Link to="/terms">Terms & Conditions</Link> — rules of using
          PremSetu
        </li>
        <li>
          <Link to="/refund">Refund & Cancellation Policy</Link> — our
          policy on membership payments
        </li>
      </ul>
    </section>
  </PolicyShell>
);

export default ContactUs;
