import React from 'react'

import { connect } from 'react-redux'
import * as actions from '../store/actions'

import { Input } from './Input'

class Donate extends React.Component {
    state = {
        formData: {
            username: {
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
            },
            comment: {
                attr: {
                    type: "text",
                    placeholder: "Tavs komentārs"
                },
                value: "",
                valid: true,
                rules: {
                    minChars: 3,
                    maxChars: 75
                }
            },
            price: {
                attr: {
                    type: "select",
                    placeholder: "Ziedojuma cena",
                    onChange: () => {
                        console.log("test")
                    },
                },
                value: [
                    { value: 1, display: '1.00 EUR' },
                    { value: 1.5, display: '1.50 EUR' },
                    { value: 2.0, display: '2.00 EUR' }
                ],
                valid: true
            },
            code: {
                attr: {
                    type: "hidden",
                    placeholder: "Saņemtais kods",

                },
                value: "",
                valid: true
            }
        },
        payment: null,
        formValid: false
    }

    handleSMS() {
        this.props.getSMSKey(1)
        this.setState({ payment: "sms"})
    }

    handlePayPal() {
        this.setState({ payment: "paypal" })
    }

    handleChange(input, event) {
        const currentForm = this.state.formData
        const currentInput = this.state.formData[input.id]
        this.setState({ formData: {
            ...currentForm,
            [input.id]: {
                ...currentInput,
                value: event.target.value
            }
        }
        })
    }

    render() {
        let formData = []
        for (let key in this.state.formData) {
            formData.push({ id: key, ...this.state.formData[key] })
        }
        return (
            <div>
                <h3>Donate</h3>
                <form>
                    {formData.map((input, index) => <Input change={(event) => this.handleChange(input, event)} key={index} {...input} /> )}
                    {(this.state.payment === "sms" && this.props.smsKey !== null) ?
                    <div className="alert alert-primary" role="alert">
                        Sūti SMS ar kodu {this.props.smsKey} B{this.props.shop.smskey} uz numuru 1881.<br />
                        <small>Maksa (EUR) tiks pievienota telefona rēķinam vai atrēķināta no priekšapmaksas kartes.</small>
                    </div>
                    : ""}
                    <button className="btn btn-primary" type="button" onClick={() => this.handlePayPal()}>PayPal</button>
                    <button className="btn btn-primary" type="button" onClick={() => this.handleSMS()}>SMS</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        shop: state.shop.shopData,
        smsKey: state.shop.smsKey
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getSMSKey: price => dispatch(actions.getSMSKey(price))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Donate)