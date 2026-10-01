import { useState } from 'react'
import { SectionHead } from '../ui/SectionHead'
import { IconArrow } from '../icons/Icons'
import { TOOLS } from '../../data/tools'
import { useCountUp } from '../../hooks/useCountUp'
import { OPEN_SERVICE_TAB_EVENT } from './Services'

const CATEGORIES = Object.keys(TOOLS)

export function ToolsApproach() {
  const [active, setActive] = useState(CATEGORIES[0])
  const projectsRef = useCountUp(200)

  const openProcessTab = () => {
    window.dispatchEvent(new CustomEvent(OPEN_SERVICE_TAB_EVENT, { detail: { tab: 'process' } }))
    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section>
      <div className="wrap">
        <SectionHead
          title="The best tools for the job"
          lede="Modern, proven stacks chosen for your product, not for our habits."
        />
        <div className="tools reveal">
          <div className="tool-tabs" role="tablist" id="toolTabs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={cat === active}
                onClick={() => setActive(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="tool-panel" id="toolPanel">
            {Object.entries(TOOLS[active]).map(([heading, items]) => (
              <div key={heading}>
                <h4>{heading}</h4>
                <div className="chips">
                  {items.map((item, i) => (
                    <span key={item} style={{ animationDelay: `${i * 40}ms` }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="approach reveal">
          <div className="txt">
            <h2 style={{ fontSize: 'clamp(2rem,3.6vw,2.8rem)' }}>Our approach</h2>
            <p>
              A structured process from discovery to delivery, so every release is aligned with
              business objectives, quality benchmarks and long-term scalability.
            </p>
            <button className="btn btn-primary" onClick={openProcessTab}>
              Discover our process <IconArrow />
            </button>
          </div>
          <div className="big">
            <strong><span data-count="200" ref={projectsRef}>0</span>+</strong>
            <span>Successful projects delivered</span>
          </div>
        </div>
      </div>
    </section>
  )
}
