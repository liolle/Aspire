import { useState } from "react"
import {GrAddCircle} from "react-icons/gr"

const ModelDisplay = ({isEmpty=true}) =>{

    return (
        <div className=" h-[20rem] w-[12rem] 
        rounded bg-wht border-2 border-blk-100 shadow-lg flex
        hover:cursor-pointer hover:border-orange">
            {
                isEmpty && 
                <div className=" flex-1 flex justify-center
                 items-center">
                    <div className=" flex flex-col justify-center items-center">
                        <GrAddCircle/>
                        <span className=" text-base">New</span>

                    </div>
                </div>
            }
        </div>
    )
}

export default ModelDisplay