import React from "react"
import MenuLeft from "./components/Menu"
import "./index.less"
import View from "./components/View"

function Home(props) {
    return (
        <div className="home">
            <div className="content">
                <MenuLeft />
                <View />
            </div>
        </div>
    )
}

export default Home
