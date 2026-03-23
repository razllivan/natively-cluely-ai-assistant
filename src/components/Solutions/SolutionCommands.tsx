import React, { useState, useEffect, useRef } from "react"
import { IoLogOutOutline } from "react-icons/io5"
import { KeyBadge } from "../ui/KeyBadge"
import { getPlatformShortcut, isMac } from "../../utils/platformUtils"

interface SolutionCommandsProps {
  extraScreenshots: any[]
  onTooltipVisibilityChange?: (visible: boolean, height: number) => void
  onCodeHint?: () => void
  onBrainstorm?: () => void
}

const SolutionCommands: React.FC<SolutionCommandsProps> = ({
  extraScreenshots,
  onTooltipVisibilityChange,
  onCodeHint,
  onBrainstorm
}) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (onTooltipVisibilityChange) {
      let tooltipHeight = 0
      if (tooltipRef.current && isTooltipVisible) {
        tooltipHeight = tooltipRef.current.offsetHeight + 10
      }
      onTooltipVisibilityChange(isTooltipVisible, tooltipHeight)
    }
  }, [isTooltipVisible, onTooltipVisibilityChange])

  const handleMouseEnter = () => {
    setIsTooltipVisible(true)
  }

  const handleMouseLeave = () => {
    setIsTooltipVisible(false)
  }

  const keyToggle = getPlatformShortcut(['⌘', 'B'])
  const keyScreenshot = getPlatformShortcut(['⌘', 'H'])
  const keyDebug = getPlatformShortcut(['⌘', 'Enter'])
  const keyHint = getPlatformShortcut(['⌘', '6'])
  const keyBrainstorm = getPlatformShortcut(['⌘', '7'])
  const keyStartOver = getPlatformShortcut(['⌘', 'R'])

  return (
    <div>
      <div className="pt-2 w-fit">
        <div className="text-xs text-white/90 backdrop-blur-md bg-black/60 rounded-lg py-2 px-4 flex items-center justify-center gap-4">
          {/* Show/Hide */}
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="text-[11px] leading-none">Show/Hide</span>
            <KeyBadge keys={keyToggle} />
          </div>

          {/* Screenshot */}
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="text-[11px] leading-none truncate">
              {extraScreenshots.length === 0
                ? "Screenshot your code"
                : "Screenshot"}
            </span>
            <KeyBadge keys={keyScreenshot} />
          </div>
          {extraScreenshots.length > 0 && (
            <div className="flex items-center gap-2 whitespace-nowrap">
              <span className="text-[11px] leading-none">Debug</span>
              <KeyBadge keys={keyDebug} />
            </div>
          )}

          {/* Hint */}
          <div className="flex items-center gap-2 whitespace-nowrap">
            <button
              className="bg-white/10 hover:bg-white/20 transition-colors rounded-md px-2 py-1 text-[11px] leading-none text-white/70 flex items-center gap-1"
              onClick={onCodeHint}
              type="button"
              title={`Screenshot your code first (${keyScreenshot.join(isMac ? '' : '+')}) then press ${keyHint.join(isMac ? '' : '+')} to get a hint`}
            >
              💡 Hint
            </button>
            <KeyBadge keys={keyHint} />
          </div>

          {/* Brainstorm */}
          <div className="flex items-center gap-2 whitespace-nowrap">
            <button
              className="bg-white/10 hover:bg-white/20 transition-colors rounded-md px-2 py-1 text-[11px] leading-none text-white/70 flex items-center gap-1"
              onClick={onBrainstorm}
              type="button"
              title="Brainstorm 2-3 problem-solving approaches"
            >
              🧠 Brainstorm
            </button>
            <KeyBadge keys={keyBrainstorm} />
          </div>

          {/* Start Over */}
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="text-[11px] leading-none">Start over</span>
            <KeyBadge keys={keyStartOver} />
          </div>

          {/* Question Mark with Tooltip */}
          <div
            className="relative inline-block"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors flex items-center justify-center cursor-help z-10">
              <span className="text-xs text-white/70">?</span>
            </div>

            {isTooltipVisible && (
              <div
                ref={tooltipRef}
                className="absolute top-full right-0 mt-2 w-80"
                style={{ zIndex: 100 }}
              >
                <div className="p-3 text-xs bg-black/80 backdrop-blur-md rounded-lg border border-white/10 text-white/90 shadow-lg">
                  <div className="space-y-4">
                    <h3 className="font-medium whitespace-nowrap">
                      Keyboard Shortcuts
                    </h3>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="whitespace-nowrap">Toggle Window</span>
                          <KeyBadge keys={keyToggle} size="sm" />
                        </div>
                        <p className="text-[10px] leading-relaxed text-white/70 whitespace-nowrap truncate">
                          Show or hide this window.
                        </p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="whitespace-nowrap">Take Screenshot</span>
                          <KeyBadge keys={keyScreenshot} size="sm" />
                        </div>
                        <p className="text-[10px] leading-relaxed text-white/70 whitespace-nowrap truncate">
                          Capture additional parts of the question or your
                          solution for debugging help. Up to 5 extra screenshots
                          are saved.
                        </p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="whitespace-nowrap">Debug</span>
                          <KeyBadge keys={keyDebug} size="sm" />
                        </div>
                        <p className="text-[10px] leading-relaxed text-white/70 whitespace-nowrap truncate">
                          Generate new solutions based on all previous and newly
                          added screenshots.
                        </p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="whitespace-nowrap">Start Over</span>
                          <KeyBadge keys={keyStartOver} size="sm" />
                        </div>
                        <p className="text-[10px] leading-relaxed text-white/70 whitespace-nowrap truncate">
                          Start fresh with a new question.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sign Out Button */}
          <button
            className="text-red-500/70 hover:text-red-500/90 transition-colors"
            title="Sign Out"
            onClick={() => window.electronAPI.quitApp()}
          >
            <IoLogOutOutline className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default SolutionCommands
