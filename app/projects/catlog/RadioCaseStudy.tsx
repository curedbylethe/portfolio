export default function RadioCaseStudy() {
  return (
    <div className="catlog-radio" id="radio-case">
      <p className="catlog-intro">
        A friend opens the room halfway through a song. The host has put their phone away. The
        friend should land on the verse everyone else is hearing.
      </p>

      <figure className="catlog-timeline">
        <figcaption>
          <strong>Joining Late Crossing</strong>
          <span>Illustrative three-minute track</span>
        </figcaption>
        <div className="catlog-ruler" aria-hidden="true">
          <span>0:00</span>
          <span>1:30</span>
          <span>3:00</span>
        </div>
        <div className="catlog-lane">
          <span>Room plays from 0:00</span>
        </div>
        <div className="catlog-lane catlog-join">
          <span>Friend joins at 1:30</span>
        </div>
        <p>
          The track starts at 20:00. At 20:01:30, a new listener seeks 90 seconds in. The room keeps
          playing.
        </p>
      </figure>

      <div className="catlog-stories">
        <div>
          <h3>The room owns the clock</h3>
          <p>
            PostgreSQL holds the queue index, the current track’s start instant and an optional
            pause instant. The API stamps each snapshot with server time. Redis carries updates. A
            scheduled room can start with the host offline.
          </p>
          <p>
            Subtract the track’s start from server time to get the playhead. When paused, use the
            pause instant. A natural advance anchors to the previous track’s end, even if discovered
            late. A host skip anchors to the instant of the skip.
          </p>
        </div>
        <div>
          <h3>The phone estimates where “now” is</h3>
          <p>
            Device clocks disagree. The player times the request with a monotonic clock and uses its
            midpoint to estimate the server offset. Of the last five samples, it drops round trips
            above twice the median and takes the fastest remaining sample.
          </p>
          <p>
            With no usable sample it waits. After sleep or buffering, it reads the room again and
            computes the position from scratch. Asymmetric network delays can still bias the
            estimate.
          </p>
        </div>
      </div>

      <div className="catlog-radio-detail">
        <div>
          <h3>When to leave playback alone</h3>
          <p>
            Repeated seeks would interrupt the music. The player uses the size of the error to
            choose a correction.
          </p>
          <dl className="catlog-drift">
            <div>
              <dt>Up to 0.25 s</dt>
              <dd>Leave the playhead in place.</dd>
            </div>
            <div>
              <dt>Over 0.25 to 0.75 s</dt>
              <dd>Speed up or slow down by 1%.</dd>
            </div>
            <div>
              <dt>Over 0.75 to 2 s</dt>
              <dd>Adjust the speed by 4%.</dd>
            </div>
            <div>
              <dt>Over 2 s</dt>
              <dd>Seek to the room’s position.</dd>
            </div>
          </dl>
          <p>Normal speed resumes within 0.1 s. A paused room stays paused.</p>
        </div>
        <div>
          <h3>What survived an interruption</h3>
          <p>
            <b>API restart.</b> An HTTP integration test closes the app, starts a fresh instance on
            the same database and rejoins. It checks the track, start instant and pause state.
          </p>
          <p>
            <b>Redis loss.</b> A separate test clears isolated Redis storage and reads the room from
            PostgreSQL. Transient state can disappear while the show retains its place.
          </p>
          <p>
            <b>Clock skew.</b> Player tests set server time decades away from the device clock. They
            exercise late joins and corrections. The thresholds describe when the player intervenes.
            Actual sync accuracy between devices remains unmeasured.
          </p>
        </div>
      </div>
      <p className="catlog-note">
        Evidence from the radio runbook, the HTTP recovery and Redis integration tests, and player
        sync tests. Private PRs #20, #32, #33, #49 and #194.
      </p>
    </div>
  )
}
