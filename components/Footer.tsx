"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ElaraLogo from "./ElaraLogo";

export default function Footer() {
  const pathname = usePathname();
  const isDedicatedPortal =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/merchant") ||
    pathname.startsWith("/rider") ||
    pathname.startsWith("/tasker");

  if (isDedicatedPortal) {
    return null;
  }

  return (
    <footer className="border-t border-ink/10 bg-surface-low text-ink">
      <div className="shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <ElaraLogo size="md" showTagline={true} />
          <p className="text-sm text-slate-600 max-w-sm leading-relaxed">
            The hyper-local unified consumer ecosystem engineered specifically for Bangladesh.
            Food delivery, Daily Bazaar, Express Courier, and JobTap Home Sheba with instant bKash &amp; Nagad payments.
          </p>
          <div className="pt-2 text-xs text-slate-500 space-y-1">
            <p className="font-semibold text-ink">Elara Technologies Bangladesh Ltd.</p>
            <p>Level 14, Simpletree Anarkali, 89 Gulshan Avenue, Dhaka-1212</p>
            <p className="font-mono text-[11px]">Trade License: TRAD/DNCC/014298/2026 • BIN: 004829104-0101</p>
          </div>
        </div>

        {/* Ecosystem Services */}
        <div>
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-ink">Ecosystem</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
            <li><Link href="/food-delivery" className="hover:text-primary transition-colors">Kacchi &amp; Food Dining</Link></li>
            <li><Link href="/grocery-delivery" className="hover:text-primary transition-colors">Daily Bazaar &amp; Fish</Link></li>
            <li><Link href="/courier" className="hover:text-primary transition-colors">Express Courier (15m)</Link></li>
            <li><Link href="/services" className="hover:text-primary transition-colors">JobTap Home Sheba</Link></li>
            <li><Link href="/elara-pay" className="hover:text-primary transition-colors">Elara Pay &amp; Escrow</Link></li>
            <li><Link href="/merchant" className="hover:text-primary transition-colors">Merchant KDS Portal</Link></li>
            <li><Link href="/rider" className="hover:text-primary transition-colors">Rider Fleet Partner</Link></li>
          </ul>
        </div>

        {/* Company & Zones */}
        <div>
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-ink">Coverage Zones</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
            <li><span className="text-emerald-700 font-medium">●</span> Dhaka North (Gulshan/Banani)</li>
            <li><span className="text-emerald-700 font-medium">●</span> Dhaka South (Dhanmondi/Motijheel)</li>
            <li><span className="text-emerald-700 font-medium">●</span> Old Dhaka &amp; Lalbagh</li>
            <li><span className="text-emerald-700 font-medium">●</span> Uttara &amp; Mirpur</li>
            <li><span className="text-emerald-700 font-medium">●</span> Chittagong (GEC &amp; Agrabad)</li>
            <li><span className="text-emerald-700 font-medium">●</span> Sylhet Sadar &amp; Shahjalal</li>
          </ul>
        </div>

        {/* Legal & Payments */}
        <div>
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-ink">Trust &amp; Compliance</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
            <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link href="/escrow" className="hover:text-primary transition-colors">30% Escrow Shield</Link></li>
            <li><Link href="/vat" className="hover:text-primary transition-colors">Mushak-6.3 VAT Policy</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">24/7 Dhaka Support</Link></li>
          </ul>

          <div className="mt-6">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block mb-2">Supported MFS</span>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              <span className="px-2 py-1 rounded bg-bkash/10 text-bkash font-bold border border-bkash/20">bKash</span>
              <span className="px-2 py-1 rounded bg-nagad/10 text-nagad font-bold border border-nagad/20">Nagad</span>
              <span className="px-2 py-1 rounded bg-indigo-50 text-indigo-700 font-bold border border-indigo-200">BEFTN</span>
              <span className="px-2 py-1 rounded bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">COD</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-ink/10 py-6 text-center text-xs font-mono text-slate-500 shell flex flex-col sm:flex-row items-center justify-between gap-4">
        <span>© {new Date().getFullYear()} Elara Technologies Bangladesh Ltd. All rights reserved.</span>
        <div className="flex items-center gap-4 text-[11px]">
          <span>Engineered for Bangladesh 🇧🇩</span>
          <span>•</span>
          <span className="text-emerald-700 font-medium">All 11 Microservices Operational</span>
        </div>
      </div>

      </footer>
  );
}
