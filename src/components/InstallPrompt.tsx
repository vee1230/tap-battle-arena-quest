import { useState, useEffect } from 'react';
import { Download, Share, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already installed
    const standalone = window.matchMedia('(display-mode: standalone)').matches;
    setIsStandalone(standalone);

    // Check if iOS
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(ios);

    // Listen for install prompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Show iOS prompt after a delay if not installed
    if (ios && !standalone) {
      setTimeout(() => setShowPrompt(true), 3000);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  if (isStandalone || !showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-slate-800 rounded-xl p-4 shadow-2xl border border-slate-700 z-50 animate-in slide-in-from-bottom">
      <button
        onClick={handleDismiss}
        className="absolute top-2 right-2 text-slate-400 hover:text-white"
      >
        <X className="w-5 h-5" />
      </button>
      
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center shrink-0">
          <Download className="w-6 h-6 text-slate-900" />
        </div>
        <div className="flex-1">
          <h3 className="text-white font-bold">Install Tap Battle Arena</h3>
          {isIOS ? (
            <p className="text-slate-400 text-sm mt-1">
              Tap <Share className="w-4 h-4 inline mx-1" /> then "Add to Home Screen"
            </p>
          ) : (
            <>
              <p className="text-slate-400 text-sm mt-1">
                Install for quick access and offline play
              </p>
              {deferredPrompt && (
                <button
                  onClick={handleInstall}
                  className="mt-3 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-bold rounded-lg text-sm transition-colors"
                >
                  Install App
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
