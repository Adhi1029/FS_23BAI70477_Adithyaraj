import ProductCard from '../components/ProductCard';

const PRODUCTS = [
  { id: 1, name: 'React Course', price: 50 },
  { id: 2, name: 'Redux Mastery', price: 40 },
  { id: 3, name: 'Vite Setup Guide', price: 10 },
  { id: 4, name: 'Tailwind CSS Pro', price: 35 },
  { id: 5, name: 'Web Performance', price: 45 },
  { id: 6, name: 'TypeScript Basics', price: 30 },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="container-max py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Discover Premium{' '}
            <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              Learning Courses
            </span>
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Master modern web development with our carefully curated collection of courses.
            Level up your skills with industry experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary px-8 py-3 text-lg">
              Start Learning
            </button>
            <button className="btn-secondary px-8 py-3 text-lg">
              Explore Courses
            </button>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="container-max py-12 md:py-20">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Available Courses
          </h2>
          <p className="text-gray-600">
            Choose from our selection of high-quality courses designed for every skill level.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 mt-20">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-white mb-4">EcommercePro</h3>
              <p className="text-sm">
                Premium learning platform for web developers.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Products</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Courses</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tutorials</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Resources</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2024 EcommercePro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}