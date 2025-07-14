import React, { useState } from 'react';
import { 
  Heart, 
  Share2, 
  ShoppingCart, 
  Star, 
  TrendingUp, 
  Truck, 
  Shield, 
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  X,
  ThumbsUp,
  ThumbsDown,
  Send
} from 'lucide-react';

const productImages = [
  "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1883385/pexels-photo-1883385.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800"
];

const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    date: "2 days ago",
    comment: "Amazing quality! The fabric is soft and the fit is perfect. Highly recommend!",
    upvotes: 15,
    downvotes: 2
  },
  {
    id: 2,
    name: "Mike Chen",
    rating: 4,
    date: "1 week ago",
    comment: "Good quality hoodie, runs a bit large so consider sizing down. Great color options.",
    upvotes: 12,
    downvotes: 1
  },
  {
    id: 3,
    name: "Emma Davis",
    rating: 5,
    date: "2 weeks ago",
    comment: "Perfect for layering! The material is thick enough for cold weather but not too heavy.",
    upvotes: 18,
    downvotes: 0
  },
  {
    id: 4,
    name: "Alex Rodriguez",
    rating: 3,
    date: "3 weeks ago",
    comment: "Decent hoodie but the color faded after a few washes. Expected better quality for the price.",
    upvotes: 5,
    downvotes: 8
  },
  {
    id: 5,
    name: "Jessica Kim",
    rating: 5,
    date: "1 month ago",
    comment: "Love this hoodie! Super comfortable and the green color is exactly as shown. Will buy more colors!",
    upvotes: 22,
    downvotes: 1
  }
];

const priceHistory = [
  { date: "Jan 2024", price: 89.99 },
  { date: "Feb 2024", price: 84.99 },
  { date: "Mar 2024", price: 79.99 },
  { date: "Apr 2024", price: 74.99 },
  { date: "May 2024", price: 69.99 }
];

const reviewInsights = {
  liked: [
    "Soft and comfortable fabric",
    "Perfect fit and sizing",
    "Great color options",
    "Durable construction",
    "Excellent value for money"
  ],
  disliked: [
    "Some color fading after washing",
    "Runs slightly large",
    "Limited seasonal availability",
    "Shipping could be faster"
  ],
  whyBuy: [
    "Top-rated in comfort category",
    "Free shipping to your location",
    "30-day return policy",
    "Sustainable organic cotton",
    "Currently 22% off - lowest price in 6 months",
    "Perfect for your climate zone"
  ]
};

