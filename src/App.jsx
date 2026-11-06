import { useState, useRef, useEffect } from 'react';
import { Sparkles, Utensils, Search, ChevronRight, Info, Filter, X, MapPin, Flame, ChevronUp } from 'lucide-react';

// --- BASE DE DATOS DE TACOS (ACTUALIZADA) ---
const tacoData = [
  { 
    id: 'taco-al-pastor', 
    name: 'Tacos al Pastor', 
    origin: 'Ciudad de México, México', 
    category: 'Cerdo', 
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=800&q=80', 
    heat: 'Medio', 
    famousPlaces: 'El Vilsito, El Tizoncito (CDMX)', 
    ingredients: 'Carne de cerdo marinada en achiote y chiles, piña, cilantro, cebolla y tortilla de maíz.',
    history: 'Derivado del shawarma árabe traído por inmigrantes libaneses a Puebla y adaptado con ingredientes mexicanos en la CDMX.'
  },
  { 
    id: 'taco-asada', 
    name: 'Tacos de Carne Asada', 
    origin: 'Sonora, México', 
    category: 'Res', 
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80', 
    heat: 'Suave', 
    famousPlaces: 'Hermosillo, Sonora y Monterrey, Nuevo León', 
    ingredients: 'Falda o bistec de res a la parrilla, guacamole, frijoles charros, cebollita asada y salsa molcajeteada.',
    history: 'Tradición norteña por excelencia, centrada en la calidad de la carne de res de libre pastoreo y el fuego de leña de mezquite.'
  },
  { 
    id: 'taco-birria', 
    name: 'Tacos de Birria (Quesabirria)', 
    origin: 'Jalisco, México', 
    category: 'Res / Chivo', 
    image: 'https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?auto=format&fit=crop&w=800&q=80', 
    heat: 'Picante', 
    famousPlaces: 'Mercado San Juan de Dios (Guadalajara), Tijuana', 
    ingredients: 'Carne de res o chivo cocinada a fuego lento en consomé de chiles secos, queso Oaxaca, cilantro y limón con caldo para chochlear.',
    history: 'Originaria de Jalisco como un método para cocinar carne de chivo con especias fuertes y neutralizar su fuerte sabor.'
  },
  { 
    id: 'taco-carnitas', 
    name: 'Tacos de Carnitas', 
    origin: 'Michoacán, México', 
    category: 'Cerdo', 
    image: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&w=800&q=80', 
    heat: 'Suave', 
    famousPlaces: 'Quiroga, Michoacán y CDMX', 
    ingredients: 'Maciza, cuerito, costilla y nana de cerdo confitadas lentamente en su propia manteca de cerdo con naranja y leche.',
    history: 'Nace en el estado de Michoacán tras la llegada del cerdo a América durante la época colonial española.'
  },
  { 
    id: 'taco-baja', 
    name: 'Tacos de Pescado (Baja Style)', 
    origin: 'Baja California, México', 
    category: 'Pescado / Mariscos', 
    // IMAGEN NUEVA Y FUNCIONAL AQUÍ [cite: 25]
    image: 'https://tse1.mm.bing.net/th/id/OIP.SndfXKoqaIXyISojYPWMXwHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', 
    heat: 'Suave', 
    famousPlaces: 'Ensenada y San Felipe, Baja California', 
    ingredients: 'Pescado rebozado en tempura frito crujiente, col blanca picada, crema agria o mayonesa de chipotle y pico de gallo.',
    history: 'Popularizado en los mercados callejeros de Ensenada en los años 50s, fusionando la técnica asiática de capeado con la pesca local.'
  },
  { 
    id: 'taco-barbacoa', 
    name: 'Tacos de Barbacoa', 
    origin: 'Hidalgo, México', 
    category: 'Borrego / Chivo', 
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80', 
    heat: 'Medio', 
    famousPlaces: 'Actopan, Hidalgo y Estado de México', 
    ingredients: 'Carne de borrego tierna cocinada al horno subterráneo en hoja de maguey, salsa borracha y consomé.',
    history: 'Técnica prehispánica adaptada con la introducción del ganado ovino por los españoles, cocinándose bajo tierra.'
  },
  { 
    id: 'taco-cochinita', 
    name: 'Tacos de Cochinita Pibil', 
    origin: 'Yucatán, México', 
    category: 'Cerdo', 
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80', 
    heat: 'Medio', 
    famousPlaces: 'Mérida y todo Yucatán', 
    ingredients: 'Carne de cerdo deshebrada marinada en recado rojo (achiote) y jugo de naranja agria, horneada bajo tierra y acompañada de cebolla morada con habanero.',
    history: 'Platillo emblemático de la cultura maya, originalmente elaborado con carne de jabalí o venado en un horno de tierra ("pib").'
  },
  { 
    id: 'taco-suadero', 
    name: 'Tacos de Suadero', 
    origin: 'Ciudad de México, México', 
    category: 'Cerdo / Res', 
    image: 'https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?auto=format&fit=crop&w=800&q=80', 
    heat: 'Medio', 
    famousPlaces: 'Taquerías de esquina tradicionales en la CDMX', 
    ingredients: 'Corte intermedio de res confitado en un comal especial redondo (olla) con aceite, manteca y jugos de carne, cebolla y cilantro.',
    history: 'Invención puramente urbana de las calles de la Ciudad de México, indispensable en la vida nocturna de los capitalinos.'
  }
];

