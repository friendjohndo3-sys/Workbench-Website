import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import {
  BookOpen,
  ChevronRight,
  FileCode,
  Zap,
  Menu,
  X,
  ArrowRight
} from 'lucide-react';

export const DocsPage: React.FC = () => {
  const { content } = useContent();
  const [activeDocId, setActiveDocId] = useState<string>('intro');
  const [mobileDocsOpen, setMobileDocsOpen] = useState(false);

  // Group published docs by category
  const publishedDocs = content.docs.filter((d) => d.published);
  const activeDocs = publishedDocs.length > 0 ? publishedDocs : content.docs;

  // Group into sections
  const categoryOrder = [
    'Getting Started',
    'Editor',
    'Scenes',
    'Programming',
    '.wbscript',
    '.wbvisual',
    'Systems',
    'Advanced',
  ];

  const groupedMap = new Map<string, typeof activeDocs>();
  activeDocs.forEach((doc) => {
    const cat = doc.category || 'General';
    if (!groupedMap.has(cat)) {
      groupedMap.set(cat, []);
    }
    groupedMap.get(cat)!.push(doc);
  });

  // Sort categories by predefined order
  const categoriesPresent = Array.from(groupedMap.keys()).sort((a, b) => {
    const idxA = categoryOrder.indexOf(a);
    const idxB = categoryOrder.indexOf(b);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return a.localeCompare(b);
  });

  const docSections = categoriesPresent.map((category) => ({
    group: category,
    items: groupedMap.get(category)!.map((d) => ({
      id: d.id,
      title: d.title,
      summary: d.summary,
      content: {
        text: d.text,
        code: d.code,
        keyPoints: d.keyPoints,
        link: d.link,
        linkText: d.linkText,
      },
    })),
  }));

  // Find currently active doc item
  let currentDoc: any = null;
  for (const section of docSections) {
    for (const item of section.items) {
      if (item.id === activeDocId) {
        currentDoc = item;
        break;
      }
    }
  }
  if (!currentDoc && docSections.length > 0 && docSections[0].items.length > 0) {
    currentDoc = docSections[0].items[0];
  }
  if (!currentDoc) {
    currentDoc = {
      title: 'Documentation',
      summary: 'No published documentation articles found.',
      content: { text: 'Articles are currently being updated.' },
    };
  }

  return (
    <div className="pt-16 min-h-screen bg-white">
      {/* Documentation Header Banner */}
      <section className="bg-neutral-50 border-b border-neutral-200 py-8 px-4 sm:px-6 lg:px-8 blueprint-grid">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-[#0e3052] uppercase tracking-wider mb-1 flex items-center gap-2 font-semibold">
              <BookOpen className="w-4 h-4" />
              <span>Official Developer Documentation</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 font-sans">
              Workbench Engine Documentation
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/docs/wbscript"
              className="px-3 py-1.5 rounded bg-white border border-neutral-300 text-xs font-mono text-neutral-800 hover:border-[#0e3052] hover:text-[#0e3052] flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <FileCode className="w-3.5 h-3.5 text-[#0e3052]" />
              <span>.wbscript Guide</span>
            </Link>
            <Link
              to="/docs/wbvisual"
              className="px-3 py-1.5 rounded bg-white border border-neutral-300 text-xs font-mono text-neutral-800 hover:border-[#0e3052] hover:text-[#0e3052] flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Zap className="w-3.5 h-3.5 text-[#0e3052]" />
              <span>.wbvisual Guide</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Mobile Doc Nav Toggle Button */}
      <div className="lg:hidden bg-white border-b border-neutral-200 p-4 sticky top-16 z-20 flex items-center justify-between shadow-xs">
        <button
          onClick={() => setMobileDocsOpen(!mobileDocsOpen)}
          className="flex items-center gap-2 text-xs font-mono text-[#0e3052] bg-neutral-100 px-3 py-2 rounded border border-neutral-300 cursor-pointer"
        >
          {mobileDocsOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          <span>{mobileDocsOpen ? 'Close Navigation' : 'Browse Topics'}</span>
        </button>
        <span className="text-xs font-mono text-neutral-700 truncate max-w-[200px] font-semibold">
          {currentDoc.title}
        </span>
      </div>

      {/* Main Documentation Two-Column Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar Navigation */}
          <aside
            className={`lg:col-span-4 bg-neutral-50 border border-neutral-200 rounded-lg p-4 space-y-6 ${
              mobileDocsOpen ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="text-xs font-mono text-neutral-600 uppercase tracking-wider pb-2 border-b border-neutral-200 flex items-center justify-between font-semibold">
              <span>Documentation Index</span>
              <span className="text-[10px] text-[#0e3052] font-mono">v{content.settings.currentEngineVersion}</span>
            </div>

            <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-1">
              {docSections.map((section, sIdx) => (
                <div key={sIdx} className="space-y-1.5">
                  <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider font-semibold">
                    {section.group}
                  </div>
                  <div className="space-y-0.5">
                    {section.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveDocId(item.id);
                          setMobileDocsOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded text-xs font-sans transition-colors cursor-pointer flex items-center justify-between ${
                          activeDocId === item.id
                            ? 'bg-[#0e3052] text-white font-semibold shadow-xs'
                            : 'text-neutral-700 hover:text-neutral-900 hover:bg-neutral-200/60'
                        }`}
                      >
                        <span>{item.title}</span>
                        {activeDocId === item.id && (
                          <ChevronRight className="w-3.5 h-3.5 text-white shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-neutral-200 text-[11px] font-mono text-neutral-500 space-y-1">
              <div>Standalone Architecture Spec</div>
              <div>Visual Studio Production Target</div>
            </div>
          </aside>

          {/* Right Main Content Area */}
          <main className="lg:col-span-8 bg-white border border-neutral-200 rounded-lg p-6 sm:p-8 lg:p-10 space-y-8 shadow-xs">
            {/* Topic Header & Breadcrumb */}
            <div className="pb-6 border-b border-neutral-200 space-y-2">
              <div className="text-xs font-mono text-[#0e3052] uppercase tracking-wider font-semibold">
                Documentation Topic
              </div>
              <h2 className="text-3xl font-bold text-neutral-900 font-sans">
                {currentDoc.title}
              </h2>
              <p className="text-base text-neutral-600 font-sans">
                {currentDoc.summary}
              </p>
            </div>

            {/* Topic Text Body */}
            <div className="text-sm text-neutral-700 leading-relaxed font-sans whitespace-pre-line space-y-4 font-normal">
              {currentDoc.content?.text}
            </div>

            {/* Code Block if available */}
            {currentDoc.content?.code && (
              <div className="space-y-2">
                <div className="text-xs font-mono text-neutral-600 uppercase tracking-wider font-semibold">
                  Specification / Syntax Example
                </div>
                <div className="bg-neutral-900 border border-neutral-800 rounded-md p-4 font-mono text-xs text-neutral-100 overflow-x-auto leading-relaxed shadow-xs">
                  <pre>
                    <code>{currentDoc.content.code}</code>
                  </pre>
                </div>
              </div>
            )}

            {/* Key Points if available */}
            {currentDoc.content?.keyPoints && currentDoc.content.keyPoints.length > 0 && (
              <div className="space-y-2 pt-4 border-t border-neutral-200">
                <div className="text-xs font-mono text-neutral-600 uppercase tracking-wider font-semibold">
                  Key Takeaways
                </div>
                <ul className="space-y-2 font-sans text-xs text-neutral-700">
                  {currentDoc.content.keyPoints.map((pt: string, pIdx: number) => (
                    <li key={pIdx} className="flex items-start gap-2 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0e3052] mt-1.5 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Direct Link if available */}
            {currentDoc.content?.link && (
              <div className="pt-4 border-t border-neutral-200">
                <Link
                  to={currentDoc.content.link}
                  className="btn-blueprint inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold font-sans"
                >
                  <span>{currentDoc.content.linkText || 'Read Spec →'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
