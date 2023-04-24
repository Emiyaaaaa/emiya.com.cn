import React from 'react'

function LightDarkSwitch() {
  return (
    <div className="relative flex w-full items-center rounded-full bg-[#357Bb1] ">
      <div className="m-2 w-1/3">
        <div className="aspect-w-1 aspect-h-1">
          <div className="h-full w-full">
            <div
              className="h-full w-full overflow-hidden rounded-full bg-[#efc528]"
              style={{
                boxShadow: [
                  '0 0.01rem 0.1rem rgba(54,122,177,0.5) inset', // 蓝色上阴影
                  '0 0.06rem 0.3rem rgba(255,255,255,0.7) inset', // 白色上阴影
                  '-0.02rem -0.005rem 0.1rem rgba(255,255,255,0.8) inset', // 白色上阴影
                  '0 -0.08rem 0.3rem rgba(30,60,78,0.3) inset', // 蓝黑色下阴影
                  '0 -0.04rem 0.1rem rgba(30,60,78,0.5) inset', // 蓝黑色下阴影
                  '0.1rem 0.35rem 0.5rem 0.01rem rgba(30,60,78,0.5)', // 蓝黑色下阴影
                  // '0 0rem 0.1rem rgba(30,60,78,0.5)', // 蓝黑色下阴影
                ].join(', '),
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LightDarkSwitch
