import React from 'react';
import Navbar from '../Navbar';
import familyImg from '../../assets/familylmg.png';
import houseGif from '../../assets/house.gif';
import apkPreview from '../../assets/apkPreview.png';
import profileWomen from '../../assets/ProfileWomen.png';
import profileMale from '../../assets/profileMale.png';
import prasad from '../../assets/prasad.png';
import { FaSearch, FaFilter, FaMobileAlt, FaChartLine, FaBell, FaShieldAlt, FaHeart, FaRocket, FaCheckCircle, FaHandsHelping, FaStar, FaArrowRight, FaQuoteLeft, FaQuoteRight, FaGithub, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: <FaSearch className="text-3xl text-green-400 mb-2" />, 
    title: 'Intelligent Discovery', 
    desc: 'Effortlessly uncover hidden rental gems with our advanced, AI-powered search. Find homes that match your dreams, not just your filters.'
  },
  {
    icon: <FaFilter className="text-3xl text-green-400 mb-2" />, 
    title: 'Personalized Filters', 
    desc: 'Curate your perfect space with precision. Our smart filters adapt to your lifestyle, ensuring every result feels tailor-made.'
  },
  {
    icon: <FaMobileAlt className="text-3xl text-green-400 mb-2" />, 
    title: 'Instant Previews', 
    desc: 'Glance, decide, and move forward. See the essence of every property at a glance, saving you time and energy.'
  },
  {
    icon: <FaChartLine className="text-3xl text-green-400 mb-2" />, 
    title: 'Seamless Listings', 
    desc: 'List your property in moments. Our intuitive process empowers owners to showcase their spaces with elegance and ease.'
  },
  {
    icon: <FaBell className="text-3xl text-green-400 mb-2" />, 
    title: 'Real-Time Alerts', 
    desc: 'Never miss an opportunity. Get instant, personalized notifications for new matches, messages, and updates.'
  },
  {
    icon: <FaShieldAlt className="text-3xl text-green-400 mb-2" />, 
    title: 'Unmatched Trust', 
    desc: 'Experience peace of mind with verified listings, secure messaging, and a community built on integrity.'
  },
  {
    icon: <FaHeart className="text-3xl text-green-400 mb-2" />, 
    title: 'Curated Favorites', 
    desc: 'Save, compare, and revisit your top picks. Your journey is organized, delightful, and uniquely yours.'
  },
  {
    icon: <FaRocket className="text-3xl text-green-400 mb-2" />, 
    title: 'Mobile Mastery', 
    desc: 'Command your rental experience from anywhere. The StaySpot app puts the power of discovery in your pocket.'
  },
];

const testimonials = [
  {
    quote: 'Finding a rental was so easy with StaySpot. The listings were accurate and the process was smooth!',
    name: 'Koushik K',
    img: profileWomen
  },
  {
    quote: 'I rented out my property within a week of posting it here. Super convenient!',
    name: 'Boyapati Chandra',
    img: profileMale
  },
  {
    quote: 'StaySpot made my relocation stress-free. The support team was always there, and I found my dream home in days!',
    name: 'Aarushi S.',
    img: familyImg
  }
];

const SectionDivider = () => (
  <div className="w-full flex justify-center my-4">
    <div className="h-1 w-32 rounded-full bg-gradient-to-r from-green-400/60 via-white/10 to-green-400/60 blur-[1px]" />
  </div>
);

