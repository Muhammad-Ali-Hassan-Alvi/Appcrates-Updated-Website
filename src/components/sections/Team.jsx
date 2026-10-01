import { IconArrow } from '../icons/Icons'
import { TEAM_MEMBERS } from '../../data/team'

export function Team() {
  return (
    <section id="team" style={{ paddingTop: 20 }}>
      <div className="wrap">
        <div className="team-layout reveal">
          <div className="team-copy">
            <h2>Meet our team</h2>
            <p className="lede">
              The people behind the work: dedicated, creative and ready to build what&apos;s next.
            </p>
            <a
              href="mailto:info@appcrates.com?subject=Careers%20at%20AppCrates"
              className="btn btn-ghost"
            >
              Join the team <IconArrow />
            </a>
          </div>

          <div className="team-row">
            {TEAM_MEMBERS.map((m) => (
              <article className="member" key={m.name}>
                <img
                  src={m.photo}
                  alt={m.name}
                  className="member-photo"
                  width={220}
                  height={280}
                  loading="lazy"
                />
                <h3>{m.name}</h3>
                <p>{m.role}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
