import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../store/actions'
import { NavLink } from 'react-router-dom'

import { Input } from '../components/Input'
import LastPurchases from '../components/LastPurchases'

import { handleChange } from '../utils/handleChange'

// plugins
import Home from '../components/Home'
import Donate from '../components/plugins/Donate'
import MCGroup from '../components/plugins/MCGroup'
import MCCrates from '../components/plugins/MCCrates'
import MCUnban from '../components/plugins/MCUnban'
import MCSkin from '../components/plugins/MCSkin'

class Shop extends React.Component {
    state = {
        formData: {
            playerName: {
                attr: {
                    type: "text",
                    placeholder: "Spēlētāja vārds"
                },
                value: this.props.playerName ? this.props.playerName : "",
                valid: { isValid: null, messages: []},
                rules: {
                    minChars: 3,
                    maxChars: 25
                }
            },
            serverId: {
                attr: {
                    type: "select",
                    placeholder: "Izvēlies serveri...",
                    size: "3"
                },
                options: [],
                value: 0,
                valid: { isValid: null, messages: [] }
            }
        },
        plugin: null,
        formValid: false,
        shop: null
    }

    handleChange(input, newValue) {
        // Handling changes in the form - inputs, select etc.
        this.setState(handleChange(this.state, input, newValue))
    }

    handlePlayerForm() {
        this.props.setPlayerName(this.state.formData.playerName.value, this.state.formData.serverId.value, this.props.shop.slug)
    }

    handleLogout(event) {
        event.preventDefault()
        this.props.removePlayerName()
        this.setState({
            formData: {
                ...this.state.formData,
                playerName: {
                    ...this.state.formData.playerName,
                    value: "",
                    valid: { isValid: null, messages: [] }
                }
            },
            formValid: false
        }, this.props.history.push(`/${this.state.shop}`))
    }

    componentWillMount () {
        let { shop, plugin } = this.props.match.params
        this.props.getPlayerName(shop).then(() => {
            this.props.getShop(shop).then(() => {
                if (this.props.shop && this.props.shop.errors.length === 0) {
                    this.setState({ plugin, shop, formData: {
                        ...this.state.formData,
                        serverId: {
                            ...this.state.formData.serverId,
                            options: [
                                ...this.props.shop.servers
                            ]
                        }
                    } })
                }
            })
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.plugin !== this.props.match.params.plugin) {
          this.setState({ plugin: nextProps.match.params.plugin })
        }
    }

    render() {
        // Iterating over form inputs found in state and pushing them to an array
        let formData = []
        for (let key in this.state.formData) {
            formData.push({ id: key, ...this.state.formData[key] })
        }
        let shop = <div className="spinner-border text-primary" role="status"><span className="sr-only">Ielādējam...</span></div>
        if (this.props.shop && this.props.shop.errors.length === 0) {
            const plugin = this.state.plugin
            //const isPluginActive = this.props.shop.menu.find(item => item.type === plugin)
            const isPluginActive = true
            let pluginMenu = null
            if (this.props.serverId !== null) {
                const findServer = this.props.shop.servers.find(item => Number(item.id) === Number(this.props.serverId))
                pluginMenu = findServer.plugins.map(item => {
                    return (
                        <NavLink to={`/${this.state.shop}/${item.urlname}`} className="nav-link" key={item.urlname}>
                            <li className="nav-item">{item.display}</li>
                        </NavLink>
                    )
                })
            }
            const plugins = (
                <>
                    {(!plugin) ? <Home helloText={this.props.shop.hellotext} /> : null}
                    {(plugin === "donate" && isPluginActive) ? <Donate /> : null}
                    {(plugin === "mc_group" && isPluginActive) ? <MCGroup /> : null}
                    {(plugin === "mc_unban" && isPluginActive) ? <MCUnban playerName={this.props.playerName} /> : null}
                    {(plugin === "mc_crates" && isPluginActive) ? <MCCrates /> : null}
                    {(plugin === "mc_skin" && isPluginActive) ? <MCSkin /> : null}
                </>
            )
            const playerNameForm = (
                <>
                <form>
                    {formData.map((input, index) => <Input change={(event) => this.handleChange(input, event.target.value)} key={index} {...input} /> )}
                    <button className="btn btn-primary" type="button" onClick={() => this.handlePlayerForm()} disabled={this.state.formValid ? null : "disabled"}>Apstiprināt</button>
                </form>
                </>
            )
            shop = (
                <>
                <div className="card mb-3">
                    <div className="card-body">
                        <h3 className="mb-0" style={{textAlign: 'center'}}>{this.props.shop.title}</h3>
                        <h3 className="mb-0"><center>{(this.props.playerName && this.props.serverId) ? `Sveiks, ${this.props.playerName}` : null}</center></h3>
                        <ul className="nav nav-pills">
                        <NavLink exact to={`/${this.state.shop}`} className="nav-link"><li className="nav-item">Sākums</li></NavLink>
                            {pluginMenu}
                            {(this.props.playerName && this.props.serverId) ? <li className="nav-item"><a href="/logout" className="nav-link" onClick={(event) => this.handleLogout(event)}>Izlogoties</a></li> : ""}
                        </ul>
                        <div className="row no-gutters">
                            <div className="col-lg-8 pr-lg-2">
                                { (this.props.playerName === null || this.props.serverId === null) ? playerNameForm : plugins}
                            </div>
                            <div className="col-lg-4 pr-lg-2">
                                <LastPurchases lastPurchases={this.props.shop.lastpurchases} />
                            </div>
                        </div>
                    </div>
                </div>
                </>
            )
        }
        if (this.props.error) {
            shop = (<div className="alert alert-danger">{this.props.error}</div>)
        }
        return shop
    }
}

const mapStateToProps = state => {
    return {
        shop: state.shop.shopData,
        playerName: state.shop.playerName,
        error: state.shop.error,
        serverId: state.shop.serverId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getShop: slug => dispatch(actions.getShop(slug)),
        getPlayerName: shopName => dispatch(actions.getPlayerName(shopName)),
        setPlayerName: (playerName, serverId, shopName) => dispatch(actions.setPlayerName(playerName, serverId, shopName)),
        removePlayerName: () => dispatch(actions.removePlayerName())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop)