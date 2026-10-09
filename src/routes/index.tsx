import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState, useRef, type ReactNode } from 'react';
import {
  ArrowRight,
  Heart,
  ShoppingBag,
  ShieldCheck,
  CircleCheck,
  Sun,
  UserCheck,
  X,
  Plus,
  Minus,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Check,
  CreditCard,
  MessageCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';

// Assets
import hero from '@/assets/hero.jpg';
import arrival from '@/assets/arrival.jpg';
import eyeglasses from '@/assets/eyeglasses.jpg';
import sunshineLogo from '@/assets/sunshine-logo.png';
import sunglassesClassic from '@/assets/sunglasses-classic.png';
import sunglassesTortoise from '@/assets/sunglasses-tortoise.jpg';
import sunglassesBlue from '@/assets/sunglasses-blue.jpg';
import sunglassesGreen from '@/assets/sunglasses-green.jpg';
import sunglassesCrystal from '@/assets/sunglasses-crystal.jpg';
import caseLeather from '@/assets/case-leather.jpg';
import caseHardshell from '@/assets/case-hardshell.jpg';
import velvetCloths from '@/assets/velvet-cloths-pouches.jpg';
import opticalTrays from '@/assets/optical-trays.jpg';
import opticalBags from '@/assets/optical-bags.jpg';
import workSmarter from '@/assets/work-smarter.png';
import sunsOutBanner from '@/assets/suns-out-banner.png';

// Reference assets
import avatar1 from '@/assets/review-1.jpg.asset.json';
import avatar2 from '@/assets/review-2.jpg.asset.json';
import avatar3 from '@/assets/review-3.jpg.asset.json';

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Sunshine Opticals | Quality Optical Accessories for Retailers & Businesses' },
      {
        name: 'description',
        content:
          'Explore our range of optical trays, cases, bags and velvet cloths — designed for everyday retail and professional optical use in India.',
      },
      { property: 'og:title', content: 'Sunshine Opticals | Optical Accessories, Trays & Cases' },
      {
        property: 'og:description',
        content: 'Quality optical accessories, trays, cases, bags and velvet cloths with INR (₹) wholesale pricing.',
      },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: Index,
});

const heroSlides = [
  {
    image: hero,
    alt: 'Woman wearing classic black sunglasses in the sunlight',
    label: 'sunlit everyday eyewear',
    onPhoto: false,
  },
  {
    image: arrival,
    alt: 'Man in modern black sunglasses under a blue sky',
    label: 'new arrival frames',
    onPhoto: true,
  },
  {
    image: eyeglasses,
    alt: 'Woman in classic black eyeglasses',
    label: 'classic eyeglasses',
    onPhoto: false,
  },
] as const;

export interface ProductItem {
  id: string;
  name: string;
  image: string;
  price: number; // in INR (₹)
  reviews: number;
  category: 'Glasses & Sunglasses' | 'Optical Cases' | 'Velvet Cloth' | 'Optical Trays' | 'Optical Bags';
  badge?: string;
  colors: string[];
  colorImages?: Record<string, string>;
  description?: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  selectedColor: string;
  quantity: number;
}

