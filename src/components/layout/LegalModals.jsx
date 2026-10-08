import { useEffect, useRef } from 'react'

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  )
}

export function LegalModals() {
  const termsRef = useRef(null)
  const privacyRef = useRef(null)

  useEffect(() => {
    const openLegal = (id, e) => {
      if (e) e.preventDefault()
      const d = id === 'terms' ? termsRef.current : privacyRef.current
      if (!d) return
      ;[termsRef.current, privacyRef.current].forEach((x) => {
        if (x?.open) x.close()
      })
      if (d.showModal) d.showModal()
      d.scrollTop = 0
    }

    const onClick = (e) => {
      const a = e.target.closest('[data-legal]')
      if (!a) return
      openLegal(a.dataset.legal, e)
    }

    const onCloseClick = (e) => {
      const btn = e.target.closest('dialog.legal [data-close]')
      if (!btn) return
      btn.closest('dialog')?.close()
    }

    const onBackdrop = (e) => {
      const d = e.target
      if (d instanceof HTMLDialogElement && d.classList.contains('legal') && e.target === d) {
        d.close()
      }
    }

    document.addEventListener('click', onClick)
    document.addEventListener('click', onCloseClick)
    document.addEventListener('click', onBackdrop)
    return () => {
      document.removeEventListener('click', onClick)
      document.removeEventListener('click', onCloseClick)
      document.removeEventListener('click', onBackdrop)
    }
  }, [])

  return (
    <>
      <dialog className="legal" id="terms" ref={termsRef} aria-labelledby="termsTitle">
        <div className="legal-head">
          <div>
            <h2 id="termsTitle">Terms &amp; conditions</h2>
            <p>Last updated: October 2026</p>
          </div>
          <button type="button" data-close aria-label="Close terms and conditions">
            <CloseIcon />
          </button>
        </div>
        <div className="legal-body">
          <p>
            These terms govern your use of the AppCrates website and the software development, design
            and staff augmentation services provided by AppCrates and its offices in the United
            Kingdom, the United States, Australia, Singapore and Pakistan (together, &quot;AppCrates&quot;,
            &quot;we&quot;, &quot;us&quot;). By using this website or engaging our services, you
            (&quot;the Client&quot;) agree to these terms. Where a signed agreement, statement of work
            or proposal exists, its terms take precedence over this page.
          </p>
          <ol>
            <li>
              <h3>Services</h3>
              <p>
                AppCrates provides custom software development, web and mobile applications, UI/UX
                design, cloud and DevOps, AI/ML engineering, quality assurance and dedicated developer
                (staff augmentation) services. The scope, deliverables, timeline and fees for each
                engagement are set out in a written proposal or statement of work agreed by both
                parties.
              </p>
            </li>
            <li>
              <h3>Proposals and change requests</h3>
              <p>
                Quotations are valid for 30 days unless stated otherwise. Work outside the agreed
                scope is treated as a change request and is estimated, approved in writing and billed
                separately before it begins.
              </p>
            </li>
            <li>
              <h3>Fees and payment</h3>
              <p>
                Fixed-scope projects are invoiced against agreed milestones. Dedicated developer
                engagements are billed monthly in advance. Invoices are payable within 7 days of issue
                unless otherwise agreed. We may pause work on any account that is more than 15 days
                overdue, after giving written notice.
              </p>
            </li>
            <li>
              <h3>Client responsibilities</h3>
              <p>
                The Client agrees to provide timely access to the information, content, accounts,
                environments and decision-makers required to deliver the work. Delays in feedback or
                approvals may extend delivery timelines accordingly.
              </p>
            </li>
            <li>
              <h3>Intellectual property</h3>
              <p>
                On receipt of full payment, all rights in the custom code, designs and documentation
                created specifically for the Client transfer to the Client. AppCrates retains ownership
                of its pre-existing tools, libraries and know-how, and grants the Client a perpetual,
                royalty-free licence to use any such components included in the deliverables.
                Third-party and open-source software remains subject to its own licence terms.
              </p>
            </li>
            <li>
              <h3>Confidentiality</h3>
              <p>
                Both parties will keep each other&apos;s confidential information private and use it
                only for the purpose of the engagement. We are happy to sign a mutual non-disclosure
                agreement before any project details are shared. These obligations continue after the
                engagement ends.
              </p>
            </li>
            <li>
              <h3>Dedicated developers</h3>
              <p>
                Developers placed with the Client work under the Client&apos;s direction and processes
                while remaining employed by AppCrates. If a developer is not the right fit, we will
                provide a suitable replacement with a structured handover. During the engagement and
                for 12 months afterwards, the Client agrees not to directly hire or contract an
                AppCrates developer without our prior written consent.
              </p>
            </li>
            <li>
              <h3>Warranty and support</h3>
              <p>
                We deliver work with professional skill and care. Defects reported within 30 days of
                delivery that do not meet the agreed specification are fixed at no extra cost. Ongoing
                maintenance, hosting and support are available under a separate agreement.
              </p>
            </li>
            <li>
              <h3>Limitation of liability</h3>
              <p>
                To the extent permitted by law, AppCrates is not liable for indirect or consequential
                loss, including loss of profit, revenue or data. Our total liability under any
                engagement is limited to the fees paid by the Client for that engagement in the three
                months before the claim arose.
              </p>
            </li>
            <li>
              <h3>Termination</h3>
              <p>
                Either party may end an engagement with 30 days&apos; written notice, or immediately if
                the other party materially breaches these terms and does not remedy the breach within
                14 days of notice. The Client pays for all work completed up to the termination date,
                and we hand over all paid-for work in its current state.
              </p>
            </li>
            <li>
              <h3>Data protection</h3>
              <p>
                We process personal data only as needed to deliver our services and in line with
                applicable data protection laws, including the UK GDPR and EU GDPR where relevant. When
                we process personal data on the Client&apos;s behalf, a data processing agreement can
                be put in place on request.
              </p>
            </li>
            <li>
              <h3>Use of this website</h3>
              <p>
                Content on this website is provided for general information and may change without
                notice. Project names and screenshots in our portfolio are shown to illustrate our work
                and remain the property of their respective owners.
              </p>
            </li>
            <li>
              <h3>Governing law</h3>
              <p>
                Each engagement is governed by the law and jurisdiction named in its signed agreement.
                Where none is named, these terms are governed by the laws of Pakistan. Both parties will
                first try to resolve any dispute in good faith through discussion.
              </p>
            </li>
            <li>
              <h3>Changes to these terms</h3>
              <p>
                We may update these terms from time to time. The version published on this page at the
                time an engagement begins applies to that engagement unless both parties agree otherwise
                in writing.
              </p>
            </li>
            <li>
              <h3>Contact</h3>
              <p>
                Questions about these terms can be sent to{' '}
                <a href="mailto:info@appcrates.com">info@appcrates.com</a> or to our head office at
                Commercial Market, DC Colony, Gujranwala, Pakistan.
              </p>
            </li>
          </ol>
        </div>
      </dialog>

      <dialog className="legal" id="privacy" ref={privacyRef} aria-labelledby="privacyTitle">
        <div className="legal-head">
          <div>
            <h2 id="privacyTitle">Privacy policy</h2>
            <p>Last updated: October 2026</p>
          </div>
          <button type="button" data-close aria-label="Close privacy policy">
            <CloseIcon />
          </button>
        </div>
        <div className="legal-body">
          <p>
            AppCrates (&quot;we&quot;, &quot;us&quot;) respects your privacy. This policy explains what
            personal information we collect when you visit our website, contact us or work with us, how
            we use it, and the choices you have. It applies to AppCrates and its offices in the United
            Kingdom, the United States, Australia, Singapore and Pakistan.
          </p>
          <ol>
            <li>
              <h3>Information we collect</h3>
              <p>We collect only what we need to respond to you and deliver our services:</p>
              <ul>
                <li>
                  Contact details you share with us, such as your name, company, email address and phone
                  number.
                </li>
                <li>
                  Project information you provide, such as your requirements, budget range and timeline.
                </li>
                <li>Messages you send through our website assistant, email, WhatsApp or calls.</li>
                <li>
                  Basic technical data, such as browser type, device and pages visited, collected to
                  keep the website secure and working well.
                </li>
              </ul>
            </li>
            <li>
              <h3>How we use your information</h3>
              <p>
                We use your information to respond to enquiries, prepare proposals, deliver and support
                our services, manage contracts and invoices, improve our website, and send updates you
                have asked to receive. We do not sell your personal information.
              </p>
            </li>
            <li>
              <h3>Legal basis for processing</h3>
              <p>
                Where data protection laws such as the UK GDPR or EU GDPR apply, we process personal
                data to take steps before entering into a contract with you, to perform that contract, to
                meet legal obligations, and for our legitimate interests in running and improving our
                business. Where we rely on consent, you can withdraw it at any time.
              </p>
            </li>
            <li>
              <h3>Website assistant</h3>
              <p>
                Messages typed into the AI assistant on this website are processed to generate a reply.
                Please avoid sharing sensitive personal or confidential information in the chat. For
                project details, use the contact form or email us directly.
              </p>
            </li>
            <li>
              <h3>Cookies and local storage</h3>
              <p>
                This website does not use advertising cookies. It stores a small preference in your
                browser, such as your light or dark theme choice, so the site remembers it on your next
                visit. You can clear this at any time through your browser settings.
              </p>
            </li>
            <li>
              <h3>Sharing your information</h3>
              <p>
                We share personal information only with trusted service providers who help us operate
                our business, such as email, hosting, scheduling and accounting providers, and only to
                the extent needed. We may also disclose information where required by law or to protect
                our legal rights.
              </p>
            </li>
            <li>
              <h3>International transfers</h3>
              <p>
                Because our teams work across several countries, your information may be accessed from
                or stored in countries other than your own, including Pakistan. When this happens, we
                apply appropriate safeguards, such as contractual protections, to keep your information
                secure.
              </p>
            </li>
            <li>
              <h3>Client project data</h3>
              <p>
                When we work on systems that contain our clients&apos; data, we act on the client&apos;s
                instructions, keep that data confidential, and use it only to deliver the agreed work. A
                data processing agreement and NDA are available on request.
              </p>
            </li>
            <li>
              <h3>Data retention</h3>
              <p>
                We keep enquiry information for up to 24 months unless it becomes part of a client
                relationship. Contract and financial records are kept for as long as the law requires.
                After that, information is securely deleted or anonymised.
              </p>
            </li>
            <li>
              <h3>Security</h3>
              <p>
                We use access controls, encrypted connections, secure credentials management and staff
                confidentiality agreements to protect personal information. No online system is
                completely secure, but we take reasonable steps to prevent unauthorised access, loss or
                misuse.
              </p>
            </li>
            <li>
              <h3>Your rights</h3>
              <p>
                Depending on where you live, including under the UK GDPR, EU GDPR, the Australian Privacy
                Act and US state privacy laws, you may have the right to access, correct, delete or
                restrict the use of your personal information, object to processing, or request a copy of
                your data. To make a request, contact us using the details below. We will respond within
                the time required by law.
              </p>
            </li>
            <li>
              <h3>Children&apos;s privacy</h3>
              <p>
                Our website and services are intended for businesses and are not directed at children
                under 16. We do not knowingly collect personal information from children.
              </p>
            </li>
            <li>
              <h3>Changes to this policy</h3>
              <p>
                We may update this policy from time to time. The latest version will always be published
                on this page with its updated date.
              </p>
            </li>
            <li>
              <h3>Contact us</h3>
              <p>
                For any privacy question or request, email{' '}
                <a href="mailto:info@appcrates.com">info@appcrates.com</a> or write to our head office
                at Commercial Market, DC Colony, Gujranwala, Pakistan.
              </p>
            </li>
          </ol>
        </div>
      </dialog>
    </>
  )
}
