"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Role = "customer" | "merchant" | "rider" | "tasker" | "admin";

export type OrderStatus =
  | "PLACED"
  | "CONFIRMED"
  | "PREPARING"
  | "READY_FOR_PICKUP"
  | "RIDER_ASSIGNED"
  | "PICKED_UP"
  | "ON_THE_WAY"
  | "DELIVERED"
  | "CANCELLED";

export interface DemoUser {
  id: string;
  name: string;
  role: Role;
  email: string;
  phone: string;
  location: string;
  avatarText: string;
  balanceBDT: number;
  badge?: string;
  details?: Record<string, any>;
}

export interface LiveOrder {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  merchantName: string;
  merchantLocation: string;
  items: { name: string; qty: number; price: number; variant?: string }[];
  subtotal: number;
  deliveryFee: number;
  vat: number;
  total: number;
  paymentMethod: "bkash" | "nagad" | "cod" | "card";
  paymentStatus: "PAID" | "PENDING";
  status: OrderStatus;
  riderName?: string;
  riderPhone?: string;
  deliveryOtp: string;
  etaMinutes: number;
  createdAt: string;
  updatedAt: string;
  timeline: { title: string; time: string; done: boolean }[];
  notes?: string;
}

export interface ShebaJob {
  id: string;
  serviceTitle: string;
  title?: string;
  category: string;
  customerName: string;
  customerPhone?: string;
  customerLocation: string;
  location?: string;
  taskerName?: string;
  priceBDT: number;
  budget?: number;
  description?: string;
  escrowStatus: "HELD_30_PERCENT" | "RELEASED" | "PENDING";
  status: "NEW" | "ACCEPTED" | "IN_PROGRESS" | "COMPLETED";
  scheduledTime: string;
}

export const DEMO_ACCOUNTS: Record<Role, DemoUser> = {
  customer: {
    id: "usr_rahim_dhaka",
    name: "Rahim Ahmed",
    role: "customer",
    email: "rahim.ahmed@elara.com.bd",
    phone: "01712-849201",
    location: "House 42, Road 11, Block D, Banani, Dhaka-1213",
    avatarText: "RA",
    balanceBDT: 4850,
    badge: "VIP Member",
  },
  merchant: {
    id: "mch_kacchi_bhai",
    name: "Kacchi Bhai — Banani Hub",
    role: "merchant",
    email: "kacchi.bhai@elara.com.bd",
    phone: "01819-234567",
    location: "Plot 67/A, Kemal Ataturk Avenue, Banani, Dhaka",
    avatarText: "KB",
    balanceBDT: 42650,
    badge: "Top Rated Restaurant",
    details: {
      cuisine: "Old Dhaka Kacchi & Biryani",
      rating: 4.8,
      isOpen: true,
      pendingOrdersCount: 2,
    },
  },
  rider: {
    id: "rdr_tanvir_fleet",
    name: "Tanvir Hossain",
    role: "rider",
    email: "tanvir.rider@elara.com.bd",
    phone: "01911-778899",
    location: "Banani / Gulshan Hub Radar",
    avatarText: "TH",
    balanceBDT: 1840,
    badge: "5-Star Elite Rider",
    details: {
      bikeModel: "Hero Splendor Plus 100cc (Dhaka Metro-Ha 48-1920)",
      todayTrips: 12,
      todayEarningsBDT: 1560,
      codCashCollected: 3250,
      isOnline: true,
    },
  },
  tasker: {
    id: "tsk_suman_sheba",
    name: "Suman Miah",
    role: "tasker",
    email: "karigor.electric@elara.com.bd",
    phone: "01622-443322",
    location: "Dhanmondi / Mohammadpur Cluster",
    avatarText: "SM",
    balanceBDT: 8400,
    badge: "Certified AC & Electrical Pro",
    details: {
      trade: "HVAC & Certified Domestic Electrician",
      nidVerified: true,
      completedJobs: 148,
      rating: 4.9,
    },
  },
  admin: {
    id: "adm_central_ops",
    name: "Elara Central Command Ops",
    role: "admin",
    email: "admin@elara.com.bd",
    phone: "01700-112233",
    location: "Level 14, Simpletree Anarkali, 89 Gulshan Avenue, Dhaka",
    avatarText: "EC",
    balanceBDT: 849200,
    badge: "Super Admin Authority",
    details: {
      activeZones: 10,
      fleetCount: 384,
      systemUptime: "99.98%",
    },
  },
};

