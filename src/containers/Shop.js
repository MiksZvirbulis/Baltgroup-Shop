import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../store/actions'

import { htmlDecode } from '../utils/htmlDecode'
import { Input } from '../components/Input'

import { NavLink } from 'react-router-dom'

import Donate from '../components/Donate'
import MCGroup from '../components/MCGroup'
import MCCrates from '../components/MCCrates'
import MCUnban from '../components/MCUnban'

class Shop extends React.Component {
    state = {
        plugin: null,
        shop: null,
        playerNameInput: {
            attr: {
                type: "text",
                placeholder: "Tavs vārds"
            },
            value: "",
            valid: true,
            rules: {
                minChars: 3,
                maxChars: 25
            }
        }
    }

    handleChange(input, event) {
        const currentInput = this.state.playerNameInput
        this.setState({ playerNameInput: {
            ...currentInput,
            value: event.target.value
        } })
    }

    handlePlayerForm(event) {
        event.preventDefault()
        this.props.setPlayerName(this.state.playerNameInput.value)
        this.setState({ playerNameInput: { ...this.state.playerNameInput, value: "" } })
    }

    handleLogout(event) {
        event.preventDefault()
        this.props.removePlayerName()
    }

    componentWillMount () {
        let { shop, plugin } = this.props.match.params
        this.props.getShop(shop)
        this.props.getPlayerName()
        this.setState({ plugin, shop })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.plugin !== this.props.match.params.plugin) {
          this.setState({ plugin: nextProps.match.params.plugin })
        }
    }

    render() {
        let shop = "Loading..."
        if (this.props.shop) {
            const plugin = this.state.plugin
            //const isPluginActive = this.props.shop.menu.find(item => item.type === plugin)
            const isPluginActive = true
            const pluginMenu = this.props.shop.menu.map(item => {
                return (
                    <NavLink to={`/${this.state.shop}/${item.type}`} className="nav-link" key={item.url}>
                        <li className="nav-item">{item.title}</li>
                    </NavLink>
                )
            })
            const plugins = (
                <>
                    {(plugin === "donate" && isPluginActive) ? <Donate /> : null}
                    {(plugin === "mc_group" && isPluginActive) ? <MCGroup /> : null}
                    {(plugin === "mc_unban" && isPluginActive) ? <MCUnban /> : null}
                    {(plugin === "mc_crates" && isPluginActive) ? <MCCrates /> : null}
                </>
            )
            const playerNameForm = (
                <>
                <form>
                    <Input change={(event) => this.handleChange(this.state.playerNameInput, event)} {...this.state.playerNameInput} />
                    <button className="btn btn-primary" type="submit" onClick={(event) => this.handlePlayerForm(event)}>Ok</button>
                </form>
                </>
            )
            shop = (
                <div>
                    <h3 className="mb-0" style={{textAlign: 'center'}}>{this.props.shop.title}</h3>
                    <p className="mt-2" dangerouslySetInnerHTML={{__html: htmlDecode(this.props.shop.hellotext)}}></p>
                    <h3 className="mb-0"><center>{this.props.playerName ? `Sveiks, ${this.props.playerName}` : `Izvēlies spēlētāja vārdu`}</center></h3>
                    <ul className="nav nav-pills">
                        {pluginMenu}
                        {this.props.playerName ? <li className="nav-item"><a href="/logout" className="nav-link" onClick={(event) => this.handleLogout(event)}>Izlogoties</a></li> : ""}
                    </ul>
                    { this.props.playerName === null ? playerNameForm : plugins}
                    
                </div>
            )
        }
        if (this.props.error) {
            shop = this.props.error
        }
        return shop
    }
}

const mapStateToProps = state => {
    return {
        shop: state.shop.shopData,
        playerName: state.shop.playerName,
        error: state.shop.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getShop: slug => dispatch(actions.getShop(slug)),
        getPlayerName: () => dispatch(actions.getPlayerName()),
        setPlayerName: playerName => dispatch(actions.setPlayerName(playerName)),
        removePlayerName: () => dispatch(actions.removePlayerName())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop)