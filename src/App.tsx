import { motion, AnimatePresence } from "motion/react";
import { 
  Utensils, 
  Clock, 
  MapPin, 
  Phone, 
  Instagram, 
  Facebook, 
  Menu as MenuIcon, 
  X, 
  Star,
  ChevronRight,
  Calendar,
  Users
} from "lucide-react";
import { useState, useEffect, FormEvent } from "react";

// --- Data ---

const FEATURED_DISHES = [
  {
    name: "Couscous Royal",
    description: "Semoule fine, légumes frais, agneau tendre et merguez grillées.",
    price: "22€",
    image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Salade Méchouia",
    description: "Poivrons et tomates grillés, ail, huile d'olive tunisienne et thon.",
    price: "12€",
    image: "https://carthagemagazine.com/wp-content/uploads/2020/10/Tunisian-Grilled-Salad-1170x1114.jpg"
  },
  {
    name: "Poulet aux Olives",
    description: "Tajine de poulet mijoté avec olives vertes, citrons confits et épices.",
    price: "18€",
    image: "https://vitoli.ca/wp-content/uploads/2020/09/tajine-poulet-scaled.jpg"
  }
];

const REVIEWS = [
  {
    name: "Valerie Putmans",
    comment: "Mais que Rachid est sympathique!!! (... et son épouse aussi) Dès la 1ère visite, on a l'impression de le connaître depuis toujours tant il nous met à l'aise avec beaucoup d'humour. Et bien sûr, il n'y a pas que ça: ambiance pittoresque, cuisine goûteuse (agneau et poulet se détachent des os comme rien, et leur goût est incroyable), vin tunisien fruité, desserts sucrés à souhait, et le thé à la menthe vient clôturer tout cela avec douceur.",
    rating: 5
  },
  {
    name: "Pauline Guimot",
    comment: "Incroyable expérience culinaire et humaine dans ce restaurant de spécialités Tunisienes fréquenté par beaucoup d'habitués. Le gérant est drôle, gentil, attentionné envers chaque client. Il prend le temps de discuter avec tout le monde et il y a peu d'établissements où on ressent une telle chaleur humaine. Très belles portions, même les gros mangeurs s'y retrouveront, et tout est très bon.",
    rating: 5
  },
  {
    name: "Terra Nova",
    comment: "Tout était excellent, le patron est super et très sympathique. Le couscous est copieux et gourmand. On ne sort pas du restaurant en ayant faim.",
    rating: 5
  }
];

const GALLERY_IMAGES = [
  "https://lh3.googleusercontent.com/gps-cs-s/AHVAweq0Nwj28hk0WHb7-aXHU8EvaotiDW-1hTdIAr2eO3zZOHTDo3ZBKEWaWRShw2XM9U2G0ROueGpE7yVvfRoXt_AFbcXkb_4Ip6R5V15TFhe0tjT_QAo5rQBoHEOsWVQXIqhpoopG=w640-h640-n-k-no",
  "https://lh3.googleusercontent.com/gps-cs-s/AHVAwerSc0KzLbNvY9GxQ4x-rp4pjYh1rM7fQ4o6nRjNdtZg4xZnUbX-75gG7Gyi-rdIIkH8Ithxqfcm1uhXEysxgIXygWXGA23EHTlF5d8SzBDwKqDySpFQvrfmYkxKXxR0WNAFraUD5g=w640-h640-n-k-no",
  "https://lh3.googleusercontent.com/gps-cs-s/AHVAweqypboTOA2jTbde6nrC1MJ0UzgkGn5xNVd8400411YSUOlTH6fQlNPgci-ycPSvlZGIOECjvcMIY7GjnZtC3Ha4YxU_xXt6dYsTkt0lFstPOivdOotcGvBpBajB08SG-DQkZMBrLQ=w640-h640-n-k-no",
  "https://lh3.googleusercontent.com/gps-cs-s/AHVAwere7nyMcgyIWZpQ50jgRi4iEvsZK6aCe9zCfHZBRhZPVVCtDvDFiJZzMOkSz5TYugICUCVg8aiw_iUzElp1zuEuSBc6K_PhIQdIOuRgFDQlgcHRgJKDhPaALY5lb3-_uW5iXwG-nw=w640-h640-n-k-no",
  "https://lh3.googleusercontent.com/gps-cs-s/AHVAweo93V1Htl1HTUU8YSDaKc1BmQ0hfQORulWanLiAGQoJjHZY9ixWaovLsPDG3N3cxfKvNgqzdzvahwgDHSDvpXmIz65Y4pDE2jg78-TlEXJmXSjvB_jqh3G6pgTeHNOWus1N8R0=w640-h640-n-k-no",
  "https://lh3.googleusercontent.com/gps-cs-s/AHVAwerG5aMQvuswrqAzICibjP9-DtzSckCzofQEHk5a9nouyJcp1CNNE2ZzyXVJ9haIbtjxtpjv9qwN1tjAeouQNt3NAv6j6kT3eRgSww6zBqCxain-5PeQFpyC8hAcVegb2eYNuh9xCA=w640-h640-n-k-no"
];

