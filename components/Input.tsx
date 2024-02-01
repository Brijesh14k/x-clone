interface InputProps
{
    palceholder?:string
    value?:string
    type?:string
    disable?:boolean
    onchange:(event:React .ChangeEvent<HTMLInputElement>)=>void
}
export const Input = ({
    palceholder,
    value,
    type,
    disable,
    onchange,

}:InputProps)=>{
    return <input 
    disabled={disable}
    onChange={onchange}
    value={value}
    placeholder={palceholder}
    type={type}
    className="
    w-full
    p-2
    text-lg
    bg-black
    border-2
    rounded-md
    outline-none
    text-white
    focus:border-sky-100
    focus:border-2
    transition
    disabled:bg-nutral-900
    disabled:opacity-70
    disabled:cursor-not-allowed"/>
}