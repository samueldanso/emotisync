export default function PrivacyPolicy() {
  return (
    <main className="container mx-auto max-w-3xl px-6 py-24 md:px-20">
      <header className="mb-16 text-center">
        <h1 className="font-heading font-semibold text-4xl text-brand-foreground sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-6 text-brand-muted">Last Updated: November 1, 2024</p>
      </header>

      <article className="prose prose-slate dark:prose-invert prose-headings:mt-16 prose-headings:mb-6 max-w-none prose-headings:font-heading prose-headings:text-2xl prose-headings:text-brand-foreground prose-li:text-brand-muted prose-li:text-lg prose-p:text-brand-muted prose-p:text-lg prose-p:leading-relaxed">
        <p>
          At EmotiSync (https://emotisync.xyz), we are committed to protecting
          your privacy and ensuring the security of your voice data and personal
          information. This Privacy Policy outlines how we collect, use, and
          safeguard your data when you use our emotion analysis service.
        </p>

        <h2>1. Information We Collect</h2>
        <p>
          We collect only essential information necessary to provide our
          services:
        </p>
        <ul>
          <li>Voice recordings (processed in real-time, not stored)</li>
          <li>Email address</li>
          <li>User ID (provided by Google)</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>Your information is used solely for:</p>
        <ul>
          <li>Real-time emotion analysis</li>
          <li>Personalized recommendations</li>
          <li>Service improvement and optimization</li>
          <li>Account management and authentication</li>
        </ul>

        <h2>3. Voice Data Processing</h2>
        <p>EmotiSync processes voice data with utmost care:</p>
        <ul>
          <li>Voice recordings are analyzed in real-time and not stored</li>
          <li>Processing occurs using secure, encrypted connections</li>
          <li>Emotion analysis results are temporary and anonymized</li>
          <li>No voice data is shared with third parties</li>
        </ul>

        <h2>4. Contact Us</h2>
        <p>
          For privacy-related inquiries, please contact us at:{" "}
          <a href="mailto:team.emotisync@gmail.com">team.emotisync@gmail.com</a>
        </p>
      </article>
    </main>
  )
}
