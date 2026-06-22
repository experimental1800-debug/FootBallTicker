import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  Shield,
  Wallet,
  X,
} from "lucide-react";
import type { Event } from "../data/events";
import heroBackground from "../public/HeroBackgound.png";

interface CryptoPaymentDrawerProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

type PaymentAsset = {
  key: string;
  symbol: string;
  name: string;
  network: string;
  chainCode: string;
  balance: string;
  iconBg: string;
  icon: string;
  recommended?: boolean;
};

const paymentAssets: PaymentAsset[] = [
  {
    key: "usdt-eth",
    symbol: "USDT",
    name: "Tether",
    network: "Ethereum",
    chainCode: "ETH",
    balance: "1,480.22 USDT",
    iconBg: "from-[#18b97d] to-[#68e4b3]",
    icon: "◆",
    recommended: true,
  },
  {
    key: "usdt-sol",
    symbol: "USDT",
    name: "Tether",
    network: "Solana",
    chainCode: "SOL",
    balance: "1,480.22 USDT",
    iconBg: "from-[#7f5cff] to-[#3cf2d0]",
    icon: "S",
  },
  {
    key: "usdt-bnb",
    symbol: "USDT",
    name: "Tether",
    network: "BNB Chain",
    chainCode: "BNB",
    balance: "1,480.22 USDT",
    iconBg: "from-[#f0b90b] to-[#ffe27a]",
    icon: "T",
  },
];

function formatCryptoAmount(usdAmount: number, rate: number) {
  return (usdAmount / rate).toFixed(rate === 1 ? 2 : 3);
}

function formatUsdAmount(usdAmount: number) {
  return usdAmount.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });
}

