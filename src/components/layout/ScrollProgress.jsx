import { useScrollProgress } from '../../hooks/useScrollProgress'

export function ScrollProgress() {
  const { progress } = useScrollProgress()

  return <div className="scroll-bar" id="scrollBar" style={{ width: `${progress}%` }}></div>
}