const categories = ['Todas', 'Cerdo', 'Res', 'Pescado / Mariscos', 'Borrego / Chivo'];

// --- COMPONENTE DE CARTA CON TILT 3D Y POPOVER ---
const TacoCard = ({ taco, onClick }) => {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState('rotateX(0deg) rotateY(0deg)');
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`);
    setGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, opacity: 0.6 });
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlare(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div 
      className="relative w-full max-w-[300px] mx-auto group z-10 hover:z-40 cursor-pointer"
      onClick={() => onClick(taco)}
    >
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-transform duration-200 ease-out"
        style={{ transform }}
      >
        <div className="relative h-48 w-full overflow-hidden">
          <img src={taco.image} alt={taco.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-orange-400 border border-orange-500/30">
            {taco.category}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
        </div>

        <div className="p-5">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">{taco.name}</h3>
          <p className="text-xs text-zinc-400 flex items-center gap-1.5 mb-4">
            <MapPin size={14} className="text-orange-500 shrink-0" /> {taco.origin}
          </p>
          <button className="w-full py-2.5 bg-zinc-800 hover:bg-orange-600 text-white rounded-xl font-semibold text-xs transition-colors flex items-center justify-center gap-2 border border-white/5">
            Ver Receta e Ingredientes <ChevronRight size={14} />
          </button>
        </div>

        {/* Brillo holográfico */}
        <div 
          className="absolute inset-0 rounded-2xl pointer-events-none mix-blend-color-dodge transition-opacity duration-300"
          style={{ opacity: glare.opacity, background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 60%)` }}
        />
      </div>
    </div>
  );
};

// --- APLICACIÓN PRINCIPAL ---
export default function App() {
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentHero, setCurrentHero] = useState(0);
  const [isFiltersOpen, setIsFiltersOpen] = useState(true);
  const [activeModalTaco, setActiveModalTaco] = useState(null);

  // Datos del Hero
  const heroSlides = [
    {
      id: 1,
      title: "TACOS AL PASTOR",
      subtitle: "EL REY DE LAS CALLES DE MÉXICO",
      bgGradient: "radial-gradient(circle at 75% 50%, rgba(234,88,12,0.9) 0%, rgba(124,45,18,1) 40%, #050505 80%)",
      bgImage: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=1200&q=80",
      accent: "text-orange-400",
      buttonColor: "bg-orange-600 hover:bg-orange-500",
      glow: "shadow-[0_0_60px_rgba(234,88,12,0.7)]"
    },
    {
      id: 2,
      title: "CARNE ASADA",
      subtitle: "TRADICIÓN NORTEÑA AL CARBÓN",
      bgGradient: "radial-gradient(circle at 75% 50%, rgba(220,38,38,0.9) 0%, rgba(127,29,29,1) 40%, #050505 80%)",
      bgImage: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1200&q=80",
      accent: "text-red-400",
      buttonColor: "bg-red-600 hover:bg-red-500",
      glow: "shadow-[0_0_60px_rgba(220,38,38,0.7)]"
    },
    {
      id: 3,
      title: "QUESABIRRIAS",
      subtitle: "EL FENÓMENO DE JALISCO",
      bgGradient: "radial-gradient(circle at 75% 50%, rgba(202,138,4,0.9) 0%, rgba(113,63,18,1) 40%, #050505 80%)",
      bgImage: "https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?auto=format&fit=crop&w=1200&q=80",
      accent: "text-amber-400",
      buttonColor: "bg-amber-600 hover:bg-amber-500",
      glow: "shadow-[0_0_60px_rgba(202,138,4,0.7)]"
    }
  ];

  // Intervalo del Hero
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Bloquear scroll al abrir modal
  useEffect(() => {
    if (activeModalTaco) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [activeModalTaco]);

  const filteredTacos = tacoData.filter(t => {
    const matchesCategory = activeCategory === 'Todas' || t.category === activeCategory;
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || t.origin.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-orange-600 selection:text-white">
      
      <style dangerouslySetInnerHTML={{__html: `
        .hero-float { animation: float 6s ease-in-out infinite; }
        @keyframes float {
          0% { transform: translateY(0px) rotate(-1deg); }
          50% { transform: translateY(-12px) rotate(1deg); }
          100% { transform: translateY(0px) rotate(-1deg); }
        }
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-flex;
          min-width: 200%;
          animation: marquee 30s linear infinite;
        }
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}} />

      {/* TICKER SUPERIOR */}
      <div className="bg-orange-600 text-white py-2 w-full overflow-hidden border-b border-orange-500/30 font-bold text-xs tracking-wider">
        <div className="whitespace-nowrap animate-marquee flex items-center gap-12">
          <span className="flex items-center gap-2"><Flame size={14} /> ¡PATRIMONIO CULTURAL DE LA GASTRONOMÍA MEXICANA!</span>
          <span>•</span>
          <span>DESCUBRE LOS ORÍGENES Y SECRETOS DE CADA RECETA</span>
          <span>•</span>
          <span className="flex items-center gap-2"><Utensils size={14} /> EL ARTE DEL TACO TRADICIONAL</span>
          <span>•</span>
          <span>INGREDIENTES, HISTORIA Y LUGARES FAMOSOS</span>
        </div>
      </div>

      {/* HERO DINÁMICO */}
      <section className="relative w-full h-[75vh] min-h-[550px] overflow-hidden flex items-center bg-black">
        {heroSlides.map((slide, index) => (
          <div 
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentHero ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            <div 
              className="absolute inset-0 scale-105 transition-transform duration-[10000ms]"
              style={{ background: slide.bgGradient }}
            />
            <img 
              src={slide.bgImage} 
              alt="" 
              className="absolute right-0 top-1/2 -translate-y-1/2 w-[800px] h-full object-cover opacity-20 mix-blend-overlay blur-[2px] pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent w-full lg:w-2/3"></div>
          </div>
        ))}

        <div className="container mx-auto px-6 lg:px-16 relative z-20 h-full flex flex-col justify-center pt-10">
          <div className="max-w-2xl">
            <span className={`text-sm md:text-base font-bold tracking-[0.2em] mb-4 block ${heroSlides[currentHero].accent}`}>
              {heroSlides[currentHero].subtitle}
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-8 tracking-tighter" style={{ fontFamily: 'Impact, sans-serif' }}>
              {heroSlides[currentHero].title}
            </h1>
            <button 
              onClick={() => document.getElementById('menu-tacos').scrollIntoView({ behavior: 'smooth' })}
              className={`px-8 py-4 rounded-full text-white font-bold tracking-wide flex items-center gap-2 transition-all duration-300 hover:scale-105 ${heroSlides[currentHero].buttonColor} ${heroSlides[currentHero].glow}`}
            >
              <Utensils size={18} /> EXPLORAR TACOS <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Indicadores de carrusel */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {heroSlides.map((_, idx) => (
            <button 
              key={idx} 
              onClick={() => setCurrentHero(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${currentHero === idx ? 'bg-white w-8' : 'bg-white/30 w-2'}`}
            />
          ))}
        </div>
      </section>

      {/* SECCIÓN ACERCA DE */}
      <section className="bg-[#0a0a0a] border-b border-white/5 py-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Sparkles size={24} className="text-orange-500" />
              El Universo del Taco
            </h2>
            <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
              El taco no es solo un alimento, es un pilar de la identidad mexicana. Desde las técnicas prehispánicas hasta las adaptaciones urbanas modernas, cada variante cuenta una historia única de mestizaje, sabor y tradición. Explora nuestro archivo para conocer sus ingredientes, orígenes exactos y dónde probar los mejores.
            </p>
          </div>
          <div className="flex gap-4 opacity-80">
             <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center rotate-3">
                <Flame size={28} className="text-orange-500" />
             </div>
             <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center -rotate-3">
                <Utensils size={28} className="text-orange-500" />
             </div>
          </div>
        </div>
      </section>

      {/* FILTROS COLAPSIBLES */}
      <section id="menu-tacos" className="sticky top-0 z-40 bg-[#050505]/95 backdrop-blur-xl border-y border-white/10 shadow-2xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsFiltersOpen(!isFiltersOpen)}>
            <div className="flex items-center gap-3">
              <Filter size={20} className="text-orange-500" />
              <span className="font-bold text-white tracking-wide">Filtros por Tipo de Carne e Ingrediente</span>
            </div>
            <button className="p-2 bg-zinc-900 hover:bg-zinc-800 rounded-full transition-colors border border-white/10">
              {isFiltersOpen ? <ChevronUp size={18} className="text-zinc-400" /> : <ChevronRight size={18} className="text-zinc-400 rotate-90" />}
            </button>
          </div>

          <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isFiltersOpen ? 'max-h-[400px] mt-6 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-2">
              <div className="w-full lg:w-auto overflow-hidden">
                <span className="text-xs text-zinc-500 uppercase font-bold tracking-widest mb-3 block">Categoría de Taco</span>
                <div className="flex items-center gap-2 overflow-x-auto hide-scroll pb-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                        activeCategory === cat 
                          ? 'bg-orange-600 text-white shadow-[0_0_15px_rgba(234,88,12,0.4)]' 
                          : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-white/5'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative w-full lg:w-80 shrink-0">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input 
                  type="text"
                  placeholder="Buscar por nombre o lugar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/10 text-white text-sm rounded-full pl-12 pr-4 py-3 outline-none focus:border-orange-500 transition-all placeholder:text-zinc-600"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CUADRÍCULA DE TACOS */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="mb-10 flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Utensils size={24} className="text-orange-500" />
              Catálogo de Tacos Tradicionales
            </h2>
            <span className="text-sm text-zinc-500 bg-zinc-900 px-3 py-1 rounded-full">{filteredTacos.length} Variedades</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredTacos.length > 0 ? (
              filteredTacos.map((taco) => (
                <TacoCard key={taco.id} taco={taco} onClick={setActiveModalTaco} />
              ))
            ) : (
              <div className="col-span-full py-32 text-center">
                <Info size={32} className="text-zinc-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">No se encontraron resultados</h3>
                <p className="text-zinc-500">Intenta buscar con otra categoría o nombre.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* MODAL DE DETALLES PROFESIONAL */}
      {activeModalTaco && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md transition-opacity">
          <div className="absolute inset-0 cursor-pointer" onClick={() => setActiveModalTaco(null)} />
          <div className="relative z-10 flex flex-col md:flex-row bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-w-3xl w-full animate-[modalSlideUp_0.3s_ease-out]">
            <button 
              onClick={() => setActiveModalTaco(null)}
              className="absolute top-4 right-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full p-2 transition-colors z-20"
            >
              <X size={20} />
            </button>
            
            <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-black">
              <img src={activeModalTaco.image} alt={activeModalTaco.name} className="w-full h-full object-cover" />
            </div>

            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between bg-gradient-to-br from-zinc-900 to-black">
              <div>
                <span className="text-orange-400 font-semibold tracking-wider text-xs uppercase bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20 inline-block mb-3">
                  {activeModalTaco.category}
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight">
                  {activeModalTaco.name}
                </h2>
                <p className="text-xs text-orange-400 font-medium flex items-center gap-1 mb-4">
                  <MapPin size={14} /> Creado en: {activeModalTaco.origin}
                </p>

                <div className="space-y-3 text-sm text-zinc-300">
                  <div>
                    <strong className="text-white block text-xs uppercase tracking-wider text-orange-500 mb-1">Ingredientes Principales:</strong>
                    <p className="text-zinc-400 text-xs leading-relaxed">{activeModalTaco.ingredients}</p>
                  </div>
                  <div>
                    <strong className="text-white block text-xs uppercase tracking-wider text-orange-500 mb-1">Historia y Origen:</strong>
                    <p className="text-zinc-400 text-xs leading-relaxed">{activeModalTaco.history}</p>
                  </div>
                  <div>
                    <strong className="text-white block text-xs uppercase tracking-wider text-orange-500 mb-1">Lugares Famosos:</strong>
                    <p className="text-zinc-400 text-xs leading-relaxed">{activeModalTaco.famousPlaces}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-zinc-900 bg-[#020202] py-12 text-center">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Utensils size={20} className="text-orange-500" />
            <span className="font-black text-2xl tracking-tighter text-white">Taquería<span className="text-orange-600">Vault</span></span>
          </div>
          <p className="text-zinc-600 text-sm max-w-md mx-auto">
             Enciclopedia digital interactiva dedicada a la cultura y tradición del taco mexicano.
          </p>
        </div>
      </footer>
    </div>
  );
}