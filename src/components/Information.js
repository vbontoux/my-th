import React from 'react';
import CollapsibleTitle from "./CollapsibleTitle";
import {mdiInformation} from "@mdi/js";

export default function Information(props) {
    return (
        <div id={"information"}>
            <div style={{width: '75%', marginLeft: '.5em'}}>
                <CollapsibleTitle title={<h6 style={{opacity: "0.7", margin: "0"}}>Information</h6>} separator={false}
                                  icon={mdiInformation} icon_size={.7} rotate_icon={false}>
                    <div style={{margin: "0 .5em 0 .5em", opacity: '.5'}}>{props.children}</div>
                </CollapsibleTitle>
            </div>
        </div>
    );
}