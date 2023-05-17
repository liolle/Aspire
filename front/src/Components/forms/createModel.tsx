 
 import back from '../images/back.png'
 import './cardSlide.css'
 
 const CreateModel= ({bg,title}:{bg:{backgroundImage: string},title:string})=>{

   return(
     <div className=" flex 
     border-2 border-blk-100 shadow-lg 
     bg-cover bg-center rounded-lg items-end 
     p-2 "
       style={bg} > 
         <span className=' select-none font-bold text-2xl flex h-fit w-fit origin-left rotate-[-90deg] translate-x-2'>
           {title}
         </span>
     </div>
 
   )
 }

 export default CreateModel