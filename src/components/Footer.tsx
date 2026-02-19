import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container-narrow section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="font-heading text-xl font-bold mb-4">
              <span className="text-primary">LUXE</span>INTERIOR
            </h3>
            <p className="text-background/70 text-sm leading-relaxed">
              We transform spaces into stunning, functional works of art. Every detail matters in creating your dream environment.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              {["About Us", "Our Works", "Interior", "Blog"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="block text-sm text-background/70 hover:text-primary transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Services</h4>
            <div className="space-y-2 text-sm text-background/70">
              <p>Residential Design</p>
              <p>Commercial Spaces</p>
              <p>Space Planning</p>
              <p>Color Consultation</p>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Get In Touch</h4>
            <div className="space-y-3 text-sm text-background/70">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-primary" />
                <span>hello@luxeinterior.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-primary" />
                <span>123 Design Ave, NY 10001</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 text-center text-sm text-background/50">
          © {new Date().getFullYear()} LuxeInterior. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
