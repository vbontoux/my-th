import React from "react"
import {Icon} from "@mdi/react"
import {mdiFileHidden} from "@mdi/js"
import "../styles/utils.css"

export default () => {
    return (
        <div id="notFound">
            <div>
                <div className="test_text" style={{paddingTop: "100px"}}>
                    <h1>404</h1>
                    <p>Sorry it looks like this page doesn't exist</p>
                    <Icon path={mdiFileHidden} size={4} color="#999"/>
                </div>
            </div>
        </div>
    );
}