import React from "react"
import { Routes, Route } from "react-router-dom"
import ModelPage from "./Pages/ModelPage"
import PricingPage from "./Pages/PricingPage"


export function routes() {
    return <Routes>
              <Route path='/' element={<ModelPage/>} />
            <Route path= '/PricingPage' element={<PricingPage/>} />
    </Routes>
}