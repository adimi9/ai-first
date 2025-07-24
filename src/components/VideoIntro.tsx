import React from 'react'
import { Play } from 'lucide-react'

const VideoIntro = () => {
  return (
      <section className="relative py-24 bg-gradient-to-b from-black via-gray-900/50 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              AiCCELERATE
            </span>
              <span className="block text-white mt-2">Initiative</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Accelerating AI transformation across <span className="text-blue-400 font-semibold">Strategy</span>, <span className="text-purple-400 font-semibold">Corporate</span>, and <span className="text-cyan-400 font-semibold">Governance</span>
            </p>
          </div>

          <div className="flex justify-center">
            {/* Video Player */}
            <div className="relative w-full lg:max-w-3xl">
              <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/20">
                {/* Video Placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20">
                  <img
                      src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      alt="AI Strategy Meeting"
                      className="w-full h-full object-cover opacity-60"
                  />
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-110">
                    <Play className="h-12 w-12 text-white ml-1 group-hover:text-blue-400 transition-colors" fill="currentColor" />
                  </button>
                </div>

                {/* Video Duration Badge */}
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm font-medium">
                  3:42
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default VideoIntro