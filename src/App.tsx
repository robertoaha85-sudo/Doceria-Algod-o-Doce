import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Star, Heart, CheckCircle2, MapPin, Instagram, X, ChevronRight } from 'lucide-react';

// --- Configuration ---
const WHATSAPP_LINK = "https://api.whatsapp.com/message/QVU7O3PMZBI2G1?autoload=1&app_absent=0&utm_source=ig";
const INSTAGRAM_LINK = "https://www.instagram.com/doceriaalgodaodoce/";

const IMAGES = {
  hero: "https://i.imgur.com/oMdkt25.png",
  wedding: [
    "https://i.imgur.com/IRObBnQ.png",
    "https://i.imgur.com/0RHRCtj.png",
    "https://i.imgur.com/LrlvZJl.png",
    "https://i.imgur.com/jUY9f3h.png",
    "https://i.imgur.com/kXxiCF7.png",
    "https://i.imgur.com/O5xnWqZ.png",
    "https://i.imgur.com/urJFs0Q.png",
  ],
  easter: [
    "https://i.imgur.com/ypu4Ssc.png",
    "https://i.imgur.com/mfjxTSF.png",
    "https://i.imgur.com/MWWH8bs.png",
  ],
  carts: [
    "https://i.imgur.com/F5NIEfN.png",
    "https://i.imgur.com/b85Jkyp.png",
    "https://i.imgur.com/UB2GGE1.png",
  ]
};

// --- Components ---

const Button = ({ children, className = "", variant = "primary", ...props }: any) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg";
  const variants = {
    primary: "bg-chocolate text-cream hover:bg-opacity-90 hover:shadow-xl",
    secondary: "bg-pastel-pink text-chocolate hover:bg-opacity-90",
    outline: "border-2 border-chocolate text-chocolate hover:bg-chocolate hover:text-cream"
  };

  return (
    <a 
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseStyles} ${variants[variant as keyof typeof variants]} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
};

const SectionTitle = ({ title, subtitle, centered = true }: { title: string, subtitle?: string, centered?: boolean }) => (
  <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
    <h2 className="font-serif text-3xl md:text-4xl text-chocolate mb-3 font-bold">
      {title}
    </h2>
    {subtitle && (
      <div className="flex items-center justify-center gap-2">
        <span className="h-[1px] w-8 bg-chocolate/30"></span>
        <p className="text-chocolate/70 font-sans uppercase tracking-widest text-xs md:text-sm">
          {subtitle}
        </p>
        <span className="h-[1px] w-8 bg-chocolate/30"></span>
      </div>
    )}
  </div>
);

const ImageModal = ({ src, isOpen, onClose }: { src: string, isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <button className="absolute top-4 right-4 text-white p-2">
          <X size={32} />
        </button>
        <motion.img 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          src={src} 
          alt="Detalhe do doce" 
          className="max-h-[90vh] max-w-full rounded-lg shadow-2xl object-contain"
          referrerPolicy="no-referrer"
        />
      </motion.div>
    </AnimatePresence>
  );
};

const GalleryGrid = ({ images }: { images: string[] }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {images.map((img, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="aspect-square overflow-hidden rounded-xl cursor-pointer group relative shadow-md"
            onClick={() => setSelectedImage(img)}
          >
            <img 
              src={img} 
              alt={`Doce ${idx + 1}`} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-chocolate/0 group-hover:bg-chocolate/20 transition-colors duration-300" />
          </motion.div>
        ))}
      </div>
      <ImageModal 
        src={selectedImage || ""} 
        isOpen={!!selectedImage} 
        onClose={() => setSelectedImage(null)} 
      />
    </>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-cream font-sans selection:bg-pastel-pink selection:text-chocolate overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]">
        <div className="container mx-auto px-4 relative z-10 pt-20 pb-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <div className="mb-10 relative inline-block">
               <div className="absolute inset-0 bg-pastel-pink rounded-3xl blur-3xl opacity-40 animate-pulse"></div>
               <img 
                src={IMAGES.hero} 
                alt="Doceria Algodão Doce" 
                className="w-full max-w-sm md:max-w-lg h-auto object-contain rounded-3xl shadow-2xl border-8 border-white relative z-10 mx-auto"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="bg-white/50 backdrop-blur-sm p-8 rounded-3xl border border-white/60 shadow-xl">
              <span className="inline-block px-4 py-1 mb-6 rounded-full bg-chocolate/10 text-chocolate text-xs font-bold tracking-widest uppercase border border-chocolate/10">
                Doceria Algodão Doce
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-chocolate font-bold leading-tight mb-6">
                Doces artesanais que impressionam no sabor e encantam em cada detalhe.
              </h1>
              <p className="text-chocolate/80 text-lg mb-8 font-light leading-relaxed">
                Cada encomenda é feita com carinho, ingredientes selecionados e acabamento impecável.
              </p>
              <div className="flex flex-col items-center gap-3">
                <Button className="w-full md:w-auto text-lg">
                  <MessageCircle className="w-5 h-5" />
                  Quero fazer meu pedido
                </Button>
                <span className="text-xs text-chocolate/60 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Atendimento rápido pelo WhatsApp
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. WEDDING/EVENTS GALLERY */}
      <section className="py-20 px-4 bg-white rounded-t-[3rem] -mt-10 relative z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <div className="container mx-auto max-w-5xl">
          <SectionTitle 
            title="Doces perfeitos para seu evento" 
            subtitle="Casamentos • Festas • Celebrações" 
          />
          <GalleryGrid images={IMAGES.wedding} />
        </div>
      </section>

      {/* EASTER SECTION */}
      <section className="py-20 px-4 bg-cream">
        <div className="container mx-auto max-w-5xl">
          <SectionTitle 
            title="Páscoa Gourmet" 
            subtitle="Edição Limitada" 
          />
          <GalleryGrid images={IMAGES.easter} />
          <div className="mt-12 text-center">
             <Button variant="secondary">
               Ver cardápio de Páscoa
             </Button>
          </div>
        </div>
      </section>

      {/* CARTS SECTION */}
      <section className="py-20 px-4 bg-chocolate text-cream relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-pastel-pink font-serif italic text-xl mb-2 block">Serviço Exclusivo</span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Nosso carrinho personalizado para seu grande evento
              </h2>
              <p className="text-cream/80 text-lg mb-8 leading-relaxed">
                Leve charme e sabor para sua festa com nosso carrinho de doces. Uma experiência única que encanta os convidados e decora o ambiente.
              </p>
              <ul className="space-y-4 mb-8">
                {['Decoração personalizada', 'Atendente exclusiva', 'Variedade de doces à escolha'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="bg-pastel-pink/20 p-1 rounded-full">
                      <CheckCircle2 className="w-4 h-4 text-pastel-pink" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button variant="secondary" className="w-full md:w-auto">
                Orçar Carrinho
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <img 
                src={IMAGES.carts[0]} 
                alt="Carrinho de doces" 
                className="rounded-2xl shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 border-4 border-white/10"
                referrerPolicy="no-referrer"
              />
              <div className="grid grid-cols-2 gap-4">
                 <img src={IMAGES.carts[1]} className="rounded-xl shadow-lg" alt="Detalhe carrinho" referrerPolicy="no-referrer" />
                 <img src={IMAGES.carts[2]} className="rounded-xl shadow-lg" alt="Detalhe carrinho" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* 5. DIFFERENTIALS */}
      <section className="py-16 px-4 bg-cream border-y border-chocolate/5">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: Heart, title: "Feito com Amor", desc: "Produção artesanal" },
              { icon: Star, title: "Premium", desc: "Ingredientes selecionados" },
              { icon: CheckCircle2, title: "Acabamento", desc: "Visual impecável" },
              { icon: MessageCircle, title: "Exclusivo", desc: "Atendimento pessoal" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-pastel-pink/30 rounded-full flex items-center justify-center mb-4 text-chocolate">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-chocolate text-lg mb-1">{item.title}</h3>
                <p className="text-sm text-chocolate/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA INTERMEDIATE */}
      <section className="py-24 px-4 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] bg-fixed">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl md:text-5xl text-chocolate font-bold mb-8">
            Seu doce perfeito está a uma mensagem de distância.
          </h2>
          <Button className="w-full md:w-auto text-lg shadow-2xl scale-110">
            <MessageCircle className="w-5 h-5" />
            Falar comigo no WhatsApp
          </Button>
          <p className="mt-4 text-sm text-chocolate/60 font-medium tracking-wide uppercase">
            Resposta rápida
          </p>
        </div>
      </section>

      {/* 7. HOW IT WORKS */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <SectionTitle title="Como fazer seu pedido" centered />
          
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-chocolate/10 -z-10"></div>
            
            {[
              { step: "01", title: "Contato", desc: "Você me chama no WhatsApp" },
              { step: "02", title: "Desejo", desc: "Me conta como deseja seu doce" },
              { step: "03", title: "Produção", desc: "Eu preparo tudo com carinho" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center bg-white p-4">
                <div className="w-24 h-24 bg-cream rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-lg relative">
                  <span className="font-serif text-3xl font-bold text-chocolate">{item.step}</span>
                  <div className="absolute -bottom-2 bg-chocolate text-cream text-xs px-2 py-1 rounded-full">Passo</div>
                </div>
                <h3 className="font-bold text-xl text-chocolate mb-2">{item.title}</h3>
                <p className="text-chocolate/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA */}
      <section className="py-24 px-4 bg-chocolate text-cream text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="container mx-auto max-w-3xl relative z-10">
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">
            Agora é sua vez de ter doces incríveis feitos especialmente para você.
          </h2>
          <p className="text-xl text-cream/80 mb-10 font-light">
            Clique abaixo e faça seu pedido.
          </p>
          <Button variant="secondary" className="w-full md:w-auto text-lg px-12 py-5">
            Fazer pedido agora <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* 10. FOOTER */}
      <footer className="bg-[#4a2e25] text-cream/60 py-12 px-4 border-t border-white/5">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-cream/10 rounded-full flex items-center justify-center">
               <span className="font-serif text-2xl text-cream font-bold">AD</span>
            </div>
          </div>
          <h3 className="text-white font-serif text-2xl mb-2">Doceria Algodão Doce</h3>
          <p className="mb-6 text-sm uppercase tracking-widest">Pouso Alegre - MG</p>
          
          <div className="flex justify-center gap-6 mb-8">
            <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <Instagram className="w-6 h-6" />
            </a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <MessageCircle className="w-6 h-6" />
            </a>
          </div>
          
          <p className="text-xs opacity-40">
            © {new Date().getFullYear()} Doceria Algodão Doce. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
