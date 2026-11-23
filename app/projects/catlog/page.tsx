import type { ReactNode } from 'react'
import Link from 'next/link'
import { genPageMetadata } from 'app/seo'
import Image from '@/components/Image'
import RadioCaseStudy from './RadioCaseStudy'
import './catlog.css'

export const metadata = genPageMetadata({
  title: 'Catlog',
  description:
    'A music diary you can listen to together. Inside the Telegram player, shared radio timeline, and self-hosted service I designed, built, and operated.',
})

const chapters = {
  player: ['01', 'Inside the player', 'A diary, a record shelf and a radio room'],
  purpose: ['02', 'Why a diary and a radio?', 'Why put a diary and a radio in the same player?'],
  architecture: ['03', 'Follow a track', 'From a channel import to a listener’s headphones'],
  radio: ['04', 'One room, one timeline', 'One room, one timeline'],
  decisions: ['05', 'Choices and costs', 'Four choices that shaped playback'],
  operations: ['06', 'Two incidents', 'What broke outside the player'],
  evidence: ['07', 'Test results', 'What the tests actually measured'],
  retrospective: ['08', 'What remains open', 'What held, and where the evidence ends'],
} as const

type ChapterId = keyof typeof chapters

const contents: { label: string; ids: ChapterId[] }[] = [
  { label: 'Overview · 1 min', ids: ['player', 'purpose'] },
  { label: 'Engineering · 4 min', ids: ['architecture', 'radio', 'decisions', 'operations'] },
  { label: 'Results · 2 min', ids: ['evidence', 'retrospective'] },
]

function Chapter({ id, children }: { id: ChapterId; children: ReactNode }) {
  const [number, , title] = chapters[id]
  return (
    <section className="fp-project-dsec" id={id} aria-labelledby={id + '-title'}>
      <header className="fp-project-section-head">
        <span className="fp-project-section-number" aria-hidden="true">
          {number}
        </span>
        <div className="fp-project-section-title">
          <h2 id={id + '-title'}>{title}</h2>
        </div>
      </header>
      {children}
    </section>
  )
}

const captures = [
  {
    name: 'home',
    title: 'Remember a listen',
    caption: 'Your diary keeps the day’s plays alongside picks from people you follow.',
    alt: 'Home feed with a recommendation for Aurora Tax and today’s listening diary',
  },
  {
    name: 'album',
    title: 'Find the record again',
    caption: 'Open an album from the catalogue and keep listening as you browse.',
    alt: 'Night Ferry album with its four tracks and a persistent mini-player',
  },
  {
    name: 'room',
    title: 'Tune in together',
    caption: 'Join Late Crossing to hear what the host put on air and see what plays next.',
    alt: 'Late Crossing room showing Condensation on air and the upcoming queue',
  },
]

