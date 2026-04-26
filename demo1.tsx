// === 🚚 Next.js + Tailwind + Shadcn UI 迁移指南 ===
// [迁移备注 - 依赖库]: 
// 1. `react` 相关的导入保留。
// 2. `lucide-react` 是 Shadcn UI 的默认图标库，可直接无缝迁移。
// 3. 原型中的部分定制化组件（如对话框、Toast、抽屉）后续可直接使用 Shadcn UI 的 Drawer、Dialog 替换。
import React, { useState, useEffect } from 'react';
import { 
  Home, Compass, User, Search, 
  Moon, Heart, Sparkles, Leaf, Play, 
  Lock, ChevronRight, Settings, HelpCircle, 
  Clock, Star, CheckCircle, Gift, Crown,
  Headphones, ArrowLeft, MoreHorizontal, 
  Share, PlayCircle, Pause, Target,
  Camera, Info, CheckSquare,
  Coffee, CloudRain, Wind, MessageCircle, Inbox,
  CreditCard, Feather, RefreshCw, MessageSquare, Send
} from 'lucide-react';

type AvatarIPProps = {
  size?: number;
};

type BlobBgProps = {
  color: string;
  className?: string;
};

type EmptyStateProps = {
  icon: React.ReactNode;
  title: string;
  desc: string;
  actionText: string;
  onAction: () => void;
};

// ==========================================
// 扁平化轻插画素材与通用组件
// ==========================================
// [迁移备注 - 公共组件]: 
// 以下组件 `AvatarIP`, `BlobBg`, `EmptyState` 建议抽离到项目目录的 `src/components/shared/` 或 `src/components/ui/` 文件夹下，作为独立文件。

const AvatarIP = ({ size = 64 }: AvatarIPProps) => (
  <div style={{ width: size, height: size }} className="relative flex items-center justify-center bg-gradient-to-b from-sky-100 to-teal-50 rounded-full overflow-hidden shadow-sm border-2 border-white">
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
      <path d="M30 80 C 30 60, 40 55, 50 55 C 60 55, 70 60, 70 80 Z" fill="#FFF5EB" />
      <path d="M20 55 C 20 20, 80 20, 80 55 C 80 65, 75 70, 65 65 C 60 62, 55 65, 50 65 C 45 65, 40 62, 35 65 C 25 70, 20 65, 20 55 Z" fill="#FFFFFF" stroke="#E6D5C3" strokeWidth="2" strokeLinejoin="round" />
      <rect x="42" y="45" width="3" height="8" rx="1.5" fill="#BCAAA4" />
      <rect x="55" y="45" width="3" height="8" rx="1.5" fill="#BCAAA4" />
      <path d="M50 25 C 45 20, 45 15, 50 15 C 55 15, 55 20, 50 25 Z" fill="#A5D6A7" stroke="#81C784" strokeWidth="1" />
      <path d="M50 25 C 55 20, 60 20, 60 25 C 60 30, 55 30, 50 25 Z" fill="#A5D6A7" stroke="#81C784" strokeWidth="1" />
      <line x1="50" y1="25" x2="50" y2="30" stroke="#81C784" strokeWidth="2" />
      <path d="M50 65 C 50 65, 45 60, 40 60 C 35 60, 35 68, 40 72 L 50 80 L 60 72 C 65 68, 65 60, 60 60 C 55 60, 50 65, 50 65 Z" fill="#FF8A80" />
    </svg>
  </div>
);

const BlobBg = ({ color, className = '' }: BlobBgProps) => (
  <div className={`absolute opacity-40 mix-blend-multiply pointer-events-none ${className}`} 
       style={{ backgroundColor: color, borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }}>
  </div>
);

const EmptyState = ({ icon, title, desc, actionText, onAction }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center py-20 px-8 text-center animate-in fade-in duration-500">
    <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-6 shadow-inner">
      {icon}
    </div>
    <h3 className="text-[17px] font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-[13px] text-gray-500 mb-8">{desc}</p>
    <button onClick={onAction} className="px-8 py-3 bg-teal-50 text-teal-700 rounded-full text-sm font-bold active:scale-95 transition-transform">
      {actionText}
    </button>
  </div>
);

// --- 主应用组件 ---
// [迁移备注 - 路由系统重构]: 
// 原型的 `App` 组件充当了一个简易的内存路由器 (Memory Router)。
// 迁移到 Next.js App Router 时，此组件将被废弃，其功能将分散到：
// 1. `src/app/layout.tsx` (根布局，处理外层手机壳样式和全局样式)
// 2. `src/app/(main)/layout.tsx` (带底部导航栏的主布局)
// 3. `src/app/(main)/page.tsx` (首页)
// 4. 各级动态路由如 `src/app/player/[id]/page.tsx`

