import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Following the Leader collects, uses, and safeguards your information when you visit the site or subscribe to Morning With Jesus.",
};

const EFFECTIVE_DATE = "January 15, 2026";

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Your Privacy"
        title="Privacy Policy"
        intro="Following the Leader respects your privacy and is committed to protecting it. This policy explains how information is collected, used, and safeguarded when you visit this website or interact with its content."
      />

      <section className="bg-cream">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
          <p className="text-sm font-medium text-muted">Effective Date: {EFFECTIVE_DATE}</p>

          <div className="mt-10 space-y-10">
            <div>
              <h2 className="font-display text-2xl font-semibold text-ink">Information We Collect</h2>
              <p className="mt-3 leading-relaxed text-body">
                We may collect personal information that you voluntarily provide, such as:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-body">
                <li>Your name and email address when you subscribe to receive devotionals or updates.</li>
                <li>Information you submit through contact forms or email correspondence.</li>
              </ul>
              <p className="mt-3 leading-relaxed text-body">
                We do not collect personal information unless you choose to provide it.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-ink">How We Use Your Information</h2>
              <p className="mt-3 leading-relaxed text-body">Information you provide may be used to:</p>
              <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-body">
                <li>Send daily devotionals or ministry updates.</li>
                <li>Respond to inquiries or messages.</li>
                <li>Improve the content and communication of the ministry.</li>
              </ul>
              <p className="mt-3 leading-relaxed text-body">
                Your information is never sold, rented, or shared for commercial purposes.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-ink">Email Communications</h2>
              <p className="mt-3 leading-relaxed text-body">
                If you subscribe to receive emails, your information is managed through a trusted email
                service provider. You may unsubscribe at any time using the link provided in each email.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-ink">Cookies &amp; Analytics</h2>
              <p className="mt-3 leading-relaxed text-body">
                This website may use basic cookies or analytics tools to understand how visitors interact
                with the site (such as pages visited or time spent on the site). This information is
                collected in an anonymous and aggregated way and is used only to improve the website
                experience. You may choose to disable cookies through your browser settings.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-ink">Third-Party Services</h2>
              <p className="mt-3 leading-relaxed text-body">
                This website may include links to third-party services such as podcast platforms, email
                services, or social media sites. We are not responsible for the privacy practices or content
                of those external sites. We encourage you to review their privacy policies separately.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-ink">Data Security</h2>
              <p className="mt-3 leading-relaxed text-body">
                Reasonable measures are taken to protect your personal information. However, no method of
                transmission over the internet or electronic storage is completely secure. While we strive to
                protect your information, we cannot guarantee absolute security.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-ink">Contact Us</h2>
              <p className="mt-3 leading-relaxed text-body">
                If you have questions about this Privacy Policy or how your information is handled, you may
                contact:
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