export default function CatlogPage() {
  return (
    <article className="fp-article fp-detail fp-project-dossier catlog">
      <Link href="/projects" className="fp-detail-back fp-project-back">
        ← Catalogue
      </Link>
      <header className="catlog-cover">
        <div className="catlog-cover-copy">
          <p className="fp-meta">Dossier 01 / Telegram Mini App</p>
          <h1>
            <span className="sr-only">Catlog</span>
            <Image
              src="/static/images/catlog/wordmark.svg"
              width={831}
              height={328}
              alt=""
              priority
            />
          </h1>
          <p className="catlog-premise">A music diary you can listen to together.</p>
          <p>
            Keep the songs you played, pin the records you love, and turn a playlist into a radio
            room your friends can join mid-song.
          </p>
          <p>
            I designed the player, built the audio engine and backend, and ran the service on my own
            infrastructure.
          </p>
          <div className="fp-project-actions">
            <a className="fp-project-button fp-project-button-primary" href="#player">
              Explore the screens
            </a>
            <a className="fp-project-button fp-project-button-secondary" href="#radio">
              Read the radio case study
            </a>
          </div>
        </div>
        <figure className="catlog-cover-art">
          <div className="catlog-sleeve">
            <Image
              src="/static/images/catlog/shelf.webp"
              alt="Pinned shelf with album sleeves, an artist portrait, a record and a cassette"
              width={770}
              height={1748}
              sizes="(max-width: 420px) 52vw, 215px"
              preload
            />
          </div>
          <figcaption>
            Pinned shelf <span>Local capture · fictional collection</span>
          </figcaption>
        </figure>
      </header>

      <div className="catlog-proof" aria-label="Selected test results">
        <a href="#cache-test">
          <strong>1 shared download</strong>
          <span>200 simulated listeners requested one uncached track.</span>
        </a>
        <a href="#ingest-test">
          <strong>100,000 plays</strong>
          <span>Recorded in 5.714 s in one service-level load test.</span>
        </a>
        <a href="#browser-test">
          <strong>53–58 seconds</strong>
          <span>Browser suite runtime, down from 2.6 minutes on the same machine.</span>
        </a>
      </div>

      <nav className="fp-project-toc" aria-label="Dossier contents">
        {contents.map(({ label, ids }) => (
          <div key={label}>
            <h2>{label}</h2>
            <ol>
              {ids.map((id) => (
                <li key={id}>
                  <a href={'#' + id}>
                    <span>{chapters[id][1]}</span>
                    <span className="fp-project-toc-lead" aria-hidden="true" />
                    <span className="fp-project-toc-number">{chapters[id][0]}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </nav>

      <Chapter id="player">
        <div className="catlog-gallery">
          {captures.map(({ name, title, caption, alt }) => (
            <figure key={name}>
              <a
                href={`${process.env.BASE_PATH || ''}/static/images/catlog/${name}.webp`}
                aria-label={`View full ${name} screen`}
              >
                <Image
                  src={`/static/images/catlog/${name}.webp`}
                  width={770}
                  height={1748}
                  sizes="(max-width: 640px) 90vw, 33vw"
                  alt={alt}
                />
              </a>
              <figcaption>
                <h3>{title}</h3>
                <p>{caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="catlog-note">
          Cropped views from the running development app with fictional music and listeners. Select
          a screen for the full capture.
        </p>
      </Chapter>

      <Chapter id="purpose">
        <div className="fp-project-origin-grid">
          <p className="fp-project-origin-quote">
            “What did I play that day?” and “What’s playing right now?” need different clocks.
          </p>
          <div className="fp-project-origin-prose">
            <p>
              I designed Catlog around a private collection, a complete listening history and a
              quiet way to find other listeners. The diary gives a song its place in your history. A
              play saved offline belongs to the day you heard it, even if your phone reconnects
              tomorrow.
            </p>
            <p>
              Radio gives that collection a shared present. In Telegram, a host can send a room link
              to a friend. Opening it halfway through a song should put both on the same verse. That
              is why the room keeps time even after the host leaves.
            </p>
          </div>
        </div>
      </Chapter>

      <Chapter id="architecture">
        <ol className="catlog-path">
          <li>
            <h3>Import the recording</h3>
            <p>
              A BullMQ worker reads channel audio through a Telegram user session. The import
              records the track in PostgreSQL and archives the audio in S3-compatible storage.
            </p>
          </li>
          <li>
            <h3>Put it on air</h3>
            <p>
              The host builds a queue. PostgreSQL stores its order and the current track’s start
              time. Redis carries notifications and queues background work.
            </p>
          </li>
          <li>
            <h3>Join mid-song</h3>
            <p>
              The Next.js player requests the room from the Fastify API. The response identifies the
              track and gives the player a server timestamp to calculate where to start.
            </p>
          </li>
          <li>
            <h3>Serve the audio</h3>
            <p>
              The stream route reads local disk first. On a miss it fills from S3 or falls back to
              Telegram. Listeners can request different byte ranges from a shared fill.
            </p>
          </li>
        </ol>
      </Chapter>

      <Chapter id="radio">
        <RadioCaseStudy />
      </Chapter>

      <Chapter id="decisions">
        <div className="catlog-choices">
          <div id="adr-01">
            <h3>Share the download when a room fills up</h3>
            <p>
              A cold start used to risk sending every listener upstream for the same song. One API
              process now owns the in-flight download. Other requests can read from it as bytes
              arrive.
            </p>
            <p>
              <b>Cost</b> Each API replica has its own cache and coordinator. The{' '}
              <a href="#cache-test">200-listener drill</a> covers one replica.
            </p>
          </div>
          <div id="adr-03">
            <h3>Give offline plays two dates</h3>
            <p>
              The diary keeps the device’s play time. Co-listening queries use the server’s receipt
              time and exclude offline plays. A phone reconnecting tomorrow cannot manufacture a
              shared moment today.
            </p>
            <p>
              <b>Cost</b> A genuine offline overlap is also excluded. Retrying a batch updates
              counters only for newly inserted plays.
            </p>
          </div>
          <div id="adr-02">
            <h3>Archive a track while it is reachable</h3>
            <p>
              A user session could import a channel document the Telegram bot could not later fetch.
              The worker copies audio during import and reports each item’s outcome. A resumable
              backfill repairs existing entries.
            </p>
            <p>
              <b>Cost</b> Each archive upload adds work before anyone plays the track.
            </p>
          </div>
          <div id="adr-04">
            <h3>Load the next song before this one ends</h3>
            <p>
              Waiting until a song ended to load the next left a reported 100–500 ms of silence
              (private PR #16). A second audio deck can prepare the next track during playback and
              overlap both for a crossfade.
            </p>
            <p>
              <b>Cost</b> Both decks need a tested handoff and a fallback. The two-deck engine
              shipped behind a flag. The gap figure describes the original player.
            </p>
          </div>
        </div>
      </Chapter>

      <Chapter id="operations">
        <div className="catlog-stories">
          <div>
            <h3>The first CI run couldn’t reach its database</h3>
            <p>
              Integration tests worked locally. Inside the runner’s job container, the loopback
              address pointed back to the job itself. I changed the harness to resolve the Docker
              host gateway. CI could then exercise real PostgreSQL, Redis and MinIO services.
            </p>
            <small>Integration harness · private PRs #79, #80, #84</small>
          </div>
          <div>
            <h3>A five-track storage check saved zero tracks</h3>
            <p>
              I traced stalled uploads to the timing of writes at the S3-compatible gateway. After
              changing the Node HTTPS agent, a live probe completed a PUT in 2–5 seconds. The same
              operation had timed out after 45 seconds.
            </p>
            <p>
              The production canary still failed. A worker probe exposed a second problem. The
              importer read Telegram’s file size as zero. Fixing that conversion let the worker
              upload and delete a probe object. These timings cover the gateway probe.
            </p>
            <small>Storage investigation · private PRs #173, #174</small>
          </div>
        </div>
        <p className="catlog-note">
          I ran the release path too. A Gitea release tag built images on my runner, pushed them to
          my registry, and supplied the tagged images to Docker Compose behind Caddy.
        </p>
      </Chapter>

      <Chapter id="evidence">
        <p className="catlog-intro">
          The source and PR history are private. These notes give the workload, measurement and
          limits of each recorded run.
        </p>
        <div className="catlog-tests">
          <div id="cache-test">
            <h3>Audio delivery</h3>
            <div>
              <p>
                <strong>One upstream fetch for 200 simultaneous requests.</strong> The drill used a
                real HTTP stream route and disk cache in one API process, with simulated upstream
                and S3 storage. With five tracks already cached, 200 joiners produced zero upstream
                or S3 reads.
              </p>
              <small>
                Private PR #70 · <code>miss-storm.drill.test.ts</code>
              </small>
            </div>
          </div>
          <div id="ingest-test">
            <h3>Listening history</h3>
            <div>
              <p>
                <strong>100,000 plays accepted in 5.714 s.</strong> In PR #34, 200 simulated
                listeners each submitted ten batches of 50 plays to the service. Batch latency at
                the 95th percentile was 682 ms, with zero errors. Two local PostgreSQL 16 runs in
                the runbook took 7.492 s and 9.999 s. The harness excludes HTTP and authentication.
              </p>
              <small>
                Private PR #34 · <code>pnpm test:load:logs</code>
              </small>
            </div>
          </div>
          <div id="query-test">
            <h3>Finding shared listens</h3>
            <div>
              <p>
                <strong>The time window changes the cost.</strong> On one million seeded plays, the
                same-time query took 165 ms at the 95th percentile for one day and 2,079 ms for
                seven days. The shared-tracks query took 217 ms and 1,877 ms respectively. A one-day
                window could use an index-only scan.
              </p>
              <p>
                Apple M1, 500 users, 5,000 recordings, 20 runs per mode after vacuuming and updating
                database statistics.
              </p>
              <small>
                Private PR #94 · <code>CO_LISTEN_ROWS=1000000 pnpm test:load:co-listening</code>
              </small>
            </div>
          </div>
          <div id="browser-test">
            <h3>Browser test cost</h3>
            <div>
              <p>
                <strong>2.6 minutes fell to 53–58 seconds.</strong> On an 8 GiB machine I switched
                the Playwright harness from the development server to the standalone production
                build. Peak memory for the player server fell from about 1.64 GiB to 220 MiB. Both
                configurations ran the same suite, with the same five skips.
              </p>
              <small>
                Private PR #85 · <code>pnpm test:e2e</code>
              </small>
            </div>
          </div>
        </div>
      </Chapter>

      <Chapter id="retrospective">
        <div className="catlog-stories">
          <div>
            <h3>What held</h3>
            <p>
              Storing the room’s position in PostgreSQL let a fresh API instance reconstruct a
              running or paused show. Giving the stream route a shared download kept a crowd of
              simulated listeners from fetching the same track 200 times.
            </p>
          </div>
          <div>
            <h3>What remains open</h3>
            <p>
              A track of unknown length can hold up the room. A second API replica would need its
              own fill. I have recovery tests and a clock-correction policy, but no measured bound
              on how far apart two real phones sound. The two-deck handoff has no published
              cross-device gap measurement either.
            </p>
          </div>
        </div>
      </Chapter>
      <nav className="fp-project-pager fp-project-pager--pair" aria-label="Dossiers">
        <Link href="/projects">
          <span>All dossiers</span>
          <span className="fp-project-pager-title">Catalogue</span>
        </Link>
        <Link href="/projects/televim">
          <span>Next dossier</span>
          <span className="fp-project-pager-title">Televim</span>
        </Link>
      </nav>
    </article>
  )
}
