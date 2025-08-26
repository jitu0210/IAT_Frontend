import React, { useState, useEffect } from "react";

const PageNotFound = () => {
  const [progress, setProgress] = useState(0);
  const [showAlien, setShowAlien] = useState(false);
  const [coffeeSpill, setCoffeeSpill] = useState(false);

  useEffect(() => {
    // Simulate progress
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 800);

    // Random alien appearance
    const alienTimer = setInterval(() => {
      setShowAlien(true);
      setTimeout(() => setShowAlien(false), 3000);
    }, 8000);

    // Coffee spill animation
    const coffeeTimer = setInterval(() => {
      setCoffeeSpill(true);
      setTimeout(() => setCoffeeSpill(false), 2000);
    }, 12000);

    return () => {
      clearInterval(timer);
      clearInterval(alienTimer);
      clearInterval(coffeeTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-blue-950 text-blue-400 flex flex-col items-center justify-center p-4 font-sans overflow-hidden relative">
      {/* Stars background */}
      <div className="absolute inset-0 z-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
              animationDuration: `${Math.random() * 3 + 1}s`
            }}
          ></div>
        ))}
      </div>

      <div className="text-center max-w-2xl mx-auto relative z-10 my-8">
        {/* Construction Indicator */}
        <div className="relative mb-10">
          <div className="w-40 h-40 mx-auto relative flex items-center justify-center">
            <div className="w-24 h-24 bg-blue-700 rounded-full animate-pulse flex items-center justify-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full animate-spin border-4 border-blue-300 border-t-transparent"></div>
            </div>
            <div className="absolute top-2 -right-2 w-10 h-10 bg-blue-600 rounded-lg animate-bounce"></div>
            <div className="absolute bottom-2 -left-2 w-8 h-8 bg-blue-800 rounded-full animate-ping"></div>
          </div>
        </div>

        {/* Header */}
        <h1 className="text-5xl font-bold mb-6 text-blue-300">
          Under Construction!
        </h1>
        
        <h2 className="text-2xl font-semibold mb-6 text-blue-400">
          Our space cadets are building something amazing for you!
        </h2>
        
        <p className="text-lg mb-8 text-blue-200">
          This page is being crafted with care, caffeine, and cosmic energy.
          <br className="hidden sm:inline" />
          Please be patient while we defeat bugs and conquer code!
        </p>

        {/* Progress Bar with Funny Labels */}
        <div className="mb-10 bg-gray-900 rounded-full h-8 border border-blue-700 overflow-hidden relative">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-1000 ease-out rounded-full relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
              {progress < 30 && "Brewing Coffee..."}
              {progress >= 30 && progress < 50 && "Typing Really Fast..."}
              {progress >= 50 && progress < 70 && "Fighting Bugs..."}
              {progress >= 70 && progress < 90 && "Making It Look Pretty..."}
              {progress >= 90 && progress < 100 && "Adding Final Sparkles..."}
              {progress === 100 && "Done! (Just Kidding, More Work Needed)"}
            </div>
          </div>
        </div>
        <div className="text-sm text-blue-500 mb-12">
          {progress.toFixed(1)}% Complete (Probably)
        </div>

        {/* Coffee Spill Animation */}
        {coffeeSpill && (
          <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 text-blue-300 animate-bounce">
            <div className="relative text-center">
              <div className="text-lg font-bold">SPILL!</div>
              <div className="text-xs">(Coffee emergency detected)</div>
            </div>
          </div>
        )}

        {/* Funny Messages */}
        <div className="mb-10 p-6 bg-gray-900/80 backdrop-blur-sm rounded-2xl border-2 border-blue-700/50">
          <h3 className="text-xl font-bold mb-4 text-blue-300">Current Status:</h3>
          <div className="space-y-3 text-blue-200 text-lg">
            <p className="animate-pulse">Calculating the meaning of life...</p>
            <p className={progress > 20 ? "line-through text-blue-500" : ""}>✓ Found the missing semicolon</p>
            <p className={progress > 40 ? "line-through text-blue-500" : ""}>✓ Asked Stack Overflow for help</p>
            <p className={progress > 60 ? "line-through text-blue-500" : ""}>✓ Blamed it on a cosmic ray</p>
            <p className={progress > 80 ? "line-through text-blue-500" : ""}>✓ Turned it off and on again</p>
          </div>
        </div>

        {/* Alien Intervention */}
        {showAlien && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-900/90 p-6 rounded-2xl border-2 border-blue-500 z-20 animate-bounce">
            <div className="text-lg mb-2 text-blue-200">"I'm helping!"</div>
            <div className="text-xs text-blue-400">- Mysterious Space Helper</div>
          </div>
        )}

        {/* Countdown Timer (Fake) */}
        <div className="mb-10 p-5 bg-blue-900/40 rounded-xl">
          <h4 className="text-lg font-semibold mb-2 text-blue-300">Estimated Completion:</h4>
          <div className="text-2xl font-mono text-blue-200">
            {Math.floor(Math.random() * 23)}:{Math.floor(Math.random() * 59)}:{Math.floor(Math.random() * 59)}
          </div>
          <p className="text-sm text-blue-400 mt-2">(This timer is completely made up)</p>
        </div>

        {/* Developer Notes */}
        <div className="mb-8 p-5 bg-blue-800/20 rounded-xl border border-blue-600/30">
          <h4 className="text-lg font-semibold mb-2 text-blue-300">Developer's Notes:</h4>
          <p className="text-blue-200 text-sm italic">
            "I swear it worked on my machine. The universe must have shifted overnight."
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button 
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-blue-700 hover:bg-blue-600 text-white rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg font-medium"
          >
            Go Back to Safety
          </button>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-blue-300 rounded-lg transition-all duration-300 transform hover:-translate-y-1 border border-blue-600 font-medium"
          >
            Refresh (Maybe It's Done?)
          </button>
        </div>

        {/* Footer */}
        <div className="mt-10 p-5 bg-black/40 rounded-xl border border-blue-800/30">
          <p className="text-blue-400 mb-2">Made with care and excessive coffee by sleep-deprived developers</p>
          <p className="text-blue-500 text-sm">If you stare at this page long enough, it might actually finish loading</p>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="fixed bottom-10 left-10 w-6 h-6 bg-blue-600 rounded-lg opacity-70 animate-float"></div>
      <div className="fixed top-20 right-16 w-8 h-8 bg-blue-400 rounded-full opacity-80 animate-float" style={{animationDelay: '1.5s'}}></div>
      <div className="fixed top-1/3 left-20 w-4 h-4 bg-blue-300 rounded opacity-60 animate-float" style={{animationDelay: '2.5s'}}></div>
    </div>
  );
};

export default PageNotFound;