const SEED_ORDERS: LiveOrder[] = [
  {
    id: "ELR-DH-92841",
    customerName: "Rahim Ahmed",
    customerPhone: "01712-849201",
    customerAddress: "House 42, Road 11, Block D, Banani, Dhaka-1213",
    merchantName: "Kacchi Bhai — Banani Hub",
    merchantLocation: "Kemal Ataturk Ave, Banani",
    items: [
      { name: "Basmati Kacchi Platter with Borhani", qty: 2, price: 499, variant: "Full Mutton Portion" },
      { name: "Firni & Jorda Cup", qty: 2, price: 90 },
    ],
    subtotal: 1178,
    deliveryFee: 60,
    vat: 59,
    total: 1297,
    paymentMethod: "bkash",
    paymentStatus: "PAID",
    status: "ON_THE_WAY",
    riderName: "Tanvir Hossain",
    riderPhone: "01911-778899",
    deliveryOtp: "4819",
    etaMinutes: 12,
    createdAt: "Just now",
    updatedAt: "1 min ago",
    timeline: [
      { title: "Order Placed & bKash Verified", time: "18:40", done: true },
      { title: "Kacchi Bhai Accepted & Cooked", time: "18:48", done: true },
      { title: "Rider Tanvir Picked Up Parcel", time: "18:55", done: true },
      { title: "En Route to Banani Rd 11", time: "18:58", done: true },
      { title: "Delivered to Customer", time: "Pending", done: false },
    ],
  },
  {
    id: "ELR-DH-92842",
    customerName: "Fariha Sultana",
    customerPhone: "01823-991122",
    customerAddress: "Apartment 5B, Road 71, Gulshan-2, Dhaka",
    merchantName: "Kawran Bazar Fresh Fishery",
    merchantLocation: "Kawran Bazar DOHS Outlet",
    items: [
      { name: "Padma River Ilish (1.2 kg Curry Cut)", qty: 1, price: 1450 },
      { name: "Chinigura Polao Rice (2kg pack)", qty: 1, price: 280 },
    ],
    subtotal: 1730,
    deliveryFee: 60,
    vat: 0,
    total: 1790,
    paymentMethod: "nagad",
    paymentStatus: "PAID",
    status: "PREPARING",
    deliveryOtp: "7721",
    etaMinutes: 28,
    createdAt: "8 mins ago",
    updatedAt: "3 mins ago",
    timeline: [
      { title: "Order Placed & Nagad Verified", time: "18:50", done: true },
      { title: "Fish Cut & Cleaned at Store", time: "18:55", done: true },
      { title: "Awaiting Rider Pickup", time: "Pending", done: false },
      { title: "Out for Delivery", time: "Pending", done: false },
      { title: "Delivered to Customer", time: "Pending", done: false },
    ],
  },
  {
    id: "ELR-DH-92840",
    customerName: "Dr. Asif Mahmud",
    customerPhone: "01755-661144",
    customerAddress: "Road 27, Dhanmondi, Dhaka",
    merchantName: "Lazz Pharma Dhanmondi",
    merchantLocation: "Mirpur Road, Dhanmondi",
    items: [
      { name: "Prescription Diabetics & Wellness Kit", qty: 1, price: 890 },
    ],
    subtotal: 890,
    deliveryFee: 60,
    vat: 0,
    total: 950,
    paymentMethod: "cod",
    paymentStatus: "PAID",
    status: "DELIVERED",
    riderName: "Kamrul Islam",
    riderPhone: "01799-332211",
    deliveryOtp: "1190",
    etaMinutes: 0,
    createdAt: "45 mins ago",
    updatedAt: "5 mins ago",
    timeline: [
      { title: "Order Placed (COD)", time: "18:10", done: true },
      { title: "Verified by Pharmacist", time: "18:15", done: true },
      { title: "Rider Picked Up", time: "18:25", done: true },
      { title: "Delivered with Cash Collected", time: "18:42", done: true },
    ],
  },
];

