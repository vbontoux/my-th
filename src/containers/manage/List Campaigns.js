import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Table} from "reactstrap";
import {Icon} from '@mdi/react'
import {mdiFacebookMessenger, mdiTwitter, mdiEmail, mdiAlert, mdiPen, mdiTrashCan} from '@mdi/js'

import Campaign, {InterfaceTypes} from "../../classes/Campaign";

import "../../styles/ListCampaigns.css"
import {Link} from "react-router-dom";

class ListCampaigns extends Component {
    render() {
        return (
            <div>
                <Table>
                    <thead>
                    <tr>
                        <th>Fun Bots</th>
                        <th>Status</th>
                        <th>Channel</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th># Interactions</th>
                        <th>Unique users</th>
                        <th>Type</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.list.map(c => <ListTableEntry campaign={c} key={c.id}/>)}
                    </tbody>
                </Table>
            </div>
        );
    }
}

ListCampaigns.propTypes = {list: PropTypes.arrayOf(PropTypes.instanceOf(Campaign))};

class ListTableEntry extends Component {

    constructor(props) {
        super(props);
        let c = this.props.campaign;
        let icons = c.interfaceSettings.map((inter, i) => {
            let color;
            let icon;
            switch (inter.typeValue) {
                case InterfaceTypes.FACEBOOK.value:
                    color = "#0084ff";
                    icon = mdiFacebookMessenger;
                    break;
                case InterfaceTypes.TWITTER.value:
                    color = "#00b2ff";
                    icon = mdiTwitter;
                    break;
                case InterfaceTypes.EMAIL.value:
                    color = "#000000";
                    icon = mdiEmail;
                    break;
                default:
                    color = "#ab2337";
                    icon = mdiAlert;
            }
            return <Icon path={icon} color={color} size={1} key={i}/>
        });

        this.state = {
            icons: icons
        }
    }

    render() {
        let c = this.props.campaign;
        if (c)
            return (
                <tr>
                    <th scope="row">{c.name}</th>
                    <td>{c.status}</td>
                    <td>{this.state.icons}</td>
                    <td>{c.start.format('L')}</td>
                    <td>{c.end.format('L')}</td>
                    <td>TODO</td>
                    <td>TODO</td>
                    <td>{c.gameSettings.typeName}</td>
                    <td><Link to={`/manage/${c.id}`}><Button><Icon path={mdiPen} color={"#ffffff"} size={1}/></Button></Link></td>
                    <td><Button outline color={"danger"}><Icon path={mdiTrashCan} color={"#ffffff"} size={1}/></Button></td>
                </tr>
            );
    }
}

ListTableEntry.propTypes = {campaign: PropTypes.instanceOf(Campaign)};

export default ListCampaigns;