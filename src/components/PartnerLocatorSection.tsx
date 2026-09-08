import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  MapPin, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Building2, 
  Phone, 
  Mail, 
  Navigation, 
  Filter, 
  Search,
  ExternalLink,
  Send,
  Ban,
  Clock,
  IndianRupee
} from 'lucide-react';
import L from 'leaflet';
import { ChannelPartner, PartnerType, Scheme } from '../types';
import { CHANNEL_PARTNERS_DATABASE, calculateDistanceKm } from '../data/partners';
import { TranslationStrings, Language } from '../utils/translations';

interface PartnerLocatorSectionProps {
  t: TranslationStrings;
  lang: Language;
  selectedScheme?: Scheme | null;
  onRouteToPartner: (partner: ChannelPartner) => void;
}

export const PartnerLocatorSection: React.FC<PartnerLocatorSectionProps> = ({
  t,
  lang,
  selectedScheme,
  onRouteToPartner
}) => {
  const [selectedType, setSelectedType] = useState<'ALL' | PartnerType>('ALL');
  const [onlyOptimalHealth, setOnlyOptimalHealth] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPartner, setSelectedPartner] = useState<ChannelPartner | null>(null);

  // User location: defaults to New Delhi, can be updated by GPS or quick dropdown
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number; label: string }>({
    lat: 28.6139,
    lng: 77.2090,
    label: 'New Delhi (Connaught Place)'
  });

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  // Pre-set Major Cities for quick geo-navigation
  const quickCities = [
    { label: 'Delhi NCR', lat: 28.6139, lng: 77.2090 },
    { label: 'Mumbai', lat: 19.0760, lng: 72.8777 },
    { label: 'Bengaluru', lat: 12.9716, lng: 77.5946 },
    { label: 'Chennai', lat: 13.0827, lng: 80.2707 },
    { label: 'Lucknow', lat: 26.8467, lng: 80.9462 },
    { label: 'Hyderabad', lat: 17.3850, lng: 78.4867 },
    { label: 'Kolkata', lat: 22.5726, lng: 88.3639 },
    { label: 'Jaipur', lat: 26.9124, lng: 75.7873 },
    { label: 'Patna', lat: 25.5941, lng: 85.1376 }
  ];

  // Geolocation trigger
  const handleUseGPS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            label: 'Your Current GPS Location'
          });
        },
        (err) => {
          alert('Could not retrieve GPS location. Showing default city.');
        }
      );
    }
  };

  // Filtered and distance-annotated partners
  const filteredPartners = useMemo(() => {
    return CHANNEL_PARTNERS_DATABASE
      .map((p) => {
        const dist = calculateDistanceKm(userLocation.lat, userLocation.lng, p.lat, p.lng);
        return { ...p, distanceKm: dist };
      })
      .filter((p) => {
        // Filter by partner type
        if (selectedType !== 'ALL' && p.type !== selectedType) return false;

        // Filter by health status (ensure applications aren't sent to high NPA partners)
        if (onlyOptimalHealth && p.healthStatus === 'RESTRICTED') return false;

        // Filter by search query
        if (searchQuery.trim() !== '') {
          const query = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(query);
          const matchCity = p.city.toLowerCase().includes(query);
          const matchState = p.state.toLowerCase().includes(query);
          const matchPin = p.pincode.includes(query);
          if (!matchName && !matchCity && !matchState && !matchPin) return false;
        }

        return true;
      })
      .sort((a, b) => (a.distanceKm || 0) - (b.distanceKm || 0));
  }, [selectedType, onlyOptimalHealth, searchQuery, userLocation]);

  // Initialize and update Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Create map if not created
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [userLocation.lat, userLocation.lng],
        zoom: 5,
        zoomControl: true
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
        maxZoom: 19
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;
    if (!map) return;

    // Center map on user location
    map.setView([userLocation.lat, userLocation.lng], 6);

    // Clear old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    // Add User Location Marker
    const userIcon = L.divIcon({
      className: 'user-pin-custom',
      html: `<div style="background:#38bdf8; width:18px; height:18px; border-radius:50%; border:3px solid #ffffff; box-shadow:0 0 15px #38bdf8;"></div>`,
      iconSize: [18, 18],
      iconAnchor: [9, 9]
    });

    const userMarker = L.marker([userLocation.lat, userLocation.lng], { icon: userIcon })
      .addTo(map)
      .bindPopup(`<b>Your Location</b><br/>${userLocation.label}`);
    markersRef.current.push(userMarker);

    // Add Partner Markers
    filteredPartners.forEach((partner) => {
      const color =
        partner.healthStatus === 'OPTIMAL' ? '#10b981' : partner.healthStatus === 'CAUTION' ? '#f59e0b' : '#f43f5e';

      const partnerIcon = L.divIcon({
        className: 'partner-pin-custom',
        html: `<div style="background:${color}; width:24px; height:24px; border-radius:50%; border:2px solid #ffffff; display:flex; align-items:center; justify-content:center; color:#fff; font-size:10px; font-weight:800; box-shadow:0 3px 10px rgba(0,0,0,0.5);">
          ${partner.type.charAt(0)}
        </div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      const marker = L.marker([partner.lat, partner.lng], { icon: partnerIcon })
        .addTo(map)
        .bindPopup(`
          <div style="font-family:sans-serif; min-width:200px; color:#0f172a;">
            <strong style="font-size:14px;">${partner.name}</strong><br/>
            <span style="font-size:12px; color:#64748b;">${partner.typeFullName}</span><br/>
            <div style="margin:6px 0; font-size:12px;">
              <b>Available Limit:</b> ₹${partner.unutilizedFundCrores} Cr<br/>
              <b>NPA Status:</b> <span style="color:${color}; font-weight:700;">${partner.npaPercentage}% (${partner.healthStatus})</span><br/>
              <b>Distance:</b> ${partner.distanceKm} km
            </div>
            <p style="font-size:11px; margin-bottom:8px;">${partner.address}</p>
          </div>
        `);

      marker.on('click', () => {
        setSelectedPartner(partner);
      });

      markersRef.current.push(marker);
    });
  }, [filteredPartners, userLocation]);

  return (
    <section id="locator-section" style={{ padding: '36px 0 60px 0' }}>
      <div className="app-container">
        <div className="section-header">
          <div className="section-tag">
            <MapPin size={16} />
            <span>Channel Finance Network</span>
          </div>
          <h2 className="section-heading">{t.locHeader}</h2>
          <p className="section-subheading">{t.locSubheader}</p>
        </div>

        {/* Selected Scheme context if passed */}
        {selectedScheme && (
          <div
            style={{
              background: 'rgba(245, 158, 11, 0.12)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: '12px',
              padding: '12px 20px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Building2 size={18} style={{ color: '#fbbf24' }} />
              <span style={{ fontSize: '0.9rem', color: '#fef3c7' }}>
                Locating accredited branches equipped to process: <strong>{selectedScheme.name}</strong>
              </span>
            </div>
            <span style={{ fontSize: '0.78rem', background: '#fbbf24', color: '#0b1120', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
              Active Routing Scheme
            </span>
          </div>
        )}

        {/* Search & Location Control Toolbar */}
        <div className="glass-card" style={{ padding: '20px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Quick City Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: '1 1 280px' }}>
              <Navigation size={18} style={{ color: '#38bdf8' }} />
              <select
                className="form-select"
                style={{ padding: '8px 12px', fontSize: '0.85rem' }}
                value={userLocation.label}
                onChange={(e) => {
                  const city = quickCities.find((c) => c.label === e.target.value);
                  if (city) setUserLocation(city);
                }}
              >
                {quickCities.map((city) => (
                  <option key={city.label} value={city.label}>
                    Center around: {city.label}
                  </option>
                ))}
              </select>
              <button
                className="btn-secondary"
                style={{ padding: '8px 14px', fontSize: '0.8rem', whiteSpace: 'nowrap' }}
                onClick={handleUseGPS}
              >
                Use My GPS
              </button>
            </div>

            {/* Keyword Search */}
            <div style={{ position: 'relative', flex: '1 1 240px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="text"
                className="form-input"
                style={{ paddingLeft: '36px', fontSize: '0.85rem', padding: '8px 12px 8px 36px' }}
                placeholder="Search by Bank, City, SCA or Pincode..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Filter Chips & NPA Safety Toggle */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--color-border)' }}>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>Partner Filter:</span>
            {(['ALL', 'SCA', 'PSB', 'RRB', 'NBFC-MFI'] as const).map((type) => (
              <button
                key={type}
                type="button"
                style={{
                  background: selectedType === type ? 'rgba(56, 189, 248, 0.25)' : 'rgba(15, 23, 42, 0.7)',
                  border: selectedType === type ? '1px solid #38bdf8' : '1px solid var(--color-border)',
                  color: selectedType === type ? '#38bdf8' : '#94a3b8',
                  padding: '5px 14px',
                  borderRadius: '20px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
                onClick={() => setSelectedType(type)}
              >
                {type === 'ALL' ? t.filterAll : type === 'SCA' ? t.filterSCA : type === 'PSB' ? t.filterPSB : type === 'RRB' ? t.filterRRB : t.filterNBFC}
              </button>
            ))}

            {/* Safety Filter Toggle */}
            <label style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.8rem', color: '#34d399', fontWeight: 600 }}>
              <input
                type="checkbox"
                checked={onlyOptimalHealth}
                onChange={(e) => setOnlyOptimalHealth(e.target.checked)}
                style={{ accentColor: '#10b981', cursor: 'pointer' }}
              />
              <span>{t.filterSafeOnly}</span>
            </label>
          </div>
        </div>

        {/* Interactive Leaflet Map Wrapper */}
        <div className="map-container-wrapper" ref={mapContainerRef} style={{ zIndex: 1 }} />

        {/* Real-time Partner Directory Results */}
        <div style={{ marginTop: '36px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#fff' }}>
              Authorized Channel Partners ({filteredPartners.length} Found)
            </h3>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
              Sorted by proximity from {userLocation.label}
            </span>
          </div>

          <div className="partner-card-list">
            {filteredPartners.map((partner) => {
              const isSelected = selectedPartner?.id === partner.id;
              const isRestricted = partner.healthStatus === 'RESTRICTED';

              return (
                <div
                  key={partner.id}
                  className="partner-card glass-card"
                  style={{
                    border: isSelected ? '2px solid #38bdf8' : undefined,
                    opacity: isRestricted ? 0.75 : 1
                  }}
                  onClick={() => setSelectedPartner(partner)}
                >
                  <div className="partner-header">
                    <div>
                      <span className={`badge-partner-type ${partner.type}`}>{partner.type}</span>
                      <h4 style={{ fontSize: '1.05rem', color: '#fff', marginTop: '6px' }}>
                        {lang === 'hi' ? partner.hindiName : partner.name}
                      </h4>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{partner.typeFullName}</div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span className={`partner-health-tag ${partner.healthStatus}`}>
                        {partner.healthStatus === 'OPTIMAL' ? (
                          <CheckCircle2 size={12} />
                        ) : partner.healthStatus === 'CAUTION' ? (
                          <AlertTriangle size={12} />
                        ) : (
                          <Ban size={12} />
                        )}
                        <span>{partner.healthStatus}</span>
                      </span>
                      <div style={{ fontSize: '0.78rem', color: '#38bdf8', fontWeight: 700, marginTop: '4px' }}>
                        {partner.distanceKm} km away
                      </div>
                    </div>
                  </div>

                  {/* Fund Allocation & NPA Health Metrics */}
                  <div style={{ background: 'rgba(15, 23, 42, 0.65)', padding: '10px 12px', borderRadius: '8px', fontSize: '0.78rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ color: '#94a3b8' }}>{t.fundBalance}:</span>
                      <strong style={{ color: '#34d399' }}>₹{partner.unutilizedFundCrores} Cr Active</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ color: '#94a3b8' }}>NPA / Overdue Health:</span>
                      <strong style={{ color: partner.healthStatus === 'OPTIMAL' ? '#34d399' : partner.healthStatus === 'CAUTION' ? '#fbbf24' : '#f43f5e' }}>
                        {partner.npaPercentage}%
                      </strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#94a3b8' }}>{t.disbursalTime}:</span>
                      <span style={{ color: '#fff' }}>~{partner.avgDisbursalDays} Business Days</span>
                    </div>
                  </div>

                  {/* Address & Nodal Officer */}
                  <div style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', marginBottom: '4px' }}>
                      <MapPin size={14} style={{ color: '#38bdf8', flexShrink: 0, marginTop: '2px' }} />
                      <span>{partner.address}, {partner.city} - {partner.pincode}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8' }}>
                      <Phone size={13} />
                      <span>{partner.phone} ({partner.nodalOfficer.split(' ')[0]})</span>
                    </div>
                  </div>

                  {/* Routing Action */}
                  <div style={{ marginTop: 'auto', paddingTop: '8px' }}>
                    {isRestricted ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f43f5e', fontSize: '0.75rem', background: 'rgba(244, 63, 94, 0.1)', padding: '8px', borderRadius: '6px' }}>
                        <AlertTriangle size={14} />
                        <span>Direct routing locked: High NPA detected to protect beneficiary funds from delays.</span>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="btn-primary"
                        style={{ width: '100%', padding: '10px 14px', fontSize: '0.85rem', justifyContent: 'center' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onRouteToPartner(partner);
                        }}
                      >
                        <Send size={15} />
                        <span>{t.routeApplicationBtn}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
