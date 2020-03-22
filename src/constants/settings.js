export const SettingsNav = [
  { type: 'General', key: 'general' },
  { type: 'Background Effects', key: 'activeBackgroundEffect'}
];

export const BackgroundEffectList = [
  { value: 'plainBackground', label: 'Plain Background' },
  { value: 'colorLiquids', label: 'Color Liquids' }
];

export const defaultSettings = {
  general: {
    theme: 'light',
    layout: 'right',
    widgets: ['todo']
  },
  backgroundEffects: [
    {
      type: 'plainBackground',
      color: "#FFF",
    },
    {
      type: 'colorLiquids',
      config: [
        {
          fill: 'gradient',
          colors: ['#4facfe', '#00f2fe'],
          liquid: 'blob1'
        },
        {
          fill: 'singleColor',
          color: '#000',
          liquid: 'blob2'
        },
        {
          fill: 'gradient',
          colors: ['#f093fb', '#f5576c'],
          liquid: 'blob3'
        },
        {
          fill: 'singleColor',
          color: '#FFF',
          liquid: 'blob4'
        },
        {
          fill: 'gradient',
          colors: ['#84fab0', '#8fd3f4'],
          liquid: 'blob5'
        },
        {
          fill: 'singleColor',
          color: '#000',
          liquid: 'blob6'
        },
        {
          fill: 'gradient',
          colors: ['#fa709a', '#fee140'],
          liquid: 'blob1'
        },
      ],
    },
    {
      type: 'gooeySubstance',
      config: {
        randomize: true,
        position: 'left'
      }
    },
    {
      type: 'spawningShapes',
      config: {
        particleColor: '#C70039',
        backgroundColor: '#000000',
        spread: 'medium',
        position: 'right'
      }
    }
  ],
}