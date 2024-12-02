export default function TermsOfService() {
  return (
    <main className="container mx-auto max-w-3xl px-6 py-24 md:px-20">
      <header className="mb-16 text-center">
        <h1 className="font-heading font-semibold text-4xl text-brand-foreground sm:text-5xl">
          Terms of Service
        </h1>
        <p className="mt-6 text-brand-muted">Last Updated: November 1, 2024</p>
      </header>

      <article className="prose prose-slate dark:prose-invert prose-headings:mt-16 prose-headings:mb-6 max-w-none prose-headings:font-heading prose-headings:text-2xl prose-headings:text-brand-foreground prose-li:text-brand-muted prose-li:text-lg prose-p:text-brand-muted prose-p:text-lg prose-p:leading-relaxed">
        <div className="space-y-12">
          <section>
            <p>
              EmotiSync is a voice-based emotion analysis and recommendation
              service. By using our service, you agree to the following terms
              and conditions.
            </p>
          </section>

          <section>
            <h2>Service Usage</h2>
            <p>By using EmotiSync, you agree to:</p>
            <ul>
              <li>Use the service for personal, non-commercial purposes</li>
              <li>Not depend on it as a replaccement for theraphy</li>
              <li>Maintain the confidentiality of your account</li>
            </ul>
          </section>

          <section>
            <h2>Voice Data Rights</h2>
            <p>
              You retain rights to your voice recordings. We process this data
              temporarily for analysis purposes only, without permanent storage.
            </p>
          </section>

          <section>
            <h2>Service Limitations</h2>
            <p>
              EmotiSync's emotion analysis and insights are provided "as is"
              without any guarantees of accuracy or specific outcomes.
            </p>
          </section>

          <section>
            <h2>Changes to Terms</h2>
            <p>
              We may update these terms as our services evolve. Continued use of
              EmotiSync after changes constitutes acceptance of new terms.
            </p>
          </section>

          <section>
            <h2>Contact</h2>
            <p>
              For questions about these terms, contact us at:{" "}
              <a href="mailto:team.emotisync@gmail.com">
                team.emotisync@gmail.com
              </a>
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
