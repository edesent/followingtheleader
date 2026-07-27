import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms that govern your use of the Following the Leader website, its devotional content, and related services.",
};

const EFFECTIVE_DATE = "January 15, 2026";

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Terms of Use"
        title="Terms & Conditions"
        intro="By accessing and using this website, you agree to the terms below. Please read them carefully before using the site or subscribing to our content."
      />

      <section className="bg-cream">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
          <p className="text-sm font-medium text-muted">Effective Date: {EFFECTIVE_DATE}</p>

          <div className="mt-10 space-y-10">
            <div>
              <h2 className="font-display text-2xl font-semibold text-ink">Acceptance of Terms</h2>
              <p className="mt-3 leading-relaxed text-body">
                This website is operated by Following the Leader, the ministry of Dr. Joe Pettigrew. By
                visiting the site, subscribing to our devotionals, or otherwise using our content, you agree
                to be bound by these Terms &amp; Conditions. If you do not agree, please discontinue use of
                the site.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-ink">Use of the Website</h2>
              <p className="mt-3 leading-relaxed text-body">
                You may use this website for personal, non-commercial, and devotional purposes. You agree not
                to use the site in any way that is unlawful, harmful, or disruptive to the ministry, its
                readers, or its systems, and not to attempt to gain unauthorized access to any part of the
                site.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-ink">Content &amp; Intellectual Property</h2>
              <p className="mt-3 leading-relaxed text-body">
                The devotionals, books, writing, images, logos, and other materials on this website are the
                property of Following the Leader and Dr. Joe Pettigrew, unless otherwise noted, and are
                protected by applicable copyright and intellectual property laws. You are welcome to read and
                share our devotionals for personal encouragement, but you may not reproduce, sell, or
                redistribute our content for commercial purposes without written permission.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-ink">Email Subscriptions</h2>
              <p className="mt-3 leading-relaxed text-body">
                Subscribing to Morning With Jesus is free. By subscribing, you consent to receive devotional
                emails and occasional ministry updates. You may unsubscribe at any time using the link
                provided in each email.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-ink">Gifts &amp; Partnership</h2>
              <p className="mt-3 leading-relaxed text-body">
                Any gifts or partnership support offered through this ministry are voluntary. Contributions
                help sustain and expand the work of Following the Leader. Where a gift is designated for a
                specific purpose, we will make reasonable efforts to honor that designation.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-ink">Third-Party Links</h2>
              <p className="mt-3 leading-relaxed text-body">
                This website may contain links to third-party services such as podcast platforms, booksellers,
                email services, or social media. We are not responsible for the content, products, or practices
                of those external sites, and your use of them is at your own discretion.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-ink">Disclaimer</h2>
              <p className="mt-3 leading-relaxed text-body">
                The content on this website is provided for spiritual encouragement and general information
                only, on an &ldquo;as is&rdquo; basis. It is not intended as professional, legal, financial,
                or medical advice. While we strive for accuracy and faithfulness to Scripture, we make no
                warranties regarding the completeness or reliability of the content.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-ink">Limitation of Liability</h2>
              <p className="mt-3 leading-relaxed text-body">
                To the fullest extent permitted by law, Following the Leader and Dr. Joe Pettigrew shall not be
                liable for any damages arising from your use of, or inability to use, this website or its
                content.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-ink">Changes to These Terms</h2>
              <p className="mt-3 leading-relaxed text-body">
                We may update these Terms &amp; Conditions from time to time. Any changes will be posted on this
                page with an updated effective date. Your continued use of the website after changes are posted
                constitutes acceptance of the revised terms.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-ink">Governing Law</h2>
              <p className="mt-3 leading-relaxed text-body">
                These terms are governed by the laws of the State of {SITE.address.state === "TN" ? "Tennessee" : SITE.address.state}, without regard to its conflict of law
                provisions.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-ink">Contact Us</h2>
              <p className="mt-3 leading-relaxed text-body">
                If you have questions about these Terms &amp; Conditions, you may contact:
              </p>
              <p className="mt-3 leading-relaxed text-body">
                <span className="font-semibold text-ink">Following the Leader</span>
                <br />
                Email:{" "}
                <a href={`mailto:${SITE.email}`} className="font-semibold text-dawn-deep hover:text-ink">
                  {SITE.email}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
