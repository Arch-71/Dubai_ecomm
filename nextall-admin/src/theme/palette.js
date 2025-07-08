'use client';
import { alpha } from '@mui/material/styles';
// ----------------------------------------------------------------------

export function createGradient(color1, color2) {
  return `linear-gradient(145.42deg, ${color1}, ${color2} 120%)`;
}

// SETUP COLORS
const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
  500_8: alpha('#919EAB', 0.08),
  500_12: alpha('#919EAB', 0.12),
  500_16: alpha('#919EAB', 0.16),
  500_24: alpha('#919EAB', 0.24),
  500_32: alpha('#919EAB', 0.32),
  500_48: alpha('#919EAB', 0.48),
  500_56: alpha('#919EAB', 0.56),
  500_80: alpha('#919EAB', 0.8)
};

const PRIMARY = {
  light: '#9D7FFF',
  main: '#7C4DFF',
  dark: '#5E35DC',
  contrastText: '#fff'
};

const SECONDARY = {
  light: '#6B8AFF',
  main: '#3D5AFE',
  dark: '#2A3EB1',
  contrastText: '#fff'
};

const INFO = {
  light: '#85D3F0',
  main: '#33B5E6',
  dark: '#2991B8',
  contrastText: '#fff'
};

const SUCCESS = {
  light: '#7DDAC0',
  main: '#26C196',
  dark: '#1E9A78',
  contrastText: '#fff'
};

const WARNING = {
  light: '#FAB833',
  main: '#F9A600',
  dark: '#C78500',
  contrastText: '#fff'
};

const ERROR = {
  light: '#FF8A8A',
  main: '#FF5252',
  dark: '#D32F2F',
  contrastText: '#fff'
};

const GRADIENTS = {
  primary: createGradient(PRIMARY.light, PRIMARY.dark),
  info: createGradient(INFO.light, INFO.main),
  background: 'linear-gradient(145.42deg, #1A1A1A, #0A0A0A)',
  success: createGradient(SUCCESS.light, SUCCESS.main),
  warning: createGradient(WARNING.light, WARNING.main),
  error: createGradient(ERROR.light, ERROR.dark),
  purple: 'linear-gradient(145.42deg, #9D7FFF, #5E35DC)',
  blue: 'linear-gradient(145.42deg, #6B8AFF, #2A3EB1)'
};

const CHART_COLORS = {
  violet: ['#9D7FFF', '#7C4DFF', '#5E35DC', '#4527A0'],
  blue: ['#6B8AFF', '#3D5AFE', '#2A3EB1', '#1A237E'],
  green: ['#2CD9C5', '#60F1C8', '#A4F7CC', '#C0F2DC'],
  yellow: ['#FFE700', '#FFEF5A', '#FFF7AE', '#FFF3D6'],
  purple: ['#9D7FFF', '#7C4DFF', '#5E35DC', '#4527A0']
};

const COMMON = {
  common: { black: '#000', white: '#fff' },
  primary: { ...PRIMARY },
  secondary: { ...SECONDARY },
  info: { ...INFO },
  success: { ...SUCCESS },
  warning: { ...WARNING },
  error: { ...ERROR },
  grey: GREY,
  gradients: GRADIENTS,
  chart: CHART_COLORS,
  divider: GREY[500_24],
  action: {
    hover: GREY[500_8],
    selected: GREY[500_16],
    disabled: GREY[500_80],
    disabledBackground: GREY[500_24],
    focus: GREY[500_24],
    hoverOpacity: 0.08,
    disabledOpacity: 0.48
  }
};

const palette = {
  light: {
    ...COMMON,
    mode: 'light',
    text: { primary: GREY[800], secondary: GREY[600], disabled: GREY[500] },
    background: { paper: '#fff', default: '#fff', neutral: GREY[200] },
    action: { active: GREY[600], ...COMMON.action }
  },
  dark: {
    ...COMMON,
    mode: 'dark',
    text: { primary: '#fff', secondary: GREY[400], disabled: GREY[600] },
    background: { paper: '#1A1A1A', default: '#0A0A0A', neutral: '#121212' },
    action: { active: GREY[500], ...COMMON.action }
  }
};

export default palette;
