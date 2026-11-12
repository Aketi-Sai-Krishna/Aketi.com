// import './footer.scss';
// import { ArrowRight } from 'lucide-react';

// export default function Footer() {
//   return (
//     <footer className="site-footer">
//       <div className="footer-top">
//         <a className="wordmark footer-wordmark" href="/#home">
//           AKETI<span>®</span>
//         </a>

//         <p>
//           Cheers to solving the issues
//           <br />
//           and growing together.
//         </p>

//         <a className="back-top" href="/#home">
//           BACK TO TOP ↑
//         </a>
//       </div>

//       <div className="footer-bottom">
//         <span>© {new Date().getFullYear()} AKETI STUDIO</span>
//         <span>BUILT WITH PURPOSE. NOT JUST PIXELS.</span>
//         <a href="/#contact">
//           LET’S MAKE BUSINESS BETTER <ArrowRight size={14} />
//         </a>
//       </div>
//     </footer>
//   );
// }




import './footer.scss';
import {
  ArrowUpRight,
  Instagram,
  Linkedin,
  Youtube,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <a
            className="wordmark footer-wordmark"
            href="/#home"
            aria-label="AKETI home"
          >
            AKETI<span>®</span>
          </a>

          <p className="footer-description">
            A digital solutions studio helping
            <br className="footer-desktop-break" />
            businesses move from complex challenges
            <br className="footer-desktop-break" />
            to connected solutions.
          </p>
        </div>

        <nav className="footer-nav" aria-label="Footer navigation">
          <a href="/#services">Services</a>
          <a href="/#work">Work</a>
          <a href="/#approach">How we work</a>
          <a href="/#contact">Contact</a>
        </nav>

        <div className="footer-social">
          <span className="footer-social-label">Follow Us</span>

          <div className="footer-social-links">
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin size={15} />
            </a>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <Instagram size={15} />
            </a>

            <a
              href="https://x.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="X"
              className="footer-x-icon"
            >
              X
            </a>

            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
            >
              <Youtube size={16} />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} AKETI STUDIO</span>

        <span className="footer-bottom-message">
          BUILT WITH PURPOSE. NOT JUST PIXELS.
        </span>

        <a className="footer-bottom-cta" href="/#contact">
          LET'S MAKE BUSINESS BETTER
          <ArrowUpRight size={13} />
        </a>
      </div>
    </footer>
  );
}

