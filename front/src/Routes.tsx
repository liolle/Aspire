import { Routes, Route } from "react-router-dom"
import ModelPage from "./Pages/Landing"
import PricingPage from "./Pages/PricingPage"
import ProfilesPage from "./Pages/Profiles"
import Login from "./Pages/Login"
import PrivateRoute from "./utils/privateRoute"
import ModelEdit from "./Pages/ModelModif"
import NewModel from "./Pages/NewModel"
import StripePage from "./Pages/TestStripe"

export function routes() {

    return <Routes>
            <Route path='/' element={<ModelPage/>} />
            <Route path= '/pricing' element={<PricingPage/>} />
            <Route path= '/login' element={<Login/>} />

            <Route element={<PrivateRoute />}>
                <Route path= '/profiles' element={<ProfilesPage/>} />
            </Route>
            <Route path= '/edit_model' element={<ModelEdit/>} />
            <Route path= '/new_model' element={<NewModel/>} />
            <Route path= '/stripe' element={<StripePage/>} />
            <Route path= '*' element={<div className="flex justify-center items-center text-4xl font-bold h-screen"> <span> 404</span> </div>} />
    </Routes>
}