const MENU_CATEGORIES = [
  {
    title: "Entrées",
    items: [
      { name: "Brik à l'œuf", price: "7€", desc: "Feuille de brick croustillante, œuf, thon, persil." },
      { name: "Kaftaji", price: "9€", desc: "Légumes d'été frits et hachés, œuf, huile d'olive." },
      { name: "Salade Tunisienne", price: "8€", desc: "Tomates, concombres, oignons, menthe séchée." }
    ]
  },
  {
    title: "Plats Principaux",
    items: [
      { name: "Couscous Agneau", price: "20€", desc: "Agneau fondant, légumes de saison." },
      { name: "Tajine Tunisien", price: "15€", desc: "Omelette épaisse au four avec viande et fromage." },
      { name: "Poisson du Jour", price: "24€", desc: "Daurade ou Loup grillé à la tunisienne." }
    ]
  },
  {
    title: "Desserts & Boissons",
    items: [
      { name: "Pâtisseries Tunisiennes", price: "8€", desc: "Assortiment de douceurs au miel et amandes." },
      { name: "Thé à la menthe", price: "4€", desc: "Thé vert frais aux pignons de pin." },
      { name: "Vin Tunisien (Magon)", price: "28€", desc: "Rouge ou Rosé fruité." }
    ]
  }
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Accueil", href: "#home" },
    { name: "Menu", href: "#menu" },
    { name: "À Propos", href: "#about" },
    { name: "Galerie", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-charcoal/95 backdrop-blur-md py-4 shadow-lg border-b border-gold/20" : "bg-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="text-2xl font-display font-bold text-gold tracking-wider flex items-center gap-2">
          <Utensils className="w-6 h-6" />
          <span>LE LIVRE JAUNE</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm uppercase tracking-widest hover:text-gold transition-colors font-medium">
              {link.name}
            </a>
          ))}
          <a href="#reservation" className="bg-gold hover:bg-gold-light text-charcoal px-6 py-2 rounded-full text-sm font-bold transition-all transform hover:scale-105">
            Réserver
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-gold" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-charcoal border-b border-gold/20 p-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-lg font-medium hover:text-gold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#reservation" 
                className="bg-gold text-charcoal text-center py-3 rounded-lg font-bold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Réserver une table
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1550966841-3ee5ad60d0d9?q=80&w=1920&auto=format&fit=crop" 
          className="w-full h-full object-cover opacity-40"
          alt="Restaurant Interior"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/40 to-charcoal"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gold uppercase tracking-[0.3em] text-sm font-bold mb-4 block">Bienvenue chez Rachid</span>
          <h1 className="text-5xl md:text-8xl font-display text-white mb-6 leading-tight">
            Saveurs authentique <span className="text-gold italic">Belge</span> à Bruxelles
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Une fusion unique entre l'accueil chaleureux de la Belgique et la richesse culinaire de la Tunisie.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#reservation" className="bg-gold hover:bg-gold-light text-charcoal px-10 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2">
              <Calendar className="w-5 h-5" />
              Réserver une table
            </a>
            <a href="#menu" className="border-2 border-white/30 hover:border-gold text-white px-10 py-4 rounded-full font-bold text-lg transition-all backdrop-blur-sm flex items-center justify-center gap-2">
              <Utensils className="w-5 h-5" />
              Voir Menu
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gold opacity-50"
      >
        <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent mx-auto"></div>
      </motion.div>
    </section>
  );
};

