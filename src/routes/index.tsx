import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, type FormEvent } from "react";
import {
  ArrowRight,
  Award,
  BriefcaseBusiness,
  CakeSlice,
  Check,
  ChefHat,
  Clock3,
  Code2,
  Facebook,
  GraduationCap,
  Languages,
  MapPin,
  Menu,
  MessageCircle,
  Palette,
  Search,
  Sparkles,
  Star,
  UsersRound,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import heroAsset from "@/assets/iyf-hero.jpg.asset.json";
import informatiqueAsset from "@/assets/iyf-informatique.jpg.asset.json";
import patisserieAsset from "@/assets/iyf-patisserie.jpg.asset.json";
import languesAsset from "@/assets/iyf-langues.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IYF Treichville | Centre de formation à Abidjan" },
      {
        name: "description",
        content:
          "Formations pratiques à Abidjan en informatique, pâtisserie, langues et entrepreneuriat avec IYF Treichville.",
      },
      { property: "og:title", content: "IYF Treichville | Formez votre avenir" },
      {
        property: "og:description",
        content: "Des formations concrètes, des formateurs experts et un accompagnement vers l'emploi.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const poles = [
  {
    title: "Informatique",
    detail: "Bureautique, Développement Web, Graphisme",
    icon: Code2,
    tone: "blue",
  },
  {
    title: "Pâtisserie & Cuisine",
    detail: "Techniques professionnelles et mise en pratique",
    icon: CakeSlice,
    tone: "orange",
  },
  {
    title: "Langues étrangères",
    detail: "Coréen, Anglais et Chinois",
    icon: Languages,
    tone: "pink",
  },
  {
    title: "Formations courtes",
    detail: "Décoration et Entrepreneuriat",
    icon: Palette,
    tone: "green",
  },
] as const;

const navItems = ["Accueil", "Formations", "À propos", "Galerie", "Témoignages", "Contact"];

function Logo() {
  return (
    <a href="#accueil" className="flex shrink-0 items-center gap-2.5" aria-label="IYF Treichville, accueil">
      <span className="grid size-10 place-items-center rounded-xl bg-primary text-lg font-black text-primary-foreground shadow-brand">
        IYF
      </span>
      <span className="leading-tight">
        <strong className="block font-display text-base text-primary">IYF Treichville</strong>
        <span className="block text-[10px] font-bold uppercase text-muted-foreground">Formation • Avenir</span>
      </span>
    </a>
  );
}

function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
      <p className="mb-3 text-xs font-extrabold uppercase text-primary">{eyebrow}</p>
      <h2 className="font-display text-3xl font-extrabold text-foreground sm:text-4xl">{title}</h2>
      {copy ? <p className="mt-4 text-base leading-7 text-muted-foreground">{copy}</p> : null}
    </div>
  );
}

