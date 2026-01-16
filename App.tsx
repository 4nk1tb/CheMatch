
import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { CountrySelector } from './components/CountrySelector';
import { Dashboard } from './components/Dashboard';

type ViewState = 'landing' | 'country-select' | 'app';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('landing');
  const [selectedCountry, setSelectedCountry] = useState<string>('España');

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    setView('app');
  };

  return (
    <div className="font-sans antialiased text-gray-100 min-h-screen bg-black">
      {view === 'landing' && (
        <LandingPage onStart={() => setView('country-select')} />
      )}
      
      {view === 'country-select' && (
        <CountrySelector onSelect={handleCountrySelect} />
      )}
      
      {view === 'app' && (
        <Dashboard userCountry={selectedCountry} />
      )}
    </div>
  );
};

export default App;
