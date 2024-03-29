interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

const Input: React.FC<InputProps> = ({ id, onChange, value, label, type, ...args }) => {
  return (
    <div className='relative'>
      <input
        {...args}
        onChange={onChange}
        value={value}
        type={type}
        id={id}
        className='
        block
        rounded-md
        px-6
        pt-5
        pb-3
        w-full
        text-md
      text-white
      bg-neutral-700
        appearance-none
        focus:outline-none
        focus:ring-0
        peer
        invalid:border-b-1
        '
        placeholder=' '
      />
      <label
        htmlFor={id}
        className='
        absolute 
        text-md
      text-zinc-400
        duration-150 
        transform 
        -translate-y-3 
        scale-75 
        top-4 
        z-10 
        origin-[0] 
        left-6
        peer-placeholder-shown:scale-100 
        peer-placeholder-shown:translate-y-0 
        peer-focus:scale-75
        peer-focus:-translate-y-3
      '>
        {label}
      </label>
    </div>
  )
}

export default Input
