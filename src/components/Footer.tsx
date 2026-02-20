import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Linkedin } from "lucide-react";
import Image from "next/image";
import logo from "../../public/images/logo.png";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container-narrow section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="flex flex-col gap-4">
            <Image
              src={logo}
              alt="Brightocity Interior Logo"
              width={200}
              height={90}
              className="object-contain"
            />
            <p className="text-background/70 text-sm leading-relaxed">
              We transform spaces into stunning, functional works of art. Every
              detail matters in creating your dream environment.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">
              Quick Links
            </h4>
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
            <h4 className="font-heading text-lg font-semibold mb-4">
              Services
            </h4>
            <div className="space-y-2 text-sm text-background/70">
              <p>Residential Design</p>
              <p>Commercial Spaces</p>
              <p>Space Planning</p>
              <p>Color Consultation</p>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">
              Get In Touch
            </h4>
            <div className="space-y-3 text-sm text-background/70">
              <div className="flex items-center gap-2">
                <Mail size={20} className="text-primary" />
                <Link href={`mailto:brightocityinterior@gmail.com`}>
                  brightocityinterior@gmail.com
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={20} className="text-primary" />
                <Link href={`tel:9903455451`}>+91 9903455451</Link>
                <Link href={`tel:9875426319`}>+91 9875426319</Link>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={28} className="text-primary" />
                <span>
                  11 no. Rail gate, Hridaypur, Barasat, Kolkata: 700127
                </span>
              </div>
              <div className="flex items-center gap-2">
                <i
                  className="fa fa-facebook text-primary !text-3xl !ml-1.5"
                  aria-hidden="true"
                ></i>
                <i
                  className="fa fa-linkedin text-primary !text-3xl !ml-1.5"
                  aria-hidden="true"
                ></i>
                <i
                  className="fa fa-whatsapp text-primary !text-3xl !ml-1.5"
                  aria-hidden="true"
                ></i>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-8 h-auto" fill="#dd7139">
                  <path d="M453.2 112L523.8 112L369.6 288.2L551 528L409 528L297.7 382.6L170.5 528L99.8 528L264.7 339.5L90.8 112L236.4 112L336.9 244.9L453.2 112zM428.4 485.8L467.5 485.8L215.1 152L173.1 152L428.4 485.8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 text-center text-sm text-background/50">
          © {new Date().getFullYear()} Brightocity Interior. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
