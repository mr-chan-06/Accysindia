import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-black border-t dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-bold text-primary flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center shadow-lg shadow-primary/30">
                A
              </div>
              <span className="tracking-tight">ACCSYSINDIA</span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md leading-relaxed">
              Grow Your Income with Smart Digital Commerce. Join our platform to access premium products, membership benefits, and a lucrative referral system designed for your success.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-sm text-gray-500 hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/plans" className="text-sm text-gray-500 hover:text-primary transition-colors">Membership Plans</Link></li>
              <li><Link href="/income-system" className="text-sm text-gray-500 hover:text-primary transition-colors">Income System</Link></li>
              <li><Link href="/products" className="text-sm text-gray-500 hover:text-primary transition-colors">Products</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-6">Contact</h3>
            <ul className="space-y-4 text-sm text-gray-500">
              <li className="flex gap-2 items-start"><span className="text-primary mt-1">📍</span> 123 Business Avenue, Tech Hub</li>
              <li className="flex gap-2 items-center"><span className="text-primary">✉️</span> info@accsysindia.com</li>
              <li className="flex gap-2 items-center"><span className="text-primary">📞</span> +91 98765 43210</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t dark:border-gray-800 text-center text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} ACCSYSINDIA. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
