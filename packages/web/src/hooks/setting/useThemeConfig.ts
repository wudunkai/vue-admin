import { theme as anTdTheme } from 'ant-design-vue/es'

export function useThemeConfig() {
  const { layoutSetting, toggleGray, toggleWeak } = useAppStore()
  if (layoutSetting.colorGray) toggleGray(true)
  if (layoutSetting.colorWeak) toggleWeak(true)
  const colorPrimary = computed(() => layoutSetting.colorPrimary)
  const algorithm = computed(() =>
    layoutSetting.theme === 'light' ? anTdTheme.defaultAlgorithm : anTdTheme.darkAlgorithm
  )
  document.documentElement.setAttribute('data-theme', layoutSetting.theme)
  return {
    algorithm,
    colorPrimary
  }
}
