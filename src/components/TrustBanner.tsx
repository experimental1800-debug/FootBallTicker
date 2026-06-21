import { Shield, Ticket, RefreshCw, Star } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Buyer Guarantee",
    desc: "Every order is 100% guaranteed. Your tickets will be valid for entry or your money back.",
  },
  {
    icon: Ticket,
    title: "Secure Checkout",
    desc: "All transactions are encrypted and secured with industry-leading technology.",
  },
  {
    icon: RefreshCw,
    title: "Last Minute Tickets",
    desc: "Score tickets up to the day of the event. We've got you covered.",
  },
  {
    icon: Star,
    title: "Best Selection",
    desc: "Millions of tickets across all venues and price ranges to fit your budget.",
  },
];

export default function TrustBanner() {
  return (
    <div className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
        <h2 className="text-center text-xl md:text-2xl font-bold text-gray-900 mb-8">
          Why buy with SeatGeek?
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#E63B2E]/10 flex items-center justify-center">
                <Icon size={22} className="text-[#E63B2E]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">{title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
