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
  symbol: string;
  name: string;
  balance: string;
  iconBg: string;
  icon: string;
  recommended?: boolean;
};

const paymentAssets: PaymentAsset[] = [
  {
    symbol: "ETH",
    name: "Ethereum",
    balance: "0x7A3...9f2B",
    iconBg: "from-[#6173ff] to-[#9ab2ff]",
    icon: "◆",
    recommended: true,
  },
  {
    symbol: "USDC",
    name: "USDC",
    balance: "0x7A3...9f2B",
    iconBg: "from-[#1f86ff] to-[#61b6ff]",
    icon: "$",
  },
  {
    symbol: "USDT",
    name: "Tether",
    balance: "0x7A3...9f2B",
    iconBg: "from-[#22c58b] to-[#58e0ad]",
    icon: "T",
  },
  {
    symbol: "BNB",
    name: "BNB",
    balance: "0x7A3...9f2B",
    iconBg: "from-[#efb018] to-[#ffd15a]",
    icon: "◎",
  },
];

function formatCryptoAmount(usdAmount: number, rate: number) {
  return (usdAmount / rate).toFixed(3);
}

function formatUsdAmount(usdAmount: number) {
  return usdAmount.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });
}

function StatusOrb({ isSuccess }: { isSuccess: boolean }) {
  return (
    <div className="relative mx-auto h-[240px] w-[240px] sm:h-[280px] sm:w-[280px]">
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
    <div className="rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(19,23,34,0.94),rgba(12,14,22,0.96))] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#48d98d]/30 bg-[#44e08a]/12 text-[#5df2a5]">
        <Check size={22} />
      </div>
      <h3 className="mt-4 text-center text-[1.25rem] font-bold text-white">
        Payment Successful!
      </h3>
      <p className="mt-2 text-center text-sm leading-6 text-white/68">
        Enjoy the matches. Your ticket unlocks after the smart contract confirms on-chain.
      </p>
      <div className="mt-5 rounded-[1.15rem] border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-white/70">
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
      <div className="mt-5 h-[3px] overflow-hidden rounded-full bg-white/8">
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
      return "0.000 ETH";
    }

    const usdTotal = event.minPrice;
    const rate = selectedAsset.symbol === "ETH" ? 2925 : 1;
    return `${formatCryptoAmount(usdTotal, rate)} ${selectedAsset.symbol}`;
  }, [event, selectedAsset.symbol]);

  const usdLabel = event ? formatUsdAmount(event.minPrice) : formatUsdAmount(0);
  const walletAddress = "0x7A3...9f2B";
  const transactionHash = "0x91bd...58af";
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
      ? "Connect Wallet"
      : "Wallet Required";

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
        className={`absolute right-0 top-0 h-full w-full max-w-[1040px] transform overflow-y-auto border-l border-white/10 bg-[#05070d]/92 shadow-[-24px_0_80px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-transform duration-500 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div
          className="absolute inset-0 opacity-70"
          style={{ backgroundImage: `url(${heroBackground})`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,13,0.82),rgba(5,7,13,0.97))]" />

        <div className="relative min-h-full px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-[0.82rem] font-semibold uppercase tracking-[0.22em] text-[#59f1a1]">
                Crypto Checkout
              </p>
              <h2 className="mt-2 text-[1.55rem] font-bold text-white sm:text-[1.8rem]">
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

          <div className="grid gap-5 xl:grid-cols-[1.08fr_0.86fr]">
            <div className="grid gap-5 lg:grid-cols-[minmax(0,1.08fr)_minmax(260px,0.72fr)]">
              <section className="rounded-[1.9rem] border border-white/10 bg-[linear-gradient(180deg,rgba(25,29,40,0.92),rgba(12,15,23,0.95))] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.34)] backdrop-blur-xl sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-[1.5rem] font-bold text-white">Pay for tickets</h3>
                    <p className="mt-2 text-sm text-white/58">Secure • Fast • Seamless</p>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white/72 lg:flex"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="mt-6 flex gap-4 rounded-[1.35rem] border border-white/8 bg-white/[0.04] p-4">
                  <div className="flex h-[112px] w-[104px] shrink-0 items-center justify-center overflow-hidden rounded-[1.1rem] bg-white shadow-[0_18px_32px_rgba(0,0,0,0.24)]">
                    <div className="flex h-full w-full flex-col justify-between bg-[linear-gradient(180deg,#fbfaf7,#e7e2d8)] p-3 text-[#18110b]">
                      <p className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#b88b48]">
                        World Cup 2026
                      </p>
                      <p className="text-[1.45rem] font-black leading-none">
                        {event.round.toUpperCase()}
                      </p>
                      <div className="h-6 rounded-full bg-[radial-gradient(circle_at_50%_20%,#dbc77d,#9c6a1c_70%,#513311)]" />
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="text-[1.3rem] font-bold leading-tight text-white">
                      {checkoutTitle}
                    </h4>
                    <p className="mt-2 text-sm leading-6 text-white/58">{checkoutSubtitle}</p>
                    <div className="mt-4">
                      <p className="text-xs uppercase tracking-[0.16em] text-white/42">Total</p>
                      <p className="mt-2 text-[1.95rem] font-bold text-white">{checkoutAmount}</p>
                      <p className="mt-1 text-sm text-white/46">≈ {usdLabel} USD</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-sm font-semibold text-white/82">Pay with</p>
                  <div className="mt-3 space-y-3">
                    {paymentAssets.map((asset) => {
                      const isActive = asset.symbol === selectedAsset.symbol;

                      return (
                        <button
                          key={asset.symbol}
                          type="button"
                          onClick={() => setSelectedAsset(asset)}
                          className={`flex w-full items-center justify-between rounded-[1rem] border px-4 py-3 text-left transition ${
                            isActive
                              ? "border-[#45d78c]/45 bg-[linear-gradient(180deg,rgba(26,126,85,0.22),rgba(16,23,30,0.4))]"
                              : "border-white/8 bg-white/[0.03] hover:bg-white/[0.06]"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${asset.iconBg} text-base font-black text-white shadow-[0_10px_20px_rgba(0,0,0,0.2)]`}
                            >
                              {asset.icon}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-white">
                                  {asset.name} ({asset.symbol})
                                </span>
                                {asset.recommended ? (
                                  <span className="rounded-full border border-[#5cf5a6]/20 bg-[#44df8b]/12 px-2 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-[#63f5ac]">
                                    Recommended
                                  </span>
                                ) : null}
                              </div>
                              <p className="mt-1 text-xs text-white/42">{asset.balance}</p>
                            </div>
                          </div>
                          <ChevronRight size={18} className="text-white/38" />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (canPay) {
                      setIsProcessingPayment(true);
                    }
                  }}
                  disabled={!canPay}
                  className={`mt-6 flex w-full items-center justify-center rounded-[1rem] px-5 py-4 text-base font-bold text-white transition ${
                    canPay
                      ? "bg-[linear-gradient(90deg,#2f9bff,#43dc8a)] shadow-[0_16px_36px_rgba(44,160,255,0.28)] hover:brightness-105"
                      : "cursor-not-allowed bg-white/10 text-white/38"
                  }`}
                >
                  {paymentComplete
                    ? "Confirmed on-chain"
                    : isProcessingPayment
                      ? "Confirming payment..."
                      : `Pay ${checkoutAmount}`}
                </button>

                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-white/42">
                  <Shield size={15} />
                  <span>Secured by smart contract</span>
                </div>
              </section>

              <div className="space-y-5">
                <section className="relative overflow-hidden rounded-[1.9rem] border border-white/10 bg-[linear-gradient(180deg,rgba(18,22,32,0.95),rgba(9,12,19,0.98))] px-4 py-5 shadow-[0_20px_50px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:px-5">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(63,191,255,0.14),transparent_56%)]" />
                  <div className="relative">
                    <StatusOrb isSuccess={paymentComplete} />
                    {paymentComplete ? (
                      <div className="mt-2">
                        <PaymentSuccessCard txHash={transactionHash} amount={checkoutAmount} />
                      </div>
                    ) : (
                      <div className="mt-3 rounded-[1.45rem] border border-white/8 bg-white/[0.04] p-4 text-center">
                        <p className="text-lg font-bold text-white">
                          {isProcessingPayment ? "Broadcasting transaction..." : "Matchday checkout ready"}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-white/56">
                          {isProcessingPayment
                            ? "Waiting for validator confirmations and final ticket mint."
                            : "Connect a wallet and confirm the crypto payment to lock your ticket."}
                        </p>
                      </div>
                    )}
                  </div>
                </section>

                <section className="rounded-[1.9rem] border border-white/10 bg-[linear-gradient(180deg,rgba(25,29,40,0.92),rgba(12,15,23,0.95))] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.34)] backdrop-blur-xl sm:p-6">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-[1.5rem] font-bold text-white">{statusTitle}</h3>
                      <div className="mt-3 h-[3px] w-16 rounded-full bg-[linear-gradient(90deg,#2f9bff,#43dc8a)]" />
                    </div>
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white/72"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="mt-6 flex flex-col items-center text-center">
                    <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-[#2fb8ff]/20 bg-[radial-gradient(circle_at_50%_50%,rgba(55,172,255,0.24),rgba(36,45,73,0.35))] text-[#66dbff] shadow-[0_0_40px_rgba(34,167,255,0.2)]">
                      <Wallet size={42} />
                      {walletConnected || paymentComplete ? (
                        <span className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#3ee28c] text-[#08110d] shadow-[0_8px_18px_rgba(62,226,140,0.38)]">
                          <Check size={17} />
                        </span>
                      ) : null}
                    </div>

                    <h4 className="mt-5 text-[1.45rem] font-bold text-white">
                      {paymentComplete
                        ? "Wallet Connected"
                        : walletConnected
                          ? "Wallet Connected"
                          : "Connect your wallet"}
                    </h4>
                    <p className="mt-2 text-sm text-white/56">
                      {walletConnected || paymentComplete
                        ? walletAddress
                        : "Connect MetaMask, Coinbase Wallet, or WalletConnect to continue."}
                    </p>
                  </div>

                  <div className="mt-6 space-y-3 border-t border-white/8 pt-5 text-sm">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-white/50">Network</span>
                      <div className="flex items-center gap-3 text-white">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[linear-gradient(135deg,#7284ff,#a5b3ff)] text-xs font-black">
                          ◆
                        </span>
                        <span>Ethereum Mainnet</span>
                        <span className="h-2.5 w-2.5 rounded-full bg-[#43df8c]" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-white/50">Balance</span>
                      <div className="text-right">
                        <p className="font-semibold text-white">0.085 ETH</p>
                        <p className="mt-1 text-xs text-white/42">≈ $235.34 USD</p>
                      </div>
                    </div>
                  </div>

                  {!walletConnected ? (
                    <button
                      type="button"
                      onClick={() => setWalletConnected(true)}
                      className="mt-7 flex w-full items-center justify-center rounded-[1rem] bg-[linear-gradient(90deg,#2f9bff,#43dc8a)] px-5 py-4 text-base font-bold text-white shadow-[0_16px_36px_rgba(44,160,255,0.28)] transition hover:brightness-105"
                    >
                      Connect Wallet
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="mt-7 flex w-full items-center justify-center gap-2 rounded-[1rem] bg-[linear-gradient(90deg,#2f9bff,#43dc8a)] px-5 py-4 text-base font-bold text-white shadow-[0_16px_36px_rgba(44,160,255,0.28)] transition hover:brightness-105"
                    >
                      View Transaction
                      <ArrowUpRight size={18} />
                    </button>
                  )}

                  <div className="mt-5 flex items-center justify-center gap-2 text-xs text-white/42">
                    <Shield size={14} />
                    <span>Powered by Web3</span>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
