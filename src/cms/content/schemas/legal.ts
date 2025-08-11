import { z } from 'zod'

export const LegalSection = z.object({
  id: z.string(),
  title: z.string(),
  contentHtml: z.string()
})

export const PrivacyPolicyContent = z.object({
  title: z.string().default('Privacy Policy'),
  updatedAt: z.string(),
  sections: z.array(LegalSection)
})
export type PrivacyPolicyContent = z.infer<typeof PrivacyPolicyContent>

export const TermsContent = z.object({
  title: z.string().default('Terms & Conditions'),
  updatedAt: z.string(),
  sections: z.array(LegalSection)
})
export type TermsContent = z.infer<typeof TermsContent>

export const privacyPolicyDefaults: PrivacyPolicyContent = {
  title: 'Privacy Policy',
  updatedAt: new Date().toISOString().slice(0, 10),
  sections: [
    {
      id: 'toc',
      title: 'Table of Contents',
      contentHtml: `
        <ol>
          <li><a href="#information-collection">1. Information Collection</a></li>
          <li><a href="#use-of-information">2. Use of Information</a></li>
          <li><a href="#information-sharing">3. Information Sharing</a></li>
          <li><a href="#data-security">4. Data Security</a></li>
          <li><a href="#user-rights">5. Your Rights</a></li>
          <li><a href="#cookies-analytics">6. Cookies & Analytics</a></li>
          <li><a href="#contact-information">7. Contact Information</a></li>
        </ol>
      `
    },
    {
      id: 'intro',
      title: 'Our Commitment to Your Privacy',
      contentHtml: `
        <p>The Academy of Dance is committed to protecting your personal data in compliance with Singapore's Personal Data Protection Act (PDPA) 2012. This Privacy Policy explains how we collect, use, protect, and share your personal information when you use our services.</p>
      `
    },
    {
      id: 'information-collection',
      title: '1. Information Collection',
      contentHtml: `
        <h3>Personal Data We Collect</h3>
        <ul>
          <li>Student Information: Full name, date of birth, age, gender, contact details</li>
          <li>Parent/Guardian Information: Name, relationship to student, contact details, billing address</li>
          <li>Emergency Contacts: Names and contact information</li>
          <li>Medical Information: Relevant health conditions, allergies, injuries, medical clearances</li>
          <li>Payment Information: Billing details (processed securely via third parties)</li>
          <li>Academic Information: Class enrollment, attendance, progress, examination results</li>
        </ul>
        <h3>How We Collect Information</h3>
        <ul>
          <li>Registration and enrollment forms</li>
          <li>Trial class registration</li>
          <li>Website forms and newsletter signup</li>
          <li>Phone and in-person interactions</li>
          <li>Cookies and website analytics</li>
          <li>Photography and video during classes and performances (with consent)</li>
        </ul>
        <h3>Legal Basis (PDPA)</h3>
        <ul>
          <li>Consent, Contract Performance, Legal Obligation, Legitimate Interest</li>
        </ul>
      `
    },
    {
      id: 'use-of-information',
      title: '2. Use of Information',
      contentHtml: `
        <h3>Primary Uses</h3>
        <ul>
          <li>Class Management, Safety & Emergency Response, Payment Processing</li>
          <li>Communication, Performance and Competition Management</li>
        </ul>
        <h3>Marketing Communications (With Consent Only)</h3>
        <ul>
          <li>Promotional emails, newsletters, social media content (with consent)</li>
        </ul>
        <p><em>Opt-out: You can withdraw consent for marketing communications at any time.</em></p>
      `
    },
    {
      id: 'information-sharing',
      title: '3. Information Sharing',
      contentHtml: `
        <h3>Third Parties We Share Data With</h3>
        <ul>
          <li>Payment Processors, Emergency Services, Competition Organizers, Examination Bodies, Insurance Companies</li>
        </ul>
        <h3>We Do NOT Share Data With</h3>
        <ul>
          <li>Marketing companies or advertisers (unless you consent)</li>
          <li>Data brokers or aggregators</li>
        </ul>
        <h3>International Transfers</h3>
        <p>Appropriate safeguards and PDPA-compliant practices are used.</p>
      `
    },
    {
      id: 'data-security',
      title: '4. Data Security',
      contentHtml: `
        <h3>Security Measures</h3>
        <ul>
          <li>Physical and Digital Security, Access Controls, Backups, Staff Training</li>
        </ul>
        <h3>Data Retention</h3>
        <ul>
          <li>Active students: duration of enrollment + 1 year</li>
          <li>Former students: academic records retained for 7 years</li>
          <li>Financial records: 7 years as required by law</li>
        </ul>
        <h3>Data Breach Procedures</h3>
        <p>In the event of a breach, affected individuals and PDPC will be notified within 72 hours as required by law.</p>
      `
    },
    {
      id: 'user-rights',
      title: '5. Your Rights Under Singapore PDPA',
      contentHtml: `
        <h3>Your Rights Include</h3>
        <ul>
          <li>Right to Access, Correction, Withdraw Consent, Data Portability, Object, Deletion</li>
        </ul>
        <h3>How to Exercise Your Rights</h3>
        <p>Email: privacy@theacademyofdance.com.sg · Phone: +65 XXXX XXXX</p>
      `
    },
    {
      id: 'cookies-analytics',
      title: '6. Cookies & Website Analytics',
      contentHtml: `
        <h3>Types of Cookies</h3>
        <ul>
          <li>Essential, Performance, Functional, Marketing (with consent)</li>
        </ul>
        <h3>Google Analytics</h3>
        <p>We use anonymized, aggregated analytics. Opt-out is available via Google tools.</p>
      `
    },
    {
      id: 'contact-information',
      title: '7. Contact Information & Complaints',
      contentHtml: `
        <p><strong>Data Protection Officer</strong><br/>Email: privacy@theacademyofdance.com.sg · Phone: +65 XXXX XXXX</p>
        <p>Complaints: Personal Data Protection Commission Singapore (PDPC)</p>
      `
    }
  ]
}

