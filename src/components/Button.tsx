
interface ButtonProps {
    id?: string;
    title: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    containerClass?: string;
}

const Button = ({id, title, leftIcon, rightIcon, containerClass} : ButtonProps) => {
  return (
    <button id={id} className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black ${containerClass}`}>
        {leftIcon}

        <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
            <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:-translate-y-[110%] group-hover:skew-y-4">
                {title}
            </div>
            <div className="absolute translate-y-[110%] skew-y-5 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
                {title}
            </div>
        </span>
        {rightIcon}
    </button>
  )
}

export default Button