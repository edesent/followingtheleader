import type { Metadata } from "next";
import SubscribeButton from "@/components/SubscribeButton";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { TESTIMONIALS } from "@/config/site";

export const metadata: Metadata = {
  title: "What People Are Saying",
  description:
    "Pastors, authors, athletes, and executives — including Pastor Tony Evans, Phil Robertson, Pastor Ed Young, Lee Corso, Colt McCoy, and Pam Tebow — on Dr. Joe Pettigrew's Morning With Jesus devotional.",
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="What People Are Saying"
        title="Read by pastors, leaders, and families"
        intro="From nationally known pastors and authors to coaches, athletes, CEOs, and everyday readers, Morning With Jesus has become a trusted way to begin the day."
      />

      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6 [&>*]:break-inside-avoid">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name + i} delay={(i % 3) * 80}>
                <figure className="rounded-2xl border border-hair bg-paper p-8 shadow-sm">
                  <div className="font-display text-5xl leading-none text-dawn/40" aria-hidden>&ldquo;</div>
                  <blockquote className="-mt-3 text-[1.02rem] leading-relaxed text-body">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-6 border-t border-hair pt-5">
                    <p className="font-semibold text-ink">{t.name}</p>
                    <p className="text-sm text-muted">{t.role}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-ink">
        <div className="dawn-sky-dark pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 sm:py-24">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
              See for yourself tomorrow morning
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">
              Subscribe free and let the first word you hear each day be the Lord&apos;s.
            </p>
            <SubscribeButton className="mt-8 inline-flex rounded-full bg-dawn-deep px-8 py-3.5 font-semibold text-white shadow-lg shadow-dawn-deep/25 transition-colors hover:bg-dawn hover:text-ink">
              Subscribe free
            </SubscribeButton>
          </Reveal>
        </div>
      </section>
    </>
  );
}