export default function App() {
  // ⚠️ 风险提示：真实的 Next.js 中，不应使用 useState 管理页面状态，这会破坏 SSR (服务端渲染) 和 URL 深度链接 (Deep Linking) 功能。
  // 请改用 Next.js 的文件系统路由，并使用 `useRouter` 或 `<Link>` 替代这里的 `Maps`。
  const [activeTab, setActiveTab] = useState('home');
  const [currentPage, setCurrentPage] = useState('main'); 
  const [pageParams, setPageParams] = useState({});

  const navigate = (page, params = {}) => {
    setCurrentPage(page);
    setPageParams(params);
  };

  // [迁移备注 - 页面映射]: 
  // 以下 Switch Case 对应 Next.js 的路由目录分配：
  const renderContent = () => {
    // 二级页面 (独立布局，不带底部导航) -> 对应 src/app/(sub-pages)/... 
    if (currentPage === 'player') return <PlayerView onBack={() => setCurrentPage('main')} {...pageParams} />; // -> /player
    if (currentPage === 'collection') return <CollectionView onBack={() => setCurrentPage('main')} navigate={navigate} {...pageParams} />; // -> /collection/[id]
    if (currentPage === 'collectionList') return <CollectionListView onBack={() => setCurrentPage('main')} navigate={navigate} {...pageParams} />; // -> /collection-list
    if (currentPage === 'vip') return <VIPView onBack={() => setCurrentPage('main')} />; // -> /vip
    if (currentPage === 'task') return <TaskView onBack={() => setCurrentPage('main')} />; // -> /task
    if (currentPage === 'share') return <ShareView onBack={() => setCurrentPage('main')} initialTab={pageParams.tab} />; // -> /share
    if (currentPage === 'exercise') return <ExerciseView onBack={() => setCurrentPage('main')} navigate={navigate} {...pageParams} />; // -> /exercise/[id]
    if (currentPage === 'favorites') return <FavoritesView onBack={() => setCurrentPage('main')} navigate={navigate} />; // -> /favorites
    if (currentPage === 'records') return <RecordsView onBack={() => setCurrentPage('main')} navigate={navigate} initialTab={pageParams.tab} />; // -> /records
    if (currentPage === 'help') return <HelpView onBack={() => setCurrentPage('main')} />; // -> /help

    // 主 Tab 页面 (带底部导航) -> 对应 src/app/(main)/...
    switch (activeTab) {
      case 'home': return <HomeView navigate={navigate} />; // -> /
      case 'explore': return <ExploreView navigate={navigate} />; // -> /explore
      case 'profile': return <ProfileView navigate={navigate} />; // -> /profile
      default: return <HomeView navigate={navigate} />;
    }
  };

  // 在 Next.js 中，这种“判断是否是全屏沉浸页”的逻辑通常通过不同的 `layout.tsx` 来实现，
  // 比如 `app/(immersive)/layout.tsx` 中不包含任何系统状态栏或导航栏。
  const isImmersivePage = currentPage === 'player';

  return (
    // [迁移备注 - 布局与响应式]: 
    // 外层的 `bg-black sm:bg-[#EFEFEF]` 和模拟手机壳的样式应该提取到顶级 `src/app/layout.tsx` 中的 <body> 内。
    <div className="flex justify-center items-center min-h-screen bg-black sm:bg-[#EFEFEF] p-0 sm:p-4 font-sans text-gray-800 selection:bg-teal-100">
      <div className="w-full h-[100dvh] sm:w-[390px] sm:h-[844px] bg-[#FAFBFA] sm:rounded-[3rem] sm:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] overflow-hidden relative flex flex-col sm:border-[8px] sm:border-white">
        
        {/* 全局 CSS，迁移时这部分应移入 src/app/globals.css 中 */}
        <style dangerouslySetInnerHTML={{__html: `
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}} />

        {/* 微信小程序全局右上角胶囊按钮 */}
        {/* [迁移备注]: 这是一个模拟 UI，实际在小程序环境下不需要这块代码，微信原生自带。*/}
        {!isImmersivePage && (
          <div className="absolute top-[48px] right-4 w-[84px] h-[32px] bg-white/60 backdrop-blur-md border border-gray-200/50 rounded-full flex items-center justify-between px-2.5 z-[100] shadow-sm pointer-events-none">
            <MoreHorizontal size={18} className="text-gray-800" />
            <div className="w-[1px] h-4 bg-gray-300/60"></div>
            <div className="flex items-center justify-center w-[14px] h-[14px] border-[1.5px] border-gray-800 rounded-full">
              <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
            </div>
          </div>
        )}

        {/* Next.js 中的 <main> / {children} 区域 */}
        <div className={`flex-1 overflow-y-auto hide-scrollbar ${currentPage === 'main' ? 'pb-[88px]' : (isImmersivePage ? 'p-0' : 'pb-0')}`}>
          {renderContent()}
        </div>

        {/* [迁移备注 - 底部导航栏]: 
            提取为 `src/components/layout/BottomNavigation.tsx`，
            然后在 `app/(main)/layout.tsx` 的底端引入。 
            使用 Next.js 的 `usePathname` 获取当前路径来判断 `isActive` 状态。*/}
        {currentPage === 'main' && (
          <div className="absolute bottom-0 w-full h-[88px] bg-white/85 backdrop-blur-2xl border-t border-gray-100/50 flex justify-around items-start pt-2 px-2 shadow-[0_-10px_30px_-10px_rgba(0,0,0,0.05)] z-40">
            <NavItem icon={<Home size={24} />} label="心光" isActive={activeTab === 'home'} onClick={() => setActiveTab('home')} />
            <NavItem icon={<Compass size={24} />} label="探索" isActive={activeTab === 'explore'} onClick={() => setActiveTab('explore')} />
            <NavItem icon={<User size={24} />} label="我的" isActive={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
          </div>
        )}
      </div>
    </div>
  );
}

function NavItem({ icon, label, isActive, onClick }) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center justify-center w-20 h-14 space-y-1.5 transition-all duration-300 active:scale-95 ${isActive ? 'text-teal-600' : 'text-gray-400 hover:text-teal-400'}`}>
      <div className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-colors ${isActive ? 'bg-teal-50' : 'bg-transparent'}`}>
        {React.cloneElement(icon, { className: isActive ? 'fill-teal-100' : 'fill-transparent', strokeWidth: isActive ? 2.5 : 2 })}
      </div>
      <span className={`text-[10px] ${isActive ? 'font-bold' : 'font-medium'}`}>{label}</span>
    </button>
  );
}

// ==========================================
// 1. 首页 (心光) 视图
// ==========================================
function HomeView({ navigate }) {
  const featuredData = [
    { title: '深夜放空', subtitle: '合集 · 6首', isVip: false, color: 'from-[#E8EAF6] to-[#C5CAE9]', icon: <Moon size={24} className="text-indigo-50"/>, type: 'collection' },
    { title: '自我安抚', subtitle: '练习 · 10分钟', isVip: true, color: 'from-[#FBE9E7] to-[#FFCCBC]', icon: <Heart size={24} className="text-rose-50"/>, type: 'exercise' },
    { title: '雨声宇宙', subtitle: '合集 · 8首', isVip: true, color: 'from-[#E0F2F1] to-[#B2DFDB]', icon: <CloudRain size={24} className="text-teal-50"/>, type: 'collection' },
    { title: '山林晨曦', subtitle: '合集 · 5首', isVip: false, color: 'from-[#F1F8E9] to-[#C5E1A5]', icon: <Leaf size={24} className="text-lime-50"/>, type: 'collection' }
  ];

  return (
    <div className="flex flex-col w-full min-h-full animate-in fade-in duration-300">
      <div className="px-6 pt-[68px] pb-2 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-800">晚上好，小光</h1>
          <p className="text-sm text-gray-500 mt-1.5">今晚先让心慢一点 🌙</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 px-6 mt-6">
        <Shortcut icon={<Moon size={24} className="text-[#8C9EFF]"/>} bg="bg-[#EEF2FF]" label="深眠" onClick={() => navigate('collectionList', {title:'深眠推荐'})} />
        <Shortcut icon={<Heart size={24} className="text-[#FF8A80]"/>} bg="bg-[#FFEBEE]" label="疗心" onClick={() => navigate('collectionList', {title:'疗心推荐'})} />
        <Shortcut icon={<Sparkles size={24} className="text-[#FFB74D]"/>} bg="bg-[#FFF8E1]" label="氛围" onClick={() => navigate('collectionList', {title:'氛围推荐'})} />
        <Shortcut icon={<Leaf size={24} className="text-[#81C784]"/>} bg="bg-[#E8F5E9]" label="正念" onClick={() => navigate('collectionList', {title:'正念推荐'})} />
      </div>

      <div className="px-5 mt-8">
        <div onClick={() => navigate('player', { title: '睡前温柔的呼吸', author: '心光引导' })} className="w-full rounded-[28px] bg-gradient-to-br from-[#FFF5EB] via-[#E8F5E9] to-[#E0F2F1] p-6 shadow-sm border border-white relative overflow-hidden h-52 flex flex-col justify-between active:scale-[0.98] transition-transform cursor-pointer">
          <BlobBg color="#A5D6A7" className="w-40 h-40 -right-10 -bottom-10 blur-xl" />
          <BlobBg color="#FFCCBC" className="w-32 h-32 -left-10 -top-10 blur-xl" />
          
          <div className="relative z-10 flex justify-between items-start">
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-1 bg-white/70 backdrop-blur-md rounded-lg text-[10px] font-bold text-teal-800 shadow-sm">今日推荐</span>
                <span className="text-xs text-teal-700/70 font-medium">适合放空 · 15分钟</span>
              </div>
              <h2 className="text-[22px] font-bold text-teal-900 mt-3">睡前温柔的呼吸</h2>
              <p className="text-sm text-teal-800/80 mt-1.5">把一天的烦乱都留在门外</p>
            </div>
            <div className="w-12 h-12 bg-white/50 rounded-full flex items-center justify-center backdrop-blur-sm shadow-sm">
              <Headphones size={20} className="text-teal-700" />
            </div>
          </div>

          <div className="relative z-10 flex justify-between items-end mt-4">
            <button className="flex items-center space-x-2 bg-teal-700 text-white px-6 py-3 rounded-full shadow-md shadow-teal-700/20 active:bg-teal-800 transition-colors">
              <Play size={16} className="fill-white" />
              <span className="text-sm font-bold">立即播放</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="px-6 flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">为你精选</h3>
          <span onClick={() => navigate('collectionList', {title: '为你精选'})} className="text-xs font-medium text-gray-400 flex items-center active:text-teal-600 transition-colors cursor-pointer p-1">查看更多 <ChevronRight size={14} /></span>
        </div>
        <div className="flex overflow-x-auto hide-scrollbar px-6 space-x-4 pb-4">
          {featuredData.map((item, idx) => (
            <FeaturedCard 
              key={idx} 
              {...item} 
              onClick={() => navigate(item.type === 'collection' ? 'collection' : 'exercise', { title: item.title, time: '10分钟' })} 
            />
          ))}
        </div>
      </div>

      <div className="px-6 mt-4 mb-6 grid grid-cols-2 gap-3">
        <FeatureBox onClick={() => navigate('collectionList', {title: '热门合集'})} title="主题合集" desc="成套内容" icon={<Compass size={20} className="text-[#5C6BC0]"/>} />
        <FeatureBox onClick={() => navigate('collectionList', {title: '新手正念'})} title="轻练习" desc="10分钟引导" icon={<Star size={20} className="text-[#FFA726]"/>} />
        <FeatureBox onClick={() => navigate('vip')} title="深度心光" desc="解锁完整陪伴" icon={<Crown size={20} className="text-[#D4E157]"/>} />
        <FeatureBox onClick={() => navigate('share')} title="心光传递" desc="传递善意结缘" icon={<Feather size={20} className="text-[#EC407A]"/>} />
      </div>
    </div>
  );
}

function Shortcut({ icon, bg, label, onClick }) {
  return (
    <div onClick={onClick} className="flex flex-col items-center space-y-2 group cursor-pointer active:scale-95 transition-transform">
      <div className={`w-[72px] h-[72px] rounded-[24px] ${bg} flex items-center justify-center shadow-sm border border-white/50 group-hover:shadow-md transition-shadow`}>{icon}</div>
      <span className="text-xs font-medium text-gray-600">{label}</span>
    </div>
  );
}

function FeaturedCard({ title, subtitle, isVip, color, icon, onClick }) {
  return (
    <div onClick={onClick} className="flex-shrink-0 w-36 relative group cursor-pointer active:scale-[0.97] transition-transform">
      <div className={`w-36 h-36 rounded-[24px] bg-gradient-to-br ${color} mb-3 shadow-sm border border-white/50 relative overflow-hidden flex items-center justify-center`}>
         <div className="absolute w-full h-full bg-white/20 backdrop-blur-sm -bottom-1/2 rounded-full"></div>
         {icon && <div className="absolute top-4 left-4 opacity-50">{icon}</div>}
         <div className="w-10 h-10 bg-white/60 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm z-10 transition-transform group-hover:scale-110">
            <Play size={16} className="text-gray-800 ml-1" fill="currentColor"/>
         </div>
        {isVip && (
          <div className="absolute top-2.5 right-2.5 w-6 h-6 bg-white/50 backdrop-blur-md rounded-full flex items-center justify-center z-20 shadow-sm border border-white/30">
            <Lock size={12} className="text-gray-700" />
          </div>
        )}
      </div>
      <h4 className="text-sm font-bold text-gray-800 line-clamp-1">{title}</h4>
      <p className="text-[11px] text-gray-500 mt-1">{subtitle}</p>
    </div>
  );
}

function FeatureBox({ title, desc, icon, onClick }) {
  return (
    <div onClick={onClick} className="bg-white rounded-[20px] p-4 flex items-center space-x-3 shadow-sm border border-gray-50 active:bg-gray-50 transition-colors cursor-pointer">
      <div className="w-12 h-12 rounded-2xl bg-[#FAFBFA] flex items-center justify-center flex-shrink-0 shadow-inner">{icon}</div>
      <div className="flex-1">
        <h4 className="text-sm font-bold text-gray-800">{title}</h4>
        <p className="text-[10px] text-gray-400 mt-0.5">{desc}</p>
      </div>
    </div>
  );
}

// ==========================================
// 2. 探索页 视图 (强对比 Tab 优化)
// ==========================================
function ExploreView({ navigate }) {
  const [activeSubTab, setActiveSubTab] = useState('sleep');
  const tabs = [
    { id: 'sleep', label: '深眠' }, 
    { id: 'heal', label: '疗心' }, 
    { id: 'vibe', label: '氛围' }, 
    { id: 'mindfulness', label: '正念' }
  ];

  const exploreData = {
    sleep: {
      quick: [
        { title: '快速入睡', desc: '10分钟入眠', bg: 'bg-[#E8EAF6]', color: 'text-[#3F51B5]' },
        { title: '夜间安稳', desc: '整晚深度陪伴', bg: 'bg-[#E3F2FD]', color: 'text-[#1976D2]' },
        { title: '白噪睡眠', desc: '大自然的声音', bg: 'bg-[#F5F5F5]', color: 'text-[#616161]' },
        { title: '深夜放空', desc: '卸下全天疲惫', bg: 'bg-[#F3E5F5]', color: 'text-[#7B1FA2]' },
      ],
      exercises: [
        { title: '身体扫描放松', time: '15分钟', isVip: false, color: 'text-[#3F51B5]', bg: 'bg-[#E8EAF6]' },
        { title: '睡前呼吸法', time: '10分钟', isVip: true, color: 'text-[#1976D2]', bg: 'bg-[#E3F2FD]' },
      ],
      albums: [
        { title: '晚风轻拂', isVip: false, cover: 'bg-[#E8EAF6]', icon: <Wind size={24} className="text-white/80 z-10"/> },
        { title: '星空下的篝火', isVip: true, cover: 'bg-[#283593]', icon: <Sparkles size={24} className="text-white/80 z-10"/> },
      ]
    },
    heal: {
      quick: [
        { title: '舒缓焦虑', desc: '平复内心波澜', bg: 'bg-[#FBE9E7]', color: 'text-[#D84315]' },
        { title: '放下烦乱', desc: '清理负面情绪', bg: 'bg-[#FFEBEE]', color: 'text-[#C62828]' },
        { title: '自我安抚', desc: '给自己一个拥抱', bg: 'bg-[#FCE4EC]', color: 'text-[#AD1457]' },
        { title: '情绪急救箱', desc: '应对突发低落', bg: 'bg-[#FFF3E0]', color: 'text-[#EF6C00]' },
      ],
      exercises: [
        { title: '缓解焦虑冥想', time: '20分钟', isVip: true, color: 'text-[#C62828]', bg: 'bg-[#FFEBEE]' },
        { title: '自我慈悲练习', time: '12分钟', isVip: false, color: 'text-[#AD1457]', bg: 'bg-[#FCE4EC]' },
      ],
      albums: [
        { title: '温柔的回音', isVip: false, cover: 'bg-[#FFCCBC]', icon: <Heart size={24} className="text-white/80 z-10"/> },
        { title: '一个人的房间', isVip: true, cover: 'bg-[#F8BBD0]', icon: <Coffee size={24} className="text-white/80 z-10"/> },
      ]
    },
    vibe: {
      quick: [
        { title: '咖啡馆', desc: '专注学习工作', bg: 'bg-[#EFEBE9]', color: 'text-[#5D4037]' },
        { title: '雨天宇宙', desc: '沉浸式白噪音', bg: 'bg-[#ECEFF1]', color: 'text-[#455A64]' },
        { title: '海边晚风', desc: '清凉的夏日', bg: 'bg-[#E0F7FA]', color: 'text-[#006064]' },
        { title: '森林独处', desc: '大自然的气息', bg: 'bg-[#F1F8E9]', color: 'text-[#33691E]' },
      ],
      exercises: [
        { title: '白噪音专注法', time: '25分钟', isVip: false, color: 'text-[#455A64]', bg: 'bg-[#ECEFF1]' },
      ],
      albums: [
        { title: '雨滴的低语', isVip: false, cover: 'bg-[#CFD8DC]', icon: <CloudRain size={24} className="text-white/80 z-10"/> },
        { title: '漫步树林', isVip: true, cover: 'bg-[#DCEDC8]', icon: <Leaf size={24} className="text-white/80 z-10"/> },
      ]
    },
    mindfulness: {
      quick: [
        { title: '呼吸停留', desc: '找回当下', bg: 'bg-[#E0F2F1]', color: 'text-[#00695C]' },
        { title: '当下觉察', desc: '不做任何评判', bg: 'bg-[#E8F5E9]', color: 'text-[#2E7D32]' },
        { title: '慢慢回神', desc: '从混乱中抽离', bg: 'bg-[#F0F4C3]', color: 'text-[#827717]' },
        { title: '安静专注', desc: '深度心流', bg: 'bg-[#B2DFDB]', color: 'text-[#004D40]' },
      ],
      exercises: [
        { title: '十分钟正念入门', time: '10分钟', isVip: false, color: 'text-[#00695C]', bg: 'bg-[#E0F2F1]' },
        { title: '情绪觉察扫描', time: '15分钟', isVip: true, color: 'text-[#2E7D32]', bg: 'bg-[#E8F5E9]' },
      ],
      albums: [
        { title: '晨间觉察', isVip: false, cover: 'bg-[#B2DFDB]', icon: <Target size={24} className="text-white/80 z-10"/> },
        { title: '正念行走', isVip: true, cover: 'bg-[#C8E6C9]', icon: <Compass size={24} className="text-white/80 z-10"/> },
      ]
    }
  };

  const currentData = exploreData[activeSubTab];

  return (
    <div className="flex flex-col w-full min-h-full animate-in fade-in duration-300">
      <div className="flex px-6 pt-[68px] pb-4 space-x-6 sticky top-0 bg-[#FAFBFA]/95 backdrop-blur-xl z-20 items-end">
        {tabs.map(tab => (
          <button 
            key={tab.id} onClick={() => setActiveSubTab(tab.id)}
            className={`transition-all duration-300 relative flex flex-col justify-end ${
              activeSubTab === tab.id 
              ? 'text-[28px] font-extrabold text-teal-900 leading-none' 
              : 'text-[14px] font-medium text-gray-400 hover:text-gray-600 pb-1'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="px-6 mt-4">
        <div className="grid grid-cols-2 gap-3 mb-8">
          {currentData.quick.map((item, idx) => (
             <QuickCollection key={idx} onClick={() => navigate('collection', {title: item.title})} {...item} />
          ))}
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">引导练习</h3>
            <span onClick={() => navigate('collectionList', {title: '更多引导练习'})} className="text-xs font-medium text-gray-400 flex items-center active:text-teal-600 transition-colors cursor-pointer p-1">查看全部 <ChevronRight size={14} /></span>
          </div>
          <div className="flex overflow-x-auto hide-scrollbar -mx-6 px-6 space-x-4">
            {currentData.exercises.map((item, idx) => (
               <ExerciseCard key={idx} onClick={() => navigate('exercise', {title: item.title, time: item.time})} {...item} />
            ))}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">主题合集</h3>
            <span onClick={() => navigate('collectionList', {title: '更多主题合集'})} className="text-xs font-medium text-gray-400 flex items-center active:text-teal-600 transition-colors cursor-pointer p-1">更多 <ChevronRight size={14} /></span>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-6">
            {currentData.albums.map((item, idx) => (
               <AlbumCard key={idx} onClick={() => navigate('collection', {title: item.title})} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickCollection({ title, desc, bg, color, onClick }) {
  return (
    <div onClick={onClick} className={`${bg} rounded-[20px] p-4 flex flex-col justify-center active:scale-95 transition-transform cursor-pointer border border-white/50 shadow-sm`}>
      <h4 className={`text-[13px] font-bold ${color}`}>{title}</h4>
      <p className="text-[10px] text-gray-500 mt-1">{desc}</p>
    </div>
  );
}

function ExerciseCard({ title, time, isVip, color, bg, onClick }) {
  return (
    <div onClick={onClick} className="flex-shrink-0 w-64 bg-white rounded-[24px] p-4 border border-gray-100 shadow-sm flex items-center space-x-4 active:bg-gray-50 transition-colors cursor-pointer group">
      <div className={`w-12 h-12 rounded-[18px] ${bg} flex items-center justify-center relative shadow-inner group-active:scale-90 transition-transform`}>
        <Play size={18} className={`${color} ml-1`} fill="currentColor" />
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-bold text-gray-800">{title}</h4>
        <p className="text-xs text-gray-400 mt-1 font-medium">{time} · 引导</p>
      </div>
      {isVip && <div className="w-7 h-7 rounded-full bg-yellow-50 flex items-center justify-center"><Lock size={12} className="text-yellow-600" /></div>}
    </div>
  );
}

function AlbumCard({ title, isVip, cover, icon, onClick }) {
  return (
    <div onClick={onClick} className="group cursor-pointer active:scale-[0.97] transition-transform">
      <div className={`w-full aspect-square rounded-[24px] ${cover} mb-2.5 relative shadow-sm border border-white/50 overflow-hidden flex justify-center items-center`}>
         <div className="absolute w-2/3 h-2/3 bg-white/40 rounded-full blur-md"></div>
         {icon || <Heart size={24} className="text-white/80 z-10" />}
         {isVip && <div className="absolute top-2.5 right-2.5 w-6 h-6 bg-white/50 backdrop-blur-md rounded-full flex items-center justify-center z-20 shadow-sm border border-white/30 shadow-sm"><Lock size={12} className="text-gray-700" /></div>}
      </div>
      <h4 className="text-sm font-bold text-gray-800 truncate px-1">{title}</h4>
      <p className="text-[11px] text-gray-400 mt-0.5 px-1 font-medium">合集</p>
    </div>
  );
}

// ==========================================
// 2.5 合集列表页 (Collection List View)
// ==========================================
function CollectionListView({ onBack, navigate, title = "探索更多" }) {
  const listData = [
    { title: '晚风轻拂', isVip: false, cover: 'bg-[#E8EAF6]', icon: <Wind size={24} className="text-white/80 z-10"/> },
    { title: '星空下的篝火', isVip: true, cover: 'bg-[#283593]', icon: <Sparkles size={24} className="text-white/80 z-10"/> },
    { title: '温柔的回音', isVip: false, cover: 'bg-[#FFCCBC]', icon: <Heart size={24} className="text-white/80 z-10"/> },
    { title: '一个人的房间', isVip: true, cover: 'bg-[#F8BBD0]', icon: <Coffee size={24} className="text-white/80 z-10"/> },
    { title: '雨滴的低语', isVip: false, cover: 'bg-[#CFD8DC]', icon: <CloudRain size={24} className="text-white/80 z-10"/> },
    { title: '漫步树林', isVip: true, cover: 'bg-[#DCEDC8]', icon: <Leaf size={24} className="text-white/80 z-10"/> },
  ];

  return (
    <div className="flex flex-col w-full min-h-full bg-[#FAFBFA] animate-in slide-in-from-right-8 duration-300 absolute inset-0 z-40 overflow-y-auto hide-scrollbar">
      <div className="sticky top-0 px-4 pt-[60px] pb-2 flex justify-between items-center z-50 bg-[#FAFBFA]/90 backdrop-blur-xl border-b border-gray-100">
        <button onClick={onBack} className="w-[84px] flex items-center justify-start pl-2 text-gray-800 active:scale-90"><ArrowLeft size={24} /></button>
        <span className="text-[15px] font-bold text-gray-800">{title}</span>
        <div className="w-[84px]"></div>
      </div>

      <div className="px-6 py-6">
        <div className="w-full h-32 rounded-[24px] bg-gradient-to-r from-teal-500 to-emerald-400 mb-8 flex flex-col justify-center px-6 relative overflow-hidden shadow-md shadow-teal-500/20">
           <BlobBg color="#A5D6A7" className="w-32 h-32 -right-4 -top-4 blur-2xl opacity-60" />
           <h2 className="text-xl font-bold text-white relative z-10">心光推荐</h2>
           <p className="text-xs text-white/80 mt-1 relative z-10 font-medium">发现属于你的宁静频率</p>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-6">
          {listData.map((item, idx) => (
             <AlbumCard key={idx} onClick={() => navigate('collection', {title: item.title})} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. 我的页 视图 
// ==========================================
function ProfileView({ navigate }) {
  return (
    <div className="flex flex-col w-full min-h-full animate-in fade-in duration-300">
      <div className="px-6 pt-[68px] flex items-center space-x-5">
        <AvatarIP size={72} />
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800">李小明</h2>
          <div className="flex items-center mt-2 space-x-2">
            <span className="px-2.5 py-1 bg-white border border-gray-100 text-gray-600 rounded-md text-[10px] font-bold shadow-sm">心光旅人</span>
            <span className="text-xs text-teal-600 font-medium bg-teal-50 px-2.5 py-1 rounded-md">心光值：120</span>
          </div>
        </div>
      </div>

      <div className="px-5 mt-8">
        <div onClick={() => navigate('vip')} className="w-full bg-gradient-to-r from-[#FFF8E1] to-[#FFE0B2] rounded-[24px] p-5 shadow-sm border border-white relative overflow-hidden active:scale-[0.98] transition-transform cursor-pointer">
          <BlobBg color="#FFCC80" className="w-32 h-32 -right-10 -top-10 blur-xl" />
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-white/60 backdrop-blur-sm flex items-center justify-center shadow-sm"><Crown size={22} className="text-[#F57C00]" /></div>
              <div>
                <h3 className="text-[#E65100] font-bold text-base">加入深度心光</h3>
                <p className="text-[#EF6C00]/70 text-xs mt-1 font-medium">解锁完整的宁静与陪伴</p>
              </div>
            </div>
            <button className="bg-[#FF9800] text-white px-4 py-2 rounded-full text-xs font-bold shadow-md shadow-orange-500/20 active:bg-[#F57C00]">立即加入</button>
          </div>
        </div>
      </div>

      <div className="px-6 mt-8 grid grid-cols-4 gap-4">
        <StatsItem onClick={() => navigate('records', {tab: 'music'})} icon={<Clock size={24} className="text-[#5C6BC0]"/>} bg="bg-[#E8EAF6]" count="12" label="最近陪伴" />
        <StatsItem onClick={() => navigate('favorites')} icon={<Star size={24} className="text-[#FFA726]"/>} bg="bg-[#FFF3E0]" count="5" label="我的点滴" />
        <StatsItem onClick={() => navigate('records', {tab: 'exercise'})} icon={<CheckCircle size={24} className="text-[#26A69A]"/>} bg="bg-[#E0F2F1]" count="3" label="练习记录" />
        <StatsItem onClick={() => navigate('task')} icon={<Gift size={24} className="text-[#EC407A]"/>} bg="bg-[#FCE4EC]" count="120" label="心光值" />
      </div>

      <div className="px-6 mt-8 mb-6 space-y-4">
        <div className="bg-white rounded-[24px] p-2 shadow-sm border border-gray-50">
          <ListItem onClick={() => navigate('share', {tab: 'invite'})} icon={<Feather size={20} className="text-[#EC407A]"/>} title="心光传递" subtitle="传递善意结善缘" />
          <div className="h-px bg-gray-50 mx-4"></div>
          <ListItem onClick={() => navigate('task')} icon={<CheckCircle size={20} className="text-[#26A69A]"/>} title="每日心光" subtitle="记录点滴换奖励" />
        </div>
        <div className="bg-white rounded-[24px] p-2 shadow-sm border border-gray-50">
          <ListItem onClick={() => {}} icon={<CreditCard size={20} className="text-indigo-500"/>} title="心光兑换码" subtitle="兑换深度心光权限" />
          <div className="h-px bg-gray-50 mx-4"></div>
          <ListItem onClick={() => navigate('share', {tab: 'reward'})} icon={<Crown size={20} className="text-[#F57C00]"/>} title="心光回馈记录" subtitle="查看分享回馈" />
          <div className="h-px bg-gray-50 mx-4"></div>
          <ListItem onClick={() => navigate('help')} icon={<HelpCircle size={20} className="text-gray-400"/>} title="帮助与反馈" />
        </div>
      </div>
    </div>
  );
}

function StatsItem({ icon, bg, count, label, onClick }) {
  return (
    <div onClick={onClick} className="flex flex-col items-center justify-center active:opacity-70 transition-opacity cursor-pointer group">
      <div className={`w-12 h-12 rounded-[18px] ${bg} flex items-center justify-center mb-2 shadow-inner group-active:scale-95 transition-transform`}>{icon}</div>
      <span className="text-sm font-bold text-gray-800">{count}</span>
      <span className="text-[10px] text-gray-500 mt-1 font-medium">{label}</span>
    </div>
  );
}

function ListItem({ icon, title, subtitle, onClick }) {
  return (
    <div onClick={onClick} className="flex items-center justify-between p-4 active:bg-gray-50 rounded-[20px] transition-colors cursor-pointer">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 rounded-[14px] bg-[#FAFBFA] border border-gray-50 flex items-center justify-center shadow-inner">{icon}</div>
        <span className="text-[15px] font-bold text-gray-800">{title}</span>
      </div>
      <div className="flex items-center space-x-2">
        {subtitle && <span className="text-xs text-gray-400 font-medium">{subtitle}</span>}
        <ChevronRight size={18} className="text-gray-300" />
      </div>
    </div>
  );
}


// ==========================================
// 4. 全屏极简沉浸式播放页 (Player View)
// ==========================================
function PlayerView({ onBack, title = "睡前温柔的呼吸", author = "心光疗愈", bgImage }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showUI, setShowUI] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const defaultBg = title.includes("睡眠") || title.includes("晚风") || title.includes("放空") || title.includes("呼吸")
    ? "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80"
    : "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1000&q=80";

  useEffect(() => {
    const loadingTimer = setTimeout(() => setIsImageLoading(false), 500);
    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    const hintTimer = setTimeout(() => setShowHint(false), 4000);
    return () => clearTimeout(hintTimer);
  }, []);

  useEffect(() => {
    let timer;
    if (isPlaying && showUI) {
      timer = setTimeout(() => setShowUI(false), 3000);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, showUI]);

  return (
    <div className="absolute inset-0 z-50 bg-black overflow-hidden select-none animate-in fade-in duration-700" onClick={() => { setShowUI(!showUI); setShowHint(false); }}>
      <div className={`absolute inset-0 z-[100] bg-[#111] flex flex-col items-center justify-center transition-opacity duration-500 ${isImageLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
         <div className="w-10 h-10 border-[3px] border-white/10 border-t-white/80 rounded-full animate-spin"></div>
      </div>

      <img src={bgImage || defaultBg} alt="Immersive Background" className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[60s] ease-linear ${isPlaying ? 'scale-125' : 'scale-100'}`} />
      <div className="absolute inset-0 bg-black/10" />
      <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-1000 ${showHint && !showUI ? 'opacity-100' : 'opacity-0'}`}>
         <span className="px-4 py-2 bg-black/30 backdrop-blur-md rounded-full text-white/80 text-xs tracking-widest font-medium animate-pulse">轻触屏幕唤出操作</span>
      </div>
      <div className={`absolute inset-0 bg-black transition-opacity duration-700 pointer-events-none ${showUI ? 'opacity-40' : 'opacity-0'}`} />
      <div className={`absolute inset-0 flex flex-col justify-between transition-opacity duration-500 ${showUI ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="px-4 pt-[60px] pb-4 flex justify-between items-center text-white/90">
          <button onClick={(e) => { e.stopPropagation(); onBack(); }} className="w-12 h-12 flex items-center justify-center active:scale-90 transition-transform bg-black/10 rounded-full backdrop-blur-sm border border-white/10">
            <ArrowLeft size={28} />
          </button>
        </div>
        <div className="px-8 pb-20 flex flex-col items-center">
          <h2 className="text-[32px] font-bold text-white tracking-wider drop-shadow-lg text-center leading-tight">{title}</h2>
          <p className="text-[15px] text-white/80 mt-3 font-medium drop-shadow-md tracking-widest">{author}</p>
          <div className="mt-14 w-full flex justify-center items-center space-x-12">
            <button onClick={(e) => { e.stopPropagation(); setIsFav(!isFav); }} className="active:scale-90 transition-transform p-3.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
              <Heart size={28} className={isFav ? "fill-rose-500 text-rose-500" : "text-white"} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); setIsPlaying(!isPlaying); if (isPlaying) setShowUI(true); }} className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.3)] active:scale-95 transition-all">
              {isPlaying ? <Pause size={32} className="fill-white text-white" /> : <Play size={36} className="fill-white text-white ml-2" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. 合集详情页 (Collection View)
// ==========================================
function CollectionView({ onBack, navigate, title = "深夜放空" }) {
  const tracks = [
    { id: 1, title: '晚风轻拂', time: '05:20', isVip: false },
    { id: 2, title: '星空下的篝火', time: '04:30', isVip: true },
    { id: 3, title: '沉睡的森林', time: '10:00', isVip: true },
    { id: 4, title: '远方的海浪', time: '08:15', isVip: true },
    { id: 5, title: '雨滴的低语', time: '06:45', isVip: true },
  ];

  return (
    <div className="flex flex-col w-full min-h-full bg-[#FAFBFA] animate-in slide-in-from-right-8 duration-300 absolute inset-0 z-40 overflow-y-auto hide-scrollbar">
      <div className="sticky top-0 px-4 pt-[60px] pb-2 flex justify-between items-center z-50 bg-[#E8EAF6]/80 backdrop-blur-xl">
        <button onClick={onBack} className="w-[84px] flex items-center justify-start pl-2 text-indigo-900 active:scale-90"><ArrowLeft size={24} /></button>
        <span className="text-sm font-bold text-indigo-900 opacity-0 transition-opacity">合集</span>
        <div className="w-[84px]"></div>
      </div>

      <div className="px-6 pt-2 pb-8 bg-gradient-to-b from-[#E8EAF6] to-[#FAFBFA] relative">
        <div className="flex space-x-5 relative z-10">
          <div className="w-32 h-32 rounded-[24px] bg-gradient-to-br from-[#C5CAE9] to-[#9FA8DA] shadow-md border border-white/50 flex items-center justify-center">
             <Moon size={32} className="text-white/80" />
          </div>
          <div className="flex-1 pt-2">
            <h2 className="text-xl font-bold text-indigo-950">{title}</h2>
            <p className="text-xs text-indigo-900/60 mt-2 line-clamp-2 leading-relaxed font-medium">卸下全天的疲惫，在这组轻柔的音乐中，让思绪慢慢沉淀，安稳入眠。</p>
            <div className="flex items-center space-x-2 mt-3">
               <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded text-[10px] font-bold">助眠</span>
               <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded text-[10px] font-bold">放松</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 flex justify-between items-center bg-white sticky top-[88px] z-40 border-b border-gray-50 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.02)]">
        <div className="flex items-center space-x-3 cursor-pointer active:opacity-70" onClick={() => navigate('player', {title: tracks[0].title})}>
           <PlayCircle size={28} className="text-indigo-600 fill-indigo-50" />
           <span className="text-[15px] font-bold text-gray-800">全部播放 <span className="text-xs text-gray-400 font-normal ml-1">(共5首)</span></span>
        </div>
      </div>

      <div className="px-4 pt-2 pb-24 bg-white">
        {tracks.map((track, idx) => (
          <div key={track.id} onClick={() => navigate('player', {title: track.title})} className="flex items-center p-3 hover:bg-gray-50 active:bg-gray-100 rounded-[20px] cursor-pointer transition-colors group">
            <span className={`w-8 text-center text-sm font-bold ${idx === 0 ? 'text-indigo-500' : 'text-gray-300'}`}>{idx + 1}</span>
            <div className="flex-1 ml-2">
              <h5 className={`text-[15px] font-bold ${idx === 0 ? 'text-indigo-700' : 'text-gray-800'}`}>{track.title}</h5>
              <p className="text-xs text-gray-400 mt-1 font-medium">{track.time}</p>
            </div>
            {track.isVip 
              ? <div className="w-8 h-8 rounded-full bg-yellow-50 flex items-center justify-center"><Lock size={14} className="text-yellow-600" /></div> 
              : <button className="w-11 h-11 rounded-full flex items-center justify-center text-gray-300 group-hover:text-gray-500"><MoreHorizontal size={20} /></button>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 6. 深度心光 (原会员中心)
// ==========================================
function VIPView({ onBack }) {
  const [selectedPlan, setSelectedPlan] = useState('year');

  return (
    <div className="flex flex-col w-full min-h-full bg-[#FAFBFA] animate-in slide-in-from-bottom-8 duration-300 absolute inset-0 z-50 overflow-y-auto hide-scrollbar">
      <div className="bg-gradient-to-b from-[#FFF8E1] to-[#FAFBFA] pt-12 pb-6 px-6 relative">
         <BlobBg color="#FFE0B2" className="w-64 h-64 -right-20 -top-10 blur-3xl opacity-60" />
         <div className="flex justify-between items-center relative z-10 mb-8 pt-10">
            <button onClick={onBack} className="w-[84px] flex items-center justify-start pl-2 text-[#E65100] active:scale-90"><ArrowLeft size={24} /></button>
            <span className="text-sm font-bold text-[#E65100]">深度心光</span>
            <div className="w-[84px]"></div>
         </div>
         <div className="relative z-10 mt-4 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-gradient-to-tr from-[#FFB74D] to-[#FFCC80] rounded-[28px] shadow-lg shadow-orange-500/20 flex items-center justify-center mb-4 border-2 border-white">
               <Crown size={36} className="text-white drop-shadow-md" />
            </div>
            <h2 className="text-[26px] font-bold text-[#E65100] tracking-tight">加入深度心光</h2>
            <p className="text-sm text-[#EF6C00]/80 mt-2 font-medium">每天 0.35 元，解锁完整的宁静与陪伴</p>
         </div>
      </div>
      <div className="px-6 py-4">
        <h3 className="text-[15px] font-bold text-gray-800 mb-4">大家庭专属陪伴</h3>
        <div className="grid grid-cols-2 gap-3">
           <VipFeature icon={<Headphones size={18} className="text-[#F57C00]"/>} title="全库疗愈音乐" />
           <VipFeature icon={<Compass size={18} className="text-[#F57C00]"/>} title="所有主题合集" />
           <VipFeature icon={<Star size={18} className="text-[#F57C00]"/>} title="专业引导练习" />
           <VipFeature icon={<Feather size={18} className="text-[#F57C00]"/>} title="心光传递回馈" />
        </div>
      </div>
      <div className="px-6 py-6">
        <div className="flex justify-between items-end space-x-3">
          <PlanCard id="month" title="单月陪伴" price="18" original="25" selected={selectedPlan === 'month'} onClick={() => setSelectedPlan('month')} />
          <PlanCard id="quarter" title="整季相守" price="45" original="68" selected={selectedPlan === 'quarter'} onClick={() => setSelectedPlan('quarter')} />
          <PlanCard id="year" title="年度同行" price="128" original="198" tag="推荐" selected={selectedPlan === 'year'} onClick={() => setSelectedPlan('year')} />
        </div>
      </div>
      <div className="mt-auto px-6 pt-4 pb-12 bg-white border-t border-gray-50 shadow-[0_-10px_30px_-10px_rgba(0,0,0,0.05)]">
         <p className="text-[10px] text-gray-400 text-center mb-4 font-medium">开启即同意《深度心光服务协议》</p>
         <button className="w-full bg-[#FF9800] text-white py-4 rounded-full text-[17px] font-bold shadow-lg shadow-orange-500/25 active:bg-[#F57C00] active:scale-[0.98] transition-all flex justify-center items-center">
            确认并开启陪伴 ¥{selectedPlan === 'month' ? '18' : selectedPlan === 'quarter' ? '45' : '128'}
         </button>
      </div>
    </div>
  );
}

function VipFeature({ icon, title }) {
  return (
    <div className="bg-[#FFF8E1]/50 border border-[#FFE0B2]/50 rounded-[16px] p-3 flex items-center space-x-3">
      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">{icon}</div>
      <span className="text-[13px] font-bold text-[#E65100]/90">{title}</span>
    </div>
  )
}

function PlanCard({ title, price, original, tag, selected, onClick }) {
  return (
    <div onClick={onClick} className={`relative flex-1 flex flex-col items-center justify-center py-5 rounded-[20px] border-[2.5px] cursor-pointer transition-all ${selected ? 'border-[#FF9800] bg-[#FFF3E0] shadow-md shadow-orange-500/10' : 'border-gray-100 bg-white'}`}>
      {tag && <span className="absolute -top-3 bg-[#FF9800] text-white text-[10px] font-bold px-3 py-1 rounded-t-lg rounded-br-lg whitespace-nowrap shadow-sm">{tag}</span>}
      <span className={`text-[13px] font-bold ${selected ? 'text-[#E65100]' : 'text-gray-500'}`}>{title}</span>
      <div className={`mt-2 flex items-baseline ${selected ? 'text-[#E65100]' : 'text-gray-800'}`}>
        <span className="text-sm font-bold">¥</span>
        <span className="text-[28px] font-bold ml-0.5 leading-none tracking-tighter">{price}</span>
      </div>
      <span className="text-[11px] text-gray-400 line-through mt-1.5 font-medium">¥{original}</span>
    </div>
  )
}

// ==========================================
// 7. 练习详情页 (Exercise Detail View)
// ==========================================
function ExerciseView({ onBack, navigate, title = "身体扫描放松", time = "15分钟" }) {
  return (
    <div className="flex flex-col w-full min-h-full bg-white animate-in slide-in-from-right-8 duration-300 absolute inset-0 z-40 overflow-y-auto hide-scrollbar">
      <div className="relative h-72 bg-gradient-to-b from-teal-100 to-white flex flex-col justify-between">
        <div className="px-4 pt-[60px] pb-2 flex justify-between items-center relative z-10">
          <button onClick={onBack} className="w-[84px] flex items-center justify-start pl-2 text-teal-900 active:scale-90"><ArrowLeft size={24} /></button>
          <div className="w-[84px]"></div>
        </div>
        <BlobBg color="#A5D6A7" className="w-48 h-48 right-0 bottom-0 blur-2xl opacity-60" />
        <Leaf size={120} className="absolute right-6 bottom-4 text-teal-500/10 rotate-12" />
        <div className="px-8 pb-8 relative z-10">
          <div className="inline-block px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-[10px] font-bold mb-3 border border-teal-100">轻练习</div>
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-500 mt-2 font-medium flex items-center"><Clock size={14} className="mr-1.5" /> {time} · 心光疗愈</p>
        </div>
      </div>
      <div className="px-8 pt-4 pb-32">
        <div className="mb-8">
          <h3 className="text-[15px] font-bold text-gray-800 mb-3">练习简介</h3>
          <p className="text-[13px] text-gray-500 leading-relaxed">
            这是一个基础的放松练习。我们会从头到脚，依次觉察身体每一个部位的感觉。通过将注意力带回身体，帮助你放下脑海中杂乱的思绪，让紧绷的神经慢慢松弛下来。
          </p>
        </div>
        <div className="mb-8">
          <h3 className="text-[15px] font-bold text-gray-800 mb-3">适合场景</h3>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1.5 bg-gray-50 text-gray-600 rounded-lg text-xs font-medium">睡前难以入睡时</span>
            <span className="px-3 py-1.5 bg-gray-50 text-gray-600 rounded-lg text-xs font-medium">工作间隙感到焦虑</span>
            <span className="px-3 py-1.5 bg-gray-50 text-gray-600 rounded-lg text-xs font-medium">身体肌肉紧绷时</span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 w-full px-6 pt-4 pb-10 bg-white border-t border-gray-50 shadow-[0_-10px_30px_-10px_rgba(0,0,0,0.05)] z-50">
         <button onClick={() => navigate('player', {title, author: '练习引导'})} className="w-full bg-teal-600 text-white py-4 rounded-full text-[17px] font-bold shadow-lg shadow-teal-600/25 active:bg-teal-700 active:scale-[0.98] transition-all flex justify-center items-center">
            <Play size={20} className="fill-white mr-2" /> 立即开始
         </button>
      </div>
    </div>
  );
}

// ==========================================
// 8. 心光值页 (原积分任务)
// ==========================================
function TaskView({ onBack }) {
  return (
    <div className="flex flex-col w-full min-h-full bg-[#FAFBFA] animate-in slide-in-from-right-8 duration-300 absolute inset-0 z-40 overflow-y-auto hide-scrollbar">
      <div className="sticky top-0 px-4 pt-[60px] pb-2 flex justify-between items-center z-50 bg-[#FAFBFA]/90 backdrop-blur-xl">
        <button onClick={onBack} className="w-[84px] flex items-center justify-start pl-2 text-gray-800 active:scale-90"><ArrowLeft size={24} /></button>
        <span className="text-[15px] font-bold text-gray-800">心光值</span>
        <div className="w-[84px]"></div>
      </div>
      <div className="px-6 py-4">
        <div className="w-full bg-gradient-to-br from-[#EC407A] to-[#F06292] rounded-[24px] p-6 shadow-md shadow-pink-500/20 text-white relative overflow-hidden">
          <BlobBg color="#F48FB1" className="w-40 h-40 -right-10 -bottom-10 blur-xl" />
          <div className="relative z-10 flex flex-col items-center">
            <span className="text-sm font-medium opacity-90 mb-1">当前心光值</span>
            <div className="flex items-end"><span className="text-[40px] font-bold leading-none tracking-tight">120</span><span className="text-sm ml-1 mb-1 font-medium">点</span></div>
            <div className="mt-4 px-3 py-1 bg-white/20 rounded-full text-[11px] font-bold backdrop-blur-sm">今日点亮 +10</div>
          </div>
        </div>
      </div>
      <div className="px-6 pb-24">
        <div className="mt-6 mb-8">
          <h3 className="text-[15px] font-bold text-gray-800 mb-4 flex items-center"><Target size={18} className="mr-2 text-pink-500" /> 每日心光</h3>
          <div className="space-y-3">
            <TaskItem title="每日首次相聚" points="+5" status="completed" />
            <TaskItem title="完成一次静心练习" points="+10" status="available" />
            <TaskItem title="分享一次生命感悟" points="+5" status="todo" />
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-[15px] font-bold text-gray-800 mb-4 flex items-center"><Sparkles size={18} className="mr-2 text-yellow-500" /> 深度旅程</h3>
          <div className="space-y-3">
            <TaskItem title="将善意传递给新朋友" points="+50" status="todo" />
            <TaskItem title="加入深度心光陪伴" points="+100" status="todo" />
            <TaskItem title="收藏 3 个喜爱的声音" points="+15" status="todo" />
          </div>
        </div>
      </div>
    </div>
  );
}

function TaskItem({ title, points, status }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-[20px] shadow-sm border border-gray-50">
      <div>
        <h4 className="text-[14px] font-bold text-gray-800">{title}</h4>
        <p className="text-[11px] text-pink-500 font-bold mt-1 bg-pink-50 inline-block px-2 py-0.5 rounded-md">{points} 点</p>
      </div>
      {status === 'completed' && <span className="text-xs font-bold text-gray-400 flex items-center"><CheckSquare size={14} className="mr-1" /> 已完成</span>}
      {status === 'available' && <button className="px-4 py-1.5 bg-pink-500 text-white text-xs font-bold rounded-full shadow-sm active:bg-pink-600 transition-colors">领取</button>}
      {status === 'todo' && <button className="px-4 py-1.5 bg-[#FAFBFA] border border-gray-200 text-gray-600 text-xs font-bold rounded-full active:bg-gray-100 transition-colors">去完成</button>}
    </div>
  );
}

// ==========================================
// 9. 全新重构版：心光传递 (Share View) - 合并邀请与分佣
// ==========================================
function ShareView({ onBack, initialTab = 'invite' }) {
  const images = [
    "https://images.unsplash.com/photo-1505322022379-7c3353ee6291?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1499002236242-cbdc23e56c65?auto=format&fit=crop&w=600&q=80"
  ];
  const quotes = [
    "心若没有栖息的地方，到哪里都是在流浪。",
    "不要着急，最好的总会在最不经意的时候出现。",
    "万物皆有裂痕，那是光照进来的地方。",
    "生活坏到一定程度就会好起来，因为它无法更坏。"
  ];
  
  const [imgIdx, setImgIdx] = useState(0);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [activeShareTab, setActiveShareTab] = useState(initialTab); 
  
  const isDeepVip = false;

  return (
    <div className="flex flex-col w-full min-h-full bg-[#FFF8E1] animate-in slide-in-from-right-8 duration-300 absolute inset-0 z-40 overflow-y-auto hide-scrollbar">
      <div className="sticky top-0 px-4 pt-[60px] pb-2 flex justify-between items-center z-50 bg-[#FFF8E1]/90 backdrop-blur-xl">
        <button onClick={onBack} className="w-[84px] flex items-center justify-start pl-2 text-orange-900 active:scale-90"><ArrowLeft size={24} /></button>
        <span className="text-[15px] font-bold text-orange-900 opacity-0">心光传递</span>
        <div className="w-[84px]"></div>
      </div>
      
      <div className="px-6 pt-2 pb-4 relative flex flex-col items-center text-center z-10">
        <BlobBg color="#FFE0B2" className="w-64 h-64 blur-3xl opacity-80" />
        <h2 className="text-2xl font-bold text-orange-900 tracking-tight">传递一份心光</h2>
        <p className="text-xs text-orange-800/80 mt-1.5 font-medium">好内容，值得与在乎的人分享</p>
      </div>
      
      <div className="px-6 pb-10 relative z-10">
        <div className="w-full aspect-[3/4] rounded-[24px] bg-white shadow-xl overflow-hidden relative border border-orange-100 flex flex-col mb-6 active:scale-[0.99] transition-transform">
          <div className="h-[65%] w-full relative">
            <img src={images[imgIdx]} alt="疗愈海报" className="w-full h-full object-cover transition-opacity duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center space-x-1">
               <Feather size={12} className="text-white/90" />
               <span className="text-[10px] font-bold text-white/90 tracking-widest">心光</span>
            </div>
          </div>
          <div className="h-[35%] w-full bg-[#FAFBFA] p-5 flex flex-col justify-between relative">
            <div className="absolute -top-6 right-5 w-12 h-12 bg-white rounded-full p-1 shadow-md">
               <AvatarIP size={40} />
            </div>
            <p className="text-[15px] font-bold text-gray-800 leading-relaxed tracking-wide pr-8 mt-2">
              &quot;{quotes[quoteIdx]}&quot;
            </p>
            <div className="flex items-end justify-between mt-2">
              <span className="text-[10px] text-gray-400 font-medium tracking-widest bg-gray-100 px-2 py-1 rounded-md">长按保存图片</span>
              <div className="w-10 h-10 bg-gray-200 rounded-md p-1 flex flex-wrap gap-0.5 justify-between content-between">
                <div className="w-[4px] h-[4px] bg-gray-500 rounded-sm"></div>
                <div className="w-[4px] h-[4px] bg-gray-500 rounded-sm"></div>
                <div className="w-[10px] h-[10px] border-[2px] border-gray-500 rounded-sm"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex space-x-3 mb-8">
          <button 
            onClick={() => setImgIdx((prev) => (prev + 1) % images.length)} 
            className="flex-1 py-3.5 bg-orange-100/60 rounded-full flex items-center justify-center text-orange-700 text-[13px] font-bold active:bg-orange-200/60 transition-colors"
          >
            <Camera size={16} className="mr-1.5" /> 换背景
          </button>
          <button 
            onClick={() => setQuoteIdx((prev) => (prev + 1) % quotes.length)} 
            className="flex-1 py-3.5 bg-orange-100/60 rounded-full flex items-center justify-center text-orange-700 text-[13px] font-bold active:bg-orange-200/60 transition-colors"
          >
            <MessageSquare size={16} className="mr-1.5" /> 换心语
          </button>
          <button 
            className="flex-[1.2] py-3.5 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-full flex items-center justify-center text-[14px] font-bold shadow-md shadow-orange-500/30 active:scale-[0.98] transition-transform"
          >
            <Send size={16} className="mr-1.5" /> 分享结缘
          </button>
        </div>

        <div className="flex space-x-3 mb-5">
           <button 
             onClick={() => setActiveShareTab('invite')}
             className={`flex-1 py-4 px-3 rounded-[20px] border-2 flex flex-col items-center justify-center transition-all ${activeShareTab === 'invite' ? 'bg-white border-orange-400 shadow-sm' : 'bg-orange-50/50 border-transparent text-gray-500 hover:bg-orange-50'}`}
           >
              <Gift size={22} className={`mb-1 ${activeShareTab === 'invite' ? 'text-orange-500' : 'text-gray-400'}`} />
              <span className={`text-[14px] font-bold ${activeShareTab === 'invite' ? 'text-orange-600' : 'text-gray-500'}`}>邀约体验</span>
              <span className={`text-[10px] mt-0.5 ${activeShareTab === 'invite' ? 'text-orange-500/80' : 'text-gray-400'}`}>邀3人得14天体验</span>
           </button>

           <button 
             onClick={() => setActiveShareTab('reward')}
             className={`flex-1 py-4 px-3 rounded-[20px] border-2 flex flex-col items-center justify-center transition-all ${activeShareTab === 'reward' ? 'bg-white border-orange-400 shadow-sm' : 'bg-orange-50/50 border-transparent text-gray-500 hover:bg-orange-50'}`}
           >
              <Crown size={22} className={`mb-1 ${activeShareTab === 'reward' ? 'text-orange-500' : 'text-gray-400'}`} />
              <span className={`text-[14px] font-bold ${activeShareTab === 'reward' ? 'text-orange-600' : 'text-gray-500'}`}>深度回馈</span>
              <span className={`text-[10px] mt-0.5 ${activeShareTab === 'reward' ? 'text-orange-500/80' : 'text-gray-400'}`}>享30%心意或年卡</span>
           </button>
        </div>

        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-orange-50 relative overflow-hidden min-h-[160px]">
          {activeShareTab === 'invite' && (
            <div className="animate-in fade-in duration-300">
              <h3 className="text-[15px] font-bold text-gray-800 mb-2">成为心光体验行者</h3>
              <p className="text-[12px] text-gray-500 leading-relaxed mb-6">
                每邀请 3 位好友首次体验心光，你即可获得 <span className="font-bold text-orange-500">14天结缘体验权益</span>，解锁大部分精选轻练习与主题音乐。
              </p>
              
              <div className="bg-[#FAFBFA] p-4 rounded-[16px] border border-gray-100 flex flex-col items-center">
                 <div className="flex space-x-4 mb-3">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500"><User size={20} /></div>
                    <div className="w-10 h-10 rounded-full bg-gray-100 border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-300">+</div>
                    <div className="w-10 h-10 rounded-full bg-gray-100 border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-300">+</div>
                 </div>
                 <span className="text-[11px] font-bold text-gray-400">已邀请 1 / 3 人</span>
              </div>
            </div>
          )}

          {activeShareTab === 'reward' && (
            <div className="animate-in fade-in duration-300">
              <h3 className="text-[15px] font-bold text-gray-800 mb-2 flex items-center">
                 深度回馈：<span className="text-[#E65100] mx-1">30%心意相赠</span>
              </h3>
              <p className="text-[12px] text-gray-500 leading-relaxed mb-6">
                作为深度心光成员，当好友因你的分享而加入大家庭时，我们将把其支付金额的 30% 作为心意回馈给你，或者你可以选择兑换一张年度陪伴券。
              </p>

              {!isDeepVip ? (
                 <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px] flex flex-col items-center justify-center">
                    <Lock size={28} className="text-orange-300 mb-3" />
                    <p className="text-sm font-bold text-gray-600 mb-3">该权益仅深度心光成员可见</p>
                    <button className="px-6 py-2 bg-orange-50 text-orange-600 text-xs font-bold rounded-full">了解深度心光</button>
                 </div>
              ) : (
                 <div className="flex justify-around items-center bg-orange-50/50 py-4 rounded-[16px]">
                    <div className="text-center">
                       <span className="block text-[22px] font-bold text-orange-600">12</span>
                       <span className="text-[10px] text-orange-800/60 font-medium">累计回馈(人)</span>
                    </div>
                    <div className="w-px h-8 bg-orange-200"></div>
                    <div className="text-center">
                       <span className="block text-[22px] font-bold text-orange-600">¥148</span>
                       <span className="text-[10px] text-orange-800/60 font-medium">心意收益</span>
                    </div>
                 </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 10. 我的收藏 (Favorites View)
// ==========================================
function FavoritesView({ onBack }) {
  const [hasData] = useState(false); 
  return (
    <div className="flex flex-col w-full min-h-full bg-[#FAFBFA] animate-in slide-in-from-right-8 duration-300 absolute inset-0 z-40 overflow-y-auto hide-scrollbar">
      <div className="sticky top-0 px-4 pt-[60px] pb-2 flex justify-between items-center z-50 bg-[#FAFBFA]/90 backdrop-blur-xl border-b border-gray-100">
        <button onClick={onBack} className="w-[84px] flex items-center justify-start pl-2 text-gray-800 active:scale-90"><ArrowLeft size={24} /></button>
        <span className="text-[15px] font-bold text-gray-800">我的点滴</span>
        <div className="w-[84px]"></div>
      </div>

      <div className="flex-1 flex flex-col bg-white">
        {hasData ? (
          <div className="p-4"></div>
        ) : (
          <EmptyState 
            icon={<Star size={40} className="text-gray-300" />}
            title="暂无点滴"
            desc="遇到喜欢的疗愈内容，记得点亮收藏星哦"
            actionText="去首页看看推荐内容"
            onAction={() => { onBack(); }}
          />
        )}
      </div>
    </div>
  );
}

// ==========================================
// 11. 我的记录 (Records View)
// ==========================================
function RecordsView({ onBack, initialTab = 'music' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  
  return (
    <div className="flex flex-col w-full min-h-full bg-[#FAFBFA] animate-in slide-in-from-right-8 duration-300 absolute inset-0 z-40 overflow-y-auto hide-scrollbar">
      <div className="sticky top-0 px-4 pt-[60px] pb-2 flex flex-col z-50 bg-white border-b border-gray-100">
        <div className="flex justify-between items-center w-full relative">
          <button onClick={onBack} className="w-[84px] flex items-center justify-start pl-2 text-gray-800 active:scale-90"><ArrowLeft size={24} /></button>
          <div className="flex space-x-6">
            <button onClick={() => setActiveTab('music')} className={`text-[15px] font-bold pb-2 border-b-2 transition-colors ${activeTab === 'music' ? 'border-teal-600 text-gray-800' : 'border-transparent text-gray-400'}`}>最近陪伴</button>
            <button onClick={() => setActiveTab('exercise')} className={`text-[15px] font-bold pb-2 border-b-2 transition-colors ${activeTab === 'exercise' ? 'border-teal-600 text-gray-800' : 'border-transparent text-gray-400'}`}>练习记录</button>
          </div>
          <div className="w-[84px]"></div>
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-[#FAFBFA]">
        {activeTab === 'music' ? (
          <EmptyState 
            icon={<Clock size={40} className="text-gray-300" />}
            title="最近没有陪伴记录"
            desc="用一段轻柔的音乐，开启今天的放松时刻吧"
            actionText="从一段音乐开始"
            onAction={() => { onBack(); }}
          />
        ) : (
          <EmptyState 
            icon={<CheckCircle size={40} className="text-gray-300" />}
            title="最近没有练习记录"
            desc="每天十分钟的轻练习，让心重新充满能量"
            actionText="先试试一个轻练习"
            onAction={() => { onBack(); }}
          />
        )}
      </div>
    </div>
  );
}

// ==========================================
// 12. 帮助与反馈页 (Help View)
// ==========================================
function HelpView({ onBack }) {
  return (
    <div className="flex flex-col w-full min-h-full bg-[#FAFBFA] animate-in slide-in-from-right-8 duration-300 absolute inset-0 z-40 overflow-y-auto hide-scrollbar">
      <div className="sticky top-0 px-4 pt-[60px] pb-2 flex justify-between items-center z-50 bg-[#FAFBFA]/90 backdrop-blur-xl border-b border-gray-100">
        <button onClick={onBack} className="w-[84px] flex items-center justify-start pl-2 text-gray-800 active:scale-90"><ArrowLeft size={24} /></button>
        <span className="text-[15px] font-bold text-gray-800">帮助与反馈</span>
        <div className="w-[84px]"></div>
      </div>

      <div className="px-6 py-6">
        <h3 className="text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">常见问题</h3>
        <div className="bg-white rounded-[24px] p-2 shadow-sm border border-gray-50 mb-8">
          <HelpItem title="如何加入深度心光？" />
          <div className="h-px bg-gray-50 mx-4"></div>
          <HelpItem title="陪伴到期后还能听吗？" />
          <div className="h-px bg-gray-50 mx-4"></div>
          <HelpItem title="心意回馈没有到账怎么办？" />
          <div className="h-px bg-gray-50 mx-4"></div>
          <HelpItem title="播放时锁屏音乐停止了？" />
        </div>

        <h3 className="text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">联系我们</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-[20px] p-5 shadow-sm border border-gray-50 flex flex-col items-center justify-center active:scale-95 transition-transform cursor-pointer">
            <MessageCircle size={28} className="text-teal-500 mb-2" />
            <span className="text-sm font-bold text-gray-800">在线客服</span>
            <span className="text-[10px] text-gray-400 mt-1">工作日 9:00-18:00</span>
          </div>
          <div className="bg-white rounded-[20px] p-5 shadow-sm border border-gray-50 flex flex-col items-center justify-center active:scale-95 transition-transform cursor-pointer">
            <Inbox size={28} className="text-indigo-400 mb-2" />
            <span className="text-sm font-bold text-gray-800">意见反馈</span>
            <span className="text-[10px] text-gray-400 mt-1">吐槽或提建议</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function HelpItem({ title }) {
  return (
    <div className="flex items-center justify-between p-4 active:bg-gray-50 rounded-[20px] transition-colors cursor-pointer">
      <span className="text-[14px] font-medium text-gray-800">{title}</span>
      <ChevronRight size={18} className="text-gray-300" />
    </div>
  )
}
// @ts-nocheck
