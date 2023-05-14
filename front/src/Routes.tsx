import React from "react"
import { Routes, Route } from "react-router-dom"
import ModelPage from "./Pages/Landing"
import PricingPage from "./Pages/PricingPage"
import TestComp from "./Pages/TestComponent"


export function routes() {
    return <Routes>
            <Route path='/' element={<ModelPage/>} />
            <Route path= '/pricing' element={<PricingPage/>} />
            <Route path= '/testcomp' element={<TestComp/>} />
    </Routes>
}