const allProducts: ProductItem[] = [
  // Glasses & Sunglasses (Initial 4 showcase products in ₹)
  {
    id: 'icon-classic',
    name: 'Icon Wayfarer Sunglasses',
    image: sunglassesClassic,
    price: 999,
    reviews: 142,
    category: 'Glasses & Sunglasses',
    badge: 'Popular',
    colors: ['black', 'tortoise', 'blue', 'green', 'clear'],
    colorImages: {
      black: sunglassesClassic,
      tortoise: sunglassesTortoise,
      blue: sunglassesBlue,
      green: sunglassesGreen,
      clear: sunglassesCrystal,
    },
    description: 'Timeless silhouette with UV400 polarized optics and lightweight durable frame build.',
  },
  {
    id: 'vintage-havana',
    name: 'Vintage Havana Tortoise Sunglasses',
    image: sunglassesTortoise,
    price: 1199,
    reviews: 98,
    category: 'Glasses & Sunglasses',
    badge: 'Best Seller',
    colors: ['tortoise', 'black', 'blue'],
    colorImages: {
      tortoise: sunglassesTortoise,
      black: sunglassesClassic,
      blue: sunglassesBlue,
    },
    description: 'Rich hand-polished tortoise frame featuring golden metal rivets and amber tinted lenses.',
  },
  {
    id: 'azure-gradient',
    name: 'Azure Gradient Navigator Sunglasses',
    image: sunglassesBlue,
    price: 1299,
    reviews: 86,
    category: 'Glasses & Sunglasses',
    colors: ['blue', 'black', 'clear'],
    colorImages: {
      blue: sunglassesBlue,
      black: sunglassesClassic,
      clear: sunglassesCrystal,
    },
    description: 'Modern navigator frame with striking sapphire gradient polarized lenses and stainless-steel core.',
  },
  {
    id: 'emerald-polarized',
    name: 'Emerald Clubmaster Sunglasses',
    image: sunglassesGreen,
    price: 1099,
    reviews: 64,
    category: 'Glasses & Sunglasses',
    colors: ['green', 'black', 'tortoise'],
    colorImages: {
      green: sunglassesGreen,
      black: sunglassesClassic,
      tortoise: sunglassesTortoise,
    },
    description: 'Classic browline sunglasses with bottle-green anti-reflective lenses and gold wire details.',
  },

  // Optical Cases
  {
    id: 'case-leather-fold',
    name: 'Handcrafted Foldable Leather Case',
    image: caseLeather,
    price: 349,
    reviews: 128,
    category: 'Optical Cases',
    badge: 'Premium',
    colors: ['brown', 'black', 'tan'],
    description:
      'Rigid origami triangular folding structure made of top-grain PU leather with magnetic flip closure.',
  },
  {
    id: 'case-hardshell-clamshell',
    name: 'Textured Linen Clamshell Hard Case',
    image: caseHardshell,
    price: 249,
    reviews: 95,
    category: 'Optical Cases',
    badge: 'Durable',
    colors: ['stone', 'black', 'blue'],
    description:
      'Crush-resistant steel core eyewear case wrapped in textured linen with ultra-soft velvet inner lining.',
  },
  {
    id: 'case-luxury-travel',
    name: 'Multi-Eyewear Travel Storage Case',
    image: caseLeather,
    price: 699,
    reviews: 84,
    category: 'Optical Cases',
    colors: ['black', 'brown'],
    description: 'Roll-up multi-slot protective travel case storing up to 4 frames with hanging loop.',
  },
  {
    id: 'case-magnetic-slim',
    name: 'Slim Magnetic Matte Eyewear Case',
    image: caseHardshell,
    price: 299,
    reviews: 77,
    category: 'Optical Cases',
    colors: ['black', 'stone'],
    description: 'Ultra-thin profile case with seamless magnetic lock designed to fit comfortably in pockets.',
  },

  // Velvet Cloth
  {
    id: 'velvet-cloth-combo',
    name: 'Premium Velvet Cloth & Drawstring Pouch Set',
    image: velvetCloths,
    price: 199,
    reviews: 112,
    category: 'Velvet Cloth',
    badge: 'Essential',
    colors: ['burgundy', 'blue', 'green'],
    description:
      'Set of 3 ultra-plush velvet drawstring pouches and dual-sided high-density microfiber velvet cleaning cloths.',
  },
  {
    id: 'microfiber-velvet-pack',
    name: 'Ultra-Soft Velvet Microfiber Cloths (5 Pack)',
    image: velvetCloths,
    price: 149,
    reviews: 92,
    category: 'Velvet Cloth',
    colors: ['burgundy', 'blue', 'green'],
    description:
      'High-density scratch-free velvet microfiber cloths for professional optical lens cleaning and polishing.',
  },
  {
    id: 'royal-pouch-trio',
    name: 'Royal Velvet Drawstring Pouch Trio',
    image: velvetCloths,
    price: 179,
    reviews: 67,
    category: 'Velvet Cloth',
    colors: ['blue', 'burgundy'],
    description:
      'Plush velvet eyewear pouches with drawstring tassels for luxury retail gift packaging.',
  },
  {
    id: 'anti-scratch-pad',
    name: 'Anti-Scratch Velvet Optical Cleaning Pad',
    image: velvetCloths,
    price: 129,
    reviews: 53,
    category: 'Velvet Cloth',
    colors: ['green', 'blue'],
    description:
      'Thick velvet optical buffer pad ideal for removing fingerprint smudges without spray or chemicals.',
  },

  // Optical Trays
  {
    id: 'tray-18-slot',
    name: '18-Slot Velvet Display Tray',
    image: opticalTrays,
    price: 899,
    reviews: 88,
    category: 'Optical Trays',
    badge: 'Retail Ready',
    colors: ['black', 'stone'],
    description:
      'Professional 18-compartment optical presentation tray with soft velvet slots for organized showcase and dispensing.',
  },
  {
    id: 'tray-stackable',
    name: 'Stackable Wooden Eyewear Presentation Tray',
    image: opticalTrays,
    price: 1299,
    reviews: 64,
    category: 'Optical Trays',
    colors: ['black', 'brown'],
    description:
      'Solid wood constructed modular display trays designed to stack efficiently inside optical display counters.',
  },
  {
    id: 'tray-compact-counter',
    name: 'Compact 8-Grid Counter Dispensing Tray',
    image: opticalTrays,
    price: 699,
    reviews: 41,
    category: 'Optical Trays',
    colors: ['black'],
    description:
      'Convenient countertop dispensing tray for optometrists and retail optical stores during eye exams.',
  },
  {
    id: 'tray-deluxe-organizer',
    name: 'Deluxe Matte Optical Organizer Tray',
    image: opticalTrays,
    price: 999,
    reviews: 35,
    category: 'Optical Trays',
    colors: ['black', 'stone'],
    description:
      'Heavy-duty matte black frame organizer with deep velvet dividers for premium designer eyewear.',
  },

  // Optical Bags
  {
    id: 'bags-retail-pack',
    name: 'Sunshine Opticals Luxury Retail Bags (20 Pack)',
    image: opticalBags,
    price: 499,
    reviews: 73,
    category: 'Optical Bags',
    badge: 'Packaging',
    colors: ['blue', 'tan'],
    description:
      'Thick matte laminated paper bags with rope handles featuring Sunshine Opticals insignia.',
  },
  {
    id: 'bags-sample-tote',
    name: 'Optical Sample Carrying Tote Bag',
    image: opticalBags,
    price: 599,
    reviews: 59,
    category: 'Optical Bags',
    colors: ['blue', 'black'],
    description:
      'Durable reinforced carrying bag tailored for optical sales representatives to transport frame trays safely.',
  },
  {
    id: 'bags-cotton-drawstring',
    name: 'Cotton Optical Drawstring Delivery Bags',
    image: opticalBags,
    price: 399,
    reviews: 46,
    category: 'Optical Bags',
    colors: ['tan', 'blue'],
    description:
      'Eco-friendly natural cotton drawstring bags perfect for customer eyewear purchases and prescriptions.',
  },
  {
    id: 'bags-velvet-touch',
    name: 'Velvet-Touch Optical Shopping Bags (10 Pack)',
    image: opticalBags,
    price: 449,
    reviews: 38,
    category: 'Optical Bags',
    colors: ['blue', 'tan'],
    description:
      'Soft-touch velvet textured boutique packaging bags for high-end optical boutiques and clinics.',
  },
];

