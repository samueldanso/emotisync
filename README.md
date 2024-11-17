<a href="">
  <img alt="EmotiSync — Your personalized AI companion for mood voice journaling" src="/app.png">
  <h1 align="center">EmotiSync — Your personalized AI companion for mood voice journaling and emotional well-being.</h1>
</a>

<p align="center">
 EmotiSync is your intelligent companion for voice mood journaling and reflections. Simply talk, and AI analyzes your feelings to offer personalized insights and actionable recommendations that enhance your well-being.
</p>

 <p align="center">
   <a href="#features"><strong>Features</strong></a> ·
  <a href="#tech-stack"><strong>Tech Stack</strong></a> ·
  <a href="#setup"><strong>Setup</strong></a> ·
  <a href="#future-plans"><strong>Future Plans</strong></a>
</p>
<br/>

## Features

- **AI-Powered Recommendations:** AI instantly analyzes your mood from your speech to deliver the perfect tunes to match every vibe.
- **Personalized Playlists:** Receive playlists tailored to your mood — perfect for relaxing, recharging, or focusing.
- **Real-Time Guidance:** Get real-time guidance based on your feelings, helping you feel better in the moment.

## Tech Stack

- **Frontend:** [Next.js 14](https://nextjs.org), [Tailwind CSS](https://tailwindcss.com), [Shadcn UI](https://ui.shadcn.com/), [Framer Motion](https://www.framer.com/motion/)
- **Backend:** [PostgreSQL](https://www.postgresql.org/), [Supabase](https://supabase.com/), [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication:** [Supabase Auth](https://supabase.com/)
- **Hume API:** [Hume](https://hume.ai/)
- **Spotify Web API:** [Spotify API](https://developer.spotify.com/documentation/web-api)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Form Management:** [React Hook Form](https://react-hook-form.com/)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Validation:** [Zod](https://zod.dev/)
- **Rate limiting:** [Upstash](https://upstash.com/)
- **Formatter & Linter:** [Biome](https://biomejs.dev/)

## Setup

1. Clone the repository

   ```bash
   git clone https://github.com/samueldanso/emotisync-v1.git
   ```

2. Install dependencies

   ```bash
   bun install
   ```

3. Copy the `.env.example` to `.env` and update the variables.

   ```bash
   cp .env.example .env
   ```

4. Migrate the database schema

   ```bash
   bun db:push
   ```

5. Start the development server

   ```bash
   bun dev
   ```

## Deploy

Follow the deployment guides for [Vercel](https://nextjs.org/learn-pages-router/basics/deploying-nextjs-app/deploy).

## Future Plans

- [ ] Implement social sharing and friend interaction features
- [ ] Implement mood tracking history feature
- [ ] Implement facial expression recognition feature
- [ ] Integrate with wearable or hardware devices

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.