function Index() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [training, setTraining] = useState("");
  const [message, setMessage] = useState("");
  const [formError, setFormError] = useState("");

  const filteredPoles = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("fr");
    if (!query) return poles;
    return poles.filter((pole) => `${pole.title} ${pole.detail}`.toLocaleLowerCase("fr").includes(query));
  }, [search]);

  const submitWhatsApp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanName = name.trim();
    const cleanPhone = phone.trim();
    const cleanTraining = training.trim();
    if (cleanName.length < 2 || cleanName.length > 80) {
      setFormError("Veuillez saisir un nom valide.");
      return;
    }
    if (!/^[+0-9 ()-]{8,20}$/.test(cleanPhone)) {
      setFormError("Veuillez saisir un numéro de téléphone valide.");
      return;
    }
    if (!cleanTraining) {
      setFormError("Veuillez choisir une formation.");
      return;
    }
    setFormError("");
    const text = [
      "Bonjour IYF Treichville, je souhaite m'inscrire.",
      `Nom : ${cleanName}`,
      `Téléphone : ${cleanPhone}`,
      `Formation : ${cleanTraining}`,
      message.trim() ? `Message : ${message.trim().slice(0, 500)}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <main id="accueil" className="overflow-x-hidden bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur-xl">
        <div className="mx-auto grid h-18 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 lg:flex lg:justify-between lg:px-8">
          <Logo />
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Navigation principale">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item === "À propos" ? "apropos" : item.toLocaleLowerCase("fr")}`}
                className="text-sm font-semibold text-foreground/75 transition-colors hover:text-primary"
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="hidden lg:block">
            <Button asChild size="lg" className="rounded-xl font-bold shadow-brand">
              <a href="#inscription">S'inscrire <ArrowRight /></a>
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-xl lg:hidden"
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((value) => !value)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </Button>
        </div>
        {mobileOpen ? (
          <nav className="border-t border-border bg-background px-5 py-5 lg:hidden" aria-label="Navigation mobile">
            <div className="mx-auto grid max-w-7xl gap-1">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item === "À propos" ? "apropos" : item.toLocaleLowerCase("fr")}`}
                  className="rounded-lg px-3 py-3 text-sm font-bold hover:bg-muted"
                  onClick={() => setMobileOpen(false)}
                >
                  {item}
                </a>
              ))}
              <Button asChild className="mt-3 h-11 rounded-xl">
                <a href="#inscription" onClick={() => setMobileOpen(false)}>S'inscrire</a>
              </Button>
            </div>
          </nav>
        ) : null}
      </header>

      <section className="relative min-h-[720px] pt-18" aria-labelledby="hero-title">
        <img
          src={heroAsset.url}
          alt="Jeunes étudiants ivoiriens sur le campus de formation"
          className="absolute inset-0 h-full w-full object-cover object-[64%_center]"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative mx-auto flex min-h-[648px] max-w-7xl items-center px-5 py-16 lg:px-8">
          <div className="max-w-2xl text-primary-foreground">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary/50 px-4 py-2 text-sm font-bold backdrop-blur-md">
              <Sparkles className="size-4 text-secondary" /> Votre talent mérite une vraie chance
            </div>
            <h1 id="hero-title" className="font-display text-4xl font-black leading-[1.08] sm:text-5xl lg:text-7xl">
              Formez-vous à votre passion, <span className="text-secondary">construisez votre avenir</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-primary-foreground/85 sm:text-lg">
              Des formations concrètes, accessibles et tournées vers l'emploi au cœur de Treichville.
            </p>
            <form
              className="mt-9 grid max-w-xl grid-cols-[minmax(0,1fr)_auto] rounded-2xl bg-background p-2 shadow-hero"
              onSubmit={(event) => {
                event.preventDefault();
                document.querySelector("#formations")?.scrollIntoView({ behavior: "smooth" });
              }}
              role="search"
            >
              <label className="flex min-w-0 items-center gap-3 px-3">
                <Search className="size-5 shrink-0 text-primary" />
                <Input
                  value={search}
                  onChange={(event) => setSearch(event.target.value.slice(0, 80))}
                  className="h-12 border-0 bg-transparent px-0 text-foreground shadow-none focus-visible:ring-0"
                  placeholder="Quelle formation recherchez-vous ?"
                  aria-label="Rechercher une formation"
                />
              </label>
              <Button type="submit" size="lg" className="h-12 rounded-xl px-4 sm:px-7">
                <span className="hidden sm:inline">Rechercher</span><Search className="sm:hidden" />
              </Button>
            </form>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold text-primary-foreground/90">
              <span className="flex items-center gap-2"><Check className="size-4 text-secondary" /> 80 % de pratique</span>
              <span className="flex items-center gap-2"><Check className="size-4 text-secondary" /> Certificat de fin de formation</span>
            </div>
          </div>
        </div>
      </section>

      <section id="formations" className="scroll-mt-20 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading eyebrow="Apprendre. Pratiquer. Réussir." title="Nos pôles de formation" copy="Choisissez la voie qui vous ressemble et développez des compétences immédiatement utiles." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filteredPoles.map((pole) => {
              const Icon = pole.icon;
              return (
                <article key={pole.title} className={`group pole-card pole-${pole.tone}`}>
                  <div className="pole-icon"><Icon className="size-7" /></div>
                  <h3 className="mt-8 font-display text-xl font-extrabold">{pole.title}</h3>
                  <p className="mt-3 min-h-12 text-sm leading-6 text-muted-foreground">{pole.detail}</p>
                  <a href="#inscription" className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-primary">
                    Découvrir <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </article>
              );
            })}
          </div>
          {filteredPoles.length === 0 ? (
            <p className="rounded-2xl bg-muted p-8 text-center font-semibold text-muted-foreground">Aucune formation ne correspond à cette recherche. Essayez « web », « coréen » ou « cuisine ».</p>
          ) : null}
        </div>
      </section>

      <section id="apropos" className="scroll-mt-20 bg-primary py-20 text-primary-foreground sm:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-extrabold uppercase text-secondary">L'excellence par la pratique</p>
              <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">Pourquoi choisir IYF Treichville ?</h2>
              <p className="mt-5 max-w-lg leading-7 text-primary-foreground/75">Nous formons des talents capables de passer de l'idée au geste, puis du geste à une vraie opportunité professionnelle.</p>
              <div className="mt-8 flex items-end gap-3"><strong className="font-display text-6xl text-secondary">80%</strong><span className="pb-2 text-sm font-bold">de pratique<br />dans nos parcours</span></div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                [UsersRound, "Formateurs experts", "Des professionnels qui partagent leur expérience du terrain."],
                [Award, "Certificat reconnu", "Une validation claire des compétences acquises."],
                [ChefHat, "Apprentissage concret", "Ateliers, projets et mises en situation dès le départ."],
                [BriefcaseBusiness, "Accompagnement emploi", "Conseils, posture professionnelle et préparation à l'insertion."],
              ].map(([Icon, title, copy]) => (
                <article key={String(title)} className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/8 p-6">
                  <Icon className="size-7 text-secondary" />
                  <h3 className="mt-5 font-display text-lg font-bold">{String(title)}</h3>
                  <p className="mt-2 text-sm leading-6 text-primary-foreground/70">{String(copy)}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="galerie" className="scroll-mt-20 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading eyebrow="La formation en action" title="Au cœur de nos ateliers" copy="Des espaces où l'on expérimente, échange et progresse ensemble." />
          <div className="grid gap-4 md:grid-cols-12 md:grid-rows-2">
            <figure className="gallery-item md:col-span-7 md:row-span-2">
              <img src={informatiqueAsset.url} alt="Atelier informatique avec un formateur" loading="lazy" width={1408} height={1056} />
              <figcaption>Informatique <span>Créer avec le numérique</span></figcaption>
            </figure>
            <figure className="gallery-item md:col-span-5">
              <img src={patisserieAsset.url} alt="Étudiantes en atelier de pâtisserie" loading="lazy" width={1408} height={1056} />
              <figcaption>Pâtisserie <span>Maîtriser les bons gestes</span></figcaption>
            </figure>
            <figure className="gallery-item md:col-span-5">
              <img src={languesAsset.url} alt="Cours de coréen interactif" loading="lazy" width={1408} height={1056} />
              <figcaption>Coréen <span>S'ouvrir au monde</span></figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section id="témoignages" className="scroll-mt-20 bg-muted py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading eyebrow="Ils ont osé se lancer" title="La parole à nos apprenants" />
          <div className="grid gap-5 md:grid-cols-3">
            {[
              [informatiqueAsset.url, "Grâce aux projets pratiques, j'ai créé mon premier site et je peux aujourd'hui présenter un vrai portfolio.", "Aïcha K.", "Développement web"],
              [patisserieAsset.url, "J'ai appris les bases professionnelles et surtout gagné la confiance nécessaire pour vendre mes créations.", "Grâce A.", "Pâtisserie"],
              [languesAsset.url, "Les cours sont vivants et accessibles. Je progresse à l'oral chaque semaine dans une ambiance motivante.", "Mariam D.", "Coréen"],
            ].map(([image, quote, student, course], index) => (
              <article key={student} className="rounded-2xl border border-border bg-card p-7 shadow-soft">
                <div className="flex gap-1 text-secondary" aria-label="5 étoiles">{Array.from({ length: 5 }).map((_, star) => <Star key={star} className="size-4 fill-current" />)}</div>
                <blockquote className="mt-5 text-base leading-7 text-card-foreground">« {quote} »</blockquote>
                <div className="mt-7 flex items-center gap-3">
                  <img src={image} alt={`Portrait de ${student}`} loading="lazy" className={`size-12 rounded-full object-cover ${index === 1 ? "object-left" : "object-center"}`} width={96} height={96} />
                  <div><strong className="block text-sm">{student}</strong><span className="text-xs text-muted-foreground">{course}</span></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid overflow-hidden rounded-3xl bg-primary text-primary-foreground lg:grid-cols-[0.9fr_1.1fr]">
            <div className="p-8 sm:p-12">
              <p className="text-xs font-extrabold uppercase text-secondary">Prochaine rentrée</p>
              <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">Votre nouvelle compétence commence ici.</h2>
              <div className="mt-8 flex items-center gap-4 rounded-2xl bg-primary-foreground/10 p-5">
                <Clock3 className="size-8 shrink-0 text-secondary" />
                <div><strong className="block text-lg">Admissions ouvertes</strong><span className="text-sm text-primary-foreground/70">La date exacte sera confirmée lors de l'inscription.</span></div>
              </div>
            </div>
            <div className="bg-secondary p-8 text-secondary-foreground sm:p-12">
              <p className="text-xs font-extrabold uppercase">Tarifs accessibles</p>
              <div className="mt-3 flex items-baseline gap-2"><strong className="font-display text-5xl font-black">Sur devis</strong></div>
              <p className="mt-4 max-w-md leading-7 text-secondary-foreground/75">Le tarif dépend du parcours et de sa durée. Écrivez-nous pour recevoir le programme, le calendrier et les modalités de paiement.</p>
              <Button asChild size="lg" className="mt-8 h-12 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
                <a href="#inscription">Demander les informations <ArrowRight /></a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="inscription" className="scroll-mt-20 bg-accent py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-xs font-extrabold uppercase text-accent-foreground/70">Inscription rapide</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-accent-foreground sm:text-4xl">Parlez-nous de votre projet.</h2>
            <p className="mt-5 max-w-md leading-7 text-accent-foreground/75">Remplissez le formulaire. Votre message sera préparé pour WhatsApp afin que notre équipe puisse vous orienter.</p>
            <div className="mt-8 flex items-center gap-3 text-sm font-bold text-accent-foreground"><MessageCircle className="size-5" /> Réponse personnalisée sur WhatsApp</div>
          </div>
          <form onSubmit={submitWhatsApp} className="grid gap-5 rounded-2xl bg-card p-6 shadow-soft sm:grid-cols-2 sm:p-8" noValidate>
            <label className="grid gap-2 text-sm font-bold">Nom complet
              <Input value={name} onChange={(event) => setName(event.target.value)} maxLength={80} placeholder="Votre nom" className="h-12" autoComplete="name" required />
            </label>
            <label className="grid gap-2 text-sm font-bold">Téléphone
              <Input value={phone} onChange={(event) => setPhone(event.target.value)} maxLength={20} placeholder="Ex. +225 07 00 00 00 00" className="h-12" inputMode="tel" autoComplete="tel" required />
            </label>
            <label className="grid gap-2 text-sm font-bold sm:col-span-2">Formation souhaitée
              <select value={training} onChange={(event) => setTraining(event.target.value)} className="h-12 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring" required>
                <option value="">Choisissez une formation</option>
                <option>Informatique — Bureautique</option><option>Informatique — Développement Web</option><option>Informatique — Graphisme</option>
                <option>Pâtisserie & Cuisine Professionnelle</option><option>Coréen</option><option>Anglais</option><option>Chinois</option><option>Décoration</option><option>Entrepreneuriat</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-bold sm:col-span-2">Votre message <span className="font-normal text-muted-foreground">(facultatif)</span>
              <Textarea value={message} onChange={(event) => setMessage(event.target.value)} maxLength={500} placeholder="Précisez vos disponibilités ou vos questions…" className="min-h-28 resize-none" />
            </label>
            {formError ? <p className="text-sm font-semibold text-destructive sm:col-span-2" role="alert">{formError}</p> : null}
            <Button type="submit" size="lg" className="h-12 rounded-xl font-bold sm:col-span-2"><MessageCircle /> Continuer sur WhatsApp</Button>
          </form>
        </div>
      </section>

      <footer id="contact" className="scroll-mt-20 bg-footer py-14 text-footer-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-3 lg:px-8">
          <div><Logo /><p className="mt-5 max-w-xs text-sm leading-6 text-footer-foreground/65">Former les talents d'aujourd'hui pour construire les réussites de demain.</p></div>
          <div><h2 className="font-display text-base font-bold">Nous trouver</h2><p className="mt-4 flex items-start gap-3 text-sm text-footer-foreground/70"><MapPin className="mt-0.5 size-4 shrink-0 text-secondary" /> Treichville, Abidjan<br />Côte d'Ivoire</p></div>
          <div><h2 className="font-display text-base font-bold">Restons connectés</h2><div className="mt-4 flex gap-3"><a href="#inscription" className="social-link" aria-label="Nous contacter sur WhatsApp"><MessageCircle /></a><a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className="social-link" aria-label="Facebook IYF Treichville"><Facebook /></a></div></div>
        </div>
        <div className="mx-auto mt-12 max-w-7xl border-t border-footer-foreground/10 px-5 pt-6 text-xs text-footer-foreground/45 lg:px-8">© 2026 IYF Treichville. Tous droits réservés.</div>
      </footer>
    </main>
  );
}