const FeaturedDishes = () => {
  return (
    <section className="py-24 bg-charcoal">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display text-white mb-4">Nos Incontournables</h2>
          <div className="w-24 h-1 bg-gold mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {FEATURED_DISHES.map((dish, idx) => (
            <motion.div 
              key={dish.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="group bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-gold/50 transition-all"
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={dish.image} 
                  alt={dish.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-display text-gold">{dish.name}</h3>
                  <span className="text-white font-bold">{dish.price}</span>
                </div>
                <p className="text-gray-400 leading-relaxed">{dish.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-black/20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-gold font-bold tracking-widest uppercase text-sm mb-4 block">Notre Histoire</span>
          <h2 className="text-4xl md:text-5xl font-display text-white mb-8">Restaurant Le Livre Jaune <br/><span className="text-gold italic">Chez Rachid</span></h2>
          <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
            <p>
              Situé au cœur de Bruxelles, Le Livre Jaune est bien plus qu'un simple restaurant. C'est le rêve de Rachid, un passionné qui a voulu apporter la chaleur et les saveurs de sa Tunisie natale en Belgique.
            </p>
            <p>
              Ici, chaque plat raconte une histoire. Des tajines préparés avec soin (à commander à l'avance !) au couscous généreux, nous utilisons des ingrédients frais et des épices authentiques pour vous offrir un voyage sensoriel inoubliable.
            </p>
            <p className="italic text-gold">
              "On ne sort pas du restaurant en ayant faim, et on y revient pour l'humour et la gentillesse du patron."
            </p>
          </div>
          
          <div className="mt-10 grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-gold font-bold text-3xl mb-1">15+</h4>
              <p className="text-sm text-gray-400 uppercase tracking-wider">Années d'expérience</p>
            </div>
            <div>
              <h4 className="text-gold font-bold text-3xl mb-1">100%</h4>
              <p className="text-sm text-gray-400 uppercase tracking-wider">Authenticité</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-[4/5] rounded-2xl overflow-hidden border-2 border-gold/30">
            <img 
              src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=800&auto=format&fit=crop" 
              alt="Chef Rachid" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-8 -left-8 bg-gold p-8 rounded-2xl hidden lg:block">
            <p className="text-charcoal font-bold text-xl italic">"La cuisine est un langage universel de paix et de partage."</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const MenuSection = () => {
  return (
    <section id="menu" className="py-24 bg-charcoal">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display text-white mb-4">Notre Carte</h2>
          <p className="text-gray-400">Découvrez nos spécialités tunisiennes faites maison</p>
          <div className="w-24 h-1 bg-gold mx-auto mt-6"></div>
        </div>

        <div className="space-y-16">
          {MENU_CATEGORIES.map((cat) => (
            <div key={cat.title}>
              <h3 className="text-2xl font-display text-gold mb-8 border-b border-gold/20 pb-2 inline-block">{cat.title}</h3>
              <div className="grid gap-8">
                {cat.items.map((item) => (
                  <div key={item.name} className="flex justify-between items-end group">
                    <div className="flex-1">
                      <h4 className="text-xl text-white group-hover:text-gold transition-colors">{item.name}</h4>
                      <p className="text-sm text-gray-500 italic">{item.desc}</p>
                    </div>
                    <div className="flex-1 border-b border-dotted border-white/20 mx-4 mb-2"></div>
                    <span className="text-gold font-bold">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 p-8 bg-gold/5 border border-gold/20 rounded-2xl text-center">
          <p className="text-gray-300 italic">
            * Les Tajines sont à commander à l'avance pour garantir une qualité optimale.
          </p>
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  return (
    <section id="gallery" className="py-24 bg-black/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display text-white mb-4">Galerie</h2>
          <div className="w-24 h-1 bg-gold mx-auto"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {GALLERY_IMAGES.map((img, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ scale: 1.02 }}
              className="aspect-square rounded-xl overflow-hidden cursor-pointer"
            >
              <img 
                src={img} 
                alt={`Gallery ${idx}`} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section className="py-24 bg-charcoal overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display text-white mb-4">Ce que disent nos clients</h2>
          <div className="w-24 h-1 bg-gold mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {REVIEWS.map((review, idx) => (
            <motion.div 
              key={review.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="bg-white/5 p-8 rounded-2xl border border-white/10 relative"
            >
              <div className="flex text-gold mb-4">
                {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-gray-300 italic mb-6 leading-relaxed">"{review.comment}"</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center text-charcoal font-bold">
                  {review.name[0]}
                </div>
                <span className="text-white font-bold">{review.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ReservationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    guests: "2",
    phone: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="reservation" className="py-24 bg-black/40">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-charcoal p-8 md:p-12 rounded-3xl border border-gold/30 shadow-2xl">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-display text-white mb-4">Réserver une Table</h2>
            <p className="text-gray-400">Nous avons hâte de vous accueillir</p>
          </div>

          {submitted ? (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="bg-gold/20 border border-gold text-gold p-6 rounded-xl text-center"
            >
              Merci {formData.name} ! Votre demande de réservation pour le {formData.date} à {formData.time} a été envoyée. Nous vous contacterons bientôt.
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-gray-400 uppercase tracking-wider">Nom Complet</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold outline-none transition-all"
                  placeholder="Votre nom"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400 uppercase tracking-wider">Téléphone</label>
                <input 
                  type="tel" 
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold outline-none transition-all"
                  placeholder="Votre numéro"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400 uppercase tracking-wider">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold" />
                  <input 
                    type="date" 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white focus:border-gold outline-none transition-all"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400 uppercase tracking-wider">Heure</label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold" />
                  <select 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white focus:border-gold outline-none transition-all appearance-none"
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                  >
                    <option value="" className="bg-charcoal">Choisir l'heure</option>
                    <option value="12:00" className="bg-charcoal">12:00</option>
                    <option value="13:00" className="bg-charcoal">13:00</option>
                    <option value="18:30" className="bg-charcoal">18:30</option>
                    <option value="19:30" className="bg-charcoal">19:30</option>
                    <option value="20:30" className="bg-charcoal">20:30</option>
                    <option value="21:30" className="bg-charcoal">21:30</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm text-gray-400 uppercase tracking-wider">Nombre d'invités</label>
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold" />
                  <select 
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white focus:border-gold outline-none transition-all appearance-none"
                    value={formData.guests}
                    onChange={(e) => setFormData({...formData, guests: e.target.value})}
                  >
                    {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n} className="bg-charcoal">{n} Personnes</option>)}
                    <option value="9+" className="bg-charcoal">Plus de 8 personnes</option>
                  </select>
                </div>
              </div>
              <button 
                type="submit" 
                className="md:col-span-2 bg-gold hover:bg-gold-light text-charcoal py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02] mt-4"
              >
                Confirmer la Réservation
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-charcoal">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-4xl font-display text-white mb-8">Nous Trouver</h2>
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold shrink-0">
                <MapPin />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Adresse</h4>
                <p className="text-gray-400">Rue du Bailli 51, 1050 Ixelles, Belgique</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold shrink-0">
                <Phone />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Téléphone</h4>
                <p className="text-gray-400">+32475553725</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold shrink-0">
                <Clock />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Horaires</h4>
                <div className="text-gray-400 space-y-1">
                  <p>Lundi - Vendredi: 12:00–14:00, 18:00–22:30</p>
                  <p>Samedi: 18:00–22:30</p>
                  <p>Dimanche: Fermé</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex gap-4">
            <a href="#" className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-white hover:border-gold hover:text-gold transition-all">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-white hover:border-gold hover:text-gold transition-all">
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="h-[400px] rounded-3xl overflow-hidden border border-gold/20 grayscale hover:grayscale-0 transition-all duration-700">
          <iframe 
            src="https://maps.google.com/maps?q=Rue%20du%20Bailli%2051,%201050%20Ixelles,%20Belgique&t=&z=15&ie=UTF8&iwloc=&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black py-12 border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="text-2xl font-display font-bold text-gold mb-6">LE LIVRE JAUNE</div>
        <p className="text-gray-500 text-sm mb-8">
          © {new Date().getFullYear()} Belgique Taste - Le Livre Jaune Chez Rachid. Tous droits réservés.
        </p>
        <div className="flex justify-center gap-8 text-xs uppercase tracking-widest text-gray-600">
          <a href="#" className="hover:text-gold">Mentions Légales</a>
          <a href="#" className="hover:text-gold">Confidentialité</a>
          <a href="#" className="hover:text-gold">Cookies</a>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <FeaturedDishes />
      <About />
      <MenuSection />
      <Gallery />
      <Testimonials />
      <ReservationForm />
      <Contact />
      <Footer />
    </div>
  );
}
