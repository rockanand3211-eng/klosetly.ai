import { useState } from 'react'
import { HomeView } from './components/HomeView'
import { Sidebar } from './components/Sidebar'
import { StyleAnalysisView } from './components/StyleAnalysisView'
import { TopBar } from './components/TopBar'
import { WardrobeView } from './components/WardrobeView'
import type { CollectionGender, NavItem, ProductCategory } from './types'

const pageMeta: Record<
  NavItem,
  { title?: string; subtitle?: string } | null
> = {
  home: null,
  wardrobe: {
    title: 'Your Wardrobe',
    subtitle: 'Saved pieces and outfit ideas',
  },
  'style-analysis': {
    title: 'Style Analysis',
    subtitle: 'AI insights on your fashion preferences',
  },
}

function App() {
  const [activeTab, setActiveTab] = useState<NavItem>('home')
  const [collection, setCollection] = useState<CollectionGender>('men')
  const [category, setCategory] = useState<ProductCategory>('all')
  const meta = pageMeta[activeTab]

  return (
    <div className="flex min-h-screen bg-slate-900">
      <Sidebar
        activeItem={activeTab}
        collection={collection}
        onNavigate={setActiveTab}
      />

      <main className="flex min-h-screen flex-1 flex-col overflow-y-auto bg-slate-900">
        <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <TopBar title={meta?.title} subtitle={meta?.subtitle} />

          {activeTab === 'home' && (
            <HomeView
              collection={collection}
              onCollectionChange={setCollection}
              category={category}
              onCategoryChange={setCategory}
            />
          )}

          {activeTab === 'wardrobe' && <WardrobeView />}

          {activeTab === 'style-analysis' && <StyleAnalysisView />}
        </div>
      </main>
    </div>
  )
}

export default App