const AboutUs = () => {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <div className="w-full px-0 md:px-0 py-12 mt-24 flex flex-col gap-8">
        {/* Hero Section */}
        <section className="w-full flex flex-col md:flex-row items-center justify-between gap-12 bg-gradient-to-br from-zinc-900 via-zinc-800 to-green-100/10 rounded-2xl shadow-lg py-10 px-4 md:px-16">
          <div className="flex-1 min-w-[280px] flex flex-col justify-center items-center md:items-start text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
              Welcome to <span className="text-green-400">StaySpot</span>
            </h1>
            <p className="text-xl text-green-400 font-semibold mb-2">Your spot, your rules – Discover rentals your way.</p>
            <p className="text-base text-gray-300 mb-6 leading-relaxed">StaySpot is your trusted platform for finding and posting rental properties with ease, transparency, and a touch of fun. Whether you're searching for your next home or listing your property, we've got you covered!</p>
            <Link className="inline-flex items-center gap-2 bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-3 rounded-full font-semibold shadow hover:scale-105 transition" to="/browse-rentals">
              Start Exploring <FaArrowRight />
            </Link>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <img src={houseGif} alt="Find your perfect home" className="max-w-xs rounded-xl shadow-2xl border-4 border-green-400/30" />
          </div>
        </section>

        <SectionDivider />

        {/* What Makes Us Different - Responsive Grid, Fancy Words */}
        <section className="w-full bg-zinc-800/80 rounded-2xl py-10 px-4 md:px-16 shadow-inner">
          <h2 className="text-3xl font-bold text-green-400 text-center mb-8">What Makes Us Different?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-zinc-900 rounded-xl p-8 flex flex-col items-center shadow hover:scale-105 transition border border-green-400/10">
                {f.icon}
                <h3 className="text-lg font-bold text-green-400 mb-2 text-center">{f.title}</h3>
                <p className="text-gray-300 text-center text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <SectionDivider />

        {/* Our Mission & Values - Timeline/Story Section */}
        <section className="w-full bg-gradient-to-br from-green-900/40 to-zinc-900 rounded-2xl py-10 px-4 md:px-16 shadow-lg">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Our Mission & Values</h2>
          <div className="flex flex-col gap-10 max-w-3xl mx-auto">
            {[{
              icon: <FaShieldAlt className="text-2xl text-green-400" />, title: 'Building Trust', desc: 'We aim to establish trust and credibility in the rental market, allowing users to interact with confidence and ease. Every listing is verified for your peace of mind.'
            }, {
              icon: <FaHeart className="text-2xl text-green-400" />, title: 'Enhancing Experience', desc: 'We go beyond just connecting people. Our goal is to enhance the quality of your living experience by facilitating seamless, friendly, and transparent interactions.'
            }, {
              icon: <FaRocket className="text-2xl text-green-400" />, title: 'Innovating Constantly', desc: 'We continuously improve our platform to meet evolving needs, ensuring you have access to the latest tools and resources for a successful rental journey.'
            }, {
              icon: <FaCheckCircle className="text-2xl text-green-400" />, title: 'Easy & Supportive', desc: 'Our user-friendly interface and dedicated support team make the rental process hassle-free. We\'re here to help you at every step.'
            }].map((v, i) => (
              <div key={i} className="flex items-start gap-6">
                <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-full bg-green-400/20 border-2 border-green-400/30">
                  {v.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-400 mb-1">{v.title}</h3>
                  <p className="text-gray-200 leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <SectionDivider />

        {/* Testimonials Section - Use Human Images */}
        <section className="w-full bg-zinc-900/80 rounded-2xl py-10 px-4 md:px-16 shadow-inner border border-green-400/10">
          <h2 className="text-3xl font-bold text-green-400 text-center mb-8">What Our Users Say</h2>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-zinc-900 rounded-2xl p-8 flex flex-col items-center shadow max-w-sm mx-auto border border-green-400/10 hover:scale-105 transition">
                <FaQuoteLeft className="text-green-400 text-2xl mb-2" />
                <p className="text-gray-200 text-center mb-4 leading-relaxed">"{t.quote}"</p>
                <div className="flex items-center gap-3 mt-2">
                  <img src={t.img} alt={t.name} className="w-14 h-14 rounded-full border-2 border-green-400 object-cover" />
                  <span className="text-gray-300 font-semibold">- {t.name}</span>
                </div>
                <FaQuoteRight className="text-green-400 text-xl mt-2 self-end" />
              </div>
            ))}
          </div>
        </section>

        <SectionDivider />

        {/* About Myself Section */}
        <section className="w-full bg-white/10 backdrop-blur-md rounded-2xl py-10 px-4 md:px-16 shadow-2xl flex flex-col md:flex-row items-center justify-center gap-8">
          <img src={prasad} alt="Prasad Chowdary" className="w-32 h-32 rounded-full border-4 border-green-400 object-cover shadow-lg mx-auto md:mx-0" />
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-2xl font-bold text-green-400 mb-2">About Myself</h2>
            <h3 className="text-xl font-semibold text-white mb-1">Prasad Chowdary</h3>
            <p className="text-gray-200 mb-2">Lead Developer & Co-Founder</p>
            <p className="text-gray-300 max-w-xl leading-relaxed mx-auto md:mx-0 mb-4">
              Passionate about building delightful digital experiences and making renting effortless for everyone.
            </p>
            <div className="flex gap-6 mt-2">
              <a href="https://github.com/prasadNalajala" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-200 hover:text-green-400 transition">
                <FaGithub className="text-2xl" />
                <span className="hidden sm:inline">GitHub</span>
              </a>
              <a href="https://linkedin.com/in/prasad-nallajala" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-200 hover:text-green-400 transition">
                <FaLinkedin className="text-2xl" />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* App Download CTA */}
        <section className="w-full bg-gradient-to-br from-green-900/20 to-zinc-900 rounded-2xl shadow-lg py-10 px-4 md:px-16 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex-1 min-w-[280px]">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Download the <span className="text-green-400">StaySpot</span> App
            </h2>
            <p className="text-base text-gray-300 mb-6">Get instant access to new listings, manage your property, and stay connected with potential renters - all from your mobile device.</p>
            <a
              href="https://drive.google.com/file/d/1ZYmrV4nPTdDA3iOkOXRshdRtlAgAbfVN/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-3 rounded-full font-semibold shadow hover:scale-105 transition"
            >
              Download APK
            </a>
          </div>
          <div className="flex-1 flex justify-center">
            <img src={apkPreview} alt="StaySpot App Preview" className="max-w-xs rounded-xl shadow-2xl" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
