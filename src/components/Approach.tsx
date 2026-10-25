import './approach.scss';
export default function Approach() {
  return (
    <section className="approach section-shell" id="principles">
      <div className="approach-head">
        <p className="eyebrow">04 — WHAT WE BELIEVE</p>
        <h2>Technology<br />should make<br />work <em>easier.</em></h2>
      </div>
      <div className="approach-body">
        <p className="approach-big">We’re not here to sell you a tool. We’re here to help solve the thing getting in your way.</p>
        <p>Sometimes that means a new platform. Sometimes it means connecting the systems you already have. Sometimes it means removing a step instead of adding a feature.</p>
        <p>We keep the conversation clear, the scope practical, and the solution connected to the result you actually need.</p>
        <div className="principles">
          <div><span>01</span><b>People before platforms.</b><small>Understand the people doing the work.</small></div>
          <div><span>02</span><b>Useful over impressive.</b><small>Choose the right-sized solution.</small></div>
          <div><span>03</span><b>Built to keep improving.</b><small>Make change easier, not harder.</small></div>
        </div>
      </div>
    </section>
  );
}
