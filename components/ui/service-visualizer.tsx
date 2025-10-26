"use client"
import type React from "react"

interface ServiceVisualizerProps {
  title: string
  index: number
}

export const ServiceVisualizer: React.FC<ServiceVisualizerProps> = ({ title, index }) => {
  const visualizations: Record<number, React.ReactNode> = {
    0: (
      <div className="w-full h-full bg-white p-6 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="h-32 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">🏗️</div>
              <p className="text-sm text-blue-600 mt-2">Architectural Design</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    ),
    1: (
      <div className="w-full h-full bg-white p-6 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="h-32 bg-gradient-to-br from-amber-100 to-amber-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-600">🎨</div>
              <p className="text-sm text-amber-600 mt-2">Interior Design</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-300 rounded w-full"></div>
            <div className="h-3 bg-gray-300 rounded w-5/6"></div>
            <div className="h-3 bg-gray-300 rounded w-4/5"></div>
          </div>
        </div>
      </div>
    ),
    2: (
      <div className="w-full h-full bg-white p-6 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="h-32 bg-gradient-to-br from-green-100 to-green-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600">🌿</div>
              <p className="text-sm text-green-600 mt-2">Landscape Design</p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex-1 h-20 bg-green-200 rounded"></div>
            <div className="flex-1 h-20 bg-green-300 rounded"></div>
          </div>
        </div>
      </div>
    ),
    3: (
      <div className="w-full h-full bg-white p-6 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="h-32 bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600">🏙️</div>
              <p className="text-sm text-purple-600 mt-2">Urban Design</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-1">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="h-8 bg-purple-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    ),
    4: (
      <div className="w-full h-full bg-white p-6 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="h-32 bg-gradient-to-br from-orange-100 to-orange-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600">👷</div>
              <p className="text-sm text-orange-600 mt-2">Construction</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex gap-2">
              <div className="flex-1 h-4 bg-orange-300 rounded"></div>
              <div className="flex-1 h-4 bg-orange-200 rounded"></div>
            </div>
            <div className="flex gap-2">
              <div className="flex-1 h-4 bg-orange-200 rounded"></div>
              <div className="flex-1 h-4 bg-orange-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    ),
    5: (
      <div className="w-full h-full bg-white p-6 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="h-32 bg-gradient-to-br from-red-100 to-red-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600">📋</div>
              <p className="text-sm text-red-600 mt-2">Contract Admin</p>
            </div>
          </div>
          <div className="space-y-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-2 bg-red-200 rounded w-full"></div>
            ))}
          </div>
        </div>
      </div>
    ),
    6: (
      <div className="w-full h-full bg-white p-6 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="h-32 bg-gradient-to-br from-indigo-100 to-indigo-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600">💡</div>
              <p className="text-sm text-indigo-600 mt-2">Consultancy</p>
            </div>
          </div>
          <div className="flex items-end gap-2">
            <div className="flex-1 h-8 bg-indigo-300 rounded"></div>
            <div className="flex-1 h-12 bg-indigo-400 rounded"></div>
            <div className="flex-1 h-6 bg-indigo-200 rounded"></div>
          </div>
        </div>
      </div>
    ),
    7: (
      <div className="w-full h-full bg-white p-6 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="h-32 bg-gradient-to-br from-cyan-100 to-cyan-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-600">🎬</div>
              <p className="text-sm text-cyan-600 mt-2">Visualization</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="h-12 bg-cyan-200 rounded"></div>
            <div className="h-12 bg-cyan-300 rounded"></div>
            <div className="h-12 bg-cyan-300 rounded"></div>
            <div className="h-12 bg-cyan-200 rounded"></div>
          </div>
        </div>
      </div>
    ),
  }

  return (
    <div className="w-full h-full">
      {visualizations[index] || (
        <div className="w-full h-full bg-white flex items-center justify-center">
          <p className="text-gray-400">{title}</p>
        </div>
      )}
    </div>
  )
}