const SEED_JOBS: ShebaJob[] = [
  {
    id: "JOB-8821",
    serviceTitle: "General Inverter AC Master Chemical Servicing",
    title: "General Inverter AC Master Chemical Servicing",
    description: "Deep chemical coil cleaning, gas pressure check, and blower sanitation for 1.5 ton split AC.",
    category: "AC & Cooling",
    customerName: "Nusrat Jahan",
    customerLocation: "Road 103, Gulshan-2, Dhaka",
    location: "Road 103, Gulshan-2, Dhaka",
    taskerName: "Suman Miah",
    priceBDT: 1400,
    budget: 1400,
    escrowStatus: "HELD_30_PERCENT",
    status: "ACCEPTED",
    scheduledTime: "Today at 7:30 PM",
  },
  {
    id: "JOB-8822",
    serviceTitle: "Distribution Board Circuit Breaker Tripping Diagnostic",
    title: "Distribution Board Circuit Breaker Tripping Diagnostic",
    description: "Main circuit breaker tripping intermittently under microwave + AC load. Rewiring check required.",
    category: "Electrical Repair",
    customerName: "Farhan Karim",
    customerLocation: "Block E, Banani, Dhaka",
    location: "Block E, Banani, Dhaka",
    taskerName: "Suman Miah",
    priceBDT: 650,
    budget: 650,
    escrowStatus: "HELD_30_PERCENT",
    status: "IN_PROGRESS",
    scheduledTime: "Today at 8:45 PM",
  },
  {
    id: "JOB-8823",
    serviceTitle: "Bathroom Pipe Leakage & Water Pressure Motor Fix",
    title: "Bathroom Pipe Leakage & Water Pressure Motor Fix",
    description: "Concealed pipe dripping inside master bath ceiling and booster motor air lock clearing.",
    category: "Plumbing Sheba",
    customerName: "Imran Hossain",
    customerLocation: "Road 8/A, Dhanmondi, Dhaka",
    location: "Road 8/A, Dhanmondi, Dhaka",
    priceBDT: 950,
    budget: 950,
    escrowStatus: "HELD_30_PERCENT",
    status: "NEW",
    scheduledTime: "Tomorrow at 10:00 AM",
  },
];

interface WorkflowContextType {
  currentRole: Role;
  currentUser: DemoUser;
  orders: LiveOrder[];
  liveOrders: LiveOrder[];
  activeCustomerOrder: LiveOrder | null;
  shebaJobs: ShebaJob[];
  switchRole: (role: Role) => void;
  loginWithPhone: (phone: string, role?: Role) => boolean;
  placeOrder: (orderData: {
    items: { name: string; qty: number; price: number; variant?: string }[];
    total: number;
    subtotal: number;
    deliveryFee: number;
    vat: number;
    address: string;
    paymentMethod: "bkash" | "nagad" | "cod" | "card";
    notes?: string;
  }) => LiveOrder;
  merchantAcceptOrder: (orderId: string) => void;
  merchantMarkReady: (orderId: string) => void;
  riderAcceptOrder: (orderId: string) => void;
  riderPickupOrder: (orderId: string) => void;
  riderDeliverOrder: (orderId: string, inputOtp?: string) => { success: boolean; message: string };
  taskerAcceptJob: (jobId: string) => void;
  taskerCompleteJob: (jobId: string) => void;
  resetDemoData: () => void;
}

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined);

