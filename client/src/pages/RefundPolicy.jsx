// TEMPLATE — Must be reviewed and approved by a qualified Indian lawyer
// before going live. Replace all placeholders with real business details.
// Razorpay KYC requires a clear, unambiguous refund/cancellation policy.

import PolicyShell, { PolicySection } from "../components/PolicyShell";

const RefundPolicy = () => (
  <PolicyShell
    title="Refund & Cancellation Policy"
    subtitle="Please read this policy carefully before purchasing a PremSetu membership."
    lastUpdated="June 2025"
  >
    <PolicySection title="1. Our Membership Fee">
      <p>
        PremSetu charges a one-time membership fee for access to premium
        features, including full profile views, contact details, and
        in-platform messaging. The current fee is{" "}
        <strong>₹499 (inclusive of applicable taxes)</strong>, subject to
        change. The exact amount payable is shown on the Membership page at
        the time of purchase.
      </p>
      <p>
        Payments are processed securely through{" "}
        <strong>Razorpay Payment Solutions Pvt. Ltd.</strong> PremSetu does
        not store your card, UPI, or banking credentials.
      </p>
    </PolicySection>

    <PolicySection title="2. General No-Refund Policy">
      <p>
        <strong>
          Once a membership payment is successfully completed and your account
          is upgraded to paid status, the fee is non-refundable.
        </strong>
      </p>
      <p>
        This is because the membership grants immediate access to a digital
        service (full profile data, contact details, and messaging) that is
        consumed the moment access is granted. As such, the service is
        considered fully delivered upon payment confirmation.
      </p>
      <p>
        This no-refund policy applies regardless of:
      </p>
      <ul>
        <li>Whether you found a suitable match or not.</li>
        <li>
          Whether you chose to use or not use the paid features after
          purchase.
        </li>
        <li>
          Whether you decide to close or deactivate your account after
          payment.
        </li>
      </ul>
      <p>
        By completing the payment, you explicitly acknowledge and agree to
        this no-refund policy.
      </p>
    </PolicySection>

    <PolicySection title="3. Exceptions — When a Refund May Be Considered">
      <p>
        We will consider a refund request <em>only</em> in the following
        circumstances:
      </p>
      <ul>
        <li>
          <strong>Duplicate charge:</strong> Your account was charged more
          than once for the same membership purchase due to a payment system
          error. In such cases, the duplicate amount will be refunded in full.
        </li>
        <li>
          <strong>Payment deducted but account not upgraded:</strong> Your
          payment was successfully debited by Razorpay but your PremSetu
          account was not upgraded to paid status due to a technical failure
          on our side. Please allow up to <strong>24 hours</strong> for
          automatic reconciliation before raising a request.
        </li>
        <li>
          <strong>Unauthorised transaction:</strong> You have evidence that
          the payment was made without your knowledge or authorisation. You
          must also report this to your bank/payment provider simultaneously.
        </li>
      </ul>
      <p>
        PremSetu reserves the right to verify all refund claims before
        processing. Fraudulent refund requests may result in account
        suspension.
      </p>
    </PolicySection>

    <PolicySection title="4. How to Request a Refund">
      <p>
        To raise a refund request for any of the eligible exceptions above,
        please contact us within <strong>7 days of the payment date</strong>:
      </p>
      <ul>
        <li>
          <strong>Email:</strong> officialpremsetu@gmail.com
        </li>
        <li>
          <strong>Subject line:</strong>{" "}
          <code>Refund Request — [Your Registered Email] — [Payment Date]</code>
        </li>
        <li>
          <strong>Include:</strong> Your registered email address, the Razorpay
          payment ID or order ID (visible in your payment receipt), the date
          and amount of the transaction, and a brief description of the issue.
        </li>
      </ul>
      <p>
        Requests raised after 7 days of payment will not be entertained except
        in cases of proven unauthorised transactions.
      </p>
    </PolicySection>

    <PolicySection title="5. Refund Processing Timeline">
      <p>
        Once a refund request is approved:
      </p>
      <ul>
        <li>
          Refunds are initiated within <strong>5–7 business days</strong> of
          approval.
        </li>
        <li>
          The refunded amount will be credited to the original payment source
          (bank account, UPI ID, or card) via Razorpay.
        </li>
        <li>
          Depending on your bank or payment provider, the credit may take an
          additional <strong>5–10 business days</strong> to appear in your
          account.
        </li>
        <li>
          Refunds are processed in Indian Rupees (INR). Any currency
          conversion charges are borne by the user.
        </li>
      </ul>
    </PolicySection>

    <PolicySection title="6. Cancellation of Membership">
      <p>
        There is no recurring subscription on PremSetu — your membership is
        a one-time purchase. There is therefore no "cancellation" in the
        sense of stopping an auto-renewal.
      </p>
      <p>
        If you wish to close your PremSetu account entirely, you may contact
        us at officialpremsetu@gmail.com. Account deletion is irreversible.
        Your paid membership will not be refunded upon account deletion (see
        Section 2 above).
      </p>
    </PolicySection>

    <PolicySection title="7. Chargebacks">
      <p>
        We ask that you contact us at officialpremsetu@gmail.com{" "}
        before initiating a chargeback with your bank. Most disputes can be
        resolved faster through direct communication. Initiating an unjustified
        chargeback may result in permanent suspension of your account.
      </p>
    </PolicySection>

    <PolicySection title="8. Changes to This Policy">
      <p>
        We reserve the right to modify this Refund & Cancellation Policy at
        any time. Changes will be posted on this page with an updated "Last
        updated" date. The policy in effect at the time of your purchase
        applies to that purchase.
      </p>
    </PolicySection>

    <PolicySection title="9. Contact Us">
      <p>
        For refund queries or payment disputes:
      </p>
      <p>
        <strong>Karmveer Singh (Proprietor, PremSetu)</strong>
        <br />
        D-5, Teachers Colony, Shradhapuri Phase 2, Meerut, Uttar Pradesh – 250001
        <br />
        Email: officialpremsetu@gmail.com
        <br />
        Phone: +91 74098 68966
      </p>
    </PolicySection>
  </PolicyShell>
);

export default RefundPolicy;
