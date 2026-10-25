import { useState, useEffect, useRef, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Share2,
  Check,
  Copy,
  X,
  Volume2,
  VolumeX,
  Package,
  Globe,
  ArrowRight,
  Search,
  CheckCircle2,
  Truck,
  Sparkles,
  Link as LinkIcon,
  Layers,
  RotateCcw,
  SlidersHorizontal,
  Images,
  ChevronLeft,
  ChevronRight,
  Video
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/components/ui/use-toast';

// Available video assets (including the client's uploaded Google Drive video)
const VIDEO_ASSETS = {
  clientShowcase: '/videos/product-showcase.mp4', // Google Drive client uploaded video
  factory2: '/videos/factory-2.webm',             // Factory 2 local video
  sorting: 'https://media.base44.com/videos/public/69e988326d6c056fafdd45f7/af5412872_CO-Virtual-Tour.mp4',
  baling: 'https://media.base44.com/videos/public/69e988326d6c056fafdd45f7/c22eeaf2d_WhatsAppVideo2026-09-22at115900AM.mp4',
  grading: '/videos/factory-2.webm',
  sortingBay: 'https://media.base44.com/videos/public/69e988326d6c056fafdd45f7/af5412872_CO-Virtual-Tour.mp4',
};

// Real Usman Global facility & product images from client Google Drive
const CLIENT_IMAGES = {
  balesWarehouseStack: '/images/products/ug-image-1.jpg',   // Massive vertical export-ready bale stack with stencils
  garmentSortingCage: '/images/products/ug-image-2.jpg',    // Metal sorting cage trolley with folded shirts & garments
  cottonTowelsWipers: '/images/products/ug-image-3.jpg',    // Neat stack of clean folded cotton towels & industrial wiping materials
  summerColorCart: '/images/products/ug-image-4.jpg',       // Blue mobile sorting cart #87 with summer garments & partywear
  fashionLaceSilkCart: '/images/products/ug-image-5.jpg',   // Industrial mesh trolley filled with premium ladies dresses, silks & laces
};

// CATEGORIES CONFIGURATION
export const CATALOGUE_CATEGORIES = [
  {
    id: 'cream-grade',
    label: 'Cream Grade (Premium)',
    badge: 'Cream AAA',
    tagline: 'Top-tier European & UK branded collections with near-new appeal.',
    baleRange: '45kg / 55kg bales',
  },
  {
    id: 'tropical-summer',
    label: 'Tropical Summer Mix',
    badge: 'Export Grade A',
    tagline: 'High-turnover lightweight summer garments for African & Asian warm markets.',
    baleRange: '55kg / 80kg bales',
  },
  {
    id: 'shoes-footwear',
    label: 'Used Shoes & Sneakers',
    badge: 'Paired Grade A',
    tagline: 'Paired athletic, casual and formal shoes securely tied in sacks.',
    baleRange: '25kg / 30kg sacks',
  },
  {
    id: 'vintage-streetwear',
    label: 'Vintage & 90s Streetwear',
    badge: 'Curated Selection',
    tagline: 'Hand-picked vintage denim, band tees, and 90s branded streetwear.',
    baleRange: '35kg / 45kg boxes/bales',
  },
  {
    id: 'bags-accessories',
    label: 'Bags & Leather Belts',
    badge: 'Grade A Hardware',
    tagline: 'Fashion handbags, backpacks, and genuine leather belts with working zippers.',
    baleRange: '30kg / 45kg sacks',
  },
  {
    id: 'winter-outerwear',
    label: 'Winter Outerwear & Knit',
    badge: 'Cold Climate',
    tagline: 'Puffer jackets, fleece pullovers, and wool knitwear for cold regions.',
    baleRange: '45kg / 80kg bales',
  },
  {
    id: 'cotton-recycling',
    label: 'Recycled Cotton Wipers',
    badge: 'Industrial Eco',
    tagline: 'Clean, metal-free industrial cotton wipers for marine and automotive workshops.',
    baleRange: '10kg polybags / 100kg bales',
  },
];

// PRODUCTS DATA WITH VIDEO REELS AND PHOTO DESIGN GALLERIES
export const CATALOGUE_PRODUCTS = [
  // 1. CREAM GRADE
  {
    id: 'cream-ladies-summer-dresses',
    categoryId: 'cream-grade',
    title: 'Cream Ladies Summer Dresses',
    grade: 'Cream (Grade AAA)',
    baleWeight: '45kg transparent bale',
    pieceCount: '~120-140 pieces',
    origin: 'UK & Italy Collections',
    description: 'High-end floral, cocktail, and casual summer dresses in near-new condition with designer labels. No fading, holes, or defects.',
    videoUrl: VIDEO_ASSETS.clientShowcase, // Client uploaded video!
    images: [
      CLIENT_IMAGES.fashionLaceSilkCart,
      CLIENT_IMAGES.summerColorCart,
      CLIENT_IMAGES.balesWarehouseStack,
    ],
    duration: '0:45',
    location: 'Sharjah Main Facility',
    features: ['Client Verified Video Quality', 'Modern European cuts', 'Zero stains or tears', 'High proportion of silks & linens'],
  },
  {
    id: 'cream-ladies-silk-blouses',
    categoryId: 'cream-grade',
    title: 'Cream Ladies Silk & Chiffon Blouses',
    grade: 'Cream (Grade AAA)',
    baleWeight: '45kg compact bale',
    pieceCount: '~160-180 pieces',
    origin: 'UK & Germany',
    description: 'Elegant women tops, blouses, and tunics. Premium lightweight fabrics with contemporary patterns and zero signs of wear.',
    videoUrl: VIDEO_ASSETS.sorting,
    images: [
      CLIENT_IMAGES.fashionLaceSilkCart,
      CLIENT_IMAGES.summerColorCart,
      CLIENT_IMAGES.garmentSortingCage,
    ],
    duration: '0:45',
    location: 'Sharjah Sorting Floor',
    features: ['High retail resale value', 'Pressed & neatly bale-packed', 'Ready for boutique display'],
  },
  {
    id: 'cream-mens-polo-shirts',
    categoryId: 'cream-grade',
    title: 'Cream Mens Branded Polo Shirts',
    grade: 'Cream (Grade AAA)',
    baleWeight: '45kg / 55kg bale',
    pieceCount: '~140-160 pieces',
    origin: 'UK, France & Australia',
    description: 'Branded short-sleeve and long-sleeve polo shirts in cotton pique. Strong collar shapes, intact buttons, vibrant colors.',
    videoUrl: VIDEO_ASSETS.baling,
    images: [
      CLIENT_IMAGES.garmentSortingCage,
      CLIENT_IMAGES.balesWarehouseStack,
      CLIENT_IMAGES.summerColorCart,
    ],
    duration: '1:05',
    location: 'Packing Unit #2',
    features: ['Major global fashion brands', 'No collar stretch or fraying', 'Solid & striped assortment'],
  },
  {
    id: 'cream-mens-lightweight-chinos',
    categoryId: 'cream-grade',
    title: 'Cream Mens Chinos & Slim Trousers',
    grade: 'Cream (Grade AAA)',
    baleWeight: '55kg bale',
    pieceCount: '~90-105 pieces',
    origin: 'Europe & UK',
    description: 'Clean modern chino trousers in beige, navy, olive, and black. Pristine cuffs and waistbands.',
    videoUrl: null, // New design photo arrival!
    images: [
      CLIENT_IMAGES.garmentSortingCage,
      CLIENT_IMAGES.balesWarehouseStack,
      CLIENT_IMAGES.fashionLaceSilkCart,
    ],
    duration: null,
    location: 'Inspection Floor',
    features: ['Latest Design Arrival (Photo Gallery)', 'Modern slim & regular cuts', '100% cotton & stretch blends'],
  },
  {
    id: 'cream-activewear-gym-apparel',
    categoryId: 'cream-grade',
    title: 'Cream Branded Activewear & Gym Set',
    grade: 'Cream (Grade AAA)',
    baleWeight: '45kg bale',
    pieceCount: '~150-170 pieces',
    origin: 'UK & Australia',
    description: 'High-performance sportswear: compression leggings, gym tanks, moisture-wicking tees, and training shorts.',
    videoUrl: VIDEO_ASSETS.clientShowcase,
    images: [
      CLIENT_IMAGES.summerColorCart,
      CLIENT_IMAGES.garmentSortingCage,
      CLIENT_IMAGES.balesWarehouseStack,
    ],
    duration: '0:48',
    location: 'Main Plant Sharjah',
    features: ['Top athletic brand labels', 'Quick dry & stretch elasticity', 'Unisex assortment'],
  },

  // 2. TROPICAL SUMMER MIX (GRADE A)
  {
    id: 'grade-a-mens-printed-tshirts',
    categoryId: 'tropical-summer',
    title: 'Grade A Mens Printed & Plain T-Shirts',
    grade: 'Export Grade A',
    baleWeight: '55kg / 80kg bales',
    pieceCount: '~220-250 pieces (55kg)',
    origin: 'GCC & Europe Streams',
    description: 'High-turnover summer t-shirts in great wearable condition. Pop culture graphics, sports prints, and plain basics.',
    videoUrl: VIDEO_ASSETS.baling,
    images: [
      CLIENT_IMAGES.garmentSortingCage,
      CLIENT_IMAGES.balesWarehouseStack,
      CLIENT_IMAGES.summerColorCart,
    ],
    duration: '1:10',
    location: 'Baling Unit #1',
    features: ['Fastest selling wholesale item', '100% cotton composition', 'Bright, unfaded colors'],
  },
  {
    id: 'grade-a-tropical-cotton-shirts',
    categoryId: 'tropical-summer',
    title: 'Grade A Casual Cotton & Linen Shirts',
    grade: 'Export Grade A',
    baleWeight: '55kg bale',
    pieceCount: '~160-180 pieces',
    origin: 'Europe & GCC',
    description: 'Men short and long sleeve casual button-down shirts suited for hot climates. Checked, striped, and plain styles.',
    videoUrl: VIDEO_ASSETS.grading,
    images: [
      CLIENT_IMAGES.garmentSortingCage,
      CLIENT_IMAGES.summerColorCart,
      CLIENT_IMAGES.balesWarehouseStack,
    ],
    duration: '0:52',
    location: 'Grading Floor A',
    features: ['Breathable lightweight cotton', 'All buttons attached', 'Varied sizing mix (M, L, XL)'],
  },
  {
    id: 'grade-a-summer-shorts-cargo',
    categoryId: 'tropical-summer',
    title: 'Grade A Mens Cargo & Denim Shorts',
    grade: 'Export Grade A',
    baleWeight: '55kg bale',
    pieceCount: '~120-135 pieces',
    origin: 'USA & Australia',
    description: 'Denim jorts, multi-pocket cargo shorts, and chino shorts. Durable fabrics tailored for daily wear.',
    videoUrl: null, // Photo gallery arrival
    images: [
      CLIENT_IMAGES.summerColorCart,
      CLIENT_IMAGES.garmentSortingCage,
      CLIENT_IMAGES.balesWarehouseStack,
    ],
    duration: null,
    location: 'Sharjah Sorting & Packing Bay',
    features: ['Sturdy functional zippers', 'High cargo demand in West Africa', 'Reinforced stitching'],
  },
  {
    id: 'grade-a-tropical-ladies-mix',
    categoryId: 'tropical-summer',
    title: 'Grade A Tropical Ladies Wear Mix',
    grade: 'Export Grade A',
    baleWeight: '55kg bale',
    pieceCount: '~170-190 pieces',
    origin: 'Europe & Australia',
    description: 'Diverse combination of ladies skirts, light summer blouses, capri pants, and day dresses.',
    videoUrl: VIDEO_ASSETS.sorting,
    images: [
      CLIENT_IMAGES.summerColorCart,
      CLIENT_IMAGES.fashionLaceSilkCart,
      CLIENT_IMAGES.garmentSortingCage,
    ],
    duration: '0:50',
    location: 'Facility Conveyor Line',
    features: ['Vibrant African market colors', 'Comfortable cotton & rayon', 'High resale profit margin'],
  },

  // 3. USED SHOES & SNEAKERS
  {
    id: 'shoes-athletic-running-sneakers',
    categoryId: 'shoes-footwear',
    title: 'Paired Athletic & Running Sneakers',
    grade: 'Grade A Paired',
    baleWeight: '25kg transparent sack',
    pieceCount: '~25-30 pairs per sack',
    origin: 'USA, UK & Europe',
    description: 'Top athletic brand running, basketball, and lifestyle trainers. Clean outsoles, tied together in pairs with laces intact.',
    videoUrl: VIDEO_ASSETS.grading,
    images: [
      CLIENT_IMAGES.balesWarehouseStack,
      CLIENT_IMAGES.garmentSortingCage,
      CLIENT_IMAGES.summerColorCart,
    ],
    duration: '1:15',
    location: 'Shoe Division Unit 3',
    features: ['Clean air soles & grips', 'Zero un-paired singles', 'Branded sneaker proportion > 80%'],
  },
  {
    id: 'shoes-mens-leather-formal',
    categoryId: 'shoes-footwear',
    title: 'Mens Formal Leather Oxfords & Loafers',
    grade: 'Grade A Paired',
    baleWeight: '25kg sack',
    pieceCount: '~22-26 pairs per sack',
    origin: 'UK & Italy',
    description: 'Genuine leather business shoes, brogues, and dress loafers. Well-maintained heels, clean uppers, and solid soles.',
    videoUrl: VIDEO_ASSETS.sorting,
    images: [
      CLIENT_IMAGES.balesWarehouseStack,
      CLIENT_IMAGES.garmentSortingCage,
    ],
    duration: '0:58',
    location: 'Specialty Footwear Bay',
    features: ['Genuine leather construction', 'Good heel & sole condition', 'Popular sizes 41 to 45 EUR'],
  },
  {
    id: 'shoes-casual-canvas-slipon',
    categoryId: 'shoes-footwear',
    title: 'Casual Canvas, Skate & Slip-On Shoes',
    grade: 'Grade A/B Paired',
    baleWeight: '25kg sack',
    pieceCount: '~30-35 pairs per sack',
    origin: 'USA & Australia',
    description: 'Trendy skate shoes, low-top canvas sneakers, and slip-on espadrilles. Highly popular for youth resale markets.',
    videoUrl: null, // New design photo arrival
    images: [
      CLIENT_IMAGES.balesWarehouseStack,
      CLIENT_IMAGES.summerColorCart,
    ],
    duration: null,
    location: 'Sorting Line 2',
    features: ['Rubber vulcanized soles', 'Clean insoles', 'Lightweight for economical freight'],
  },

  // 4. VINTAGE & STREETWEAR
  {
    id: 'vintage-90s-heavy-graphic-tees',
    categoryId: 'vintage-streetwear',
    title: 'Vintage 90s Single-Stitch Graphic Tees',
    grade: 'Curated Premium',
    baleWeight: '35kg specialty box',
    pieceCount: '~100-115 pieces',
    origin: 'USA Collections',
    description: 'Authentic 90s vintage t-shirts featuring rock bands, motorsports, collegiate athletics, and vintage movie graphics.',
    videoUrl: VIDEO_ASSETS.clientShowcase,
    images: [
      CLIENT_IMAGES.garmentSortingCage,
      CLIENT_IMAGES.fashionLaceSilkCart,
      CLIENT_IMAGES.balesWarehouseStack,
    ],
    duration: '0:55',
    location: 'Vintage Curation Room',
    features: ['Authentic single stitch & fades', 'High collector valuation', 'Screen-printed heavy cotton'],
  },
  {
    id: 'vintage-heavyweight-workwear-jackets',
    categoryId: 'vintage-streetwear',
    title: 'Vintage Canvas & Workwear Jackets',
    grade: 'Curated Premium',
    baleWeight: '45kg bale',
    pieceCount: '~35-42 pieces',
    origin: 'USA & Europe',
    description: 'Heavy duck canvas work jackets, chore coats, and insulated barn jackets with natural distressing and brass hardware.',
    videoUrl: VIDEO_ASSETS.grading,
    images: [
      CLIENT_IMAGES.balesWarehouseStack,
      CLIENT_IMAGES.garmentSortingCage,
    ],
    duration: '1:10',
    location: 'Vintage Floor B',
    features: ['Rugged heavy canvas', 'Heavy duty brass zippers', 'Top trend in boutique retail'],
  },
  {
    id: 'vintage-retro-denim-jackets',
    categoryId: 'vintage-streetwear',
    title: 'Vintage Retro Denim & Trucker Jackets',
    grade: 'Curated Premium',
    baleWeight: '45kg bale',
    pieceCount: '~40-50 pieces',
    origin: 'USA & Western Europe',
    description: 'Classic trucker denim jackets with stonewash, acid wash, and raw indigo finishes. All metal shank buttons intact.',
    videoUrl: VIDEO_ASSETS.baling,
    images: [
      CLIENT_IMAGES.balesWarehouseStack,
      CLIENT_IMAGES.garmentSortingCage,
      CLIENT_IMAGES.fashionLaceSilkCart,
    ],
    duration: '0:50',
    location: 'Baling Room #3',
    features: ['Classic vintage washes', 'Heavyweight authentic denim', 'Timeless unisex styling'],
  },

  // 5. BAGS & ACCESSORIES
  {
    id: 'bags-ladies-leather-handbags',
    categoryId: 'bags-accessories',
    title: 'Grade A Ladies Fashion Handbags & Totes',
    grade: 'Export Grade A',
    baleWeight: '30kg clear sack',
    pieceCount: '~35-45 bags per sack',
    origin: 'Europe & GCC',
    description: 'Crossbody bags, shoulder bags, and spacious shopping totes. Tested zippers, clean interior linings, sturdy handles.',
    videoUrl: VIDEO_ASSETS.sorting,
    images: [
      CLIENT_IMAGES.fashionLaceSilkCart,
      CLIENT_IMAGES.summerColorCart,
      CLIENT_IMAGES.balesWarehouseStack,
    ],
    duration: '0:45',
    location: 'Accessories Dept.',
    features: ['Inspected hardware & zippers', 'Clean lining with zero residue', 'Designer & leather blend'],
  },
  {
    id: 'bags-backpacks-school-travel',
    categoryId: 'bags-accessories',
    title: 'Grade A Travel Backpacks & Daypacks',
    grade: 'Export Grade A',
    baleWeight: '30kg sack',
    pieceCount: '~30-38 bags per sack',
    origin: 'Europe & USA',
    description: 'Multi-compartment nylon backpacks, student daypacks, and travel carry bags with padded shoulder straps.',
    videoUrl: null, // Photo gallery arrival
    images: [
      CLIENT_IMAGES.balesWarehouseStack,
      CLIENT_IMAGES.garmentSortingCage,
    ],
    duration: null,
    location: 'Logistics Bay',
    features: ['High back-to-school demand', 'Heavy duty nylon & polyester', 'Padded laptop sleeves'],
  },
  {
    id: 'accessories-genuine-leather-belts',
    categoryId: 'bags-accessories',
    title: 'Assorted Genuine Leather Belts',
    grade: 'Export Grade A',
    baleWeight: '25kg bundle',
    pieceCount: '~120-140 pieces',
    origin: 'UK & Western Europe',
    description: 'Men and women genuine leather belts in black, brown, and tan. Sturdy metal buckles and clean edges.',
    videoUrl: VIDEO_ASSETS.baling,
    images: [
      CLIENT_IMAGES.balesWarehouseStack,
      CLIENT_IMAGES.garmentSortingCage,
    ],
    duration: '0:40',
    location: 'Packing Station',
    features: ['Real leather proportion > 90%', 'Tested buckle mechanisms', 'Fast wholesale turnaround'],
  },

  // 6. WINTER OUTERWEAR
  {
    id: 'winter-puffer-down-jackets',
    categoryId: 'winter-outerwear',
    title: 'Grade A Down & Puffer Winter Jackets',
    grade: 'Grade A & B',
    baleWeight: '45kg waterproof bale',
    pieceCount: '~35-45 pieces',
    origin: 'UK & Canada',
    description: 'Thermal insulated winter parkas and down jackets. Heavy water-repellent shells, hood trims, and smooth zippers.',
    videoUrl: VIDEO_ASSETS.baling,
    images: [
      CLIENT_IMAGES.balesWarehouseStack,
      CLIENT_IMAGES.garmentSortingCage,
    ],
    duration: '1:08',
    location: 'Winter Sorting Hub',
    features: ['High thermal insulation', 'Waterproof baling wrap', 'Sought after in cold regions'],
  },
  {
    id: 'winter-fleece-hoodies-knit',
    categoryId: 'winter-outerwear',
    title: 'Grade A Fleece Pullovers & Heavy Hoodies',
    grade: 'Export Grade A',
    baleWeight: '55kg bale',
    pieceCount: '~70-85 pieces',
    origin: 'Europe & USA',
    description: 'Warm fleece zip jackets, heavyweight cotton hoodies, and knit sweaters. Soft feel with zero shrinkage.',
    videoUrl: VIDEO_ASSETS.grading,
    images: [
      CLIENT_IMAGES.balesWarehouseStack,
      CLIENT_IMAGES.garmentSortingCage,
    ],
    duration: '0:54',
    location: 'Inspection Bay B',
    features: ['Thick brushed cotton fleece', 'Ribbed cuffs & hems', 'Excellent year-round demand'],
  },

  // 7. COTTON RECYCLING & WIPERS
  {
    id: 'recycling-white-cotton-wipers',
    categoryId: 'cotton-recycling',
    title: '100% White Cotton T-Shirt Industrial Wipers',
    grade: 'Industrial Recycled',
    baleWeight: '10kg polybag / 100kg bale',
    pieceCount: 'Cut 40x40cm pieces',
    origin: 'Processed at UAE Facility',
    description: 'Bleached and washed pure white cotton wipers cut to uniform wiping size. Free of buttons, snaps, and zippers.',
    videoUrl: VIDEO_ASSETS.sorting,
    images: [
      CLIENT_IMAGES.cottonTowelsWipers,
      CLIENT_IMAGES.balesWarehouseStack,
      CLIENT_IMAGES.garmentSortingCage,
    ],
    duration: '0:45',
    location: 'Recycling Processing Plant',
    features: ['Lint-free & super absorbent', 'Ideal for marine, aviation, workshops', '100% metal-free checked'],
  },
];

export default function Catalogue() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [categoryCopied, setCategoryCopied] = useState(false);
  const [activeMediaTab, setActiveMediaTab] = useState('video'); // 'video' | 'images'
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const videoRef = useRef(null);
  const { toast } = useToast();

  // Active Category from URL search params (?category=...)
  const activeCategoryId = searchParams.get('category') || 'all';

  // Read ?item= or ?product= or ?reel= from URL
  const activeItemId = searchParams.get('item') || searchParams.get('product') || searchParams.get('reel');

  // Handle SEO Meta tags
  useEffect(() => {
    const activeCatObj = CATALOGUE_CATEGORIES.find((c) => c.id === activeCategoryId);
    const categoryName = activeCatObj ? `${activeCatObj.label} | ` : '';
    const title = `${categoryName}Wholesale Product Catalogue & Videos | Usman Global F.Z.C.`;
    const description = 'Browse wholesale product catalogue with live video reels and latest design photo arrivals for Cream Grade, Tropical Mix, Paired Shoes, Vintage, and Bales exported worldwide from Sharjah, UAE.';
    document.title = title;

    const setMeta = (selector, attr, value, content) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, value);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', window.location.href);
  }, [activeCategoryId]);

  // Deep Link handling: Sync active item in URL with selectedProduct modal
  useEffect(() => {
    if (activeItemId) {
      const matched = CATALOGUE_PRODUCTS.find((p) => p.id === activeItemId);
      if (matched) {
        setSelectedProduct(matched);
        // Default to video if available, else images
        setActiveMediaTab(matched.videoUrl ? 'video' : 'images');
        setActiveImageIndex(0);
      }
    } else {
      setSelectedProduct(null);
    }
  }, [activeItemId]);

  // Set category filter in URL
  const handleSelectCategory = (catId) => {
    const nextParams = new URLSearchParams(searchParams);
    if (catId === 'all') {
      nextParams.delete('category');
    } else {
      nextParams.set('category', catId);
    }
    setSearchParams(nextParams, { replace: false });
  };

  // Open single product video/photo modal and update URL
  const handleOpenProduct = (product, initialTab) => {
    setSelectedProduct(product);
    const tabToUse = initialTab || (product.videoUrl ? 'video' : 'images');
    setActiveMediaTab(tabToUse);
    setActiveImageIndex(0);

    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('item', product.id);
    if (product.categoryId) {
      nextParams.set('category', product.categoryId);
    }
    setSearchParams(nextParams, { replace: false });
  };

  // Close modal and remove item from URL while keeping category filter intact
  const handleCloseProduct = () => {
    setSelectedProduct(null);
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete('item');
    nextParams.delete('product');
    nextParams.delete('reel');
    setSearchParams(nextParams, { replace: false });
  };

  // Construct absolute URL for single product
  const getProductShareUrl = (productId, categoryId) => {
    const base = window.location.origin + window.location.pathname;
    const catQuery = categoryId ? `category=${encodeURIComponent(categoryId)}&` : '';
    return `${base}?${catQuery}item=${encodeURIComponent(productId)}`;
  };

  // Construct absolute URL for category
  const getCategoryShareUrl = (categoryId) => {
    const base = window.location.origin + window.location.pathname;
    return categoryId && categoryId !== 'all'
      ? `${base}?category=${encodeURIComponent(categoryId)}`
      : base;
  };

  // Copy single product link to clipboard
  const handleCopyProductLink = async (product) => {
    const url = getProductShareUrl(product.id, product.categoryId);
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopiedLink(true);
      toast({
        title: 'Product Link Copied!',
        description: 'Send this direct link to buyers. When opened, this exact product media plays automatically.',
      });
      setTimeout(() => setCopiedLink(false), 3000);
    } catch {
      toast({
        title: 'Error copying link',
        description: 'Please copy the link directly from your browser.',
        variant: 'destructive',
      });
    }
  };

  // Copy Category Link to clipboard
  const handleCopyCategoryLink = async (catId) => {
    const url = getCategoryShareUrl(catId);
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCategoryCopied(true);
      toast({
        title: 'Category Link Copied!',
        description: 'Direct link copied. When opened by clients, only this category will be shown.',
      });
      setTimeout(() => setCategoryCopied(false), 3000);
    } catch {
      toast({
        title: 'Error copying category link',
        variant: 'destructive',
      });
    }
  };

  // Share Category on WhatsApp
  const handleShareCategoryOnWhatsApp = (categoryObj) => {
    const url = getCategoryShareUrl(categoryObj.id);
    const msg = `Hello, check out the complete catalogue of ${categoryObj.label} (${categoryObj.badge}) from Usman Global F.Z.C. with specifications and videos:\n${url}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // Social share URLs for Single Product
  const getWhatsAppShareUrl = (product) => {
    const url = getProductShareUrl(product.id, product.categoryId);
    const msg = `Watch product video & designs: "${product.title}" (${product.grade}) from Usman Global F.Z.C.:\n${url}`;
    return `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
  };

  const getFacebookShareUrl = (product) => {
    const url = getProductShareUrl(product.id, product.categoryId);
    return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  };

  const getXShareUrl = (product) => {
    const url = getProductShareUrl(product.id, product.categoryId);
    const text = `Watch product video and latest designs for ${product.title} (${product.grade}) - Usman Global F.Z.C.`;
    return `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
  };

  const getLinkedInShareUrl = (product) => {
    const url = getProductShareUrl(product.id, product.categoryId);
    return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  };

  const handleInstagramShare = (product) => {
    handleCopyProductLink(product);
    toast({
      title: 'Link Copied for Instagram',
      description: 'Opening Instagram so you can paste the product link in your direct message or story.',
    });
    window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer');
  };

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return CATALOGUE_PRODUCTS.filter((prod) => {
      // Category filter
      const matchesCategory = activeCategoryId === 'all' || prod.categoryId === activeCategoryId;

      // Search query filter
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        prod.title.toLowerCase().includes(q) ||
        prod.grade.toLowerCase().includes(q) ||
        prod.description.toLowerCase().includes(q) ||
        prod.origin.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategoryId, searchQuery]);

  // Current active category object
  const currentCategoryObj = CATALOGUE_CATEGORIES.find((c) => c.id === activeCategoryId);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      <main className="pt-[64px]">
        {/* CLEAN, SIMPLE HERO HEADER (NO ARTIFICIAL COUNTER METRICS) */}
        <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-primary/85 text-white py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-primary-foreground text-xs font-semibold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                Wholesale Product Catalogue &amp; Live Media
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-playfair leading-tight mb-3 text-white">
                Export Inventory &amp; Video Reels
              </h1>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                Filter by category on the left, search specific commodities, view quality videos alongside latest design photo arrivals, and share direct links with your international buyers.
              </p>
            </div>
          </div>
        </section>

        {/* TWO-COLUMN LAYOUT: LEFT SIDEBAR FILTERS + RIGHT PRODUCTS GRID */}
        <section className="py-10 bg-slate-50 min-h-[700px]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">

              {/* 1. LEFT SIDEBAR (STICKY FILTER & SEARCH BAR) */}
              <aside className="lg:col-span-1 lg:sticky lg:top-[120px] space-y-5">
                {/* Search Bar - Positioned Directly inside filter bar */}
                <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
                    Search Products
                  </label>
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. dresses, polo, shoes..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:bg-white focus:border-primary outline-none transition-all"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1"
                        title="Clear search"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Categories Menu */}
                <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <SlidersHorizontal className="w-3.5 h-3.5 text-primary" />
                      Categories
                    </span>
                    {(activeCategoryId !== 'all' || searchQuery) && (
                      <button
                        onClick={() => {
                          handleSelectCategory('all');
                          setSearchQuery('');
                        }}
                        className="text-[11px] text-primary hover:underline font-semibold"
                      >
                        Reset All
                      </button>
                    )}
                  </div>

                  <div className="space-y-1">
                    {/* All Categories Option */}
                    <button
                      onClick={() => handleSelectCategory('all')}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        activeCategoryId === 'all'
                          ? 'bg-slate-900 text-white shadow-sm'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Layers className="w-3.5 h-3.5" />
                        All Commodities
                      </span>
                      <span className={`text-[11px] px-2 py-0.5 rounded-full ${
                        activeCategoryId === 'all' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {CATALOGUE_PRODUCTS.length}
                      </span>
                    </button>

                    {/* Category List */}
                    {CATALOGUE_CATEGORIES.map((cat) => {
                      const count = CATALOGUE_PRODUCTS.filter((p) => p.categoryId === cat.id).length;
                      const isActive = activeCategoryId === cat.id;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => handleSelectCategory(cat.id)}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                            isActive
                              ? 'bg-primary text-primary-foreground shadow-sm'
                              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                          }`}
                        >
                          <span className="truncate pr-2">{cat.label}</span>
                          <span className={`text-[11px] px-2 py-0.5 rounded-full shrink-0 ${
                            isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                          }`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Dedicated Share Box For Active Category */}
                {currentCategoryObj && (
                  <div className="bg-primary/5 rounded-2xl border border-primary/20 p-4 shadow-sm">
                    <span className="text-[11px] font-bold text-primary uppercase tracking-wider block mb-1">
                      Share {currentCategoryObj.badge}
                    </span>
                    <p className="text-[11px] text-slate-600 mb-3">
                      Share this full category link with your buyer. When opened, only these products will be shown.
                    </p>
                    <div className="space-y-2">
                      <button
                        onClick={() => handleCopyCategoryLink(currentCategoryObj.id)}
                        className={`w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                          categoryCopied
                            ? 'bg-emerald-600 text-white border-emerald-500'
                            : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                        }`}
                      >
                        {categoryCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{categoryCopied ? 'Link Copied!' : 'Copy Category Link'}</span>
                      </button>

                      <button
                        onClick={() => handleShareCategoryOnWhatsApp(currentCategoryObj)}
                        className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold bg-[#25D366] hover:bg-[#20bd5a] text-white transition-all shadow-sm"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                        <span>Share on WhatsApp</span>
                      </button>
                    </div>
                  </div>
                )}
              </aside>

              {/* 2. RIGHT MAIN CONTENT: PRODUCTS GRID & CLEAR RESULTS STATUS */}
              <div className="lg:col-span-3 space-y-6">

                {/* Section Status & Current Filter Banner */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-primary uppercase tracking-wider">
                        {currentCategoryObj ? currentCategoryObj.badge : 'All Commodities'}
                      </span>
                      <span className="text-xs text-slate-300">•</span>
                      <span className="text-xs text-slate-500 font-medium">
                        {filteredProducts.length} {filteredProducts.length === 1 ? 'Product Found' : 'Products Found'}
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold font-playfair text-slate-900">
                      {currentCategoryObj ? currentCategoryObj.label : 'Wholesale Product Inventory'}
                    </h2>
                    {searchQuery && (
                      <p className="text-xs text-slate-600 mt-1">
                        Results matching search: <span className="font-semibold text-slate-900 bg-amber-100 px-1.5 py-0.5 rounded">"{searchQuery}"</span>
                      </p>
                    )}
                  </div>

                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="text-xs text-rose-600 hover:text-rose-700 font-semibold self-start sm:self-center bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200 transition-colors"
                    >
                      Clear Search
                    </button>
                  )}
                </div>

                {/* Empty State */}
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                    <Package className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                    <h3 className="text-lg font-bold font-playfair text-slate-900 mb-1">No products match your search</h3>
                    <p className="text-slate-500 text-xs max-w-sm mx-auto mb-5">
                      No commodities found for "{searchQuery}". Try clearing your search term or selecting another category.
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        handleSelectCategory('all');
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-semibold text-xs transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
                    </button>
                  </div>
                ) : (
                  /* Products Grid */
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    {filteredProducts.map((prod, i) => {
                      const hasVideo = !!prod.videoUrl;
                      const hasImages = prod.images && prod.images.length > 0;
                      const primaryThumbnail = prod.thumbnail || (hasImages ? prod.images[0] : '');

                      return (
                        <motion.div
                          key={prod.id}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.03 }}
                          className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-primary/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                        >
                          {/* 3:4 Media Container with Video / Photo Preview */}
                          <div
                            onClick={() => handleOpenProduct(prod)}
                            className="relative aspect-[3/4] w-full overflow-hidden bg-slate-950 cursor-pointer"
                          >
                            <img
                              src={primaryThumbnail}
                              alt={prod.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                            {/* Top Badges */}
                            <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 gap-2">
                              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-md text-white border border-white/15">
                                {prod.grade}
                              </span>

                              {/* Media Type Tag (Video / Photos) */}
                              <div className="flex items-center gap-1">
                                {hasVideo && (
                                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-600/90 text-white flex items-center gap-1 shadow-sm">
                                    <Video className="w-3 h-3" /> Video
                                  </span>
                                )}
                                {hasImages && (
                                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-black/70 text-white/90 flex items-center gap-1">
                                    <Images className="w-3 h-3" /> {prod.images.length}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Center Action Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center z-10">
                              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-primary/95 transition-all">
                                {hasVideo ? (
                                  <Play className="w-5 h-5 fill-white ml-0.5" />
                                ) : (
                                  <Images className="w-5 h-5" />
                                )}
                              </div>
                            </div>

                            {/* Bottom Title & Media Status on Thumbnail */}
                            <div className="absolute bottom-3 left-3 right-3 z-10">
                              <div className="text-[11px] text-accent font-semibold mb-0.5 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                                {prod.location}
                              </div>
                              <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug">
                                {prod.title}
                              </h3>
                            </div>
                          </div>

                          {/* Card Body: Specs & Action Buttons */}
                          <div className="p-4 flex-1 flex flex-col justify-between bg-white">
                            <div>
                              {/* Specs Box */}
                              <div className="space-y-1.5 mb-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[11px]">
                                <div className="flex items-center justify-between text-slate-500">
                                  <span className="font-medium text-slate-800">Bale Pack:</span>
                                  <span className="font-semibold text-slate-900">{prod.baleWeight}</span>
                                </div>
                                <div className="flex items-center justify-between text-slate-500">
                                  <span className="font-medium text-slate-800">Avg. Count:</span>
                                  <span className="truncate max-w-[140px] font-medium text-slate-900">{prod.pieceCount}</span>
                                </div>
                                <div className="flex items-center justify-between text-slate-500">
                                  <span className="font-medium text-slate-800">Origin:</span>
                                  <span className="truncate max-w-[140px] text-slate-700">{prod.origin}</span>
                                </div>
                              </div>

                              {/* Description */}
                              <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 mb-3">
                                {prod.description}
                              </p>
                            </div>

                            {/* Card Actions: View Media & Share Single Link */}
                            <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                              <button
                                onClick={() => handleOpenProduct(prod)}
                                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary/90 transition-colors whitespace-nowrap"
                              >
                                {hasVideo ? (
                                  <>
                                    <Play className="w-3.5 h-3.5 fill-current" />
                                    <span>Watch Video &amp; Designs</span>
                                  </>
                                ) : (
                                  <>
                                    <Images className="w-3.5 h-3.5" />
                                    <span>View Designs ({prod.images?.length || 0})</span>
                                  </>
                                )}
                              </button>

                              <button
                                onClick={() => handleCopyProductLink(prod)}
                                className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors shrink-0"
                                title="Copy direct product link"
                                aria-label="Copy product link"
                              >
                                <Share2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CONTAINER LOADING BANNER */}
        <section className="py-14 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="bg-gradient-to-r from-slate-900 to-primary/90 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
              <div className="relative z-10 max-w-3xl">
                <span className="inline-flex items-center gap-2 text-accent text-xs font-semibold uppercase tracking-wider mb-2">
                  <Truck className="w-4 h-4" /> Global Container Shipments
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-playfair mb-3">
                  Ordering Full 20ft or 40ft HQ Containers?
                </h3>
                <p className="text-white/80 text-xs sm:text-sm leading-relaxed mb-5">
                  We prepare tailored packing lists combining your exact requested categories. All shipments include official Bill of Lading, Certificate of Origin, Phytosanitary / Fumigation certificates, and customs clearance support.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all text-xs whitespace-nowrap"
                  >
                    Request Custom Container Quotation <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <a
                    href="https://wa.me/971549969994"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition-all text-xs border border-white/20 whitespace-nowrap"
                  >
                    WhatsApp Export Desk: +971 54 996 9994
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* SINGLE PRODUCT VIDEO & PHOTO MODAL (WITH DUAL VIDEO/GALLERY TOGGLE) */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseProduct}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

              {/* Modal Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.25 }}
                className="relative w-full max-w-5xl bg-slate-950/95 border border-white/15 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row backdrop-blur-2xl max-h-[92vh] md:max-h-[880px]"
              >
                {/* Close Button */}
                <button
                  onClick={handleCloseProduct}
                  className="absolute top-3.5 right-3.5 z-40 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white transition-all flex items-center justify-center border border-white/15 hover:scale-105"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* LEFT SIDE: MEDIA VIEWER (SWITCH BETWEEN VIDEO REEL AND DESIGN PHOTOS) */}
                <div className="relative w-full md:w-[480px] shrink-0 bg-black flex flex-col items-center justify-center overflow-hidden aspect-[480/848] max-h-[60vh] md:max-h-[848px]">
                  
                  {/* TOP MEDIA SWITCHER TAB (IF PRODUCT HAS BOTH VIDEO AND PHOTOS) */}
                  <div className="absolute top-3 left-3 right-3 z-30 flex items-center justify-between gap-2">
                    <div className="flex items-center p-1 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 shadow-lg">
                      {selectedProduct.videoUrl && (
                        <button
                          onClick={() => setActiveMediaTab('video')}
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                            activeMediaTab === 'video'
                              ? 'bg-primary text-white shadow-sm'
                              : 'text-white/70 hover:text-white'
                          }`}
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>Video Reel</span>
                        </button>
                      )}

                      {selectedProduct.images && selectedProduct.images.length > 0 && (
                        <button
                          onClick={() => setActiveMediaTab('images')}
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                            activeMediaTab === 'images'
                              ? 'bg-primary text-white shadow-sm'
                              : 'text-white/70 hover:text-white'
                          }`}
                        >
                          <Images className="w-3.5 h-3.5" />
                          <span>Photos ({selectedProduct.images.length})</span>
                        </button>
                      )}
                    </div>

                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-black/75 text-white backdrop-blur-md border border-white/15 hidden sm:inline-block">
                      {selectedProduct.grade}
                    </span>
                  </div>

                  {/* 1. VIDEO VIEW */}
                  {activeMediaTab === 'video' && selectedProduct.videoUrl && (
                    <div className="relative w-full h-full flex items-center justify-center bg-black">
                      <video
                        ref={videoRef}
                        key={selectedProduct.videoUrl}
                        src={selectedProduct.videoUrl}
                        width="480"
                        height="848"
                        className="w-full h-full max-w-[480px] max-h-[848px] object-contain"
                        autoPlay
                        loop
                        playsInline
                        muted={isMuted}
                        controls
                      />

                      {/* Sound Toggle Button */}
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="absolute bottom-3 right-3 z-20 w-8 h-8 rounded-full bg-black/70 hover:bg-black text-white transition-all flex items-center justify-center border border-white/20 hover:scale-105"
                        title={isMuted ? 'Unmute' : 'Mute'}
                      >
                        {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                      </button>
                    </div>
                  )}

                  {/* 2. PHOTO GALLERY VIEW (WHEN IMAGES SELECTED OR VIDEO NOT YET SHOT) */}
                  {activeMediaTab === 'images' && selectedProduct.images && selectedProduct.images.length > 0 && (
                    <div className="relative w-full h-full flex flex-col items-center justify-between p-2">
                      {/* Main Image Display with Next/Prev Buttons */}
                      <div className="relative w-full flex-1 flex items-center justify-center overflow-hidden rounded-2xl mt-12 mb-2">
                        <img
                          key={selectedProduct.images[activeImageIndex]}
                          src={selectedProduct.images[activeImageIndex]}
                          alt={`${selectedProduct.title} - Design ${activeImageIndex + 1}`}
                          className="w-full h-full max-h-[720px] object-contain rounded-xl"
                        />

                      {/* Previous Image Arrow */}
                      {selectedProduct.images.length > 1 && (
                        <button
                          onClick={() =>
                            setActiveImageIndex((prev) =>
                              prev === 0 ? selectedProduct.images.length - 1 : prev - 1
                            )
                          }
                          className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-all hover:scale-105"
                          title="Previous design"
                          aria-label="Previous photo"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                      )}

                      {/* Next Image Arrow */}
                      {selectedProduct.images.length > 1 && (
                        <button
                          onClick={() =>
                            setActiveImageIndex((prev) =>
                              prev === selectedProduct.images.length - 1 ? 0 : prev + 1
                            )
                          }
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-all hover:scale-105"
                          title="Next design"
                          aria-label="Next photo"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      )}

                      {/* Image Index Indicator */}
                      <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-white text-[10px] font-medium border border-white/10">
                        Design {activeImageIndex + 1} of {selectedProduct.images.length}
                      </div>
                    </div>

                    {/* Thumbnail Strip (Click to switch image instantly) */}
                    {selectedProduct.images.length > 1 && (
                      <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 px-2 z-20">
                        {selectedProduct.images.map((img, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveImageIndex(idx)}
                            className={`w-11 h-11 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                              activeImageIndex === idx
                                ? 'border-primary scale-105 shadow-md'
                                : 'border-white/20 opacity-60 hover:opacity-100'
                            }`}
                          >
                            <img src={img} alt="thumb" className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* RIGHT SIDE: PRODUCT DETAILS & SHARE WIDGETS */}
              <div className="flex-1 min-w-0 p-6 sm:p-7 flex flex-col justify-between text-white overflow-y-auto">
                <div>
                  {/* Origin tag */}
                  <div className="flex items-center gap-2 text-[11px] text-accent font-semibold uppercase tracking-wider mb-2">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    {selectedProduct.origin} • {selectedProduct.location}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold font-playfair leading-tight mb-2 text-white">
                    {selectedProduct.title}
                  </h3>

                  {/* Specs Pill Summary */}
                  <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs mb-4">
                    <div>
                      <span className="text-white/50 block text-[10px] uppercase">Standard Packing</span>
                      <span className="font-semibold text-white">{selectedProduct.baleWeight}</span>
                    </div>
                    <div>
                      <span className="text-white/50 block text-[10px] uppercase">Approx. Count</span>
                      <span className="font-semibold text-white">{selectedProduct.pieceCount}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                    {selectedProduct.description}
                  </p>

                  {/* Features List */}
                  {selectedProduct.features && (
                    <ul className="space-y-1 mb-5">
                      {selectedProduct.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-1.5 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* SHARE THIS PRODUCT LINK */}
                  <div className="bg-slate-900/90 rounded-2xl p-4 border border-white/10 mb-4">
                    <div className="text-xs font-bold text-white uppercase tracking-wider mb-2.5 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Share2 className="w-3.5 h-3.5 text-accent" />
                        Share Single Product Link:
                      </span>
                      <span className="text-[10px] text-slate-400 font-normal">Direct video/photo link</span>
                    </div>

                    {/* URL Input Bar with Copy Button */}
                    <div className="flex items-center bg-slate-950 rounded-xl p-1 border border-white/10 mb-3">
                      <div className="flex items-center gap-2 px-2.5 text-slate-400 shrink-0">
                        <LinkIcon className="w-3.5 h-3.5" />
                      </div>
                      <input
                        type="text"
                        readOnly
                        value={getProductShareUrl(selectedProduct.id, selectedProduct.categoryId)}
                        className="bg-transparent text-xs text-slate-200 outline-none w-full truncate select-all pr-2"
                      />
                      <button
                        onClick={() => handleCopyProductLink(selectedProduct)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                          copiedLink
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white/15 hover:bg-white/25 text-white'
                        }`}
                        title="Copy direct product link"
                      >
                        {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedLink ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>

                    {/* Social Media Share Icons (WhatsApp, Facebook, Insta, X, LinkedIn) */}
                    <div className="flex items-center justify-between gap-2">
                      {/* WhatsApp */}
                      <a
                        href={getWhatsAppShareUrl(selectedProduct)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366] text-[#25D366] hover:text-white transition-all duration-200 flex items-center justify-center border border-[#25D366]/30 hover:scale-110 active:scale-95 shadow-sm"
                        title="Share this product on WhatsApp"
                        aria-label="Share on WhatsApp"
                      >
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                      </a>

                      {/* Facebook */}
                      <a
                        href={getFacebookShareUrl(selectedProduct)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#1877F2]/15 hover:bg-[#1877F2] text-[#1877F2] hover:text-white transition-all duration-200 flex items-center justify-center border border-[#1877F2]/30 hover:scale-110 active:scale-95 shadow-sm"
                        title="Share on Facebook"
                        aria-label="Share on Facebook"
                      >
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </a>

                      {/* Instagram */}
                      <button
                        onClick={() => handleInstagramShare(selectedProduct)}
                        className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-pink-500/15 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] text-pink-400 hover:text-white transition-all duration-200 flex items-center justify-center border border-pink-500/30 hover:scale-110 active:scale-95 shadow-sm"
                        title="Share on Instagram (Copies link & opens Instagram)"
                        aria-label="Share on Instagram"
                      >
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </button>

                      {/* X (formerly Twitter) */}
                      <a
                        href={getXShareUrl(selectedProduct)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/10 hover:bg-white text-white hover:text-black transition-all duration-200 flex items-center justify-center border border-white/20 hover:scale-110 active:scale-95 shadow-sm"
                        title="Share on X"
                        aria-label="Share on X"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </a>

                      {/* LinkedIn */}
                      <a
                        href={getLinkedInShareUrl(selectedProduct)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#0A66C2]/15 hover:bg-[#0A66C2] text-[#0A66C2] hover:text-white transition-all duration-200 flex items-center justify-center border border-[#0A66C2]/30 hover:scale-110 active:scale-95 shadow-sm"
                        title="Share on LinkedIn"
                        aria-label="Share on LinkedIn"
                      >
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.77v8.37H6.46v-8.37M7.84 6.2a1.62 1.62 0 1 0 1.63 1.62A1.63 1.63 0 0 0 7.84 6.2z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Direct Single-Line WhatsApp CTA Button */}
                <div className="pt-2">
                  <a
                    href={`https://wa.me/971549969994?text=${encodeURIComponent(
                      `Hello Usman Global, I watched the product video & designs for: "${selectedProduct.title}" (${selectedProduct.grade}). I am interested in inquiring about bale pricing and container availability.\nLink: ${getProductShareUrl(selectedProduct.id, selectedProduct.categoryId)}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-lg shadow-emerald-950/40 hover:shadow-emerald-900/60 whitespace-nowrap"
                  >
                    <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    <span>Inquire About This Stock</span>
                    <ArrowRight className="w-4 h-4 ml-0.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
