# Elara Super App — Frontend Web Client

Production-grade Next.js 14 (App Router) web application powering the **Elara Bangladesh Super App** ecosystem across 16 commerce, logistics, and lifestyle service verticals.

Built with TypeScript, TailwindCSS, and custom reactive workflow engines for multi-role operations across Dhaka and all 64 districts of Bangladesh.

---

## Architecture & Workstations

The frontend architecture is partitioned into role-based operational workstations sharing a unified real-time workflow state and session security layer:

```
frontend/
├── app/
│   ├── (public)              # SEO-optimized landing engines (157 prerendered routes)
│   │   ├── page.tsx          # Homepage with 16 vertical service grids & live Dhaka radar
│   │   ├── courier/          # Point-to-point courier dispatch with Dhaka zone pills & COD
│   │   ├── escrow/           # 30% milestone escrow tribunal simulator (DNCRP compliant)
│   │   ├── vat/              # Official NBR Mushak-6.3 VAT policy and compliance documentation
│   │   ├── [slug]/           # Dynamic category & district landing engine
│   │   └── blog/             # Corporate announcements & logistics updates
│   ├── customer/             # Customer personal dashboard & tracking
│   │   ├── orders/           # Itemized order history & timeline steppers
│   │   ├── orders/[id]/      # Detailed order breakdown with OTP handover badge
│   │   ├── orders/[id]/invoice # Official printable NBR Mushak-6.3 tax invoice (BIN: 004829104-0101)
│   │   ├── track/            # Live Dhaka GPS telemetry radar (28 km/h speed, ETA, handover OTP)
│   │   ├── profile/          # Election Commission Smart NID verification with privacy toggle
│   │   ├── wallet/           # bKash, Nagad, and loyalty balance ledger
│   │   └── support/          # 24/7 Dhaka Customer Care live chat with auto-attached order context
│   ├── merchant/             # Dokan Merchant Operations Portal
│   │   ├── kds/              # Real-time Kitchen Display System (audio chimes, ticket workflow)
│   │   ├── orders/           # Live order stream with Mushak-6.3 breakdown & rider allocation
│   │   ├── menu/             # Menu catalog, variants, and stock quantity controls
│   │   └── bank/             # BEFTN / bKash merchant settlement configurations
│   ├── rider/                # Rider Fleet Delivery Console
│   │   ├── active-trip/      # 4-stage turn-by-turn navigation HUD with OTP customer handshake
│   │   ├── earnings/         # Daily trip fares, customer tips, and cash reconciliation
│   │   ├── cod/              # Cash-on-Delivery collection ledger & hub deposits
│   │   └── feed/             # Dhaka rider community road & waterlogging alerts
│   ├── tasker/               # JobTap On-Demand Pro Console
│   │   ├── radar/            # 15 km hyper-local service leads (AC, electrical, plumbing)
│   │   ├── jobs/             # Active contracts with 30% escrow hold guarantees
│   │   └── withdraw/         # Smart NID-linked MFS withdrawals
│   └── admin/                # Central Command Operations Portal
│       ├── overview/         # Platform GMV, active fleet telemetry, and zone health
│       ├── orders/           # System-wide order stream with audit overrides
│       ├── fleet/            # Fleet GPS monitor across Banani, Gulshan, Dhanmondi, and Uttara
│       ├── taskers/          # Smart NID and vocational certification verification queue
│       └── disputes/         # Milestone escrow mediation and DNCRP resolution panel
├── components/               # Accessible, reusable UI components (Header, Footer, Dialogs)
├── context/                  # Client state providers
│   ├── AuthContext.tsx       # JWT session persistence, cookies, and RBAC route guards
│   ├── CartContext.tsx       # Multi-merchant cart with BDT currency formatting
│   └── WorkflowContext.tsx   # Cross-role order state machine and local persistence
└── lib/                      # Core utility libraries
    ├── api-client.ts         # Type-safe fetch client for NestJS API Gateway (port 3000)
    ├── privacy.ts            # PII masking (Phone, Smart NID, Email, Account numbers)
    └── modules.ts            # Service vertical definitions and metadata
```

---

## Bangladesh Localization & Compliance

The platform is designed exclusively for the Bangladesh regulatory and consumer environment:

- **Monetary Unit**: Pure Bangladeshi Taka (`৳ BDT`) formatting with localized commas (`৳ 1,297`).
- **Mobile Financial Services (MFS)**: Native workflows for bKash, Nagad, Rocket, and Cash-on-Delivery (COD).
- **Tax Docket (NBR Mushak-6.3)**: Standalone printable tax invoices compliant with Rule 40(1)(c) of the Value Added Tax & Supplementary Duty Rules, 2016, featuring Dokan BIN `004829104-0101`, 5% VAT breakdown, and QR code verification.
- **Election Commission Smart NID**: Integrated with Porichoy identity verification standards, featuring authenticated reveal/hide toggles (`5910 •••• 10`).
- **Consumer Protection**: 30% advance escrow milestone holding adhering to Directorate of National Consumers' Right Protection (DNCRP) guidelines.

---

## Privacy & Data Protection

All data flows strictly follow privacy and leak-prevention protocols:

1. **PII Masking**: Customer phone numbers are masked (`01712-***201`) on merchant and rider terminals. Direct communication is handled via masked VoIP proxies.
2. **Delivery Staging**: Customer flat and apartment details remain masked to couriers until the parcel is physically collected from the kitchen (`ON_THE_WAY`).
3. **Error Sanitization**: API errors strip database connection strings, passwords, and internal file paths before rendering in user UI notifications.
4. **Cookie Security**: Authentication cookies enforce `SameSite=Lax` and `Secure` attributes.

---

## Getting Started

### Prerequisites

- **Node.js**: v20.x or higher
- **npm**: v10.x or higher

### Environment Configuration

Create a `.env.local` file in the `frontend` root:

```ini
NEXT_PUBLIC_API_URL=http://localhost:3000/v1
NEXT_PUBLIC_APP_NAME="Elara — The Bangladesh Super App"
NEXT_PUBLIC_APP_URL=http://localhost:3020
NEXT_PUBLIC_DEFAULT_CURRENCY=BDT
NEXT_PUBLIC_SUPPORT_HOTLINE="09612-000300"
NEXT_PUBLIC_VAT_RATE=0.05
NEXT_PUBLIC_DOKAN_BIN="004829104-0101"
```

### Installation

```bash
# Install dependencies
npm install

# Start development server on port 3020
npm run dev

# Compile production build (verifies all 157 static/dynamic routes)
npm run build

# Start production server
npm run start
```

---

## Developer Test Accounts

For testing cross-role workflows, the following developer credentials can be used on `/login` or via the role selector:

| Role | Name | Email | Password | Landing Page |
| :--- | :--- | :--- | :--- | :--- |
| **Customer** | Rahim Ahmed | `rahim.ahmed@elara.com.bd` | `Password@123` | `/customer` |
| **Merchant** | Kacchi Bhai Banani | `kacchi.bhai@elara.com.bd` | `Password@123` | `/merchant` |
| **Rider** | Tanvir Hossain | `tanvir.rider@elara.com.bd` | `Password@123` | `/rider` |
| **Tasker** | Suman Miah | `karigor.electric@elara.com.bd` | `Password@123` | `/tasker` |
| **Admin** | Central Ops Admin | `admin@elara.com.bd` | `Admin@123` | `/admin` |

---

## Quality & Build Verification

- **Routes**: 157 statically optimized App Router pages.
- **Type Checking**: Clean TypeScript compilation with zero lint warnings.
- **Responsive Layout**: Designed for mobile browsers (390px viewport) up to high-resolution desktop terminals (1920px).
<!-- elara-stage-181 -->

/* elara-stage-214 */
