import React from 'react';

function ManageCampaign({match}) {
    const cId =  match.params.campaignId;
    return (
        <div><h1>Manage Campaign {cId.toString()}</h1></div>
    )
}

export default ManageCampaign;