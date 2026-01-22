import type { FC } from "react"

export const StaggeredBackdropBlur: FC = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden -bottom-full">
      <div className="absolute inset-0 z-[1] pointer-events-none" style={{ maskImage: 'linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 25%, rgba(0, 0, 0, 0) 37.5%)', backdropFilter: 'blur(0.234375px)' }} />
      <div className="absolute inset-0 z-[2] pointer-events-none" style={{ maskImage: 'linear-gradient(to top, rgba(0, 0, 0, 0) 12.5%, rgb(0, 0, 0) 25%, rgb(0, 0, 0) 37.5%, rgba(0, 0, 0, 0) 50%)', backdropFilter: 'blur(0.46875px)' }} />
      <div className="absolute inset-0 z-[3] pointer-events-none" style={{ maskImage: 'linear-gradient(to top, rgba(0, 0, 0, 0) 25%, rgb(0, 0, 0) 37.5%, rgb(0, 0, 0) 50%, rgba(0, 0, 0, 0) 62.5%)', backdropFilter: 'blur(0.9375px)' }} />
      <div className="absolute inset-0 z-[4] pointer-events-none" style={{ maskImage: 'linear-gradient(to top, rgba(0, 0, 0, 0) 37.5%, rgb(0, 0, 0) 50%, rgb(0, 0, 0) 62.5%, rgba(0, 0, 0, 0) 75%)', backdropFilter: 'blur(1.875px)' }} />
      <div className="absolute inset-0 z-[5] pointer-events-none" style={{ maskImage: 'linear-gradient(to top, rgba(0, 0, 0, 0) 50%, rgb(0, 0, 0) 62.5%, rgb(0, 0, 0) 75%, rgba(0, 0, 0, 0) 87.5%)', backdropFilter: 'blur(3.75px)' }} />
      <div className="absolute inset-0 z-[6] pointer-events-none" style={{ maskImage: 'linear-gradient(to top, rgba(0, 0, 0, 0) 62.5%, rgb(0, 0, 0) 75%, rgb(0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 100%)', backdropFilter: 'blur(7.5px)' }} />
      <div className="absolute inset-0 z-[7] pointer-events-none" style={{ maskImage: 'linear-gradient(to top, rgba(0, 0, 0, 0) 75%, rgb(0, 0, 0) 87.5%, rgb(0, 0, 0) 100%)', backdropFilter: 'blur(15px)' }} />
      <div className="absolute inset-0 z-[8] pointer-events-none" style={{ maskImage: 'linear-gradient(to top, rgba(0, 0, 0, 0) 87.5%, rgb(0, 0, 0) 100%)', backdropFilter: 'blur(30px)' }} />
    </div>
  )
}
