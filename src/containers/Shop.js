import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../store/actions'

import { htmlDecode } from '../utils/htmlDecode'

import { NavLink } from 'react-router-dom'

import Donate from '../components/Donate'
import MCGroup from '../components/MCGroup'
import MCCrates from '../components/MCCrates'
import MCUnban from '../components/MCUnban'

class Shop extends React.Component {
    state = {
        plugin: null,
        shop: null
    }

    componentWillMount () {
        let { shop, plugin } = this.props.match.params
        this.props.getShop(shop)
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
            const isPluginActive = this.props.shop.menu.find(item => item.type === plugin)
            const pluginMenu = this.props.shop.menu.map(item => {
                return (
                    <NavLink to={`/${this.state.shop}/${item.type}`} className="nav-link" key={item.url}>
                        <li className="nav-item">{item.title}</li>
                    </NavLink>
                )
            })
            shop = (
                <div>
                    <h3 className="mb-0" style={{textAlign: 'center'}}>{this.props.shop.title}</h3>
                    <p className="mt-2" dangerouslySetInnerHTML={{__html: htmlDecode(this.props.shop.hellotext)}}></p>
                    <ul className="nav nav-pills">
                        {pluginMenu}
                    </ul>
                    {(plugin === "donate" && isPluginActive) ? <Donate /> : null}
                    {(plugin === "mc_group" && isPluginActive) ? <MCGroup /> : null}
                    {(plugin === "mc_unban" && isPluginActive) ? <MCUnban /> : null}
                    {(plugin === "mc_crates" && isPluginActive) ? <MCCrates /> : null}
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
        error: state.shop.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getShop: slug => dispatch(actions.getShop(slug))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop)