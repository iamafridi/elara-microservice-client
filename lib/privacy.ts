/**
 * Elara Privacy & Data Protection Utility
 * Implements Bangladesh Data Privacy standards, PII masking, error sanitization,
 * and role-based data leakage prevention across the Elara Super App.
 */

/**
 * Masks a Bangladeshi phone number to prevent identity theft / harassment.
 * Example: "01712-849201" -> "01712-***201"
 * Example: "+880 1711-000001" -> "+880 1711-***001"
 */
export function maskPhone(phone: string | undefined | null, isFullAccess = false): string {
  if (!phone) return "—";
  if (isFullAccess) return phone;

  const trimmed = phone.trim();
  // Standard BD format: 01XXX-XXXXXX or +880 1XXX-XXXXXX
  if (trimmed.includes("+880")) {
    const parts = trimmed.split(" ");
    if (parts.length >= 2) {
      const numPart = parts.slice(1).join(" ");
      const dashParts = numPart.split("-");
      if (dashParts.length === 2) {
        const first = dashParts[0];
        const last = dashParts[1];
        return `+880 ${first}-***${last.slice(-3)}`;
      }
    }
  }

  const clean = trimmed.replace(/[^0-9]/g, "");
  if (clean.length >= 10) {
    const prefix = clean.slice(0, 5);
    const suffix = clean.slice(-3);
    return `${prefix}-***${suffix}`;
  }

  return trimmed.replace(/\d(?=\d{2})/g, "*");
}

/**
 * Masks Bangladesh Election Commission Smart NID (10-digit or 17-digit).
 * Example: "5910 8294 10" -> "5910 •••• 10"
 * Example: "8273 9102 4410" -> "8273 •••• 4410"
 */
export function maskNID(nid: string | undefined | null, isFullAccess = false): string {
  if (!nid) return "—";
  if (isFullAccess) return nid;

  const parts = nid.trim().split(" ");
  if (parts.length >= 3) {
    return `${parts[0]} •••• ${parts[parts.length - 1]}`;
  }

  const clean = nid.replace(/[^0-9]/g, "");
  if (clean.length >= 10) {
    return `${clean.slice(0, 4)} •••• ${clean.slice(-3)}`;
  }

  return "•••• •••• ••••";
}

/**
 * Masks email address for display in non-privileged UI.
 * Example: "rahim.ahmed@elara.com.bd" -> "r•••••d@elara.com.bd"
 */
export function maskEmail(email: string | undefined | null, isFullAccess = false): string {
  if (!email) return "—";
  if (isFullAccess) return email;

  const parts = email.split("@");
  if (parts.length !== 2) return email;

  const [username, domain] = parts;
  if (username.length <= 2) {
    return `${username[0]}*@${domain}`;
  }

  const firstChar = username[0];
  const lastChar = username[username.length - 1];
  const maskedMiddle = "•".repeat(Math.min(username.length - 2, 5));
  return `${firstChar}${maskedMiddle}${lastChar}@${domain}`;
}

/**
 * Masks bank / MFS account numbers (bKash, Nagad, Rocket, BEFTN).
 * Example: "01712849201" -> "017••••9201"
 */
export function maskAccountNumber(account: string | undefined | null, isFullAccess = false): string {
  if (!account) return "—";
  if (isFullAccess) return account;

  const clean = account.replace(/[^0-9]/g, "");
  if (clean.length >= 8) {
    return `${clean.slice(0, 3)}••••${clean.slice(-4)}`;
  }
  return "••••••••";
}

/**
 * Masks customer name for merchant / public dispatch (e.g. Rahim Ahmed -> Rahim A.)
 */
export function maskCustomerName(fullName: string | undefined | null, isFullAccess = false): string {
  if (!fullName) return "Valued Customer";
  if (isFullAccess) return fullName;

  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return parts[0];
  const firstName = parts[0];
  const lastInitial = parts[parts.length - 1][0];
  return `${firstName} ${lastInitial}.`;
}

/**
 * Protects customer location privacy for riders prior to pickup.
 * Before parcel pickup: Shows neighborhood / road cluster only.
 * After pickup (ON_THE_WAY): Reveals exact flat / house number for doorstep delivery.
 */
export function maskAddressForRider(
  address: string | undefined | null,
  status: string
): { displayAddress: string; isFullRevealed: boolean } {
  if (!address) return { displayAddress: "Dhaka Metro Hub", isFullRevealed: false };

  const isFullRevealed = status === "ON_THE_WAY" || status === "DELIVERED";
  if (isFullRevealed) {
    return { displayAddress: address, isFullRevealed: true };
  }

  // Hide flat/lift details until parcel is physically picked up from Dokan
  const parts = address.split(",");
  if (parts.length > 2) {
    // Keep road and neighborhood, hide apartment/house number
    const roadAndArea = parts.slice(1).join(",").trim();
    return {
      displayAddress: `${roadAndArea} (House & Flat details unlock after pickup)`,
      isFullRevealed: false,
    };
  }

  return {
    displayAddress: `${address} (Exact details unlock after pickup)`,
    isFullRevealed: false,
  };
}

/**
 * Strips database credentials, internal SQL queries, file paths, and stack traces
 * from error messages before presenting them to end users.
 */
export function sanitizeError(error: any): string {
  if (!error) return "An unexpected error occurred. Please try again.";

  let message = typeof error === "string" ? error : error.message || JSON.stringify(error);

  // Strip database connection strings and passwords
  message = message.replace(/postgresql:\/\/[^@]+@/gi, "postgresql://[PROTECTED]@");
  message = message.replace(/redis:\/\/[^@]+@/gi, "redis://[PROTECTED]@");
  message = message.replace(/password=[^\s&;]+/gi, "password=[PROTECTED]");

  // Strip internal filesystem paths
  message = message.replace(/[A-Za-z]:\\[^:\n\r]+/g, "[internal path]");
  message = message.replace(/\/home\/[^:\n\r]+/g, "[internal path]");

  // Strip raw SQL statements or TypeORM / Prisma internal table leaks
  if (message.includes("SELECT") || message.includes("INSERT INTO") || message.includes("UPDATE")) {
    return "Database query exception. Central Ops monitoring alerted.";
  }

  return message;
}