export const termsDefaults: TermsContent = {
  title: 'Terms & Conditions',
  updatedAt: new Date().toISOString().slice(0, 10),
  sections: [
    {
      id: 'toc',
      title: 'Table of Contents',
      contentHtml: `
        <ol>
          <li><a href="#general-terms">1. General Terms</a></li>
          <li><a href="#dance-classes">2. Dance Classes & Services</a></li>
          <li><a href="#payment-terms">3. Payment Terms</a></li>
          <li><a href="#health-safety">4. Health & Safety</a></li>
          <li><a href="#intellectual-property">5. Intellectual Property</a></li>
          <li><a href="#liability-insurance">6. Liability & Insurance</a></li>
          <li><a href="#termination">7. Termination</a></li>
        </ol>
      `
    },
    {
      id: 'general-terms',
      title: '1. General Terms',
      contentHtml: `
        <p>By accessing and using The Academy of Dance's services, you agree to these Terms and Conditions. We may modify these terms with reasonable notice. Continued use constitutes acceptance of the revised terms.</p>
      `
    },
    {
      id: 'dance-classes',
      title: '2. Dance Classes & Services',
      contentHtml: `
        <h3>Class Enrollment</h3>
        <p>All students must complete enrollment forms and provide accurate information. Placement is subject to instructor assessment.</p>
        <h3>Age Requirements</h3>
        <p>Classes are grouped by age and skill level as determined by the Academy.</p>
        <h3>Trial Classes</h3>
        <p>Available for new students. Trial fees are non-refundable but may be credited within 30 days if you continue.</p>
      `
    },
    {
      id: 'payment-terms',
      title: '3. Payment Terms',
      contentHtml: `
        <h3>Schedules</h3>
        <p>Monthly fees are due by the 1st. Term fees are due in full before the term starts. Late payments incur a fee after a grace period.</p>
        <h3>Refunds</h3>
        <p>Prorated refunds may apply with proper notice. No refunds for missed classes due to absence.</p>
      `
    },
    {
      id: 'health-safety',
      title: '4. Health & Safety',
      contentHtml: `
        <p>Medical clearance may be required. Students participate at their own risk. Emergency contacts must be kept current.</p>
      `
    },
    {
      id: 'intellectual-property',
      title: '5. Intellectual Property',
      contentHtml: `
        <p>Choreography created by instructors remains Academy IP. Photography/videography for promotional use may occur unless you opt out in writing.</p>
      `
    },
    {
      id: 'liability-insurance',
      title: '6. Liability & Insurance',
      contentHtml: `
        <p>Liability is limited to fees paid. We recommend maintaining appropriate personal insurance coverage.</p>
      `
    },
    {
      id: 'termination',
      title: '7. Termination',
      contentHtml: `
        <p>Withdrawal requires 30 days written notice. Suspension/expulsion may occur for non-payment or policy violations.</p>
      `
    }
  ]
}


