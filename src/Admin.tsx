import React, { useState } from 'react';
import { Copy, CheckCircle2 } from 'lucide-react';

const PREFIXES = [
  'Mr.',
  'Mrs.',
  'Miss',
  'Mr. & Mrs.',
  'Family',
  'Dear',
  'Pastor',
  'Fr.'
];

export default function Admin() {
  const [prefix, setPrefix] = useState('Mr.');
  const [guestName, setGuestName] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  const generate = () => {
    if (!guestName.trim()) return;
    
    let displayName = '';
    
    if (prefix === 'Family') {
      displayName = `${guestName.trim()} and Family`;
    } else if (prefix === 'Dear') {
      displayName = guestName.trim();
    } else {
      displayName = `${prefix} ${guestName.trim()}`;
    }

    const finalUrl = `${window.location.origin}/${encodeURIComponent(displayName)}`;
    setGeneratedLink(finalUrl);

    const message = `Dear ${displayName} ❤️\n\nWith joyful hearts, we warmly invite you to celebrate one of the most special days of our lives as we begin our journey together.\n\nPlease view our wedding invitation and all the event details through the link below 🌐:\n\n${finalUrl}\n\nYour presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.\n\nWith love,\n❤️ Nisitha & Sandewni`;
    
    setGeneratedMessage(message);
    setCopiedLink(false);
    setCopiedMessage(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(generatedMessage);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2000);
  };

  return (
    <div className="h-[100dvh] overflow-y-auto w-full bg-[#fdfaf5] p-6 font-montserrat flex justify-center items-start pt-20">
      <div className="max-w-2xl w-full mx-auto bg-white p-8 rounded-3xl shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)] border border-theme-100/60 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] bg-[url('/images/paper-texture.png')] pointer-events-none" />
        
        <div className="relative z-10 space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-playball text-theme-800">Wedding Link Generator</h1>
            <p className="text-xs uppercase tracking-[0.3em] font-bold text-stone-400">Personalized Invitations</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-theme-600 ml-2">Prefix</label>
              <div className="relative">
                <select 
                  value={prefix}
                  onChange={(e) => setPrefix(e.target.value)}
                  className="w-full bg-stone-50 border border-theme-200 rounded-xl px-4 py-4 text-theme-900 focus:outline-none focus:border-theme-400 focus:bg-white transition-all font-cinzel text-base tracking-wide appearance-none cursor-pointer"
                >
                  {PREFIXES.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <div className="w-2 h-2 border-r border-b border-theme-400 rotate-45 transform -translate-y-[25%]" />
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2 space-y-2">
              <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-theme-600 ml-2">Guest Name</label>
              <input 
                type="text" 
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="e.g. Sanjaya"
                className="w-full bg-stone-50 border border-theme-200 rounded-xl px-4 py-4 text-theme-900 placeholder:text-stone-400 focus:outline-none focus:border-theme-400 focus:bg-white transition-all font-cinzel text-base tracking-wide"
                onKeyDown={(e) => e.key === 'Enter' && generate()}
              />
            </div>
          </div>

          <div className="pt-2 flex justify-center">
            <button 
              onClick={generate}
              className="w-full bg-theme-800 text-white px-8 py-5 rounded-2xl font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-theme-900 hover:shadow-xl hover:shadow-theme-900/20 transition-all duration-300 group inline-flex items-center justify-center gap-4"
            >
              <span className="w-1.5 h-1.5 bg-white rotate-45 group-hover:scale-150 transition-transform" />
              Generate Link
              <span className="w-1.5 h-1.5 bg-white rotate-45 group-hover:scale-150 transition-transform" />
            </button>
          </div>
          
          {generatedLink && (
            <div className="mt-8 pt-8 border-t border-theme-100/50 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-4">
                <div className="flex justify-between items-center px-2">
                  <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-theme-600">Generated Link</label>
                  <button 
                    onClick={handleCopyLink}
                    className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] bg-stone-100 hover:bg-theme-100 text-theme-800 px-4 py-2 rounded-full transition-colors"
                  >
                    {copiedLink ? <CheckCircle2 className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
                    {copiedLink ? 'Copied!' : 'Copy Link Only'}
                  </button>
                </div>
                <div className="p-4 bg-stone-50/80 rounded-xl border border-theme-200/50 flex items-center justify-between gap-4 overflow-hidden">
                  <a href={generatedLink} target="_blank" rel="noreferrer" className="text-theme-700 truncate hover:text-theme-900 transition-colors font-mono text-sm">
                    {generatedLink}
                  </a>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center px-2">
                  <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-theme-600">Message Preview</label>
                  <button 
                    onClick={handleCopyMessage}
                    className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] bg-theme-800 hover:bg-theme-900 text-white px-4 py-2 rounded-full transition-colors shadow-md"
                  >
                    {copiedMessage ? <CheckCircle2 className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3" />}
                    {copiedMessage ? 'Copied!' : 'Copy Full Message'}
                  </button>
                </div>
                <div className="text-[13px] md:text-[14px] text-stone-700 whitespace-pre-wrap bg-stone-50/80 p-6 rounded-2xl border border-theme-200/50 font-montserrat leading-[1.8]">
                  {generatedMessage}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
