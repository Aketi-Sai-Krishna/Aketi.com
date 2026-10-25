import './footer.scss';
import { ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
      <footer className="site-footer">
        <div className="footer-top"><a className="wordmark footer-wordmark" href="#home">AKETI<span>®</span></a><p>Cheers to solving the issues<br/>and growing together.</p><a className="back-top" href="#home">BACK TO TOP ↑</a></div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} AKETI STUDIO</span><span>BUILT WITH PURPOSE. NOT JUST PIXELS.</span><span>LET’S MAKE BUSINESS BETTER <ArrowRight size={14}/></span></div>
      </footer>
  );
}
