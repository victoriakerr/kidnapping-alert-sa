import { Heart, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container px-4">
        <div className="grid grid-3 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Emergency Contacts</h3>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="h-4" style={{ width: '1rem' }} />
                <span>SAPS: 10111</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4" style={{ width: '1rem' }} />
                <span>Emergency: 112</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>
              A community-driven platform to help locate missing persons in South Africa. 
              Every second counts in an emergency.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4" style={{ width: '1rem' }} />
                <span>help@kidnappalert.co.za</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
          <p className="text-sm flex items-center justify-center gap-2">
            <span>Made with</span>
            <Heart className="h-4" style={{ width: '1rem', color: 'var(--accent-gold)' }} />
            <span>for South African families</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;