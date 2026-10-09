import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CircleCheck, ShoppingBag, ArrowRight, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import sunshineLogo from '@/assets/sunshine-logo.png';
import workSmarter from '@/assets/work-smarter.png';

export const Route = createFileRoute('/contact')({
  head: () => ({
    meta: [
      { title: 'Contact Us | Sunshine Opticals — Wholesale & Retail Optical Accessories' },
      { name: 'description', content: 'Contact Sunshine Opticals for wholesale inquiries, custom optical cases, presentation trays, and velvet cloths.' },
      { property: 'og:title', content: 'Contact Us | Sunshine Opticals' },
      { property: 'og:description', content: 'Get in touch with our team for bulk orders, retailer inquiries, and showroom visits.' },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    inquiryType: 'Wholesale Optical Accessories',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <main className="contact-page">
      {/* 1. Transparent Header (Consistent with Home Page) */}
      <header className="site-header">
        <div className="site-header-inner">
          <Link to="/" className="site-logo" aria-label="Sunshine Opticals Home">
            <img src={sunshineLogo} alt="Sunshine Opticals" className="site-logo-img" />
          </Link>
          <nav className="site-nav" aria-label="Main menu">
            <Link to="/">Home</Link>
            <Link to="/#about-section">About Us</Link>
            <Link to="/#products-section">Products</Link>
            <Link to="/#why-choose-us">Our Services</Link>
            <Link to="/contact" className="active">Contact Us</Link>
          </nav>
          <div className="header-actions">
            <Link to="/#products-section" className="header-bag-button">
              <ShoppingBag className="w-4 h-4" />
              <span>Catalog (₹)</span>
            </Link>
            <button
              className="header-menu-toggle"
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
              aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer Overlay */}
      <div
        className={`mobile-nav-backdrop ${isMobileMenuOpen ? 'is-open' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden={!isMobileMenuOpen}
      />
      <div className={`mobile-nav-drawer ${isMobileMenuOpen ? 'is-open' : ''}`}>
        <div className="mobile-nav-header">
          <img src={sunshineLogo} alt="Sunshine Opticals" className="mobile-nav-logo" />
          <button
            className="mobile-nav-close"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="mobile-nav-links">
          <Link
            to="/"
            className="mobile-nav-link"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span>Home</span>
            <ArrowRight className="w-4 h-4 text-blue-500" />
          </Link>
          <Link
            to="/#about-section"
            className="mobile-nav-link"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span>About Us</span>
            <ArrowRight className="w-4 h-4 text-blue-500" />
          </Link>
          <Link
            to="/#products-section"
            className="mobile-nav-link"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span>Products</span>
            <ArrowRight className="w-4 h-4 text-blue-500" />
          </Link>
          <Link
            to="/#why-choose-us"
            className="mobile-nav-link"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span>Our Services</span>
            <ArrowRight className="w-4 h-4 text-blue-500" />
          </Link>
          <Link
            to="/contact"
            className="mobile-nav-link active"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span>Contact Us</span>
            <ArrowRight className="w-4 h-4 text-blue-500" />
          </Link>
        </div>
        <div className="mobile-nav-footer">
          <p>Sunshine Opticals — Wholesale & Retail Optical Accessories across India</p>
          <Link
            to="/#products-section"
            className="shop-button w-full"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            Explore Catalog
          </Link>
        </div>
      </div>

      {/* 2. Top Hero CTA Section with Background Image */}
      <section className="contact-hero">
        <img src={workSmarter} alt="Sunshine Opticals Showroom" className="contact-hero-bg" />
        <div className="contact-hero-overlay" />
        <div className="contact-hero-inner">
          <p className="eyebrow" style={{ color: '#60a5fa' }}>Wholesale & Retail Support</p>
          <h1>Contact Sunshine Opticals</h1>
          <p>
            Whether you are a retail optician looking for display trays, protective leather cases, velvet cloths, or custom branding across India, our dedicated team is here to assist.
          </p>
        </div>
      </section>

      <div className="store-container">
        {/* 4 Info Cards */}
        <div className="contact-cards-grid">
          <div className="contact-info-card">
            <div className="contact-card-icon">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="contact-card-title">Call & WhatsApp</h3>
            <p className="contact-card-value">+91 98765 43210</p>
            <span className="contact-card-sub">Mon - Sat, 10:00 AM - 8:00 PM IST</span>
          </div>

          <div className="contact-info-card">
            <div className="contact-card-icon">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="contact-card-title">Email Inquiries</h3>
            <p className="contact-card-value">info@sunshineopticals.com</p>
            <span className="contact-card-sub">24/7 Wholesale Response</span>
          </div>

          <div className="contact-info-card">
            <div className="contact-card-icon">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="contact-card-title">Showroom & Warehouse</h3>
            <p className="contact-card-value">Optical Hub Market</p>
            <span className="contact-card-sub">Chandni Chowk, Delhi - 110006</span>
          </div>

          <div className="contact-info-card">
            <div className="contact-card-icon">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="contact-card-title">Business Timings</h3>
            <p className="contact-card-value">Mon - Sat: 10AM - 8PM</p>
            <span className="contact-card-sub">Sunday: Wholesale by Appointment</span>
          </div>
        </div>

        {/* Main Grid: Form + Google Map */}
        <div className="contact-main-grid">
          {/* Contact Form Card */}
          <div className="contact-form-card">
            <h2>Send Us a Message</h2>
            <p>Fill out the form below and our optical sales executive will respond within 2-4 business hours.</p>

            {isSubmitted ? (
              <div className="p-8 text-center bg-blue-50 border border-blue-200">
                <CircleCheck className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-blue-950 mb-2 font-heading">Inquiry Received!</h3>
                <p className="text-sm text-blue-800 mb-6">
                  Thank you for reaching out, <strong>{formData.name}</strong>. We will contact you at <strong>{formData.email}</strong> / <strong>{formData.phone}</strong> with wholesale catalog details.
                </p>
                <Button
                  className="shop-button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      name: '',
                      company: '',
                      email: '',
                      phone: '',
                      inquiryType: 'Wholesale Optical Accessories',
                      message: '',
                    });
                  }}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Your Name *</label>
                    <input
                      id="name"
                      type="text"
                      className="form-input"
                      placeholder="e.g. Rahul Sharma"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="company">Optical Store / Business Name</label>
                    <input
                      id="company"
                      type="text"
                      className="form-input"
                      placeholder="e.g. Vision Care Optics"
                      value={formData.company}
                      onChange={e => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      id="email"
                      type="email"
                      className="form-input"
                      placeholder="email@store.com"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone / WhatsApp Number *</label>
                    <input
                      id="phone"
                      type="tel"
                      className="form-input"
                      placeholder="+91 98765 00000"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="inquiryType">Inquiry Type</label>
                  <select
                    id="inquiryType"
                    className="form-select"
                    value={formData.inquiryType}
                    onChange={e => setFormData({ ...formData, inquiryType: e.target.value })}
                  >
                    <option value="Wholesale Optical Accessories">Wholesale Optical Accessories</option>
                    <option value="Optical Display Trays">Optical Display Trays (18-slot / Wood)</option>
                    <option value="Custom Leather & Hard Cases">Custom Leather & Hard Cases</option>
                    <option value="Velvet Cloths & Pouches">Velvet Cloths & Pouches</option>
                    <option value="Optical Bags & Packaging">Optical Bags & Packaging</option>
                    <option value="Bulk Sunglasses Orders">Bulk Sunglasses Orders</option>
                    <option value="Custom Logo Printing">Custom Logo Printing On Accessories</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Your Message / Order Requirements *</label>
                  <textarea
                    id="message"
                    className="form-textarea"
                    placeholder="Specify required quantities, tray dimensions, or case customization details..."
                    required
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <Button type="submit" className="shop-button w-full mt-2">
                  <Send className="w-4 h-4 mr-2" /> Submit Wholesale Inquiry
                </Button>
              </form>
            )}
          </div>

          {/* Google Map Card */}
          <div className="map-card">
            <div>
              <h2>Showroom Location</h2>
              <p>Visit our showroom in Delhi to inspect optical display trays, cases, and velvet materials in person.</p>
            </div>

            <div className="map-frame-wrapper">
              <iframe
                title="Sunshine Opticals Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14006.374359489678!2d77.2215!3d28.6562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd19523297a7%3A0x2a98e821e25e9821!2sChandni%20Chowk%2C%20Delhi%2C%20India!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="mt-4 pt-4 border-t border-slate-200 flex justify-between items-center text-xs text-slate-600">
              <span>📍 Optical Hub Market, Chandni Chowk, Delhi</span>
              <span className="text-blue-700 font-semibold">Open Mon - Sat (10am - 8pm)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-grid">
            <div className="footer-col footer-brand">
              <Link to="/">
                <img src={sunshineLogo} alt="Sunshine Opticals" className="footer-logo-img" />
              </Link>
              <p>Quality Optical Accessories for Retailers & Optical Businesses across India & Overseas.</p>
              <div className="footer-trust-badges">
                <span>✦ Wholesale Direct</span>
                <span>✦ Pan-India Delivery</span>
              </div>
            </div>

            <div className="footer-col">
              <h3>Quick Links</h3>
              <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/#about-section">About Us</Link></li>
                <li><Link to="/#products-section">Products Catalog</Link></li>
                <li><Link to="/#why-choose-us">Why Choose Us</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h3>Products</h3>
              <ul className="footer-links">
                <li><Link to="/#products-section">Optical Trays</Link></li>
                <li><Link to="/#products-section">Optical Cases</Link></li>
                <li><Link to="/#products-section">Optical Bags</Link></li>
                <li><Link to="/#products-section">Velvet Cloth</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h3>Contact</h3>
              <ul className="footer-contact-list">
                <li><Phone /> <span>+91 98765 43210</span></li>
                <li><Mail /> <span>info@sunshineopticals.com</span></li>
                <li><MapPin /> <span>Optical Hub Market, Delhi, India</span></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2026 Sunshine Opticals. All Rights Reserved.</p>
            <p>Quality Optical Accessories for Businesses (INR ₹ Pricing)</p>
          </div>
        </div>
      </footer>

      {/* Fixed Blinking WhatsApp Button */}
      <a
        href="https://wa.me/919876543210?text=Hello%20Sunshine%20Opticals,%20I%20would%20like%20to%20inquire%20about%20wholesale%20optical%20accessories."
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-floating-btn"
        aria-label="Chat with Sunshine Opticals on WhatsApp"
      >
        <svg
          className="w-8 h-8 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
        <span className="whatsapp-tooltip">Chat with us on WhatsApp</span>
      </a>
    </main>
  );
}
