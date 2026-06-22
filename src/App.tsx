import { useCallback, useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WorldCupStages from "./components/WorldCupStages";
import Filters from "./components/Filters";
import EventList from "./components/EventList";
import HostCitiesSidebar, { HostCitiesList, TicketTrustPanel } from "./components/HostCitiesSidebar";
import WorldCupScheduleInfo from "./components/WorldCupScheduleInfo";
import StageHero from "./components/StageHero";
import CityHero from "./components/CityHero";
import TeamHero from "./components/TeamHero";
import VenueInfoCard from "./components/VenueInfoCard";
import CryptoPaymentDrawer from "./components/CryptoPaymentDrawer";
import AuthDialog, { type AccountProfile } from "./components/AuthDialog";
import Footer from "./components/Footer";
import { buildFilterOptions, fallbackEvents, type Event } from "./data/events";
import { eventMatchesHostCity, getHostCityByPath } from "./data/hostCities";
import { getWorldCupStageByPath, eventMatchesStage } from "./data/worldCupStages";
import { fetchWorldCupEvents, normalizeEventsForDisplay } from "./lib/worldCupEvents";
import { getTeamBySlug } from "./lib/teamMeta";

export default function App() {
  const [pathname, setPathname] = useState(() => window.location.pathname);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [selectedCity, setSelectedCity] = useState("Location");
  const [selectedDate, setSelectedDate] = useState("Date");
  const [selectedTeam, setSelectedTeam] = useState("Team");
  const [isLoading, setIsLoading] = useState(true);
  const [dataMessage, setDataMessage] = useState<string | null>(null);
  const [selectedCheckoutEvent, setSelectedCheckoutEvent] = useState<Event | null>(null);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [registeredAccounts, setRegisteredAccounts] = useState<AccountProfile[]>([]);
  const [signedInAccount, setSignedInAccount] = useState<AccountProfile | null>(null);

  useEffect(() => {
    try {
      const storedAccounts = window.localStorage.getItem("seatgeekcrypto.accounts");
      const storedSignedInAccount = window.localStorage.getItem("seatgeekcrypto.currentAccount");

      if (storedAccounts) {
        setRegisteredAccounts(JSON.parse(storedAccounts) as AccountProfile[]);
      }

      if (storedSignedInAccount) {
        setSignedInAccount(JSON.parse(storedSignedInAccount) as AccountProfile);
      }
    } catch {
      setRegisteredAccounts([]);
      setSignedInAccount(null);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("seatgeekcrypto.accounts", JSON.stringify(registeredAccounts));
  }, [registeredAccounts]);

  useEffect(() => {
    if (signedInAccount) {
      window.localStorage.setItem("seatgeekcrypto.currentAccount", JSON.stringify(signedInAccount));
      return;
    }

    window.localStorage.removeItem("seatgeekcrypto.currentAccount");
  }, [signedInAccount]);

  const navigateTo = useCallback(
    (nextPath: string) => {
      const [rawPathname, hashFragment] = nextPath.split("#");
      const resolvedPathname = rawPathname || "/";
      const destination = hashFragment ? `${resolvedPathname}#${hashFragment}` : resolvedPathname;

      window.history.pushState({}, "", destination);
      setPathname(resolvedPathname);

      if (hashFragment && resolvedPathname === "/" && pathname === "/") {
        requestAnimationFrame(() => {
          const targetElement = document.getElementById(hashFragment);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: "auto", block: "start" });
            return;
          }

          window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        });
        return;
      }

      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    },
    [pathname]
  );

  const openCheckoutDrawer = useCallback((event: Event) => {
    setSelectedCheckoutEvent(event);
  }, []);

  const closeCheckoutDrawer = useCallback(() => {
    setSelectedCheckoutEvent(null);
  }, []);

  const openAuthDialog = useCallback(() => {
    setIsAuthDialogOpen(true);
  }, []);

  const closeAuthDialog = useCallback(() => {
    setIsAuthDialogOpen(false);
  }, []);

  const handleSignIn = useCallback((account: AccountProfile) => {
    setSignedInAccount(account);
    setIsAuthDialogOpen(false);
  }, []);

  const handleRegister = useCallback((account: AccountProfile) => {
    setRegisteredAccounts((current) => {
      const nextAccounts = current.filter((entry) => entry.email.toLowerCase() !== account.email.toLowerCase());
      return [...nextAccounts, account];
    });
    setSignedInAccount(account);
    setIsAuthDialogOpen(false);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
    let isCancelled = false;

    async function loadEvents() {
      setIsLoading(true);
      try {
        const payload = await fetchWorldCupEvents();

        if (isCancelled) {
          return;
        }

        setAllEvents(normalizeEventsForDisplay(payload.events));
        setDataMessage(payload.message ?? null);
      } catch (error) {
        if (isCancelled) {
          return;
        }
        setAllEvents(fallbackEvents);
        setDataMessage(
          "Showing the built-in schedule for now because the live World Cup 2026 feed could not be loaded."
        );
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadEvents();

    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    if (pathname !== "/" || isLoading || !window.location.hash) {
      return;
    }

    const targetId = window.location.hash.slice(1);
    const targetElement = document.getElementById(targetId);

    if (!targetElement) {
      return;
    }

    requestAnimationFrame(() => {
      targetElement.scrollIntoView({ behavior: "auto", block: "start" });
    });
  }, [pathname, isLoading]);

  useEffect(() => {
    setSelectedCheckoutEvent(null);
  }, [pathname]);

  const filterOptions = useMemo(() => buildFilterOptions(allEvents), [allEvents]);
  const currentStage = useMemo(() => getWorldCupStageByPath(pathname), [pathname]);
  const currentCity = useMemo(() => getHostCityByPath(pathname), [pathname]);
  const knownTeams = useMemo(() => {
    return Array.from(
      new Set(
        [...allEvents, ...fallbackEvents]
          .flatMap((event) => [event.homeTeam, event.awayTeam])
          .filter((team): team is string => Boolean(team?.trim()))
          .filter((team) => team !== "TBD")
      )
    );
  }, [allEvents]);
  const currentTeam = useMemo(() => {
    if (!pathname.startsWith("/teams/")) {
      return undefined;
    }

    const slug = pathname.replace(/^\/teams\//, "").replace(/\/$/, "");
    return getTeamBySlug(slug, knownTeams);
  }, [knownTeams, pathname]);

  const filtered = useMemo(() => {
    let result = [...allEvents];

    if (selectedCity !== "Location") {
      result = result.filter(
        (e) => `${e.city}, ${e.state}` === selectedCity
      );
    }

    if (selectedDate !== "Date") {
      result = result.filter((e) => e.date === selectedDate);
    }

    if (selectedTeam !== "Team") {
      result = result.filter(
        (e) => e.homeTeam === selectedTeam || e.awayTeam === selectedTeam
      );
    }

    result.sort((a, b) => {
      if (a.kickoffUtc && b.kickoffUtc) {
        return a.kickoffUtc.localeCompare(b.kickoffUtc);
      }

      return a.id - b.id;
    });

    return result;
  }, [allEvents, selectedCity, selectedDate, selectedTeam]);

  const stageEvents = useMemo(() => {
    if (!currentStage) {
      return [];
    }

    return allEvents.filter((event) =>
      eventMatchesStage(currentStage, {
        round: event.round,
        groupLetter: event.groupLetter,
      })
    );
  }, [allEvents, currentStage]);

  const cityEvents = useMemo(() => {
    if (!currentCity) {
      return [];
    }

    return allEvents.filter((event) => eventMatchesHostCity(currentCity, event));
  }, [allEvents, currentCity]);

  const teamEvents = useMemo(() => {
    if (!currentTeam) {
      return [];
    }

    return allEvents
      .filter((event) => event.homeTeam === currentTeam || event.awayTeam === currentTeam)
      .sort((a, b) => {
        if (a.kickoffUtc && b.kickoffUtc) {
          return a.kickoffUtc.localeCompare(b.kickoffUtc);
        }

        return a.id - b.id;
      });
  }, [allEvents, currentTeam]);

  if (currentTeam) {
    return (
      <div className="min-h-screen bg-[var(--theme-background-color-secondary)]">
        <Navbar onNavigate={navigateTo} onOpenAuth={openAuthDialog} signedInAccount={signedInAccount} />
        <TeamHero team={currentTeam} />

        <div className="mx-auto max-w-7xl px-5 py-8 md:px-12 md:py-10 lg:px-16 xl:px-20">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            <section className="w-full max-w-[760px] flex-1">
              <h2 className="text-[2rem] font-bold tracking-tight text-[var(--theme-text-color-primary)] md:text-[2.15rem]">
                {currentTeam} National Football Team games
              </h2>
              {dataMessage && (
                <p className="mt-4 rounded-2xl border border-[var(--theme-border-color-primary)] bg-[var(--theme-background-color-primary)] px-4 py-3 text-sm text-[var(--theme-text-color-secondary)]">
                  {dataMessage}
                </p>
              )}
              <div className="mt-6">
                {isLoading ? (
                  <div className="rounded-[1.5rem] border border-[var(--theme-divider-color)] bg-[var(--theme-background-color-primary)]/70 px-4 py-10 text-sm text-[var(--theme-text-color-secondary)]">
                    Loading the latest fixtures...
                  </div>
                ) : (
                  <EventList events={teamEvents} onPurchase={openCheckoutDrawer} />
                )}
              </div>
            </section>

            {!isLoading ? (
              <div className="hidden lg:block lg:w-[300px] lg:shrink-0">
                <TicketTrustPanel bordered={false} />
              </div>
            ) : null}
          </div>

          {!isLoading ? (
            <>
              <div className="mt-10">
                <WorldCupStages onNavigate={navigateTo} embedded />
              </div>
              <div id="world-cup-cities" className="mt-10 scroll-mt-28">
                <HostCitiesList variant="grid" onNavigate={navigateTo} />
              </div>
              <WorldCupScheduleInfo onNavigate={navigateTo} />
            </>
          ) : null}
        </div>

        <Footer />
        <CryptoPaymentDrawer
          event={selectedCheckoutEvent}
          isOpen={Boolean(selectedCheckoutEvent)}
          onClose={closeCheckoutDrawer}
        />
        <AuthDialog
          isOpen={isAuthDialogOpen}
          registeredAccounts={registeredAccounts}
          onClose={closeAuthDialog}
          onSignIn={handleSignIn}
          onRegister={handleRegister}
        />
      </div>
    );
  }

  if (currentCity) {
    return (
      <div className="min-h-screen bg-[var(--theme-background-color-secondary)]">
        <Navbar onNavigate={navigateTo} onOpenAuth={openAuthDialog} signedInAccount={signedInAccount} />
        <CityHero city={currentCity} />

        <div className="mx-auto max-w-7xl px-7 py-8 md:px-16 md:py-10 lg:px-20 xl:px-24">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            <section className="w-full max-w-[760px] flex-1">
              <h2 className="text-[2rem] font-bold tracking-tight text-[var(--theme-text-color-primary)] md:text-[2.15rem]">
                World Cup games in {currentCity.heroName}
              </h2>
              {dataMessage && (
                <p className="mt-4 rounded-2xl border border-[var(--theme-border-color-primary)] bg-[var(--theme-background-color-primary)] px-4 py-3 text-sm text-[var(--theme-text-color-secondary)]">
                  {dataMessage}
                </p>
              )}
              <div className="mt-6">
                {isLoading ? (
                  <div className="rounded-[1.5rem] border border-[var(--theme-divider-color)] bg-[var(--theme-background-color-primary)]/70 px-4 py-10 text-sm text-[var(--theme-text-color-secondary)]">
                    Loading the latest fixtures...
                  </div>
                ) : (
                  <EventList events={cityEvents} onPurchase={openCheckoutDrawer} />
                )}
              </div>
            </section>

            {!isLoading ? (
              <div className="space-y-4 lg:w-[320px] lg:shrink-0">
                <VenueInfoCard city={currentCity} />
                <TicketTrustPanel bordered={false} />
              </div>
            ) : null}
          </div>

          {!isLoading ? (
            <>
              <div className="mt-10">
                <WorldCupStages onNavigate={navigateTo} embedded />
              </div>
              <div id="world-cup-cities" className="mt-10 scroll-mt-28">
                <HostCitiesList variant="grid" onNavigate={navigateTo} />
              </div>
              <WorldCupScheduleInfo onNavigate={navigateTo} />
            </>
          ) : null}
        </div>

        <Footer />
        <CryptoPaymentDrawer
          event={selectedCheckoutEvent}
          isOpen={Boolean(selectedCheckoutEvent)}
          onClose={closeCheckoutDrawer}
        />
        <AuthDialog
          isOpen={isAuthDialogOpen}
          registeredAccounts={registeredAccounts}
          onClose={closeAuthDialog}
          onSignIn={handleSignIn}
          onRegister={handleRegister}
        />
      </div>
    );
  }

  if (currentStage) {
    return (
      <div className="min-h-screen bg-[var(--theme-background-color-secondary)]">
        <Navbar onNavigate={navigateTo} onOpenAuth={openAuthDialog} signedInAccount={signedInAccount} />
        <StageHero stage={currentStage} />

        <div className="mx-auto max-w-7xl px-5 py-8 md:px-12 md:py-10 lg:px-16 xl:px-20">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            <section className="w-full max-w-[760px] flex-1">
              <h2 className="text-[2rem] font-bold tracking-tight text-[var(--theme-text-color-primary)] md:text-[2.15rem]">
                {currentStage.scheduleTitle}
              </h2>
              {dataMessage && (
                <p className="mt-4 rounded-2xl border border-[var(--theme-border-color-primary)] bg-[var(--theme-background-color-primary)] px-4 py-3 text-sm text-[var(--theme-text-color-secondary)]">
                  {dataMessage}
                </p>
              )}
              <div className="mt-6">
                {isLoading ? (
                  <div className="rounded-[1.5rem] border border-[var(--theme-divider-color)] bg-[var(--theme-background-color-primary)]/70 px-4 py-10 text-sm text-[var(--theme-text-color-secondary)]">
                    Loading the latest fixtures...
                  </div>
                ) : (
                  <EventList events={stageEvents} onPurchase={openCheckoutDrawer} />
                )}
              </div>
            </section>

            {!isLoading ? (
              <div className="lg:w-[300px] lg:shrink-0">
                <TicketTrustPanel bordered={false} />
              </div>
            ) : null}
          </div>

          {!isLoading ? (
            <>
              <div className="mt-10">
                <WorldCupStages onNavigate={navigateTo} embedded />
              </div>
              <div id="world-cup-cities" className="mt-10 scroll-mt-28">
                <HostCitiesList variant="grid" onNavigate={navigateTo} />
              </div>
              <WorldCupScheduleInfo onNavigate={navigateTo} />
            </>
          ) : null}
        </div>

        <Footer />
        <CryptoPaymentDrawer
          event={selectedCheckoutEvent}
          isOpen={Boolean(selectedCheckoutEvent)}
          onClose={closeCheckoutDrawer}
        />
        <AuthDialog
          isOpen={isAuthDialogOpen}
          registeredAccounts={registeredAccounts}
          onClose={closeAuthDialog}
          onSignIn={handleSignIn}
          onRegister={handleRegister}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--theme-background-color-secondary)]">
      <Navbar onNavigate={navigateTo} onOpenAuth={openAuthDialog} signedInAccount={signedInAccount} />
      <Hero
        events={allEvents.length > 0 ? allEvents : fallbackEvents}
        onNavigate={navigateTo}
      />
      <WorldCupStages onNavigate={navigateTo} />

      <div className="mx-auto max-w-7xl px-5 py-8 md:px-12 md:py-10 lg:px-16 xl:px-20">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <section className="world-cup-event-list w-full max-w-[760px] flex-1">
            <h2 className="text-[2rem] font-bold tracking-tight text-[var(--theme-text-color-primary)] md:text-[2.15rem]">
              World Cup 2026 schedule
            </h2>
            {isLoading && (
              <p className="text-sm text-[var(--theme-text-color-secondary)]">
                Loading the latest World Cup fixtures...
              </p>
            )}
            {dataMessage && (
              <p className="rounded-2xl border border-[var(--theme-border-color-primary)] bg-[var(--theme-background-color-primary)] px-4 py-3 text-sm text-[var(--theme-text-color-secondary)]">
                {dataMessage}
              </p>
            )}
            <Filters
              selectedCity={selectedCity}
              selectedDate={selectedDate}
              selectedTeam={selectedTeam}
              cities={filterOptions.cities}
              dates={filterOptions.dates}
              teams={filterOptions.teams}
              onCityChange={setSelectedCity}
              onDateChange={setSelectedDate}
              onTeamChange={setSelectedTeam}
            />
            {isLoading ? (
              <div className="rounded-[1.5rem] border border-[var(--theme-divider-color)] bg-[var(--theme-background-color-primary)]/70 px-4 py-10 text-sm text-[var(--theme-text-color-secondary)]">
                Loading the latest fixtures...
              </div>
            ) : (
              <EventList events={filtered} onPurchase={openCheckoutDrawer} />
            )}
          </section>

          <div id="world-cup-cities" className="scroll-mt-28">
            <div className="lg:hidden">
              <HostCitiesSidebar onNavigate={navigateTo} />
            </div>

            <div className="hidden w-[300px] shrink-0 lg:block">
              <HostCitiesSidebar onNavigate={navigateTo} />
            </div>
          </div>
        </div>

        {!isLoading ? <WorldCupScheduleInfo onNavigate={navigateTo} /> : null}
      </div>
      <Footer />
      <CryptoPaymentDrawer
        event={selectedCheckoutEvent}
        isOpen={Boolean(selectedCheckoutEvent)}
        onClose={closeCheckoutDrawer}
      />
      <AuthDialog
        isOpen={isAuthDialogOpen}
        registeredAccounts={registeredAccounts}
        onClose={closeAuthDialog}
        onSignIn={handleSignIn}
        onRegister={handleRegister}
      />
    </div>
  );
}
