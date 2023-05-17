 
 import back from '../Images/back.png'
 import './cardSlide.css'
 
 const SCard= ({bg,title}:{bg:{backgroundImage: string},title:string})=>{

   return(
     <div className=" SCard flex flex-grow-[1] w-[5rem] h-[40rem] 
     border-2 border-blk-100 shadow-lg 
     bg-cover bg-center rounded-lg items-end hover:transition-all 
     hover:ease-in-out hover:duration-[500ms] hover:flex-grow-[10]
     p-2 "
       style={bg} > 
         <span className=' select-none font-bold text-2xl flex h-fit w-fit origin-left rotate-[-90deg] translate-x-2'>
           {title}
         </span>
     </div>
 
   )
 }

 export default SCard