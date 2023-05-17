import MenuSlider from "../Components/Nav/MenuSlider"


const TestComp = ()=>{

    const openMenu = ()=>{
        const element = document.querySelector("#mb-bugger-menu")
        if (element){
            //@ts-ignore
            element.style.transform = "translateX(0%)";
        }
    }

    return (
        <div className=" ">
            <span onClick={()=>openMenu()}> X </span>
            <div className=" relative ">
                <MenuSlider/>
            </div>
        </div>
    )
}

export default TestComp