function StatusOrb({ isSuccess }: { isSuccess: boolean }) {
  if (!isSuccess) {
    return (
      <div className="relative mx-auto h-[128px] w-[128px] sm:h-[148px] sm:w-[148px]">
        <div className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.18),rgba(10,15,28,0)_74%)] blur-2xl" />
        <div className="absolute inset-[17%] rounded-full bg-[radial-gradient(circle_at_34%_28%,#ffffff,#eef2f7_36%,#c6d0db_66%,#7d8896_100%)] shadow-[0_0_48px_rgba(255,255,255,0.14)]" />
        <div className="absolute inset-[24%] rounded-full border border-white/35 bg-[radial-gradient(circle_at_38%_32%,rgba(255,255,255,0.98),rgba(243,246,250,0.44)_36%,rgba(102,116,134,0)_70%)]" />
        <div className="absolute left-[28%] top-[25%] h-[20%] w-[20%] rounded-[0.95rem] bg-[radial-gradient(circle_at_50%_38%,#4d5258,#111315_76%)] opacity-92 shadow-[0_12px_20px_rgba(0,0,0,0.22)] rotate-[14deg]" />
        <div className="absolute right-[24%] top-[40%] h-[18%] w-[18%] rounded-[0.85rem] bg-[radial-gradient(circle_at_50%_38%,#4d5258,#111315_76%)] opacity-90 shadow-[0_12px_20px_rgba(0,0,0,0.22)] rotate-[28deg]" />
        <div className="absolute left-[40%] bottom-[22%] h-[18%] w-[18%] rounded-[0.85rem] bg-[radial-gradient(circle_at_50%_38%,#4d5258,#111315_76%)] opacity-95 shadow-[0_12px_20px_rgba(0,0,0,0.22)] -rotate-[18deg]" />
        <div className="absolute inset-[9%] rounded-full border border-white/18 animate-[pulseRing_2.6s_ease-out_infinite]" />
        <div className="absolute inset-[2%] rounded-full border border-white/10" />
      </div>
    );
  }

  return (
    <div className="relative mx-auto h-[128px] w-[128px] sm:h-[148px] sm:w-[148px]">
      <div className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.95),rgba(219,243,255,0.92)_32%,rgba(70,173,255,0.42)_64%,rgba(20,27,36,0.08)_100%)] shadow-[0_0_60px_rgba(31,169,255,0.35)]" />
      <div className="absolute inset-[28%] rounded-full border border-white/20 bg-[radial-gradient(circle_at_65%_40%,rgba(255,255,255,0.9),rgba(232,236,241,0.75)_45%,rgba(10,16,28,0.08)_100%)] animate-[spin_10s_linear_infinite]" />
      <div className="absolute left-[31%] top-[27%] h-[17%] w-[17%] rounded-[0.7rem] bg-[#151515] opacity-85 shadow-[0_6px_16px_rgba(0,0,0,0.22)] rotate-[18deg]" />
      <div className="absolute right-[28%] top-[40%] h-[15%] w-[15%] rounded-[0.6rem] bg-[#1e1e1e] opacity-80 shadow-[0_6px_16px_rgba(0,0,0,0.22)] rotate-[28deg]" />
      <div className="absolute left-[39%] bottom-[24%] h-[15%] w-[15%] rounded-[0.6rem] bg-[#121212] opacity-80 shadow-[0_6px_16px_rgba(0,0,0,0.22)] -rotate-[18deg]" />
      <div className="absolute left-[5%] top-[18%] h-12 w-12 rounded-[1rem] border border-[#4af287]/30 bg-[#59f479]/18 backdrop-blur-sm animate-[floatY_5s_ease-in-out_infinite]" />
      <div className="absolute right-[2%] top-[14%] h-16 w-16 rotate-[22deg] rounded-[1.3rem] border border-[#4cc8ff]/30 bg-[#38bdf8]/18 backdrop-blur-sm animate-[floatY_4.5s_ease-in-out_infinite_0.6s]" />
      <div className="absolute bottom-[18%] left-[10%] h-10 w-10 rounded-full border border-[#36ffb2]/35 bg-[#1df2a0]/16 blur-[1px]" />
      <div className="absolute bottom-[8%] right-[14%] h-12 w-12 rounded-full border border-[#5ac8ff]/30 bg-[#22d3ee]/18 blur-[1px]" />
      <div
        className={`absolute inset-[8%] rounded-full border ${isSuccess ? "border-[#3ee28c]/45" : "border-[#3ec4ff]/30"} animate-[pulseRing_2.6s_ease-out_infinite]`}
      />
      <div
        className={`absolute inset-[2%] rounded-full border ${isSuccess ? "border-[#5dffad]/18" : "border-white/10"}`}
      />
    </div>
  );
}

