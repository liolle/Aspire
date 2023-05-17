import { useState } from "react"
import {GrAddCircle} from "react-icons/gr"
import { ModelInfo } from "../../utils/types"
import { useNavigate } from "react-router-dom"

const ModelDisplay = ({info}:
    {info:ModelInfo|undefined}) =>{
    const navigate = useNavigate()
    return (
        <div className=" h-[20rem] w-[12rem] 
        rounded-md bg-wht border-blk-100 shadow-lg flex
        hover:cursor-pointer border-2 hover:border-orange">
            {
                !info && 
                <div
                onClick={()=>navigate("/new_model")} 
                className=" flex-1 flex justify-center
                 items-center ">
                    <div className=" flex flex-col ">
                        <GrAddCircle/>
                        <span className=" text-base">New</span>
                    </div>
                </div>
            }

            {
                !!info && 
                <div  onClick={()=>navigate(`/edit_model?id=${info.id}`)} 
                className=" flex-1 flex flex-col  ">
                    <div className=" flex flex-[0_1_70%] justify-center items-center text-sm ">
                        <img className=" h-full " src="https://thinksport.com.au/wp-content/uploads/2020/01/avatar-.jpg" alt="Avatar" />
                    </div>
                    <div className=" flex flex-[0_1_30%] bg-blue text-wht p-2 justify-center">
                        <div className=" flex flex-col gap-2 text-xs justify-center select-none">
                            <div>
                                <span className=" italic">Height: </span>
                                <span>{info.height} cm</span>
                            </div>
                            <div>
                                <span className=" italic">Weight: </span>
                                <span>{info.weight} kg</span>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default ModelDisplay