import { profile } from "../lib/profile";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <p className="footer-name">{profile.name}</p>
          <p className="footer-sub">{profile.subtitle} · Universitas Indonesia</p>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p>{profile.location}</p>
        </div>
      </div>
    </footer>
  );
}
