const venues = [
  { name: "MetLife Stadium", city: "East Rutherford, NJ", capacity: "82,500", img: "https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { name: "SoFi Stadium", city: "Los Angeles, CA", capacity: "70,240", img: "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { name: "AT&T Stadium", city: "Arlington, TX", capacity: "80,000", img: "https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { name: "Hard Rock Stadium", city: "Miami Gardens, FL", capacity: "65,326", img: "https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { name: "Levi's Stadium", city: "Santa Clara, CA", capacity: "68,500", img: "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { name: "Estadio Azteca", city: "Mexico City, MX", capacity: "87,523", img: "https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg?auto=compress&cs=tinysrgb&w=400" },
];

const stats = [
  { label: "Teams", value: "48" },
  { label: "Matches", value: "104" },
  { label: "Host Cities", value: "16" },
  { label: "Countries", value: "3" },
];

export default function InfoSidebar() {
  return (
    <div className="space-y-6">
      {/* Tournament stats */}
      <div className="bg-gradient-to-br from-[#0e2040] to-[#1a3a5c] rounded-2xl p-5 text-white">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 bg-[#E63B2E] rounded-full flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <h3 className="font-bold text-sm">Tournament Overview</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {stats.map(({ label, value }) => (
            <div key={label} className="bg-white/10 rounded-xl p-3 text-center">
              <p className="text-2xl font-black">{value}</p>
              <p className="text-xs text-white/60 font-medium">{label}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-xs text-white/50 leading-relaxed">
            Jun 11 – Jul 19, 2026 &nbsp;·&nbsp; USA, Canada &amp; Mexico
          </p>
        </div>
      </div>

      {/* Featured Venues */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h3 className="font-bold text-sm text-gray-900 mb-4">Featured Venues</h3>
        <div className="space-y-3">
          {venues.map((venue) => (
            <a
              key={venue.name}
              href="#"
              className="flex items-center gap-3 group"
            >
              <img
                src={venue.img}
                alt={venue.name}
                className="w-12 h-10 rounded-lg object-cover flex-shrink-0"
              />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-800 group-hover:text-[#E63B2E] transition-colors truncate">
                  {venue.name}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {venue.city} · {venue.capacity}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Price alert */}
      <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
        <h3 className="font-bold text-sm text-amber-800 mb-2">
          Set a Price Alert
        </h3>
        <p className="text-xs text-amber-700 leading-relaxed mb-3">
          Get notified when tickets drop to your desired price.
        </p>
        <div className="flex gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 text-xs border border-amber-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:border-amber-400 placeholder-amber-300"
          />
          <button className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors whitespace-nowrap">
            Alert Me
          </button>
        </div>
      </div>
    </div>
  );
}
