import { FAQ_ITEMS } from '../../data/faq'

export function FAQ() {
  return (
    <section id="faq" style={{ paddingTop: 20 }}>
      <div className="wrap faq-grid">
        <div className="reveal">
          <h2>Questions, answered</h2>
          <p className="lede" style={{ marginTop: 14 }}>
            Can't find what you need? Ask our AI assistant in the corner, or book a strategy call.
          </p>
        </div>
        <div className="faq reveal d1">
          {FAQ_ITEMS.map((item) => (
            <details key={item.q} open={item.open || undefined}>
              <summary>
                {item.q}
                <i></i>
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
