import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../store/actions'

import Donate from '../components/Donate'
import MCGroup from '../components/MCGroup'

class Shop extends React.Component {
    state = {
        plugin: null
    }

    componentWillMount () {
        const { shop, plugin } = this.props.match.params
        this.props.getShop(shop)
        if (plugin) {
            this.setState({ plugin })
        }
    }

    render() {
        let shop = "Loading..."
        if (this.props.shop) {
            const plugin = this.state.plugin
            const isPluginActive = this.props.shop.menu.find(item => item.type === plugin)
            const pluginMenu = this.props.shop.menu.map(item => { return (<li key={item.url}>{item.title}</li>) })
            shop = (
                <div>
                    <h1>Welcome to {this.props.shop.title}</h1>
                    <ul>{pluginMenu}</ul>
                    {(plugin === "donate" && isPluginActive) ? <Donate /> : null}
                    {(plugin === "mc_group" && isPluginActive) ? <MCGroup /> : null}
                </div>
            )
        }
        return shop
    }
}

const mapStateToProps = state => {
    return {
        shop: state.shop.shopData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getShop: slug => dispatch(actions.getShop(slug))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop)