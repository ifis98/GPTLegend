import { fontSize } from "../../node_modules/tailwindcss/lib/plugins/index";

function Header({ title, category, desc, Icon, options, currentOption, fromColor, children }){ return (
<div className="bg-black md:px-8 pt-4 mb-px">

    <div className="container mx-auto px-4 md:px-28 flex items-center bg-black">
        {Icon ? <div className={`mr-4 hidden md:inline-block text-${fromColor ? fromColor : "green-500"}`}>
            <Icon className="h-16 w-16 mb-4 mt-4" />
        </div> : null}
        <div>
            <div className={`text-sm font-medium text-${fromColor ? fromColor : "green-500"} `}>
                {category}
            </div>
            <h2 className="font-bold text-white flex align-center mt-1" style={{fontSize: "20px"}}>
                {title}
            </h2> 
            <p className="text-sm text-gray-300 text-sm  lg:mx-0 ">
                {desc}
            </p>
        </div>
    </div>

    <div className="container mx-auto px-4 md:px-28 pt-4 select-none ">
    {options && <div className="align-bottom bg-black text-left transform transition-all sm:align-middle transition inline-flex ">
        {options.map((option, index)=> <Option key={index} currentOption={currentOption} {...option} />)}
    </div>}
   
    {children}
    </div>
   
</div>
)}

export function Option({ title, Icon, onClick, currentOption, color}){
    let active = currentOption === title;
    return(
    <div className={`lg:py-4 lg:px-8 py-3 px-6 flex transition text-${active ? "white" : `${color ? color : "green"}-600` } font-medium  -mb-px rounded-t-lg  bg-${active ? "gray-800" : `${color ? color : "green"}-200`} hover:bg-${active  ? "gray-600" : `${color ? color : "green"}-300` } cursor-pointer `} onClick={()=>onClick(title)}>
                    <div className={`md:mr-4  transition flex-shrink-0 inline-flex items-center justify-center text-sm h-6 w-6 rounded-full bg-${active ? "gray-500": `${color ? color : "green"}-400`} text-${active ? "white":`${color ? color : "green"}`}-600`}>
                        <Icon className={`h-4 w-4 text-${active ? "white":`${color ? color : "green"}-600`}`} aria-hidden="true" />
                    </div>
                    <div className="hidden md:block">{title}</div>
            </div>
)}

export default Header