function App() {
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('Forest Green');
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [showPriceTrend, setShowPriceTrend] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeReviewTab, setActiveReviewTab] = useState('whyBuy');
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [reviewVotes, setReviewVotes] = useState<{[key: number]: {upvotes: number, downvotes: number, userVote: 'up' | 'down' | null}}>({});

  const colors = [
    { name: 'Forest Green', value: '#228B22', image: productImages[0] },
    { name: 'Navy Blue', value: '#000080', image: productImages[1] },
    { name: 'Charcoal Gray', value: '#36454F', image: productImages[2] },
    { name: 'Burgundy', value: '#800020', image: productImages[3] }
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  const handleVote = (reviewId: number, voteType: 'up' | 'down') => {
    setReviewVotes(prev => {
      const currentVote = prev[reviewId];
      const review = reviews.find(r => r.id === reviewId);
      if (!review) return prev;

      let newUpvotes = currentVote?.upvotes ?? review.upvotes;
      let newDownvotes = currentVote?.downvotes ?? review.downvotes;
      let newUserVote: 'up' | 'down' | null = voteType;

      // Remove previous vote if exists
      if (currentVote?.userVote === 'up') newUpvotes--;
      if (currentVote?.userVote === 'down') newDownvotes--;

      // Add new vote or remove if same
      if (currentVote?.userVote === voteType) {
        newUserVote = null;
      } else {
        if (voteType === 'up') newUpvotes++;
        if (voteType === 'down') newDownvotes++;
      }

      return {
        ...prev,
        [reviewId]: {
          upvotes: newUpvotes,
          downvotes: newDownvotes,
          userVote: newUserVote
        }
      };
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-white tracking-wide">SLAY</h1>
            </div>
            
            {/* Navigation Buttons */}
            <div className="hidden md:flex items-center space-x-6">
              <button className="text-white hover:text-[#B6F500] transition-colors font-medium">
                Shop
              </button>
              <button className="text-white hover:text-[#B6F500] transition-colors font-medium">
                Collections
              </button>
              <button className="text-white hover:text-[#B6F500] transition-colors font-medium">
                About
              </button>
              <button className="bg-[#B6F500] text-black px-4 py-2 rounded-lg font-semibold hover:bg-[#A5E600] transition-colors">
                SALE
              </button>
            </div>
            
            {/* Mobile and Desktop Cart/Wishlist */}
            <div className="flex items-center space-x-3">
              <div className="hidden md:block w-px h-6 bg-gray-700"></div>
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-800 rounded-full transition-colors text-white">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-gray-800 rounded-full transition-colors text-white">
                  <ShoppingCart className="w-5 h-5" />
                </button>
                {/* Mobile Menu Button */}
                <button className="md:hidden text-white p-2 ml-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src={productImages[currentImage]} 
                alt="Product" 
                className="w-full h-full object-cover"
              />
              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors shadow-md"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors shadow-md"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            
            {/* Thumbnail Images */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    currentImage === index ? 'border-[#B6F500]' : 'border-gray-200'
                  }`}
                >
                  <img src={image} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Premium Cotton Hoodie
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-4">
                <div className="flex items-center">
                  {renderStars(5)}
                  <span className="ml-2 text-sm text-gray-600">(4.8)</span>
                </div>
                <button 
                  onClick={() => window.scrollTo({ top: document.getElementById('reviews')?.offsetTop || 0, behavior: 'smooth' })}
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                >
                  See all 127 reviews
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4">
                <span className="text-2xl sm:text-3xl font-bold text-gray-900">$69.99</span>
                <span className="text-lg text-gray-500 line-through">$89.99</span>
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-md text-sm font-medium">22% OFF</span>
              </div>
              <button 
                onClick={() => setShowPriceTrend(true)}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
              >
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">View Price Trend</span>
              </button>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Color: {selectedColor}</h3>
              <div className="flex flex-wrap gap-3">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => {
                      setSelectedColor(color.name);
                      setCurrentImage(colors.indexOf(color));
                    }}
                    className={`w-12 h-12 rounded-full border-2 transition-all ${
                      selectedColor === color.name ? 'border-[#B6F500] scale-110' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Size: {selectedSize}</h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-lg transition-colors ${
                      selectedSize === size 
                        ? 'border-[#B6F500] bg-[#B6F500] text-black' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors flex items-center justify-center"
                >
                  -
                </button>
                <span className="w-16 text-center text-lg font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full bg-[#B6F500] text-black font-semibold py-3 px-6 rounded-lg hover:bg-[#A5E600] transition-colors flex items-center justify-center space-x-2">
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>
              <div className="flex space-x-3">
                <button 
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`flex-1 border-2 py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2 ${
                    isWishlisted 
                      ? 'border-red-500 bg-red-50 text-red-600' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  <span>Wishlist</span>
                </button>
                <button className="flex-1 border-2 border-gray-300 hover:border-gray-400 py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2">
                  <Share2 className="w-5 h-5" />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Product Features */}
            <div className="border-t pt-6">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                <div className="flex items-center space-x-2">
                  <Truck className="w-5 h-5 text-gray-600" />
                  <span className="text-sm text-gray-600">Free shipping</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-gray-600" />
                  <span className="text-sm text-gray-600">2-year warranty</span>
                </div>
                <div className="flex items-center space-x-2">
                  <RotateCcw className="w-5 h-5 text-gray-600" />
                  <span className="text-sm text-gray-600">30-day returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-6">Product Description</h2>
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-4">
              Crafted from premium 100% organic cotton, this hoodie combines comfort with sustainability. 
              The relaxed fit and soft brushed interior make it perfect for everyday wear, while the 
              durable construction ensures it will remain a wardrobe staple for years to come.
            </p>
            <ul className="text-gray-600 space-y-2">
              <li>• 100% organic cotton fleece</li>
              <li>• Drawstring hood with metal grommets</li>
              <li>• Kangaroo pocket</li>
              <li>• Ribbed cuffs and hem</li>
              <li>• Pre-shrunk to minimize shrinkage</li>
              <li>• Machine washable</li>
            </ul>
          </div>
        </div>

        {/* Reviews Section */}
        <div id="reviews" className="mt-12 border-t pt-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {renderStars(5)}
                <span className="ml-2 text-lg font-semibold">4.8</span>
                <span className="ml-1 text-gray-600">(127 reviews)</span>
              </div>
            </div>
          </div>

          {/* Review Insights Tabs */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={() => setActiveReviewTab('whyBuy')}
                className={`px-3 py-2 text-sm sm:px-4 sm:text-base rounded-lg font-medium transition-colors ${
                  activeReviewTab === 'whyBuy' 
                    ? 'bg-[#B6F500] text-black' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Why you should buy this
              </button>
              <button
                onClick={() => setActiveReviewTab('liked')}
                className={`px-3 py-2 text-sm sm:px-4 sm:text-base rounded-lg font-medium transition-colors ${
                  activeReviewTab === 'liked' 
                    ? 'bg-[#B6F500] text-black' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                What people liked
              </button>
              <button
                onClick={() => setActiveReviewTab('disliked')}
                className={`px-3 py-2 text-sm sm:px-4 sm:text-base rounded-lg font-medium transition-colors ${
                  activeReviewTab === 'disliked' 
                    ? 'bg-[#B6F500] text-black' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                What people disliked
              </button>
            </div>

            {/* Tab Content */}
            <div className="bg-gray-50 rounded-lg p-4">
              {activeReviewTab === 'whyBuy' && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Why this product is perfect for you:</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {reviewInsights.whyBuy.map((reason, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-[#B6F500] mt-1">✓</span>
                        <span className="text-gray-700">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {activeReviewTab === 'liked' && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Most appreciated features:</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {reviewInsights.liked.map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <ThumbsUp className="w-4 h-4 text-green-600 mt-1" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {activeReviewTab === 'disliked' && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Areas for improvement:</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {reviewInsights.disliked.map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <ThumbsDown className="w-4 h-4 text-red-600 mt-1" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Write a Review */}
          <div className="mb-8 bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
                <div className="flex space-x-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setNewRating(i + 1)}
                      className="focus:outline-none"
                    >
                      <Star 
                        className={`w-6 h-6 ${i < newRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
                <textarea
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  placeholder="Share your experience with this product..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B6F500] focus:border-transparent resize-none"
                  rows={4}
                />
              </div>
              <button className="bg-[#B6F500] text-black px-6 py-2 rounded-lg font-medium hover:bg-[#A5E600] transition-colors flex items-center space-x-2">
                <Send className="w-4 h-4" />
                <span>Submit Review</span>
              </button>
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-6">
            {reviews.map((review) => {
              const voteData = reviewVotes[review.id];
              const upvotes = voteData?.upvotes ?? review.upvotes;
              const downvotes = voteData?.downvotes ?? review.downvotes;
              const userVote = voteData?.userVote;
              
              return (
                <div key={review.id} className="border-b pb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <span className="font-semibold">{review.name}</span>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <div className="flex items-center">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3">{review.comment}</p>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                    <button 
                      onClick={() => handleVote(review.id, 'up')}
                      className={`flex items-center space-x-1 px-3 py-1 rounded-lg transition-colors ${
                        userVote === 'up' 
                          ? 'bg-green-100 text-green-700' 
                          : 'hover:bg-gray-100 text-gray-600'
                      }`}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-sm font-medium">{upvotes}</span>
                    </button>
                    <button 
                      onClick={() => handleVote(review.id, 'down')}
                      className={`flex items-center space-x-1 px-3 py-1 rounded-lg transition-colors ${
                        userVote === 'down' 
                          ? 'bg-red-100 text-red-700' 
                          : 'hover:bg-gray-100 text-gray-600'
                      }`}
                    >
                      <ThumbsDown className="w-4 h-4" />
                      <span className="text-sm font-medium">{downvotes}</span>
                    </button>
                    <span className="text-xs sm:text-sm text-gray-500">
                      Net score: +{upvotes - downvotes}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Price Trend Modal */}
      {showPriceTrend && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-4 sm:p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Price Trend</h3>
              <button 
                onClick={() => setShowPriceTrend(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3">
              {priceHistory.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                  <span className="text-sm text-gray-600">{item.date}</span>
                  <span className="font-semibold">${item.price}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800">
                💰 Current price is the lowest in the last 6 months!
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">SLAY</h3>
              <p className="text-gray-400 text-sm">Premium fashion for the modern lifestyle.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Shop</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Best Sellers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sale</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Size Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Follow Us</h4>
              <div className="flex space-x-3">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-center">
            <p className="text-sm text-gray-400">&copy; 2024 SLAY. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
