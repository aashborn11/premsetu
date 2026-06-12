// Business details filled June 2026. Still advisable to have a lawyer review
// this legal copy before relying on it for live payments.

import { Link } from "react-router-dom";
import PolicyShell from "../components/PolicyShell";

const ContactCard = ({ label, children }) => (
  <div className="contact-card">
    <h3>{label}</h3>
    <p>{children}</p>
  </div>
);

const ContactUs = () => (
  <PolicyShell
    title="Contact Us"
    subtitle="We're here to help. Reach out and we'll get back to you as soon as we can."
    lastUpdated="June 2026"
  >
    <section className="policy-section">
      <h2>Get in Touch</h2>
      <p>
        Whether you have a question about your profile, a payment issue, a
        safety concern, or anything else — we're happy to assist.
      </p>

      <div className="contact-grid">
        <ContactCard label="Email Support">
          <a href="mailto:officialpremsetu@gmail.com">officialpremsetu@gmail.com</a>
          <br />
          We aim to respond within <strong>24–48 hours</strong> on business
          days.
        </ContactCard>

        <ContactCard label="Phone">
          +91 74098 68966
          <br />
          Available Mon–Sat, 10:00 AM – 6:00 PM IST
        </ContactCard>

        <ContactCard label="Address">
          Karmveer Singh (Proprietor, PremSetu)
          <br />
          D-5, Teachers Colony, Shradhapuri Phase 2
          <br />
          Meerut, Uttar Pradesh – 250001
          <br />
          India
        </ContactCard>

        <ContactCard label="Payment & Refund Queries">
          <a href="mailto:officialpremsetu@gmail.com">officialpremsetu@gmail.com</a>
          <br />
          Include your UPI transaction (UTR) ID and registered email in your
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
        <strong>Name:</strong> Karmveer Singh
        <br />
        <strong>Designation:</strong> Grievance Officer
        <br />
        <strong>Email:</strong>{" "}
        <a href="mailto:officialpremsetu@gmail.com">officialpremsetu@gmail.com</a>
        <br />
        <strong>Phone:</strong> +91 74098 68966
        <br />
        <strong>Address:</strong> D-5, Teachers Colony, Shradhapuri Phase 2,
        Meerut, Uttar Pradesh – 250001
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
