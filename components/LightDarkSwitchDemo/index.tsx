'use client'
import React from 'react'
import classNames from 'classnames'
import './index.css'

function LightDarkSwitch() {
  const toggleTheme = React.useCallback(() => {
    document.documentElement?.classList.toggle('dark')
  }, [])

  return (
    <div className="w-full" onClick={() => toggleTheme()}>
      <div data-item="aspect-0.4" className="aspect-w-5 aspect-h-2 relative flex">
        <div data-item="wrapper" className="animation flex h-full w-full overflow-hidden rounded-full bg-[#357Bb1] dark:bg-[#1b1f2f]">
          <div data-item="cloud-1" className="absolute w-full">
            <Cloud1 className="-mr-[18%] -mt-[6%] w-1/3" />
            <Cloud1 className="mr-[6%] mt-[12%] w-[22%]" />
            <Cloud1 className="mr-[16%] mt-[15%] w-[24%]" />
            <Cloud1 className="mr-[22%] mt-[22%] w-[30%]" />
            <Cloud1 className="mr-[38%] mt-[21%] w-[26%]" />
            <Cloud1 className="mr-[55%] mt-[25%] w-[35%]" />
            <Cloud1 className="mr-[68%] mt-[32%] w-[35%]" />
          </div>
          <div data-item="sunshine-wrapper" className="animation absolute left-[4%] w-[33%] self-center dark:left-[63%]">
            <Circle>
              <div className="absolute h-[220%] w-[360%] rounded-full bg-white opacity-10"></div>
              <div className="absolute h-[200%] w-[280%] rounded-full bg-white opacity-10"></div>
              <div className="absolute h-[180%] w-[200%] rounded-full bg-white opacity-10"></div>
            </Circle>
          </div>
          <div data-item="cloud-2" className="absolute w-full">
            <Cloud2 className="-mr-[18%] mt-[5%] w-1/3" />
            <Cloud2 className="-mr-[8%] mt-[18%] w-[30%]" />
            <Cloud2 className="mr-[12%] mt-[28%] w-[24%]" />
            <Cloud2 className="mr-[23%] mt-[32%] w-[24%]" />
            <Cloud2 className="mr-[37%] mt-[30%] w-[26%]" />
            <Cloud2 className="mr-[50%] mt-[32%] w-[35%]" />
            <Cloud2 className="mr-[60%] mt-[36%] w-[35%]" />
          </div>
          <div data-item="sun-wrapper" className="animation relative left-[4%] w-[33%] self-center dark:left-[63%]">
            <div className="aspect-w-1 aspect-h-1">
              <div className="flex h-full w-full items-center justify-center">
                <div
                  data-item="sun"
                  className="animation h-full w-full overflow-hidden rounded-full bg-[#f0c73b] shadow-[2px_4px_8px_rgba(30,60,78,0.4)] dark:bg-[#c2c9d6]"
                >
                  <div data-item="crater" className="animation opacity-0 dark:opacity-100">
                    <Crater className="top-[10%] left-[30%] w-[30%]" />
                  </div>
                  <div data-item="inner-sun-shadow" className="relative -ml-[4%] h-full w-[108%]">
                    <div className="animation absolute w-full dark:left-[2%]">
                      <Circle className="shadow-[0_1px_3px_1px_rgba(255,255,255,0.5)_inset]"></Circle>
                    </div>
                    <div className="animation absolute -top-[8%] w-full dark:-left-[2%]">
                      <Circle className="shadow-[0_-2px_2px_1px_rgba(0,0,0,0.2)_inset]"></Circle>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            data-item="inner-border-shadow"
            className="animation absolute left-0 top-0 h-full w-[102%] rounded-full shadow-[0_2px_3px_3px_rgba(87,87,87,0.5)_inset] dark:-left-[1%] dark:top-[1%]"
          ></div>
        </div>
      </div>
    </div>
  )
}

function Circle({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <div className="w-full">
      <div className="aspect-w-1 aspect-h-1">
        <div className={classNames('flex h-full w-full items-center justify-center rounded-full', className)}>{children}</div>
      </div>
    </div>
  )
}

function Cloud1({ className }: { className?: string }) {
  return (
    <div className={classNames('absolute right-0', className)}>
      <Circle className="animation bg-[#a6c6e3] dark:bg-[#afb2be]"></Circle>
    </div>
  )
}

function Cloud2({ className }: { className?: string }) {
  return (
    <div className={classNames('absolute right-0', className)}>
      <Circle className="animation bg-[#f2fbfd] dark:bg-[#f5fafe]"></Circle>
    </div>
  )
}

function Crater({ className }: { className?: string }) {
  return (
    <div className={classNames('absolute', className)}>
      <Circle className="bg-[#989aaf] shadow-[0_0_2px_0_rgba(0,0,0,0.2)_inset]"></Circle>
    </div>
  )
}

export default LightDarkSwitch