const WORKFLOW_STORAGE_KEY = "elara_workflow_state_v2";

export function WorkflowProvider({ children }: { children: React.ReactNode }) {
  const [currentRole, setCurrentRole] = useState<Role>("customer");
  const [currentUser, setCurrentUser] = useState<DemoUser>(DEMO_ACCOUNTS.customer);
  const [orders, setOrders] = useState<LiveOrder[]>(SEED_ORDERS);
  const [shebaJobs, setShebaJobs] = useState<ShebaJob[]>(SEED_JOBS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from local storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(WORKFLOW_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.currentRole && DEMO_ACCOUNTS[parsed.currentRole as Role]) {
          setCurrentRole(parsed.currentRole);
          setCurrentUser(DEMO_ACCOUNTS[parsed.currentRole as Role]);
        }
        if (Array.isArray(parsed.orders) && parsed.orders.length > 0) {
          setOrders(parsed.orders);
        }
        if (Array.isArray(parsed.shebaJobs) && parsed.shebaJobs.length > 0) {
          setShebaJobs(parsed.shebaJobs);
        }
      }
    } catch {
      // Ignore local storage parse error
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Persist to local storage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(
        WORKFLOW_STORAGE_KEY,
        JSON.stringify({
          currentRole,
          orders,
          shebaJobs,
        })
      );
    } catch {
      // Ignore storage errors
    }
  }, [currentRole, orders, shebaJobs, isLoaded]);

  const switchRole = (role: Role) => {
    setCurrentRole(role);
    setCurrentUser(DEMO_ACCOUNTS[role]);
  };

  const loginWithPhone = (phone: string, role: Role = "customer") => {
    switchRole(role);
    return true;
  };

  const activeCustomerOrder = orders.find(
    (o) => o.status !== "DELIVERED" && o.status !== "CANCELLED"
  ) || orders[0] || null;

  const placeOrder = (orderData: {
    items: { name: string; qty: number; price: number; variant?: string }[];
    total: number;
    subtotal: number;
    deliveryFee: number;
    vat: number;
    address: string;
    paymentMethod: "bkash" | "nagad" | "cod" | "card";
    notes?: string;
  }): LiveOrder => {
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const orderId = `ELR-DH-${randomDigits}`;
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    const newOrder: LiveOrder = {
      id: orderId,
      customerName: currentUser.name || "Rahim Ahmed",
      customerPhone: currentUser.phone || "01712-849201",
      customerAddress: orderData.address || currentUser.location,
      merchantName: "Kacchi Bhai — Banani Hub",
      merchantLocation: "Kemal Ataturk Ave, Banani",
      items: orderData.items,
      subtotal: orderData.subtotal,
      deliveryFee: orderData.deliveryFee,
      vat: orderData.vat,
      total: orderData.total,
      paymentMethod: orderData.paymentMethod,
      paymentStatus: orderData.paymentMethod === "cod" ? "PENDING" : "PAID",
      status: "PLACED",
      deliveryOtp: otp,
      etaMinutes: 24,
      createdAt: "Just now",
      updatedAt: "Just now",
      timeline: [
        { title: `Order Placed (${orderData.paymentMethod.toUpperCase()})`, time: "Just now", done: true },
        { title: "Merchant Confirmation & Cooking", time: "Pending", done: false },
        { title: "Rider Assigned & Pickup", time: "Pending", done: false },
        { title: "Out for Delivery (Live Telemetry)", time: "Pending", done: false },
        { title: "Delivered to Customer", time: "Pending", done: false },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const merchantAcceptOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;
        const updatedTimeline = order.timeline.map((item, idx) => {
          if (idx === 1) return { ...item, title: "Cooking in KDS Kitchen", time: "Now", done: true };
          return item;
        });
        return {
          ...order,
          status: "PREPARING" as OrderStatus,
          updatedAt: "Just now",
          timeline: updatedTimeline,
        };
      })
    );
  };

  const merchantMarkReady = (orderId: string) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;
        return {
          ...order,
          status: "READY_FOR_PICKUP" as OrderStatus,
          updatedAt: "Just now",
        };
      })
    );
  };

  const riderAcceptOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;
        const updatedTimeline = order.timeline.map((item, idx) => {
          if (idx === 2) return { ...item, title: "Rider Tanvir Assigned & At Store", time: "Now", done: true };
          return item;
        });
        return {
          ...order,
          status: "RIDER_ASSIGNED" as OrderStatus,
          riderName: "Tanvir Hossain",
          riderPhone: "01911-778899",
          updatedAt: "Just now",
          timeline: updatedTimeline,
        };
      })
    );
  };

  const riderPickupOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;
        const updatedTimeline = order.timeline.map((item, idx) => {
          if (idx === 3) return { ...item, title: "En Route to Customer (Live Map)", time: "Now", done: true };
          return item;
        });
        return {
          ...order,
          status: "ON_THE_WAY" as OrderStatus,
          updatedAt: "Just now",
          etaMinutes: 14,
          timeline: updatedTimeline,
        };
      })
    );
  };

  const riderDeliverOrder = (orderId: string, inputOtp?: string) => {
    const targetOrder = orders.find((o) => o.id === orderId);
    if (!targetOrder) return { success: false, message: "Order not found" };

    if (inputOtp && inputOtp !== targetOrder.deliveryOtp) {
      return { success: false, message: `Invalid Delivery OTP! The customer OTP is ${targetOrder.deliveryOtp}` };
    }

    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;
        const updatedTimeline = order.timeline.map((item) => ({ ...item, done: true }));
        return {
          ...order,
          status: "DELIVERED" as OrderStatus,
          paymentStatus: "PAID",
          etaMinutes: 0,
          updatedAt: "Just now",
          timeline: updatedTimeline,
        };
      })
    );

    // Credit rider and merchant
    DEMO_ACCOUNTS.rider.balanceBDT += 85;
    DEMO_ACCOUNTS.merchant.balanceBDT += targetOrder.total - targetOrder.deliveryFee;

    return { success: true, message: `Order #${orderId} marked delivered! ৳ 85 credited to Rider wallet.` };
  };

  const taskerAcceptJob = (jobId: string) => {
    setShebaJobs((prev) =>
      prev.map((job) => (job.id === jobId ? { ...job, status: "IN_PROGRESS", taskerName: "Suman Miah" } : job))
    );
  };

  const taskerCompleteJob = (jobId: string) => {
    setShebaJobs((prev) =>
      prev.map((job) =>
        job.id === jobId ? { ...job, status: "COMPLETED", escrowStatus: "RELEASED" } : job
      )
    );
    DEMO_ACCOUNTS.tasker.balanceBDT += 1400;
  };

  const resetDemoData = () => {
    setOrders(SEED_ORDERS);
    setShebaJobs(SEED_JOBS);
    setCurrentRole("customer");
    setCurrentUser(DEMO_ACCOUNTS.customer);
    try {
      localStorage.removeItem(WORKFLOW_STORAGE_KEY);
    } catch {}
  };

  return (
    <WorkflowContext.Provider
      value={{
        currentRole,
        currentUser,
        orders,
        liveOrders: orders,
        activeCustomerOrder,
        shebaJobs,
        switchRole,
        loginWithPhone,
        placeOrder,
        merchantAcceptOrder,
        merchantMarkReady,
        riderAcceptOrder,
        riderPickupOrder,
        riderDeliverOrder,
        taskerAcceptJob,
        taskerCompleteJob,
        resetDemoData,
      }}
    >
      {children}
    </WorkflowContext.Provider>
  );
}

export function useWorkflow() {
  const context = useContext(WorkflowContext);
  if (!context) {
    throw new Error("useWorkflow must be used within a WorkflowProvider");
  }
  return context;
}

/* elara-stage-130 */
