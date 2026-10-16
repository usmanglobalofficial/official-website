// Region map icons — dark-green line outlines on black tiles, brightened for visibility.

const MapIcon = ({ src }) => (
  <img
    src={src}
    alt="Region map"
    className="w-full h-auto object-contain mix-blend-screen brightness-200 saturate-150"
    loading="lazy"
  />
);

const BASE = 'https://media.base44.com/images/public/69e988326d6c056fafdd45f7';

const Africa = () => <MapIcon src={`${BASE}/e8dd98e4d_ChatGPTImageJul31202602_19_24PM1.png`} />;
const Australia = () => <MapIcon src={`${BASE}/c75193f81_ChatGPTImageJul31202602_19_25PM2.png`} />;
const Malaysia = () => <MapIcon src={`${BASE}/5a56dae7a_ChatGPTImageJul31202602_19_25PM3.png`} />;
const Turkey = () => <MapIcon src={`${BASE}/6362b91aa_ChatGPTImageJul31202602_19_26PM4.png`} />;
const Pakistan = () => <MapIcon src={`${BASE}/2703baa20_ChatGPTImageJul31202602_19_26PM5.png`} />;
const GCC = () => <MapIcon src={`${BASE}/ce30c3b05_ChatGPTImageJul31202602_19_27PM6.png`} />;
const Europe = () => <MapIcon src={`${BASE}/818c1cb0a_ChatGPTImageJul31202602_19_27PM7.png`} />;
const UK = () => <MapIcon src={`${BASE}/77c33cf83_ChatGPTImageJul31202602_19_27PM8.png`} />;

export const regionIcons = {
  Africa,
  Australia,
  Malaysia,
  Turkey,
  Pakistan,
  GCC,
  Europe,
  UK,
};