function PaymentSuccessCard({
  txHash,
  amount,
}: {
  txHash: string;
  amount: string;
}) {
  return (
    <div className="rounded-[1.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(19,23,34,0.94),rgba(12,14,22,0.96))] p-3.5 shadow-[0_18px_40px_rgba(0,0,0,0.32)] backdrop-blur-xl">
      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-[#48d98d]/30 bg-[#44e08a]/12 text-[#5df2a5]">
        <Check size={18} />
      </div>
      <h3 className="mt-2.5 text-center text-[1.02rem] font-bold text-white">
        Payment Successful!
      </h3>
      <p className="mt-1.5 text-center text-[0.82rem] leading-5 text-white/68">
        Enjoy the matches. Your ticket unlocks after the smart contract confirms on-chain.
      </p>
      <div className="mt-3 rounded-[1rem] border border-white/8 bg-white/[0.03] px-3.5 py-3 text-[0.82rem] text-white/70">
        <div className="flex items-center justify-between">
          <span>Paid</span>
          <span className="font-semibold text-white">{amount}</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span>Status</span>
          <span className="font-semibold text-[#53eb9b]">Confirmed</span>
        </div>
        <div className="mt-2 flex items-center justify-between gap-3">
          <span className="shrink-0">Tx</span>
          <span className="truncate font-mono text-[0.78rem] text-white/82">{txHash}</span>
        </div>
      </div>
      <div className="mt-3.5 h-[3px] overflow-hidden rounded-full bg-white/8">
        <div className="h-full w-3/4 rounded-full bg-[linear-gradient(90deg,#2f9bff,#44e18d)]" />
      </div>
    </div>
  );
}

export default function CryptoPaymentDrawer({
  event,
  isOpen,
  onClose,
}: CryptoPaymentDrawerProps) {
  const [selectedAsset, setSelectedAsset] = useState(paymentAssets[0]);
  const [walletConnected, setWalletConnected] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setSelectedAsset(paymentAssets[0]);
    setWalletConnected(false);
    setIsProcessingPayment(false);
    setPaymentComplete(false);
  }, [event, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isProcessingPayment) {
      return;
    }

    const timer = window.setTimeout(() => {
      setIsProcessingPayment(false);
      setPaymentComplete(true);
    }, 1900);

    return () => {
      window.clearTimeout(timer);
    };
  }, [isProcessingPayment]);

  const checkoutAmount = useMemo(() => {
    if (!event) {
      return "0.00 USDT";
    }

    return `${formatCryptoAmount(event.minPrice, 1)} ${selectedAsset.symbol}`;
  }, [event, selectedAsset.symbol]);

  const usdLabel = event ? formatUsdAmount(event.minPrice) : formatUsdAmount(0);
  const walletAddress = "0x7A3...9f2B";
  const transactionHash = "0x91bd...58af";
  const handleAssetChange = (nextKey: string) => {
    const nextAsset = paymentAssets.find((asset) => asset.key === nextKey);
    if (nextAsset) {
      setSelectedAsset(nextAsset);
    }
  };
  const checkoutTitle = event
    ? event.homeTeam === "TBD" && event.awayTeam === "TBD"
      ? `${event.round} Match`
      : `${event.homeTeam} vs ${event.awayTeam}`
    : "World Cup ticket";
  const checkoutSubtitle = event
    ? `${event.date} • ${event.city}, ${event.state} • ${event.stadium}`
    : "World Cup 2026 fixture";

  if (!event) {
    return null;
  }

  const canPay = walletConnected && !isProcessingPayment && !paymentComplete;
  const statusTitle = paymentComplete
    ? "Payment Successful"
    : walletConnected
      ? `${selectedAsset.network} Connected`
      : "Connect Wallet";

  return (
    <div
      className={`fixed inset-0 z-[90] transition-opacity duration-300 ${
        isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        aria-label="Close crypto payment drawer"
        className="absolute inset-0 bg-[rgba(3,8,16,0.62)] backdrop-blur-[2px]"
        onClick={onClose}
      />

      <aside
        className={`absolute inset-x-0 bottom-0 max-h-[85vh] w-full overflow-y-auto rounded-t-[1.7rem] border-t border-white/10 bg-[#05070d]/92 shadow-[0_-24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-transform duration-500 ease-out md:inset-y-0 md:left-auto md:right-0 md:top-0 md:max-h-none md:h-full md:max-w-[460px] md:rounded-none md:border-l md:border-t-0 md:shadow-[-24px_0_80px_rgba(0,0,0,0.35)] ${
          isOpen ? "translate-y-0 md:translate-x-0" : "translate-y-full md:translate-y-0 md:translate-x-full"
        }`}
      >
        <div
          className="absolute inset-0 opacity-70"
          style={{ backgroundImage: `url(${heroBackground})`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,13,0.82),rgba(5,7,13,0.97))]" />

        <div className="relative min-h-full px-4 py-3.5 md:px-5 md:py-5">
          <div className="mb-3 flex items-center justify-between md:mb-4">
            <div>
              <p className="text-[0.82rem] font-semibold uppercase tracking-[0.22em] text-[#59f1a1]">
                Crypto Checkout
              </p>
              <h2 className="mt-1 text-[1.2rem] font-bold text-white md:mt-1.5 md:text-[1.5rem]">
                Pay for tickets
              </h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/72 transition hover:bg-white/10 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          <section className="rounded-[1.35rem] border border-[#ddd6c8] bg-[linear-gradient(180deg,#f6f1e7,#ece4d7)] p-3 shadow-[0_20px_60px_rgba(0,0,0,0.24)] backdrop-blur-xl md:rounded-[1.45rem] md:p-5">
            <div className="hidden items-center gap-4 md:flex">
              <div>
                <h3 className="text-[1.15rem] font-bold text-[#17130d]">Pay for tickets</h3>
                <p className="mt-1 text-[0.8rem] text-[#6b604f]">Secure • Fast • Seamless</p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[1rem] border border-white/8 bg-[linear-gradient(135deg,rgba(20,24,35,0.96),rgba(9,12,20,0.98))] p-2.5 shadow-[0_18px_36px_rgba(0,0,0,0.26)] md:mt-4 md:rounded-[1.1rem] md:p-3">
              <div
                className="pointer-events-none absolute inset-0 opacity-48"
                style={{ backgroundImage: `url(${heroBackground})`, backgroundSize: "cover", backgroundPosition: "center" }}
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(9,14,28,0.66),rgba(5,8,16,0.8))]" />
              <div className="pointer-events-none absolute -right-8 top-1 h-20 w-20 rounded-full bg-[#1f2e52]/40 blur-2xl" />
              <div className="pointer-events-none absolute bottom-0 left-12 h-16 w-16 rounded-full bg-[#16324a]/30 blur-2xl" />
              <div className="pointer-events-none absolute left-[38%] top-2 h-12 w-24 rounded-full border border-white/8 bg-white/[0.03] blur-sm" />
              <div className="relative flex items-stretch gap-2.5 md:gap-3.5">
                <div className="flex h-[74px] w-[66px] shrink-0 items-center justify-center overflow-hidden rounded-[0.88rem] bg-white shadow-[0_14px_24px_rgba(35,22,7,0.12)] md:h-[82px] md:w-[76px] md:rounded-[0.95rem]">
                  <div className="flex h-full w-full flex-col justify-between bg-[linear-gradient(180deg,#fcfbf8,#eee7da)] px-3 py-2.5 text-[#18110b]">
                    <p className="text-[0.64rem] font-bold uppercase tracking-[0.12em] text-[#b88b48]">
                      World Cup 2026
                    </p>
                    <p className="text-[0.78rem] font-black leading-[0.9] tracking-[-0.03em] text-[#1f1711] md:text-[0.88rem]">
                      {event.round.toUpperCase()}
                    </p>
                    <div className="h-[2px] w-full rounded-full bg-[linear-gradient(90deg,#b7842d,#e1c37d,#8c5f17)] opacity-85" />
                  </div>
                </div>

                <div className="min-w-0 flex-1 self-stretch">
                  <div className="flex h-[74px] flex-col justify-between md:h-[82px]">
                    <div>
                      <h4 className="text-[0.9rem] font-bold leading-tight text-white md:text-[1.02rem]">
                        {checkoutTitle}
                      </h4>
                      <p className="mt-1 line-clamp-2 text-[0.72rem] leading-4 text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.45)] md:text-[0.8rem] md:leading-5">
                        {checkoutSubtitle}
                      </p>
                    </div>
                    <div>
                      <div className="flex flex-wrap items-end gap-x-1.5 gap-y-1 md:gap-x-2">
                        <p className="text-[0.95rem] font-bold leading-none text-white md:text-[1.42rem]">
                          {checkoutAmount}
                        </p>
                        <p className="text-[0.72rem] leading-none text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.45)] md:text-[0.8rem]">
                          ≈ {usdLabel}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mt-4 hidden overflow-hidden rounded-[1.15rem] border border-white/8 bg-[linear-gradient(180deg,rgba(18,22,32,0.95),rgba(9,12,19,0.98))] px-3 py-4 md:block">
              <div
                className="pointer-events-none absolute inset-0 opacity-28"
                style={{ backgroundImage: `url(${heroBackground})`, backgroundSize: "cover", backgroundPosition: "center" }}
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(13,18,31,0.74),rgba(8,11,18,0.9))]" />
              <div className="relative text-center">
                <StatusOrb isSuccess={paymentComplete} />
                {paymentComplete ? (
                  <div className="mt-3">
                    <PaymentSuccessCard txHash={transactionHash} amount={checkoutAmount} />
                  </div>
                ) : (
                  <div className="mt-2 text-center">
                    <p className="text-[0.95rem] font-semibold text-white">
                      {isProcessingPayment ? "Broadcasting transaction..." : `Ready with ${selectedAsset.symbol} on ${selectedAsset.chainCode}`}
                    </p>
                    <p className="mt-1 text-[0.82rem] leading-5 text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.55)]">
                      {isProcessingPayment
                        ? "Waiting for validator confirmations and final ticket mint."
                        : "Select a chain, connect a wallet, and confirm payment to lock the ticket."}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 hidden md:block">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-white/82">Pay with</p>
                <span className="text-xs text-white/60">{paymentAssets.length} chains</span>
              </div>
              <div className="mt-3 grid gap-2.5">
                {paymentAssets.map((asset) => {
                  const isActive = asset.key === selectedAsset.key;

                  return (
                    <button
                      key={asset.key}
                      type="button"
                      onClick={() => handleAssetChange(asset.key)}
                      className={`flex w-full items-center justify-between rounded-[0.95rem] border px-3 py-2.5 text-left transition ${
                        isActive
                          ? "border-[#45d78c]/45 bg-[linear-gradient(180deg,rgba(26,126,85,0.22),rgba(16,23,30,0.4))]"
                          : "border-white/8 bg-white/[0.03] hover:bg-white/[0.06]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${asset.iconBg} text-sm font-black text-white shadow-[0_10px_20px_rgba(0,0,0,0.2)]`}
                        >
                          {asset.icon}
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-semibold text-white">
                              {asset.symbol} on {asset.chainCode}
                            </span>
                            {asset.recommended ? (
                              <span className="rounded-full border border-[#5cf5a6]/20 bg-[#44df8b]/12 px-2 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-[#63f5ac]">
                                Recommended
                              </span>
                            ) : null}
                          </div>
                          <p className="mt-0.5 text-xs text-white/42">
                            {asset.network} • {asset.balance}
                          </p>
                        </div>
                      </div>
                      <ChevronRight size={18} className="text-white/38" />
                    </button>
                  );
                })}
              </div>
            </div>

            <section className="mt-3 rounded-[1rem] border border-white/10 bg-[linear-gradient(180deg,rgba(23,27,38,0.94),rgba(12,15,23,0.96))] p-3 md:mt-4 md:rounded-[1.15rem] md:p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-[0.98rem] font-bold text-white md:text-[1.05rem]">{statusTitle}</h3>
                  <div className="mt-2 h-[3px] w-12 rounded-full bg-[linear-gradient(90deg,#2f9bff,#43dc8a)] md:w-14" />
                </div>
                <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[#2fb8ff]/20 bg-[radial-gradient(circle_at_50%_50%,rgba(55,172,255,0.24),rgba(36,45,73,0.35))] text-[#66dbff] shadow-[0_0_40px_rgba(34,167,255,0.2)] md:h-12 md:w-12">
                  <Wallet size={18} />
                  {walletConnected || paymentComplete ? (
                    <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#3ee28c] text-[#08110d] shadow-[0_8px_18px_rgba(62,226,140,0.38)]">
                      <Check size={14} />
                    </span>
                  ) : null}
                </div>
              </div>

              <p className="mt-3 text-[0.82rem] leading-5 text-[#dbe2ee] drop-shadow-[0_1px_1px_rgba(0,0,0,0.45)]">
                {walletConnected || paymentComplete
                  ? walletAddress
                  : "Connect a wallet and pay with USDT on your preferred chain."}
              </p>

              <div className="mt-3 space-y-2.5 rounded-[1rem] border border-white/10 bg-white/[0.05] p-3 text-[0.82rem]">
                <div className="md:hidden">
                  <label htmlFor="mobile-network" className="text-[0.75rem] font-medium text-[#c7cfdd]">
                    Network
                  </label>
                  <select
                    id="mobile-network"
                    value={selectedAsset.key}
                    onChange={(event) => handleAssetChange(event.target.value)}
                    className="mt-2 w-full rounded-[0.85rem] border border-white/12 bg-[#1c2230] px-3 py-2.5 text-sm font-medium text-[#edf2fb] outline-none transition focus:border-[#4ecf98]"
                  >
                    {paymentAssets.map((asset) => (
                      <option key={asset.key} value={asset.key}>
                        {asset.network} ({asset.chainCode})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="hidden items-center justify-between gap-3 md:flex">
                  <span className="text-[#c7cfdd]">Network</span>
                  <div className="flex items-center gap-3 text-white">
                    <span className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${selectedAsset.iconBg} text-xs font-black`}>
                      {selectedAsset.icon}
                    </span>
                    <span>{selectedAsset.network}</span>
                    <span className="h-2.5 w-2.5 rounded-full bg-[#43df8c]" />
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[#c7cfdd]">Balance</span>
                  <div className="text-right">
                    <p className="font-semibold text-white">{selectedAsset.balance}</p>
                    <p className="mt-1 text-xs text-[#b8c2d3]">Preferred stablecoin route</p>
                  </div>
                </div>
              </div>

              {!walletConnected ? (
                <button
                  type="button"
                  onClick={() => setWalletConnected(true)}
                  className="mt-4 flex w-full items-center justify-center rounded-[1rem] bg-[linear-gradient(90deg,#2f9bff,#43dc8a)] px-5 py-3 text-[0.92rem] font-bold text-white shadow-[0_16px_36px_rgba(44,160,255,0.28)] transition hover:brightness-105 md:py-3.5 md:text-[0.95rem]"
                >
                  Connect Wallet
                </button>
              ) : paymentComplete ? (
                <button
                  type="button"
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-[1rem] bg-[linear-gradient(90deg,#2f9bff,#43dc8a)] px-5 py-3 text-[0.92rem] font-bold text-white shadow-[0_16px_36px_rgba(44,160,255,0.28)] transition hover:brightness-105 md:py-3.5 md:text-[0.95rem]"
                >
                  View Transaction
                  <ArrowUpRight size={18} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    if (canPay) {
                      setIsProcessingPayment(true);
                    }
                  }}
                  disabled={!canPay}
                  className={`mt-4 flex w-full items-center justify-center rounded-[1rem] px-5 py-3 text-[0.92rem] font-bold text-white transition md:py-3.5 md:text-[0.95rem] ${
                    canPay
                      ? "bg-[linear-gradient(90deg,#2f9bff,#43dc8a)] shadow-[0_16px_36px_rgba(44,160,255,0.28)] hover:brightness-105"
                      : "cursor-not-allowed bg-white/10 text-white/38"
                  }`}
                >
                  {isProcessingPayment ? "Confirming payment..." : `Pay ${checkoutAmount}`}
                </button>
              )}

              <div className="mt-3 flex items-center justify-center gap-2 text-[0.8rem] text-[#c4ccd8]">
                <Shield size={15} />
                <span>Secured by smart contract</span>
              </div>
            </section>
          </section>
        </div>
      </aside>
    </div>
  );
}