const categoryOptions = [
  'Glasses & Sunglasses',
  'Optical Cases',
  'Velvet Cloth',
  'Optical Trays',
  'Optical Bags',
  'All Products',
] as const;

type CategoryOption = (typeof categoryOptions)[number];

const circularCategories = [
  {
    name: 'OPTICAL TRAYS',
    category: 'Optical Trays' as CategoryOption,
    image: opticalTrays,
  },
  {
    name: 'OPTICAL CASES',
    category: 'Optical Cases' as CategoryOption,
    image: caseLeather,
  },
  {
    name: 'OPTICAL BAGS',
    category: 'Optical Bags' as CategoryOption,
    image: opticalBags,
  },
  {
    name: 'VELVET CLOTH',
    category: 'Velvet Cloth' as CategoryOption,
    image: velvetCloths,
  },
];

const reviews = [
  {
    id: 'rev-1',
    name: 'Aarav Sharma',
    role: 'Optical Retailer, Delhi',
    avatar: avatar1.url,
    text: 'The optical display trays and leather cases are top tier. They have elevated our showroom presentation significantly. Delivery was right on time.',
    product: allProducts[0],
  },
  {
    id: 'rev-2',
    name: 'Priya Adhikari',
    role: 'Optometrist & Store Owner',
    avatar: avatar2.url,
    text: 'We order the velvet cloths and custom delivery bags in bulk. The fabric is extremely soft, completely scratch-free, and our customers love the finish.',
    product: allProducts[4],
  },
  {
    id: 'rev-3',
    name: 'Rohan Thapa',
    role: 'Eyewear Boutique Founder',
    avatar: avatar3.url,
    text: 'The sunglasses look stunning and the magnetic hard cases keep them perfectly protected during transit. Definitely our go-to optical vendor.',
    product: allProducts[1],
  },
];

interface ToastNotice {
  id: number;
  productName: string;
  productPrice: number;
  image: string;
}

// Heading with Inline CSS Animated Reveal
function AnimatedHeading({
  children,
  className = '',
  tag = 'h2',
  style = {},
}: {
  children: ReactNode;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3';
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const Tag = tag;
  const inlineAnimationStyle: React.CSSProperties = {
    animation: isInView ? 'text-reveal-smooth 1.2s cubic-bezier(0.16, 1, 0.3, 1) both' : 'none',
    willChange: 'transform, opacity',
    ...style,
  };

  return (
    <Tag ref={ref} className={className} style={inlineAnimationStyle}>
      {children}
    </Tag>
  );
}

function Index() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryOption>('Glasses & Sunglasses');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [activeColor, setActiveColor] = useState('black');
  const [cardColors, setCardColors] = useState<Record<string, string>>({});

  // Cart & Drawer State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerNotice, setDrawerNotice] = useState('');

  const [toasts, setToasts] = useState<ToastNotice[]>([]);
  const [badgeBounced, setBadgeBounced] = useState(false);
  const [notice, setNotice] = useState('');
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setSlide(s => (s + 1) % heroSlides.length), 5200);
    return () => clearTimeout(timer);
  }, [slide]);

  const scrollToProducts = (cat: CategoryOption) => {
    setSelectedCategory(cat);
    document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const filteredProducts =
    selectedCategory === 'All Products'
      ? allProducts.slice(0, 4)
      : allProducts.filter(p => p.category === selectedCategory).slice(0, 4);

  const openProductModal = (product: ProductItem, chosenColor?: string) => {
    setSelectedProduct(product);
    setActiveColor(chosenColor || cardColors[product.id] || product.colors[0]);
  };

  const handleCardColorChange = (productId: string, c: string) => {
    setCardColors(prev => ({ ...prev, [productId]: c }));
  };

  const getProductDisplayImage = (product: ProductItem) => {
    const chosen = cardColors[product.id];
    if (chosen && product.colorImages && product.colorImages[chosen]) {
      return product.colorImages[chosen];
    }
    return product.image;
  };

  const getSelectedDialogImage = () => {
    if (!selectedProduct) return '';
    if (selectedProduct.colorImages && selectedProduct.colorImages[activeColor]) {
      return selectedProduct.colorImages[activeColor];
    }
    return selectedProduct.image;
  };

  // Add to Bag with animated toast notification and badge update (drawer opens only from navbar)
  const addToBag = (product: ProductItem, chosenColor?: string, openDrawer: boolean = false) => {
    const color = chosenColor || cardColors[product.id] || product.colors[0];
    const itemImg = (product.colorImages && product.colorImages[color]) || product.image;
    const cartItemId = `${product.id}-${color}`;

    setCartItems(prev => {
      const existing = prev.find(item => item.id === cartItemId);
      if (existing) {
        return prev.map(item =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          name: product.name,
          price: product.price,
          image: itemImg,
          category: product.category,
          selectedColor: color,
          quantity: 1,
        },
      ];
    });

    // Badge animation
    setBadgeBounced(true);
    setTimeout(() => setBadgeBounced(false), 500);

    // Toast alert
    const toastId = Date.now();
    const newToast: ToastNotice = {
      id: toastId,
      productName: product.name,
      productPrice: product.price,
      image: itemImg,
    };

    setToasts(prev => [newToast, ...prev.slice(0, 2)]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== toastId));
    }, 3500);

    if (openDrawer) {
      setIsDrawerOpen(true);
    }
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCartItems(prev =>
      prev
        .map(item => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Direct checkout action in the drawer without opening another dialog
  const handleDirectCheckout = () => {
    const itemsSummary = cartItems
      .map(i => `${i.name} (${i.selectedColor}) x ${i.quantity} = ₹${i.price * i.quantity}`)
      .join('%0A');
    const waUrl = `https://wa.me/919876543210?text=Hello%20Sunshine%20Opticals,%20I%20would%20like%20to%20place%20an%20order%20for%20my%20store:%0A%0A${itemsSummary}%0A%0ATotal%20Amount:%20₹${cartSubtotal}%0A%0APlease%20confirm%20wholesale%20dispatch.`;

    setDrawerNotice('Order sent! Opening WhatsApp wholesale dispatch confirmation...');
    setTimeout(() => {
      window.open(waUrl, '_blank');
      setDrawerNotice('');
    }, 1200);
  };

  const isSlideTwo = slide === 1;

  return (
    <main>
      {/* Animated Top-Right Corner Toast Alert */}
      <div className="toast-corner-container" aria-live="polite">
        {toasts.map(toast => (
          <div
            className="toast-item"
            key={toast.id}
            style={{ animation: 'toast-slide-in 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
          >
            <div className="toast-content">
              <div className="toast-icon">
                <Check className="w-5 h-5" />
              </div>
              <img
                src={toast.image}
                alt=""
                style={{ width: '40px', height: '36px', objectFit: 'contain', background: '#f8fafc', padding: '2px', border: '1px solid #e2e8f0' }}
              />
              <div>
                <h4 className="toast-title">Added to Bag!</h4>
                <p className="toast-desc">
                  {toast.productName} · ₹{toast.productPrice.toLocaleString('en-IN')}
                </p>
              </div>
            </div>
            <button
              className="toast-close"
              aria-label="Close notification"
              onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* 1. Hero Section */}
      <section className="main-hero">
        <div className="hero-slides">
          {heroSlides.map((s, i) => (
            <img
              key={`${s.label}-${i === slide ? 'active' : 'inactive'}`}
              className={`cover-image hero-slide ${i === slide ? 'is-active' : ''}`}
              src={s.image}
              alt={i === slide ? s.alt : ''}
              aria-hidden={i !== slide}
              style={{
                animation: i === slide ? 'hero-scale-zoom 6.8s cubic-bezier(0.25, 1, 0.5, 1) forwards' : 'none',
                transformOrigin: 'center center',
                willChange: 'transform, opacity',
              }}
            />
          ))}
        </div>

        {/* Transparent Top Header (Centered 5 Navigation Buttons) */}
        <header className="site-header">
          <div className="site-header-inner">
            <Link to="/" className="site-logo" aria-label="Sunshine Opticals Home">
              <img src={sunshineLogo} alt="Sunshine Opticals" className="site-logo-img" />
            </Link>

            {/* Centered Navigation Menu */}
            <nav className="site-nav" aria-label="Main menu">
              <Link to="/">Home</Link>
              <a href="#about-section">About Us</a>
              <a href="#products-section">Products</a>
              <a href="#why-choose-us">Our Services</a>
              <Link to="/contact">Contact Us</Link>
            </nav>

            <div className="header-actions">
              <button
                className="header-bag-button"
                onClick={() => setIsDrawerOpen(true)}
                aria-label="Open Shopping Bag Drawer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Bag</span>
                <span className={`bag-badge ${badgeBounced ? 'bounce' : ''}`}>{totalItemsCount}</span>
              </button>
            </div>
          </div>
        </header>

        {/* Hero Content (When 2nd slide is active, business font is black as requested) */}
        <div className={`hero-inner ${isSlideTwo ? 'slide-2-active on-photo' : ''}`}>
          <h1 style={{ animation: 'text-reveal-smooth 1.3s cubic-bezier(0.16, 1, 0.3, 1) both' }}>
            Quality Optical Accessories,<br />
            Made for <span style={{ color: isSlideTwo ? '#000000' : '#60a5fa' }}>Your Business.</span>
          </h1>
          <p style={{ animation: 'text-reveal-smooth 1.3s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both' }}>
            Explore our range of optical trays, cases, bags and velvet cloths — designed for everyday retail and professional optical use in India.
          </p>
          <Button
            className="shop-button"
            onClick={() => scrollToProducts('Glasses & Sunglasses')}
            style={{ animation: 'text-reveal-smooth 1.3s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both' }}
          >
            Shop Now <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
          <div className="hero-pagination">
            {heroSlides.map((s, n) => (
              <Button
                key={s.label}
                variant="text"
                aria-label={`Show ${s.label}`}
                aria-pressed={slide === n}
                className={slide === n ? 'slide-active' : ''}
                onClick={() => setSlide(n)}
              >
                {`0${n + 1}`}
              </Button>
            ))}
          </div>
        </div>
        <span className={`hero-handwriting ${isSlideTwo ? 'on-dark-bg' : ''}`}>
          Vision<br />Better<br />You<span>⤹</span>
        </span>
      </section>

      {/* Main Store Container */}
      <div className="store-container">
        {/* 2. CIRCULAR OPTICAL CATEGORIES SECTION */}
        <section className="categories-section" id="categories-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow" style={{ color: '#2563eb' }}>Explore collections</p>
              <AnimatedHeading tag="h2">Optical Categories</AnimatedHeading>
            </div>
            <Button variant="text" className="shop-text-button" onClick={() => scrollToProducts('All Products')}>
              View All Products <ArrowRight />
            </Button>
          </div>

          <div className="circular-categories-grid">
            {circularCategories.map(c => (
              <button
                key={c.name}
                className="circular-category-item"
                onClick={() => scrollToProducts(c.category)}
              >
                <div className="category-circle-wrapper">
                  <img src={c.image} alt={c.name} className="category-circle-img" />
                </div>
                <span className="category-circle-name">{c.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* 3. PROMOTIONS GRID WITH RICH BACKGROUND IMAGES */}
        <section className="promotions-grid" id="about-section">
          <div className="photo-panel arrival-panel">
            <img className="cover-image" src={arrival} alt="Man in modern black sunglasses" />
            <div className="panel-bg-overlay" />
            <div className="panel-copy on-photo">
              <p className="eyebrow" style={{ color: '#60a5fa' }}>New arrivals</p>
              <AnimatedHeading tag="h2">
                Modern Frames<br />for Modern You
              </AnimatedHeading>
              <p>Discover the latest styles in polarized sunglasses and optical cases.</p>
              <Button className="shop-button shop-button-light" onClick={() => scrollToProducts('Glasses & Sunglasses')}>
                Explore Collection <ArrowRight />
              </Button>
            </div>
          </div>

          {/* Sun’s Out Style’s On with User's Photo */}
          <div className="photo-panel sun-panel">
            <img
              className="cover-image"
              src={sunsOutBanner}
              alt="Classic sunglasses on warm architectural stone"
            />
            <div className="sun-panel-overlay" />
            <div className="panel-copy on-photo">
              <p className="eyebrow" style={{ color: '#60a5fa' }}>Up to 40% off</p>
              <AnimatedHeading tag="h2">
                Sun’s Out<br />Style’s On
              </AnimatedHeading>
              <p>Premium sunglasses with complimentary velvet cloths.</p>
              <Button className="shop-button" onClick={() => scrollToProducts('Glasses & Sunglasses')}>
                Shop Sunglasses <ArrowRight />
              </Button>
            </div>
          </div>
        </section>

        {/* 4. PRODUCTS SECTION (Showing 4 Products + Category Dropdown + INR ₹ Price + Add to Bag Button) */}
        <section className="products-section" id="products-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow" style={{ color: '#2563eb' }}>Curated items</p>
              <AnimatedHeading tag="h2">{selectedCategory}</AnimatedHeading>
            </div>

            {/* Category Dropdown Select */}
            <div className="products-controls-row">
              <div className="category-dropdown-container">
                <label htmlFor="category-select" className="category-dropdown-label">
                  Category:
                </label>
                <select
                  id="category-select"
                  className="category-select"
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value as CategoryOption)}
                >
                  {categoryOptions.map(opt => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 4 Product Grid */}
          <div className="product-grid-4">
            {filteredProducts.map(product => {
              const currentImg = getProductDisplayImage(product);
              const selectedSwatch = cardColors[product.id] || product.colors[0];

              return (
                <article className="product-card" key={product.id}>
                  <div className="product-image">
                    {product.badge && <span className="product-badge">{product.badge}</span>}
                    <button
                      className="product-photo-button"
                      aria-label={`View ${product.name}`}
                      onClick={() => openProductModal(product, selectedSwatch)}
                    >
                      <img src={currentImg} alt={product.name} />
                    </button>
                    <button
                      className={`favorite-button ${favorites.includes(product.id) ? 'is-favorite' : ''}`}
                      aria-label={`${favorites.includes(product.id) ? 'Unsave' : 'Save'} ${product.name}`}
                      aria-pressed={favorites.includes(product.id)}
                      onClick={() =>
                        setFavorites(
                          favorites.includes(product.id)
                            ? favorites.filter(n => n !== product.id)
                            : [...favorites, product.id]
                        )
                      }
                    >
                      <Heart />
                    </button>
                  </div>

                  <div className="product-info">
                    <span className="product-category-tag">{product.category}</span>
                    <button
                      className="product-name"
                      onClick={() => openProductModal(product, selectedSwatch)}
                    >
                      {product.name}
                    </button>

                    <div className="product-rating">
                      <span className="stars">★★★★★</span>
                      <span>({product.reviews})</span>
                    </div>

                    <div className="swatches">
                      {product.colors.map(c => (
                        <button
                          key={c}
                          className={`swatch swatch-${c} ${selectedSwatch === c ? 'swatch-active' : ''}`}
                          aria-label={`Select ${c} color for ${product.name}`}
                          onClick={() => handleCardColorChange(product.id, c)}
                        />
                      ))}
                    </div>

                      {/* Bottom Row: INR ₹ Price & Add to Bag Button on Right */}
                      <div className="product-card-bottom">
                        <p className="price">₹{product.price.toLocaleString('en-IN')}</p>
                        <button
                          className="product-add-button"
                          aria-label={`Add ${product.name} to bag`}
                          onClick={() => addToBag(product, selectedSwatch, false)}
                        >
                          <ShoppingBag className="w-3.5 h-3.5 mr-1" /> Add to Bag
                        </button>
                      </div>
                  </div>
                </article>
              );
            })}
          </div>

          {filteredProducts.length === 0 && (
            <div className="empty-products">
              <p>No products available in this category.</p>
              <Button className="shop-button" onClick={() => setSelectedCategory('All Products')}>
                Browse All Products <ArrowRight />
              </Button>
            </div>
          )}
        </section>

        {/* 5. Collections Dual Grid ("Work Smarter. Display Better." with User Image) */}
        <section className="collections-grid">
          <div className="photo-panel display-panel">
            <img className="cover-image" src={workSmarter} alt="Optical showcase on illuminated counter" />
            <div className="display-panel-overlay" />
            <div className="display-copy on-photo">
              <p className="eyebrow" style={{ color: '#60a5fa' }}>Optical organization</p>
              <AnimatedHeading tag="h2">
                Work Smarter.<br />Display Better.
              </AnimatedHeading>
              <p>Organize your retail counter and customer presentations with our partitioned optical display trays.</p>
              <Button className="shop-button" onClick={() => scrollToProducts('Optical Trays')}>
                Explore Trays <ArrowRight />
              </Button>
            </div>
          </div>

          <div className="photo-panel optical-panel">
            <img className="cover-image" src={eyeglasses} alt="Woman in classic eyewear" />
            <div className="panel-bg-overlay" />
            <div className="panel-copy on-photo">
              <p className="eyebrow" style={{ color: '#60a5fa' }}>Retail essentials</p>
              <AnimatedHeading tag="h2">
                Classic Looks.<br />Premium Cases.
              </AnimatedHeading>
              <p>Protect every frame with our magnetic hard cases and soft velvet pouches.</p>
              <Button className="shop-button shop-button-light" onClick={() => scrollToProducts('Optical Cases')}>
                Shop Cases <ArrowRight />
              </Button>
            </div>
          </div>
        </section>

        {/* 6. WHY CHOOSE US / OUR SERVICES SECTION */}
        <section className="why-choose-section" id="why-choose-us">
          <div className="why-choose-header">
            <p className="eyebrow" style={{ color: '#2563eb' }}>OUR SERVICES & GUARANTEE</p>
            <AnimatedHeading tag="h2" className="why-choose-title">
              Why Choose Sunshine Opticals?
            </AnimatedHeading>
            <p className="why-choose-subtitle">
              We focus on delivering dependable accessories, showcase organizers, and packaging solutions tailored for optical businesses across India.
            </p>
          </div>

          <div className="why-choose-grid">
            <div className="why-choose-card">
              <div className="why-choose-icon-wrap">
                <Check className="w-5 h-5 text-white" />
              </div>
              <h3>Quality You Can Rely On</h3>
              <p>We focus on providing dependable optical accessories for regular business use.</p>
            </div>

            <div className="why-choose-card">
              <div className="why-choose-icon-wrap">
                <Check className="w-5 h-5 text-white" />
              </div>
              <h3>Wide Product Range</h3>
              <p>Trays, cases, bags and velvet cloth for different optical requirements.</p>
            </div>

            <div className="why-choose-card">
              <div className="why-choose-icon-wrap">
                <Check className="w-5 h-5 text-white" />
              </div>
              <h3>Retail & Business Solutions</h3>
              <p>Products suitable for optical shops, retailers and professional requirements.</p>
            </div>

            <div className="why-choose-card">
              <div className="why-choose-icon-wrap">
                <Check className="w-5 h-5 text-white" />
              </div>
              <h3>Convenient & Practical</h3>
              <p>Designed for easy handling, storage, display and delivery.</p>
            </div>
          </div>
        </section>

        {/* 7. CUSTOMER REVIEWS (WITH PROFILE ICONS) */}
        <section className="reviews-section" id="reviews-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow" style={{ color: '#2563eb' }}>Real businesses. Real stories.</p>
              <AnimatedHeading tag="h2">Customer Reviews</AnimatedHeading>
            </div>
            <Button
              variant="text"
              className="shop-text-button"
              onClick={() => setNotice('All verified retailer reviews are featured here.')}
            >
              View All Reviews <ArrowRight />
            </Button>
          </div>

          <div className="reviews-grid">
            {reviews.map(r => (
              <article className="review-card" key={r.id}>
                <div className="review-header">
                  <div className="review-user-info">
                    <div className="review-profile-icon">
                      <UserCheck className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="review-author-name">{r.name}</h3>
                      <span className="review-badge">
                        <CircleCheck className="w-3 h-3" /> Verified Buyer · {r.role}
                      </span>
                    </div>
                  </div>
                  <span className="stars">★★★★★</span>
                </div>

                <p>{r.text}</p>

                <button className="review-product" onClick={() => openProductModal(r.product)}>
                  <img src={r.product.image} alt="" />
                  <span>Featured: {r.product.name}</span>
                </button>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* 8. Newsletter Section */}
      <section className="newsletter">
        <div className="newsletter-inner">
          <div>
            <p className="eyebrow" style={{ color: '#60a5fa' }}>Stay in the loop</p>
            <AnimatedHeading tag="h2">Get Exclusive Wholesale & Retail Offers</AnimatedHeading>
            <p>Be the first to know about new optical accessories, case shipments, and volume deals across India.</p>
          </div>
          <form
            onSubmit={e => {
              e.preventDefault();
              setNotice('Thank you for subscribing to Sunshine Opticals wholesale updates!');
            }}
          >
            <input type="email" aria-label="Email address" placeholder="Enter your business email" required />
            <Button className="shop-button" type="submit">
              Subscribe <ArrowRight />
            </Button>
          </form>
          <img src={sunglassesClassic} alt="" className="newsletter-glasses" />
        </div>
      </section>

      {/* 9. LUXURY UPGRADED FOOTER */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-grid">
            {/* Column 1: Brand */}
            <div className="footer-col footer-brand">
              <Link to="/">
                <img src={sunshineLogo} alt="Sunshine Opticals" className="footer-logo-img" />
              </Link>
              <p>
                Quality Optical Accessories for Retailers & Optical Businesses across India & Overseas.
              </p>
              <div className="footer-trust-badges">
                <span>✦ Wholesale Direct</span>
                <span>✦ Pan-India Delivery</span>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="footer-col">
              <h3>Quick Links</h3>
              <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><a href="#about-section">About Us</a></li>
                <li><a href="#products-section">Products Catalog</a></li>
                <li><a href="#why-choose-us">Our Services</a></li>
                <li><Link to="/contact">Contact Us</Link></li>
              </ul>
            </div>

            {/* Column 3: Products */}
            <div className="footer-col">
              <h3>Products</h3>
              <ul className="footer-links">
                <li><button onClick={() => scrollToProducts('Optical Trays')}>Optical Trays</button></li>
                <li><button onClick={() => scrollToProducts('Optical Cases')}>Optical Cases</button></li>
                <li><button onClick={() => scrollToProducts('Optical Bags')}>Optical Bags</button></li>
                <li><button onClick={() => scrollToProducts('Velvet Cloth')}>Velvet Cloth</button></li>
                <li><button onClick={() => scrollToProducts('Glasses & Sunglasses')}>Sunglasses</button></li>
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div className="footer-col">
              <h3>Contact</h3>
              <ul className="footer-contact-list">
                <li>
                  <Phone /> <span>+91 98765 43210 (Mon - Sat)</span>
                </li>
                <li>
                  <Mail /> <span>info@sunshineopticals.com</span>
                </li>
                <li>
                  <MapPin /> <span>Optical Hub Market, Delhi - 110006, India</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2026 Sunshine Opticals. All Rights Reserved.</p>
            <p>Quality Optical Accessories for Businesses (INR ₹ Pricing)</p>
          </div>
        </div>
      </footer>

      {/* 10. RIGHT-SIDE SHOPPING BAG SLIDEOUT DRAWER (LUXURY WHITE THEME) */}
      {isDrawerOpen && (
        <>
          <div
            className="drawer-backdrop"
            onClick={() => setIsDrawerOpen(false)}
            aria-hidden="true"
          />
          <div className="drawer-panel" role="dialog" aria-modal="true" aria-label="Shopping Bag Drawer">
            <div className="drawer-header">
              <h3>Shopping Bag ({totalItemsCount})</h3>
              <button
                className="drawer-close-button"
                onClick={() => setIsDrawerOpen(false)}
                aria-label="Close Bag Drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="drawer-body">
              {drawerNotice && (
                <div className="p-3 bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold">
                  {drawerNotice}
                </div>
              )}

              {cartItems.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingBag className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-base font-bold text-slate-800 mb-2 font-heading">Your Bag is Empty</p>
                  <p className="text-xs text-slate-500 mb-6">Explore our optical trays, cases, and sunglasses.</p>
                  <Button
                    className="shop-button"
                    onClick={() => {
                      setIsDrawerOpen(false);
                      scrollToProducts('Glasses & Sunglasses');
                    }}
                  >
                    Start Shopping
                  </Button>
                </div>
              ) : (
                cartItems.map(item => (
                  <div className="drawer-item" key={item.id}>
                    <img src={item.image} alt={item.name} className="drawer-item-img" />
                    <div className="drawer-item-info">
                      <h4 className="drawer-item-title">{item.name}</h4>
                      <p className="drawer-item-category">
                        {item.category} · <span className="capitalize">{item.selectedColor}</span>
                      </p>
                      <p className="drawer-item-price">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>

                      <div className="drawer-qty-controls">
                        <button
                          className="drawer-qty-btn"
                          aria-label="Decrease quantity"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold px-2">{item.quantity}</span>
                        <button
                          className="drawer-qty-btn"
                          aria-label="Increase quantity"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <button
                      className="drawer-item-delete"
                      aria-label={`Remove ${item.name} from bag`}
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="drawer-footer">
                <div className="drawer-summary-row">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-slate-900">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="drawer-summary-row">
                  <span>Wholesale Delivery (India):</span>
                  <span className="text-blue-600 font-semibold">FREE</span>
                </div>
                <div className="drawer-summary-total">
                  <span>Total Amount:</span>
                  <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>

                <Button
                  className="shop-button drawer-checkout-btn"
                  onClick={handleDirectCheckout}
                >
                  <MessageCircle className="w-4 h-4 mr-2" /> Direct WhatsApp Checkout
                </Button>
              </div>
            )}
          </div>
        </>
      )}

      {/* 11. Product Detail Dialog */}
      <Dialog
        open={selectedProduct !== null}
        onOpenChange={open => {
          if (!open) setSelectedProduct(null);
        }}
      >
        <DialogContent className="product-dialog">
          {selectedProduct && (
            <>
              <DialogTitle>{selectedProduct.name}</DialogTitle>
              <DialogDescription>
                {selectedProduct.category} · {selectedProduct.description || 'Quality Optical Accessory'}
              </DialogDescription>
              <img className="detail-image" src={getSelectedDialogImage()} alt={selectedProduct.name} />
              <div className="detail-bottom">
                <p className="price">₹{selectedProduct.price.toLocaleString('en-IN')}</p>
                <span className="stars">
                  ★★★★★ <span className="muted-review">({selectedProduct.reviews} reviews)</span>
                </span>
              </div>
              <p className="detail-color">Color / Finish: {activeColor}</p>
              <div className="swatches detail-swatches">
                {selectedProduct.colors.map(c => (
                  <button
                    key={c}
                    aria-label={`Choose ${c}`}
                    aria-pressed={activeColor === c}
                    className={`swatch swatch-${c} ${activeColor === c ? 'swatch-selected' : ''}`}
                    onClick={() => setActiveColor(c)}
                  />
                ))}
              </div>
              <Button
                className="shop-button w-full"
                onClick={() => {
                  addToBag(selectedProduct, activeColor, false);
                  setSelectedProduct(null);
                }}
              >
                <ShoppingBag className="w-4 h-4 mr-2" /> Add to Bag
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Info Notice Dialog */}
      <Dialog
        open={Boolean(notice)}
        onOpenChange={open => {
          if (!open) setNotice('');
        }}
      >
        <DialogContent>
          <DialogTitle>Sunshine Opticals</DialogTitle>
          <DialogDescription>{notice}</DialogDescription>
        </DialogContent>
      </Dialog>

      {/* 12. FLOATING CONTINUOUS BLINKING WHATSAPP BUTTON */}
      <a
        href="https://wa.me/919876543210?text=Hello%20Sunshine%20Opticals,%20I%20would%20like%20to%20inquire%20about%20wholesale%20optical%20accessories."
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-floating-btn"
        aria-label="Chat with Sunshine Opticals on WhatsApp"
      >
        <svg
          className="w-8 h-8 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
        <span className="whatsapp-tooltip">Chat with us on WhatsApp</span>
      </a>
    </main>
  );
}
